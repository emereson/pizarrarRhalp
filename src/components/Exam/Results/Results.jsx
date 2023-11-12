import { useLoadExam } from '../hooks/useLoadExam';
import { useEditFeedback } from '../ExamEditor/hooks/useEditFeedback';
import { useParams } from 'react-router-dom';
import './styles.scss';
import { useEffect, useMemo } from 'react';
import Tachometer from 'components/common/Tachometer';
import InstaImage from 'assets/icons/instagram-logo.png';
import MessengerImage from 'assets/icons/messenger-logo.png';
import PhoneImage from 'assets/icons/phone-icon.png';
import wsImage from 'assets/icons/whatsapp-logo.png';
import LoadingSpinner from 'components/common/LoadingSpinner';

const getEnglishLevel = percentage => {
  if (percentage >= 0 && percentage <= 15) {
    return 'Básico A1';
  }
  if (percentage > 15 && percentage <= 30) {
    return 'Básico A2';
  }
  if (percentage > 30 && percentage <= 45) {
    return 'Intermedio B1';
  }
  if (percentage > 45 && percentage <= 60) {
    return 'Intermedio B2';
  }
  if (percentage > 60 && percentage <= 75) {
    return 'Intermedio C1';
  }
  if (percentage > 75 && percentage <= 90) {
    return 'Avanzado C2';
  }
  if (percentage > 90 && percentage <= 100) {
    return 'Avanzado C2+';
  }
};

const getQuestionList = questionList => {
  let result = questionList.split(',');
  result = result.map(questionNumber => parseInt(questionNumber));
  result = result.filter(questionNumber => !isNaN(questionNumber));
  return result;
};

