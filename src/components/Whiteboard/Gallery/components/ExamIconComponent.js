import { Popper } from '@material-ui/core';
import { useUser } from 'components/UserManagment/UserProvider';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

export default function ExamIconComponent({
  name,
  cancelContextMenu,
  handleContextMenu,
  deleteFunction
}) {
  const [DeleteMode, setDeleteMode] = useState(false);

  const history = useHistory();

  const [AnchorPoint, setAnchorPoint] = useState(null);

  const handleDeleteEvents = () => {
    if (!DeleteMode) setDeleteMode(true);
    else deleteFunction();
  };

  const handleLinkToExam = e => {
    history.push('/take-exam/' + name.substring(name.indexOf(' ') + 1, name.length));
  };

  return (
    <div
      className="folder-container"
      id="folder-container"
      onClick={() => setAnchorPoint(null)}
      onContextMenu={handleContextMenu}
      onDoubleClick={handleLinkToExam}
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
        {AnchorPoint && (
          <div
            className="contextMenu"
            style={{ left: AnchorPoint.x || 0, top: AnchorPoint.y || 0 }}
          >
            <p className="popper-item">Share exam</p>
          </div>
        )}
        <React.Fragment>
          {!DeleteMode ? (
            <img
              className="deleteIcon deleteButton"
              src="/static/icons/ban.png"
              alt="Icon delete"
              onClick={handleDeleteEvents}
            />
          ) : (
            <p className="folder-name-input deleteButton" onClick={handleDeleteEvents}>
              Ready?
            </p>
          )}
          <p className="folder-name-input" style={{ marginBottom: 0 }}>
            {name.length > 17 ? `${name.substring(0, 17)}...` : name}
          </p>
        </React.Fragment>
      </div>
    </div>
  );
}
