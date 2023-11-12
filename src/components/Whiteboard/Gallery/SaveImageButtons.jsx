import React from 'react';

const SaveImageButtons = ({
  state,
  setState,
  canvasImage,
  deleteImage,
  setOpenGallery,
  showMessage
}) => {
  const save = async () => {
    setState({
      loading: false,
      modalOpen: true
    });
  };

  const cancel = () => {
    window.sessionStorage.setItem('storedUploadedImage', 'false');
    window.sessionStorage.setItem('isNewWhiteboardModification', 'false');

    deleteImage();
    if (canvasImage.image.id) {
      setOpenGallery(true);
    }
  };

  if (canvasImage && state.imageLoaded) {
    return (
      <section className="btn-canvas noselect" style={{ marginTop: 4 }}>
        <div onClick={cancel} style={{ marginRight: '20px' }}>
          <img
            className="buttons-animations-1"
            style={{ margin: 'auto', position: 'absolute', top: 0 }}
            src="/static/icons/closeIcon.svg"
            alt="Icon plus"
          />
          <img
            className="buttons-animations-3"
            style={{ margin: 'auto', position: 'absolute', top: 0 }}
            src="/static/icons/closeIcon2.svg"
            alt="Icon plus"
          />
        </div>
        {window.sessionStorage.getItem('isNewWhiteboardModification') === 'true' && (
          <React.Fragment>
            {state.savedFile ? (
              <img
                style={{ margin: '0 5px' }}
                className="saved"
                src="/static/icons/check.png"
                alt="Icon check"
              />
            ) : (
              <div onClick={save}>
                <img
                  className="save buttons-animations-1"
                  style={{ margin: 'auto', position: 'absolute', top: 0 }}
                  src="/static/icons/save1.svg"
                  alt="Icon save"
                />
                <img
                  className="save buttons-animations-3"
                  style={{ margin: 'auto', position: 'absolute', top: 0 }}
                  src="/static/icons/save2.svg"
                  alt="Icon save"
                />
              </div>
            )}
          </React.Fragment>
        )}
        {showMessage && (
          <div className="savedFileMessage">
            <p>image saved</p>
          </div>
        )}
      </section>
    );
  } else return null;
};

export default SaveImageButtons;
