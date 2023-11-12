import { useMutation } from '@apollo/client';
import DropTarget from 'components/AdminDashboard/DropTarget';
import { useUser } from 'components/UserManagment/UserProvider';
import { UPDATE_FILE } from 'components/Whiteboard/graphQL/mutations';
import React, { useState } from 'react';

export default function FolderComponent({
  CreatingFolder,
  FolderName,
  isNew,
  Spinner,
  handleSaveFolder,
  FilterByFolder,
  folderClick,
  id,
  folderIcon,
  refreshAfterUpdate,
  deleteFunction,
  setChangingFileLocation
}) {
  const { user } = useUser();

  const [NewFolderName, setNewFolderName] = useState('New Folder');
  const [EditMode, setEditMode] = useState(false);
  const [updateFile] = useMutation(UPDATE_FILE);
  const [DeleteMode, setDeleteMode] = useState(false);

  const handleNewFolder = () => {
    const newFolder = {
      userId: user.attributes.sub,
      name: NewFolderName,
      url: 'null',
      mode: 'folder',
      currentFolder: FilterByFolder.id || 'default'
    };
    handleSaveFolder(newFolder);
  };

  const handleFolderClick = action => {
    if (!isNew && action == 'navigate') {
      folderClick();
    }
    if (!isNew && action == 'edit') {
      setEditMode(true);
      setNewFolderName(FolderName);
    }
  };

  const EditFolder = async () => {
    const fileInput = {
      id: id,
      name: NewFolderName,
      url: 'null',
      mode: 'folder',
      currentFolder: FilterByFolder.id ? FilterByFolder.id : 'default'
    };

    if (id === 'home-default-folder') {
      window.sessionStorage.setItem('defaultFolderName', NewFolderName);
      return;
    }

    await updateFile({ variables: fileInput })
      .then(folder => {
        setNewFolderName(fileInput.name);
        setEditMode(false);
        refreshAfterUpdate(id, fileInput);
      })
      .catch(error => {
        console.log('ERROR-UPDATING-FOLDER ->', error);
        setNewFolderName(fileInput.name);
        setEditMode(false);
        alert('Error saving new file');
      });
  };

  const onBlurName = () => {
    if (EditMode) {
      EditFolder();
    } else {
      handleNewFolder();
    }
  };

  const handleChangeFileFolder = async file => {
    setChangingFileLocation(true);
    const fileInput = {
      ...file,
      currentFolder: id
    };
    if (file.id !== id) {
      await updateFile({ variables: fileInput })
        .then(folder => {
          setChangingFileLocation(false);
          refreshAfterUpdate(file.id, fileInput);
        })
        .catch(error => {
          console.log('ERROR-UPDATING-FILE ->', error);
          setChangingFileLocation(false);
          alert('Error saving new file');
        });
    } else {
      setChangingFileLocation(false);
      alert("Can't perform this change, it should not be the same folder");
    }
  };

  const handleDeleteEvents = () => {
    if (!DeleteMode) setDeleteMode(true);
    else deleteFunction();
  };

  return (
    <div
      className="folder-container"
      id="folder-container"
      onDoubleClick={() => handleFolderClick('navigate')}
    >
      <img
        src={folderIcon}
        alt=""
        style={{
          width: '97%',
          position: 'absolute',
          top: 0,
          cursor: 'grab'
        }}
      />
      <DropTarget
        types={['file-draggable']}
        handleDrop={item => handleChangeFileFolder(item.payload)}
        customOverStyle={{
          border: '1px solid #000',
          background: 'rgba(195, 136, 255, 0.4)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          height: '100%'
        }}
      >
        <div
          style={{
            width: '100%',
            height: '100%',
            position: 'absolute',
            top: 0,
            left: 0,
            zIndex: 2000,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          {isNew && (
            <React.Fragment>
              {CreatingFolder !== NewFolderName ? (
                <input
                  className="folder-name-input"
                  defaultValue={NewFolderName}
                  autoFocus
                  multiple
                  onBlur={() => handleNewFolder()}
                  value={NewFolderName}
                  onChange={e => setNewFolderName(e.target.value)}
                  id="new-folder-name-input"
                  onKeyPress={event => (event.key === 'Enter' ? handleNewFolder() : null)}
                />
              ) : (
                <Spinner
                  className="bran-spinner"
                  animation="border"
                  style={{ marginTop: '20px' }}
                />
              )}
            </React.Fragment>
          )}
          {!isNew && (
            <React.Fragment>
              {CreatingFolder !== NewFolderName && CreatingFolder !== FolderName ? (
                <React.Fragment>
                  {id !== 'home-default-folder' && (
                    <>
                      {!DeleteMode ? (
                        <img
                          className="deleteIcon deleteButton"
                          src="/static/icons/ban.png"
                          alt="Icon delete"
                          onClick={handleDeleteEvents}
                        />
                      ) : (
                        <p
                          className="folder-name-input deleteButton"
                          onClick={handleDeleteEvents}
                        >
                          Ready?
                        </p>
                      )}
                    </>
                  )}
                  {!EditMode ? (
                    <p
                      className="folder-name-input"
                      onClick={() => handleFolderClick('edit')}
                      style={{ marginBottom: 0 }}
                    >
                      {FolderName.length > 17
                        ? `${FolderName.substring(0, 17)}...`
                        : FolderName}
                    </p>
                  ) : (
                    <input
                      className="folder-name-input"
                      defaultValue={NewFolderName}
                      autoFocus
                      multiple
                      onBlur={onBlurName}
                      value={NewFolderName}
                      onChange={e => setNewFolderName(e.target.value)}
                      id="new-folder-name-input"
                      onKeyPress={event =>
                        event.key === 'Enter'
                          ? EditMode
                            ? EditFolder()
                            : handleNewFolder()
                          : null
                      }
                    />
                  )}
                </React.Fragment>
              ) : (
                <Spinner
                  className="bran-spinner"
                  animation="border"
                  style={{ marginTop: '20px' }}
                />
              )}
            </React.Fragment>
          )}
        </div>
      </DropTarget>
    </div>
  );
}
