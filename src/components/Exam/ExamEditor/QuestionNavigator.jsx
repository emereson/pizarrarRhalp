import CrystalButton from 'components/common/CrystalButton';
import { useColorScheme } from '../hooks/useColorScheme';
import RightIconFill from './assets/img/right-arrow-fill.svg';
import RightIcon from './assets/img/right-arrow.svg';
import LeftIcon from './assets/img/left-arrow.svg';
import UpIcon from './assets/img/up-arrow.svg';
import DownIcon from './assets/img/down-arrow.svg';
import RightIconBlack from './assets/img/right-arrow_black.svg';
import LeftIconBlack from './assets/img/left-arrow_black.svg';
import UpIconBlack from './assets/img/up-arrow_black.svg';
import DownIconBlack from './assets/img/down-arrow_black.svg';
import DownIconFill from './assets/img/down-arrow-fill.svg';

function QuestionNavigator({
  getPrevExamSection,
  getPreviousQuestion,
  creatingQuestion,
  getNextQuestion,
  willCreateQuestion,
  creatingExamSection,
  getNextExamSection,
  willCreateSection
}) {
  const { CurrentColor } = useColorScheme();
  return (
    <div className="question-navigator ">
      <CrystalButton
        type="button"
        onClick={getPrevExamSection}
        customStyles={{ padding: '0px' }}
        className="mr-auto"
      >
        <img
          className="navigation-arrows-horizontal"
          src={CurrentColor == 'dark' ? LeftIcon : LeftIconBlack}
          alt="previous question"
          title="previous question"
        />
      </CrystalButton>
      <div className="up-down">
        <CrystalButton
          type="button"
          onClick={getPreviousQuestion}
          className="ml-auto"
          customStyles={{ paddinBottom: '10px' }}
        >
          <img
            className="up navigation-arrows-vertical"
            src={CurrentColor == 'dark' ? UpIcon : UpIconBlack}
            alt={'prev subquestion'}
            title={'prev subquestion'}
          />
        </CrystalButton>
        <CrystalButton
          type="button"
          disabled={creatingQuestion}
          onClick={getNextQuestion}
          className="ml-auto "
          customStyles={{ paddinBottom: '10px' }}
        >
          <img
            className="down navigation-arrows-vertical"
            src={
              willCreateQuestion
                ? DownIconFill
                : CurrentColor === 'dark'
                ? DownIcon
                : DownIconBlack
            }
            alt={willCreateQuestion ? 'Create question' : 'next question'}
            title={willCreateQuestion ? 'Create question' : 'next question'}
          />
        </CrystalButton>
      </div>
      <CrystalButton
        type="button"
        disabled={creatingExamSection}
        onClick={getNextExamSection}
        className="ml-auto"
        customStyles={{ padding: '0px' }}
      >
        <img
          className="navigation-arrows-horizontal"
          src={
            willCreateSection
              ? RightIconFill
              : CurrentColor === 'dark'
              ? RightIcon
              : RightIconBlack
          }
          alt={willCreateSection ? 'Create section' : 'next section'}
          title={willCreateSection ? 'Create section' : 'next section'}
        />
      </CrystalButton>
    </div>
  );
}

export default QuestionNavigator;
