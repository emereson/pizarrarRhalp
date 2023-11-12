import React, { useState, useEffect, useRef } from 'react';

import Accordion from 'react-bootstrap/Accordion';
import ArrowIcon from '../../../../assets/up arrow clock.svg';

const Skills = ({ skills, setSkills, loading, formRef }) => {
  const skillList = ['listenning', 'speaking', 'writting', 'reading'];

  const accordionToggleRef = useRef('');
  const [deployed, setDeployed] = useState(false);

  const saveSkill = newSkill => {
    setSkills({
      ...skills,
      [newSkill.name]: newSkill.value
    });
  };

  const upNumberInput = id => {
    const element = document.getElementById(id);
    const base = element.value === '' ? 0 : parseInt(element.value);
    element.value = base + 1;
    saveSkill(element);
  };

  const downNumberInput = id => {
    const element = document.getElementById(id);
    const base = element.value === '' ? 0 : parseInt(element.value);
    element.value = base - 1;
    saveSkill(element);
  };

  const accordionToggle = () => {
    if (deployed) {
      skillList.forEach(item => {
        formRef.current[item].value = '';
      });
      setSkills({
        listenning: '',
        speaking: '',
        writting: '',
        reading: ''
      });
    }

    setDeployed(!deployed);
  };

  // MOUNTED
  useEffect(() => {
    if (skills) {
      skillList.forEach(item => {
        formRef.current[item].value = skills[item];
      });

      setSkills(skills);
      setDeployed(true);
      accordionToggleRef.current.click();
    }
  }, []);

  return (
    <Accordion>
      <Accordion.Collapse eventKey="0">
        <React.Fragment>
          {skillList.map((item, i) => (
            <div className="input-skill" key={i}>
              <label style={{ fontWeight: 'bold' }} htmlFor={item}>
                {item}
              </label>
              <input
                type="number"
                id={item}
                value={skills ? skills[item] : ''}
                name={item}
                onChange={e => saveSkill(e.target)}
                min="0"
                max="100"
                required={deployed}
                disabled={loading}
              />
              <div className="input-number-arrows">
                <img
                  src={ArrowIcon}
                  alt="arrow_up_icon"
                  width={10}
                  height={10}
                  onClick={() => upNumberInput(item)}
                />
                <img
                  src={ArrowIcon}
                  alt="arrow_up_icon"
                  width={10}
                  height={10}
                  style={{ transform: 'rotateZ(180deg)' }}
                  onClick={() => downNumberInput(item)}
                />
              </div>
            </div>
          ))}
        </React.Fragment>
      </Accordion.Collapse>

      <Accordion.Toggle
        ref={accordionToggleRef}
        className={loading ? 'disabled' : ''}
        variant="link"
        eventKey="0"
        onClick={() => accordionToggle()}
        disabled={loading}
      >
        <div style={{ marginTop: '15px' }}>
          {deployed ? (
            <img src="/static/icons/minus.svg" alt="Icono menos" />
          ) : (
            <img src="/static/icons/plus.svg" alt="Icono mas" />
          )}
        </div>
      </Accordion.Toggle>
    </Accordion>
  );
};

export default Skills;
