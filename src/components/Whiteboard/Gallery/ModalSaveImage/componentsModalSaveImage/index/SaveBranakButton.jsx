import { useEffect } from 'react';
import { Spinner } from 'react-bootstrap';

const SaveBranakButton = ({
  capture,
  fileExistInUSerGallery,
  setLoadings,
  setsaveInBranakMode,
  saveBranak,
  isLoading,
  loadings,
  saveInBranakMode,
  show
}) => {
  useEffect(() => {
    if (!saveInBranakMode && show) {
      const button = document.getElementById('saveInBranakButton');
      button?.click();
    }
  }, [saveInBranakMode, show]);

  return (
    <button
      className={window.innerWidth < 750 && 'saving-image-branak-from-gallery-btns'}
      id="saveInBranakButton"
      onClick={async () => {
        setLoadings([0, 1]);
        const file = await capture();
        if (fileExistInUSerGallery(file)) {
          setsaveInBranakMode(file);
          setLoadings([0, 0]);
        } else {
          setLoadings([0, 0]);
        }
      }}
      style={{
        marginBottom: '10px'
      }}
      disabled={isLoading}
    >
      {loadings[1] ? (
        <Spinner className="bran-spinner" animation="border" />
      ) : (
        <p>Save in Branak</p>
      )}
    </button>
  );
};

export default SaveBranakButton;
