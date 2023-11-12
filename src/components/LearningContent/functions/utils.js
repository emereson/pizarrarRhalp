import html2canvas from 'html2canvas';
import { S3Service } from 'services/S3.service';

const s3Service = new S3Service('public', 'image/png');

export const deleteImageS3 = imageUrl =>
  new Promise((response, reject) => {
    s3Service
      .deleteFileByName(imageUrl)
      .then(() => {
        response(imageUrl);
      })
      .catch(err => {
        reject(err);
      });
  });

export const getBase64 = async file => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = event => resolve(event.target.result);
    reader.onerror = error => reject(error);
  });
};

export const getImageBase64FromUrl = image =>
  new Promise((response, reject) => {
    // insert img into img tag
    const imgTag = new Image();
    imgTag.src = image;
    imgTag.crossOrigin = 'anonymous';
    // init canvas
    let canvas = document.createElement('canvas');
    let canvasCtx = canvas.getContext('2d');

    // loading image
    imgTag.onload = () => {
      canvas.width = imgTag.naturalWidth;
      canvas.height = imgTag.naturalHeight;
      canvasCtx.drawImage(imgTag, 0, 0);
      // exporting3
      response(canvas.toDataURL('image/png', 1));
    };

    // error
    imgTag.onerror = error => {
      reject(error);
    };
  });

export const parseSlideObject = slide => {
  const { images, texts } = slide;

  const createdAt = new Date(slide.createdAt).getTime();
  const updatedAt = new Date(slide.updatedAt).getTime();

  const realImages = [];

  images.items.forEach(async d => {
    realImages.push({
      ...d,
      imageUrl: d.imageUrl,
      realUrl: d.imageUrl,
      imageBase64: d.imageUrl,
      styles: d.styles !== 'null' && d.styles !== undefined ? JSON.parse(d.styles) : null
    });
  });

  const realTexts = [];
  texts.items.forEach(d => {
    realTexts.push({
      ...d,
      styles: d.styles !== 'null' && d.styles !== undefined ? JSON.parse(d.styles) : null
    });
  });

  var newObject = {
    ...slide,
    updatedAt,
    createdAt,
    images: realImages,
    texts: realTexts
  };

  return newObject;
};

export const downloadingImage = (blob, fileName) => {
  const flink = window.document.createElement('a');
  flink.style = 'display:none';
  flink.download = fileName;

  flink.href = blob;

  document.body.appendChild(flink);
  flink.click();
  document.body.removeChild(flink);

  flink.remove();
};

export const exportingComponentToImage = async (element, width, height) => {
  const canvas = await html2canvas(element, {
    useCORS: true,
    allowTaint: true,
    width,
    height
  });

  const image = canvas.toDataURL('image/png', 1.0);

  // downloadingImage(image, "slide");

  return image;
};

export const getFirstSlide = slides => {
  const first = slides.sort((prev, next) => prev.createdAt - next.createdAt);

  if (first.length >= 1) return first[0];

  return null;
};

export const sortSlides = slides => {
  const slidesWithoutNulls = slides
    .sort((p, n) => p?.numberToSort - n?.numberToSort)
    .filter(p => p !== null);

  return slidesWithoutNulls;
};

export const pageNumber = (slidesList, currentSlide, notReturnP, numberFromNFS) => {
  if (numberFromNFS >= 0) {
    const formatted = `${numberFromNFS}`;
    return {
      text: `${!notReturnP ? 'P' : ''}${formatted === 'NaN' ? '--' : formatted}` || '--',
      number: numberFromNFS
    };
  }
  const sorted = slidesList?.sort((sp, sn) => sp.createdAt - sn.createdAt);
  let index;
  if (currentSlide) index = sorted.findIndex(object => object.id === currentSlide);

  return {
    text:
      index < 0
        ? '--'
        : `${!notReturnP ? 'P' : ''}${index < 9 ? '0' + (index + 1) : index + 1}` || '--',
    number: index
  };
};

export const findSlide = (slides, id) => {
  const comparation = slides.filter(d => d.id === id);
  if (comparation.length > 0) return comparation[0];

  return null;
};

export const getPreviousSlideFrom = (slides, slideId) => {
  let index = -1;
  slides.forEach((e, i) => {
    if (e.id === slideId) index = i;
  });

  const slide = slides[index - 1] ? slides[index - 1] : null;

  return slide;
};

export const getNextSlideFrom = (slides, slideId) => {
  let index = slides.findIndex(e => e.id === slideId);

  const slide = slides[index + 1] ? slides[index + 1] : null;

  return slide;
};

export const isJson = str => {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
};
