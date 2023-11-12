import { useMutation, useQuery } from '@apollo/client';
import { useCallback, useEffect } from 'react';
import {
  CREATE_SLIDE,
  CREATE_SLIDE_IMAGE,
  CREATE_SLIDE_TEXT,
  DELETE_SLIDE,
  DELETE_SLIDE_IMAGE,
  DELETE_SLIDE_TEXT,
  UPDATE_SLIDE,
  UPDATE_SLIDE_IMAGE,
  UPDATE_SLIDE_POSITION,
  UPDATE_SLIDE_TEXT
} from '../graphQL/mutations';
import { v4 as uuid } from 'uuid';
import { GET_SLIDES_BY_LEVEL } from '../graphQL/queries';
import { deleteImageS3, parseSlideObject } from '../functions/utils';
import { useState } from 'react';
import { UploadImageS3 } from '../functions/Images';

export default function useSlides(currentLevelSelected) {
  // creating slides
  const [createSlideImage] = useMutation(CREATE_SLIDE_IMAGE);
  const [createSlideText] = useMutation(CREATE_SLIDE_TEXT);
  const [createSlideFunction, { loadingSlideCreate, errorCreatingSlide }] =
    useMutation(CREATE_SLIDE);
  // editing slides
  const [updateSlideImage] = useMutation(UPDATE_SLIDE_IMAGE);
  const [updateSlideText] = useMutation(UPDATE_SLIDE_TEXT);
  const [updateSlideFunction, { loadingSlideUpdate, errorUpdateSlide }] =
    useMutation(UPDATE_SLIDE);
  const [updateSlidePosition] = useMutation(UPDATE_SLIDE_POSITION);
  // getting slides
  const {
    data,
    refetch: refetchSlides,
    loading: queryLoading
  } = useQuery(GET_SLIDES_BY_LEVEL, {
    variables: {
      id: currentLevelSelected
    }
  });
  // deleting slides and components
  const [deleteSlideImage] = useMutation(DELETE_SLIDE_IMAGE);
  const [deleteSlideText] = useMutation(DELETE_SLIDE_TEXT);
  const [deleteSlideFunction] = useMutation(DELETE_SLIDE);

  const [SlidesInLevel, setSlidesInLevel] = useState([]);
  const [LoadingSave, setLoadingSave] = useState(false);

  useEffect(() => {
    if (errorCreatingSlide) {
      console.error(errorCreatingSlide);
    }
  }, [errorCreatingSlide]);

  const fetchingSlidesData = useCallback(async () => {
    if (data) {
      const { listStudentsLevels } = data;
      if (listStudentsLevels) {
        if (listStudentsLevels?.items[0]?.slides?.items?.length > 0) {
          const datas = [];
          listStudentsLevels.items[0].slides.items.forEach(slide => {
            datas.push(parseSlideObject(slide));
          });
          setSlidesInLevel(datas);
        }
      }
    }
  }, [data]);

  useEffect(() => {
    fetchingSlidesData();
  }, [data, queryLoading, fetchingSlidesData]);

  // methods

  const deleteAnEntireSlide = slideParsedObject =>
    new Promise(async (response, reject) => {
      const { id } = slideParsedObject;

      if (slideParsedObject) {
        await deleteSlideFunction({
          variables: { id }
        }).then(async () => {
          const { images, texts } = slideParsedObject;

          try {
            if (images.length > 0) {
              for await (const img of images) {
                await deleteImageS3(img.imageUrl);
                await deleteSlideImage({ variables: { id: img.id } });
              }
            }

            if (texts) {
              for await (const t of texts) {
                deleteSlideText({ variables: { id: t.id } });
              }
            }

            response(true);
          } catch (error) {
            reject(error);
          }
        });
      }
    });

  const updateSlide = data => {
    return new Promise(async (response, reject) => {
      const currentSlideId = data.id;

      if (data) {
        const { images, texts } = data;

        setLoadingSave(true);

        await updateSlideFunction({
          variables: {
            id: currentSlideId,
            exportedImage: data.exportedImage,
            numberToSort: data.numberToSort,
            minCalif: data.minCalification,
            realCalif: data.realCalification,
            studentLevelReffered: currentLevelSelected
          }
        })
          .then(async () => {
            try {
              if (images.length > 0) {
                for await (const img of images) {
                  let styles = 'null';
                  let imageUrl = img.imageUrl;

                  if (img.realFileAsBlob && imageUrl.includes('base64')) {
                    await UploadImageS3(img.realFileAsBlob)
                      .then(res => {
                        imageUrl = res;
                      })
                      .catch(error => {
                        console.error(error);
                      });
                  }

                  if (img?.styles) styles = JSON.stringify(img.styles);

                  const variables = {
                    slideId: currentSlideId,
                    height: img.height?.toString(),
                    width: img.width?.toString(),
                    x: img.x?.toString(),
                    y: img.y?.toString(),
                    imageUrl,
                    styles
                  };
                  if (img.learningContentSlideImagesId)
                    await updateSlideImage({
                      variables: { slideImageId: img.id, ...variables }
                    });
                  else await createSlideImage({ variables });
                }
              }

              if (texts) {
                for await (const t of texts) {
                  let styles = 'null';

                  if (t?.styles) styles = JSON.stringify(t?.styles);

                  const variables = {
                    slideId: currentSlideId,
                    height: t.height?.toString(),
                    width: t.width?.toString(),
                    x: t.x?.toString(),
                    y: t.y?.toString(),
                    text: t.text,
                    styles
                  };

                  if (t.learningContentSlideTextsId)
                    await updateSlideText({
                      variables: { slideTextId: t.id, ...variables }
                    });
                  else await createSlideText({ variables });
                }
              }
              setLoadingSave(false);
              response(true);
            } catch (error) {
              setLoadingSave(false);
              reject(error);
            }
          })
          .catch(err => {
            setLoadingSave(false);
            reject(err);
          });
      }
    });
  };

  const createSlide = async (defaultDraft, defaultId) => {
    // if there is a default draft, it will place it, otherwhise it will create a default slide template.
    return new Promise(async (response, reject) => {
      const currentSlideId = defaultId ? defaultId : uuid();
      let createdSlide;
      if (defaultDraft) {
        const { images, texts } = defaultDraft;

        setLoadingSave(true);

        await createSlideFunction({
          variables: {
            id: currentSlideId,
            exportedImage: defaultDraft.exportedImage,
            minCalif: defaultDraft.minCalification,
            numberToSort: defaultDraft?.numberToSort || 0,
            realCalif: defaultDraft.realCalification,
            studentLevelReffered: currentLevelSelected
          }
        })
          .then(async result => {
            try {
              // uploadingSlideImages
              createdSlide = result;
              if (images) {
                for await (const img of images) {
                  let styles = 'null';
                  let imageUrl = img.imageUrl;

                  if (img.realFileAsBlob && imageUrl.includes('base64')) {
                    await UploadImageS3(img.realFileAsBlob)
                      .then(res => {
                        imageUrl = res;
                      })
                      .catch(error => {
                        console.error(error);
                      });
                  }

                  if (img?.styles) styles = img.styles;

                  await createSlideImage({
                    variables: {
                      slideId: currentSlideId,
                      height: img.height?.toString(),
                      width: img.width?.toString(),
                      x: img.x?.toString(),
                      y: img.y?.toString(),
                      imageUrl,
                      styles
                    }
                  });
                }
              }

              if (texts) {
                for await (const t of texts) {
                  let styles = 'null';

                  if (t?.styles) styles = t.styles;

                  await createSlideText({
                    variables: {
                      slideId: currentSlideId,
                      height: t.height?.toString(),
                      width: t.width?.toString(),
                      x: t.x?.toString(),
                      y: t.y?.toString(),
                      text: t.text,
                      styles
                    }
                  });
                }
              }

              setLoadingSave(false);

              response(createdSlide);
            } catch (err) {
              setLoadingSave(false);
              reject(err);
            }
          })
          .catch(err => {
            setLoadingSave(false);
            reject(err);
          });
      }
    });
  };

  const updateSlidePositionFunction = async (slideId, newPosition) => {
    return await updateSlidePosition({ variables: { slideId, newPosition } });
  };

  const upsertSlides = async slidesDrafts => {
    try {
      for await (let slide of slidesDrafts) {
        if (slide?.notSaved) {
          await createSlide(slide);
        } else {
          await updateSlide(slide);
        }
      }

      return true;
    } catch (error) {
      console.error('error-upserting-slides-> ', error);
      throw error;
    }
  };

  return {
    LoadingSave,
    queryLoading,
    errorCreatingSlide,
    createSlide,
    currentLevelSlides: SlidesInLevel,
    updateSlidePositionFunction,
    updateSlide,
    deleteSlideImage,
    refetchSlides,
    deleteSlideFunction,
    deleteSlideText,
    deleteAnEntireSlide,
    upsertSlides
  };
}
