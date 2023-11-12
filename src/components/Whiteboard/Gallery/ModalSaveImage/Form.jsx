import React, { useState, useRef, useEffect } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

import {
  CREATE_EVALUATION,
  UPDATE_EVALUATION,
  UPDATE_FILE
} from '../../graphQL/mutations';
import { useCreateFile } from '../../hooks/useCreateFile';
import { EVALUATIONS_BY_STUDENTS } from '../../graphQL/queries';
import { useMutation, useQuery } from '@apollo/client';

import { setCanvasImage } from '../../../../store/actions/WhiteBoardActions';
import { useUser } from '../../../UserManagment/UserProvider';
import { S3Service } from '../../../../services/S3.service';
import Spinner from 'react-bootstrap/Spinner';
import Skills from './Skills';
import { Popper } from '@material-ui/core';
import { USER_ROLES } from 'enums/constants.enum';
import { useUserRole } from 'services/cognito.service';
import StudentsPopper from '../components/studentsPopper';
import dropdownIcon from '../assets/drop_down_menu_icon.svg';
import ArrowIcon from '../../../../assets/up arrow clock.svg';

const Form = ({
  file,
  closeModal,
  savedFile,
  setOpenForm,
  setCanvasImage,
  page,
  updateImage
}) => {
  const evaluationFields = [
    { field: 'student', required: false },
    { field: 'no', required: false },
    { field: 'date', required: false },
    { field: 'name', required: false },
    { field: 'process', required: false },
    { field: 'score', required: false }
  ];
  const currentDate = moment().format('MM-DD-YYYY');
  const s3Service = new S3Service('public', 'image/png');
  const formRef = useRef('');
  const [anchorEl, setanchorEl] = useState(false);
  const [PopperLoading, setpopperLoading] = useState(false);
  const userRole = useUserRole();

  const { user } = useUser();
  const [loading, setLoading] = useState(false);
  const [evaluation, setEvaluation] = useState({
    no: '',
    date: currentDate,
    name: '',
    process: '',
    score: ''
  });
  const [skills, setSkills] = useState(null);
  const [formError, setFormError] = useState('');

  const { createFile } = useCreateFile();
  const [createEvaluation] = useMutation(CREATE_EVALUATION);
  const [updateEvaluation] = useMutation(UPDATE_EVALUATION);
  const [updateFile] = useMutation(UPDATE_FILE);
  const [StudentSelected, setStudentSelected] = useState(null);

  const {
    loading: queryLoading,
    error,
    data: evaluationsData
  } = useQuery(EVALUATIONS_BY_STUDENTS, {
    variables: { studentId: user.attributes.sub },
    fetchPolicy: 'network-only'
  });

  const saveEvaluation = newEvaluation =>
    setEvaluation({
      ...evaluation,
      [newEvaluation.name]: newEvaluation.value
    });

  const getEvaluationByFileId = fileId => {
    const evaluations = evaluationsData.evaluationsByStudents.items;
    return evaluations.find(eva => eva.file?.id === fileId) || null;
  };

  const saveBranak = async (evt, updateF) => {
    evt.preventDefault();
    setLoading(true);

    if (!formError) {
      try {
        // Create or update file in S3
        const { fileUrl } = await s3Service.uploadImage(file);

        let evaluationInput = null;

        let fileInput = {
          userId: StudentSelected ? StudentSelected.id : user.attributes.sub,
          name: file.name,
          url: fileUrl,
          mode: 'file',
          currentFolder: StudentSelected
            ? 'default'
            : window.sessionStorage.getItem('currentFileLocation') || 'default'
        };

        // Create new file in DynamoDB
        let fileData;
        if (!updateF) {
          const { data } = await createFile({ variables: fileInput });
          fileData = data;
        } else {
          fileInput = {
            ...fileInput,
            id: file?.id,
            userId: user.attributes.sub
          };
          const { data } = await updateFile({ variables: fileInput });
          if (StudentSelected) {
            delete fileInput.id;
            fileInput = {
              ...fileInput,
              userId: StudentSelected.id
            };
            await createFile({ variables: fileInput });
          }

          fileData = data;
        }

        // Save file in store
        // commented becaouse this removes the image, and that is not the way.
        // if this make an issue in another place, it will be in investigation.
        // setCanvasImage({
        //   image: { ...fileData.createFile },
        //   page
        // });

        evaluationInput = {
          fileId: fileData.createFile ? fileData.createFile.id : file.id,
          studentId: user.attributes.sub
        };

        evaluationInput = {
          ...evaluationInput,
          no: evaluation.no || getNextNro(),
          name: evaluation.name,
          process: evaluation.process,
          score: Number(evaluation.score),
          date: evaluation.date || currentDate
        };

        if (skills) {
          let inputSkills = {};

          Object.keys(skills).forEach(key => {
            inputSkills[key] = Number(skills[key]);
          });

          evaluationInput.skills = inputSkills;
        }

        // Create or update evaluation in DynamoDB
        let evaluationData = null;
        const evaluationByFile = file?.id ? getEvaluationByFileId(file?.id) : null;

        if (evaluationByFile) {
          const { data: mutation } = await updateEvaluation({
            variables: { id: evaluationByFile?.id, ...evaluationInput }
          });
          evaluationData = mutation.updateEvaluation;
        } else {
          const { data: mutation } = await createEvaluation({
            variables: evaluationInput
          });
          evaluationData = mutation.createEvaluation;
        }

        console.log('Saved Evaluation: ', evaluationData?.id);

        window.sessionStorage.setItem('isNewWhiteboardModification', 'false');
        window.sessionStorage.setItem('storedUploadedImage', 'false');
        savedFile();
        closeModal();
      } catch (error) {
        console.error('ERROR-SAVE-EVALUATION ->', error.message);
        alert('Error saving evaluation');
      }
    } else alert('The name already exists');

    setLoading(false);
  };

  const getNextNro = () => {
    const evaluations = evaluationsData.evaluationsByStudents.items;
    return (evaluations.length + 1).toString();
  };

  useEffect(() => {
    if (evaluationsData) {
      const evaluationByFile = file.id ? getEvaluationByFileId(file.id) : null;

      if (evaluationByFile) {
        setEvaluation({
          no: evaluationByFile.no,
          date: currentDate,
          name: evaluationByFile.name,
          process: evaluationByFile.process,
          score: evaluationByFile.score || ''
        });

        if (evaluationByFile.skills) setSkills({ ...evaluationByFile.skills });
      } else {
        saveEvaluation({
          name: 'no',
          value: getNextNro()
        });
      }
    }
  }, [evaluationsData]);

  useEffect(() => {
    if (evaluation.name) {
      const evaluations = evaluationsData.evaluationsByStudents.items;
      const matchedName = evaluations.find(
        eva => eva.name === evaluation.name && eva.file?.id !== file.id
      );

      if (matchedName) setFormError('name');
      else setFormError('');
    }
  }, [evaluation.name]);

  const upNumberInput = id => {
    const element = document.getElementById(id);
    const base = element.value === '' ? 0 : parseInt(element.value);
    element.value = base + 1;
  };

  const downNumberInput = id => {
    const element = document.getElementById(id);
    const base = element.value === '' ? 0 : parseInt(element.value);
    element.value = base - 1;
  };

  if (error) {
    console.error('ERROR-GET-EVALUATIONS ->', error.message);
    alert('Error getting data');
  }

  if (queryLoading) {
    return (
      <div className="bran-loading">
        <Spinner animation="border" />
      </div>
    );
  }

  return (
    <div className="form-container">
      <form
        ref={formRef}
        style={{ width: '100%', height: '300px' }}
        onSubmit={e => saveBranak(e, updateImage)}
      >
        {evaluationFields.map((item, i) => (
          <div className="inputAndLabel" key={i}>
            <label
              style={{ fontWeight: 'bold', fontFamily: 'Roboto, sans-serif' }}
              htmlFor={item.field}
            >
              {item.field === 'no' ? `${item.field}.` : item.field}
            </label>

            <Popper
              open={Boolean(anchorEl)}
              anchorEl={anchorEl}
              placement="bottom"
              style={{
                zIndex: 1060,
                width: document.getElementById('studentinput')?.offsetWidth
              }}
            >
              <StudentsPopper
                updateLoading={e => setpopperLoading(e)}
                Spinner={Spinner}
                callback={e => {
                  setStudentSelected(e);
                  setanchorEl(null);
                }}
              />
            </Popper>
            {item.field !== 'student' ? (
              <>
                <input
                  id={item.field}
                  className={[
                    window.classnames({ error: formError === item.field }),
                    ''
                  ].join(' ')}
                  type={item.field === 'score' ? 'number' : 'text'}
                  name={item.field}
                  value={evaluation[item.field]}
                  onChange={e => saveEvaluation(e.target)}
                  min="1"
                  style={{ fontWeight: 'bold', fontFamily: 'Roboto, sans-serif' }}
                  max={item.field === 'score' ? '100' : ''}
                  required={item.required}
                  disabled={loading}
                />
                {item.field === 'score' && (
                  <div className="input-number-arrows">
                    <img
                      src={ArrowIcon}
                      alt="arrow_up_icon"
                      width={10}
                      height={10}
                      onClick={() => upNumberInput(item.field)}
                    />
                    <img
                      src={ArrowIcon}
                      alt="arrow_up_icon"
                      width={10}
                      height={10}
                      style={{ transform: 'rotateZ(180deg)' }}
                      onClick={() => downNumberInput(item.field)}
                    />
                  </div>
                )}
              </>
            ) : (
              <React.Fragment>
                {[USER_ROLES.TEACHERS].includes(userRole) ? (
                  <div
                    className="studentPopper"
                    id="studentinput"
                    onClick={e => {
                      const div = document.getElementById('studentinput');
                      if ([USER_ROLES.TEACHERS].includes(userRole))
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
                        {StudentSelected
                          ? `${StudentSelected.name.substring(0, 20)}...`
                          : 'No Selected...'}
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
                    <img
                      src={dropdownIcon}
                      style={{ width: 15, height: 15, marginRight: 5 }}
                      alt="drop_down_icon"
                    />
                  </div>
                ) : (
                  <div className="studentPopper">
                    <p>
                      {user.attributes.name.substring(0, 20)}
                      {user.attributes.name.length > 20 ? '...' : ''}
                    </p>
                  </div>
                )}
              </React.Fragment>
            )}
          </div>
        ))}

        {evaluation.no && (
          <Skills
            skills={skills}
            setSkills={setSkills}
            loading={loading}
            formRef={formRef}
          />
        )}

        <div className="options">
          <button
            className="text-left"
            style={{
              fontWeight: '400',
              margin: '0px 20px',
              fontFamily: 'Roboto, sans-serif',
              color: '#0000ff'
            }}
            type="button"
            onClick={() => {
              setOpenForm(false);
            }}
          >
            Back
          </button>

          <button
            className="text-right"
            style={{
              fontWeight: '400',
              margin: '0px 20px',
              fontFamily: 'Roboto, sans-serif',
              color: '#0000ff'
            }}
            type="submit"
          >
            {loading ? <Spinner className="bran-spinner" animation="border" /> : 'Save'}
          </button>
        </div>
      </form>
    </div>
  );
};

const mapStateToProps = ({ whiteBoard }) => ({
  page: whiteBoard.page
});

const mapDispatchToProps = dispatch => {
  return {
    setCanvasImage(image) {
      dispatch(setCanvasImage(image));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Form);