function Results() {
  const { examId } = useParams();
  const {
    examData: { results, totalQuestions, examColorScheme },
    loadingExam
  } = useLoadExam(examId);
  const {
    feedbackState: { score, correct, incorrect, ranks, selectedEvaluations }
  } = useEditFeedback(examId);

  const correctQuestions = Object.values(results).filter(question => question.isCorrect);
  const correctQuestionsNums = correctQuestions.map(question => question.questionNumber);
  const inCorrectQuestions = Object.values(results).filter(
    question => !question.isCorrect
  );
  const inCorrectQuestionsNums = inCorrectQuestions.map(
    question => question.questionNumber
  );
  const correctPercentage = ((correctQuestions.length / totalQuestions) * 100).toFixed(2);

  const rankFeedback = useMemo(() => {
    // feedback type rank must be selected in the exam editor
    //  if (!selectedEvaluations.has('rank')) return null;
    const rank = ranks.find(
      rank =>
        correctPercentage >= parseInt(rank.minRange) &&
        correctPercentage <= parseInt(rank.maxRange) &&
        rank.isActive
    );
    if (rank) {
      return rank.text;
    }
    return null;
  }, [correctPercentage, ranks]);

  const scoreFeedback = useMemo(() => {
    // feedback type rank must be selected in the exam editor
    // if (!selectedEvaluations.has('score')) return null;
    if (
      correctPercentage >= parseInt(score.min) &&
      correctPercentage <= parseInt(score.max)
    ) {
      return score.feedback;
    }
    return null;
  }, [correctPercentage, score.feedback, score.max, score.min]);

  const correctFeedback = useMemo(() => {
    // feedback type correct must be selected in the exam editor
    //  if (!selectedEvaluations.has('correct')) return null;
    let { correctList, feedback } = correct;
    correctList = correctList ?? '';
    const questionsList = getQuestionList(correctList);
    // check if the user answered correctly any of the questions in the correct feedback
    const match = questionsList.some(questionNumber =>
      correctQuestionsNums.includes(questionNumber)
    );
    if (match) return feedback;
    return null;
  }, [correct, correctQuestionsNums]);

  const inCorrectFeedback = useMemo(() => {
    // feedback type correct must be selected in the exam editor
    //  if (!selectedEvaluations.has('incorrect')) return null;
    let { incorrectList, feedback } = incorrect;
    incorrectList = incorrectList ?? '';
    const questionsList = getQuestionList(incorrectList);
    // check if the user answered correctly any of the questions in the correct feedback
    const match = questionsList.some(questionNumber =>
      inCorrectQuestionsNums.includes(questionNumber)
    );
    if (match) return feedback;
    return null;
  }, [inCorrectQuestionsNums, incorrect]);

  return (
    <section className="results">
      {loadingExam ? (
        <div className="loading-container">
          <LoadingSpinner customClasses="m-auto" />
        </div>
      ) : (
        <>
          <section className={'results__header '}>
            <div className="tachometer-replacement">
              {totalQuestions && (
                <div className={'tachometer'}>
                  <Tachometer
                    questions={totalQuestions}
                    correctQuestions={(correctPercentage / 100) * totalQuestions}
                    examColorScheme={examColorScheme}
                    width={'100%'}
                    containerWidth={'10%'}
                    height={'200px'}
                  />
                </div>
              )}
            </div>
            <div className="header-labels">
              <h1 className="twinkleText">RESULT</h1>
              <div className="results__score">
                <p>{correctPercentage}</p>/100
              </div>
            </div>
          </section>
          <section className="results__feedback">
            <div className={'sections' + '__' + examColorScheme}>
              <p>
                <strong className="text-color-blue text-color-blue-font-reduced">
                  {' '}
                  Tu nivel de ingles es:{' '}
                </strong>
                <p className="text-color-blue-font-reduced" style={{ color: 'black' }}>
                  {getEnglishLevel(correctPercentage)}
                </p>
              </p>
              <p>
                <strong className="text-color-blue text-color-blue-font-reduced">
                  Observación importante:{' '}
                </strong>{' '}
                <p className="text-color-blue-font-reduced">{rankFeedback}</p>
              </p>
            </div>
            <div className={'sections' + '__' + examColorScheme + ' suggestions'}>
              <p
                className="text-color-blue text-color-blue-font-reduced"
                style={{ margin: '5px 0 20px 0' }}
              >
                <strong>Que puedes hacer?</strong>
              </p>
              <div className="tag">
                <p className="stroke">-</p>
                <p className="text-color-blue-font-reduced">
                  Debes tomar clases de inglés que incluyan fonetica intensiva
                </p>
              </div>
              <div className="tag">
                <p className="stroke">-</p>
                <p className="text-color-blue-font-reduced">
                  Tus clases deben ser personalizadas e individuales, por lo menos al
                  principio
                </p>
              </div>
              <div className="tag" id="tag-3">
                <p className="stroke">-</p>
                <p className="text-color-blue-font-reduced">
                  Tu profesor debe ser un hablante nativo
                </p>
              </div>
              <div className="tag">
                <p className="stroke">-</p>
                <p className="text-color-blue-font-reduced">
                  Tu profesor debe ser un fonetista {'(experto en fonetica inglesa)'}
                </p>
              </div>
              <div className="tag">
                <p className="stroke">-</p>
                <p className="text-color-blue-font-reduced">
                  Tu profesor deberia dominar tu idioma nativo para comprenderte mejor
                </p>
              </div>
            </div>
            <p className="social-feedback-title">Donde consigues este tipo de clase?</p>
            <div className="results__social">
              <div className="results__social__container">
                <a href="https://www.instagram.com/evely_pascal/">
                  <img src={InstaImage} alt="insta" className="social-icon" />
                </a>
                <a href="https://www.facebook.com/soleh.hodge">
                  <img src={MessengerImage} alt="ms" className="social-icon" />
                </a>
                <a href="https://wa.me/message/XAXGBVNBJM25F1">
                  <img src={wsImage} alt="ws" className="ws" />
                </a>
                <a className="pn" href="tel:+584241613016">
                  <img src={PhoneImage} alt="pn" className="icon" />
                </a>
              </div>
            </div>
          </section>
        </>
      )}
    </section>
  );
}

export default Results;
