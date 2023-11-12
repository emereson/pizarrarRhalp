import Card from 'react-bootstrap/Card';
import Accordion from 'react-bootstrap/Accordion';
import Button from 'react-bootstrap/Button';
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

const styles = css`
  border: 1px solid rgba(0, 0, 0, 0.5);
  border-radius: 0;
  .card-header {
    border: none;
  }
  .title,
  .upper-title {
    text-transform: capitalize;
  }
  .btn:focus {
    outline: none;
    box-shadow: none;
  }
  .upper-title {
    position: absolute;
    left: 3px;
    top: 0px;
    font-size: 1.1rem;
  }
  .upper-icon {
    position: absolute;
    top: 9px;
    right: 6px;
  }
`;

const AccordionItem = ({
  accordionBody,
  bodyBg,
  eventKey,
  headerBg,
  headerColor,
  iconTeacherStudent,
  onDoubleClick,
  title,
  upperTitle
}) => {
  const style = {
    width: '30px',
    height: '30px'
  };
  return (
    <Card css={styles} className="text-center">
      <Card.Header
        onDoubleClick={onDoubleClick}
        className="header"
        css={css`
          background-color: ${bodyBg};
          .title,
          .upper-title {
            color: ${headerColor};
          }
        `}
      >
        <span className="upper-title">
          <b>{upperTitle}</b>
        </span>
        <Accordion.Toggle
          as={Button}
          variant="link"
          eventKey={eventKey}
          className="title"
        >
          <b>{title}</b>
        </Accordion.Toggle>
        <span className="upper-icon">
          {iconTeacherStudent === 'TEACHER' ? (
            <img src={'/static/svg/teacher.svg'} alt={'TEACHER'} style={style} />
          ) : (
            <></>
          )}
        </span>
      </Card.Header>
      <Accordion.Collapse eventKey={eventKey}>
        <Card.Body
          css={css`
            padding: ${accordionBody ? '0' : '1.25rem'};
            height: ${accordionBody ? 'initial' : '48px'};
            border-top: ${accordionBody ? 'initial' : '1px solid rgba(0,0,0,0.5);'};
            background-color: ${headerBg};
          `}
        >
          {accordionBody}
        </Card.Body>
      </Accordion.Collapse>
    </Card>
  );
};

export default AccordionItem;
