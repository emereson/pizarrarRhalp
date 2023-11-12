import { Popper } from '@material-ui/core';
import { ChevronLeft } from '@material-ui/icons';
import TeachersPopper from 'components/Exam/components/teachersPopper/teachersPopper';
import { useUser } from 'components/UserManagment/UserProvider';
import React, { useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';
import Spinner from 'react-bootstrap/Spinner';
import { useCreateFile } from 'components/Whiteboard/hooks/useCreateFile';
import './ModalSaveExam.scss';
import { useCallback } from 'react';

export default function ModalSaveExam({
  show,
  onHide,
  setSavingInGallery,
  colorScheme,
  examId,
  duplicateExam,
  color
}) {
  const [PopperLoading, setpopperLoading] = useState(false);
  const [anchorEl, setanchorEl] = useState(null);
  const [UserSelected, setUserSelected] = useState(null);
  const { user } = useUser();
  const [loading, setloading] = useState(false);
  const [ExamName, setExamName] = useState(examId);
  const { createFile } = useCreateFile();
  const [Error, setError] = useState(null);

  useEffect(() => {
    setUserSelected(null);
  }, [show]);

  const setMsgError = msg => {
    setError(msg);
    setTimeout(() => {
      setError(null);
    }, 3000);
  };

  const functionDuplicate = useCallback(() => {
    let fileInput;
    setTimeout(() => {
      setloading(false);
      setMsgError(
        'There was an error, or the exam that you want to create already exists.'
      );
    }, 10000);
    duplicateExam(ExamName.replaceAll(' ', '_'))
      .then(async examId => {
        if (UserSelected) {
          fileInput = {
            userId: UserSelected?.id,
            name: 'Exam: ' + examId,
            url: 'null',
            mode: 'exam',
            currentFolder: 'default'
          };
        } else {
          fileInput = {
            userId: user.attributes.sub,
            name: 'Exam: ' + examId,
            url: 'null',
            mode: 'exam',
            currentFolder: 'default'
          };
        }

        try {
          // Create new file in DynamoDB
          const { data: fileData } = await createFile({ variables: fileInput });
          if (fileData) {
            setloading(false);
            setanchorEl(null);
            onHide();
          }
        } catch (error) {
          setloading(false);
          setanchorEl(null);
          onHide();
        }
      })
      .catch(err => {
        console.error(err);
        setloading(false);
        setanchorEl(null);
        onHide();
      });
  }, [duplicateExam, UserSelected, ExamName]);

  const saveTheExam = useCallback(async () => {
    setloading(true);
    let fileInput;

    if (ExamName !== examId) {
      if (ExamName.length >= 5) {
        functionDuplicate();
      }
    } else {
      if (UserSelected) {
        fileInput = {
          userId: UserSelected?.id,
          name: 'Exam: ' + examId,
          url: 'null',
          mode: 'exam',
          currentFolder: 'default'
        };
      } else {
        fileInput = {
          userId: user.attributes.sub,
          name: 'Exam: ' + examId,
          url: 'null',
          mode: 'exam',
          currentFolder: 'default'
        };
      }

      try {
        // Create new file in DynamoDB
        const { data: fileData } = await createFile({ variables: fileInput });
        if (fileData) {
          setloading(false);
          setanchorEl(null);
          onHide();
        }
      } catch (error) {
        setloading(false);
        setanchorEl(null);
        onHide();
      }
    }
  }, [ExamName, examId, createFile]);

  return (
    <Modal
      className="modal-save"
      show={show}
      onHide={onHide}
      backdrop={'static'}
      aria-label="contained-modal-title-vcenter"
      centered
    >
      <Modal.Body>
        <div
          className="modal-save-exam"
          style={{ background: colorScheme === 'dark' ? '#77ff9080' : '#b8b8b87a' }}
        >
          <div className="form-container">
            <form onSubmit={e => e.preventDefault()}>
              <Popper
                open={Boolean(anchorEl)}
                anchorEl={anchorEl}
                placement="bottom"
                style={{
                  zIndex: 1060,
                  width: document.getElementById('teacherSelectorInput')?.offsetWidth
                }}
              >
                <TeachersPopper
                  updateLoading={e => setpopperLoading(e)}
                  color={colorScheme}
                  Spinner={Spinner}
                  onTeacherSelected={e => {
                    setUserSelected(e);
                    setanchorEl(null);
                  }}
                />
              </Popper>
              <div className="inputAndLabel">
                <label
                  style={{
                    fontWeight: 'bold',
                    fontFamily: 'Roboto, sans-serif',
                    marginBottom: 0
                  }}
                >
                  Exam name
                </label>
                <input
                  id={'examName'}
                  className={window.classnames({ error: false })}
                  type={'text'}
                  name={'examName'}
                  defaultValue={examId}
                  onChange={e => setExamName(e.target.value)}
                  min="1"
                  style={{
                    fontWeight: 'bold',
                    fontFamily: 'Roboto, sans-serif',
                    maxWidth: '70%',
                    fontSize: '1.3rem',
                    color: '#212529'
                  }}
                  disabled={loading}
                />
              </div>
              <div className="inputAndLabel">
                <label
                  style={{
                    fontWeight: 'bold',
                    fontFamily: 'Roboto, sans-serif',
                    marginBottom: 0
                  }}
                >
                  Teacher to save
                </label>

                <div
                  className="studentPopper"
                  id="teacherSelectorInput"
                  onClick={e => {
                    const div = document.getElementById('teacherSelectorInput');
                    setanchorEl(Boolean(anchorEl) ? null : div);
                  }}
                >
                  {!PopperLoading ? (
                    <p
                      style={{
                        fontWeight: 'bold',
                        fontFamily: 'Roboto, sans-serif'
                      }}
                    >
                      {UserSelected
                        ? `${UserSelected.name.substring(0, 20)}...`
                        : 'Save to yourself...'}
                    </p>
                  ) : (
                    <p
                      style={{
                        width: '80%',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center'
                      }}
                    >
                      <Spinner
                        className="bran-spinner"
                        style={{ margin: '0 auto' }}
                        animation="border"
                      />
                    </p>
                  )}
                  <ChevronLeft
                    style={{ color: '#212529', transform: 'rotateZ(-90deg)' }}
                  />
                </div>
              </div>
              {Error && (
                <div className="error">
                  <label className="errortag">{Error}</label>
                </div>
              )}
            </form>
            <div className="options">
              <button
                className="text-left"
                style={{ fontWeight: 'bold', fontFamily: 'Roboto, sans-serif' }}
                type="button"
                onClick={() => {
                  setanchorEl(null);
                  setUserSelected(null);
                  setloading(false);
                  onHide();
                }}
              >
                Back
              </button>

              {loading ? (
                <Spinner className="bran-spinner" animation="border" />
              ) : (
                <button
                  className="text-right"
                  style={{ fontWeight: 'bold', fontFamily: 'Roboto, sans-serif' }}
                  onClick={saveTheExam}
                >
                  Save
                </button>
              )}
            </div>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}
