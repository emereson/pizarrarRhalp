import { useReducer, useEffect } from 'react';
import { useLoadExam } from '../../hooks/useLoadExam';
import { feedbackEditingValuesVar } from '../../typePolicies';

const FEEDBACK_INITIAL_STATE = {
  score: {
    min: 0,
    max: 0,
    feedback: ''
  },
  correct: {
    correctList: '',
    feedback: ''
  },
  incorrect: {
    incorrectList: '',
    feedback: ''
  },
  ranks: Array(7).fill({
    minRange: '',
    maxRange: '',
    text: '',
    isActive: false
  }),
  selectedEvaluations: new Set()
};

function feedBackReducer(feedbackState, action) {
  switch (action.type) {
    case 'init': {
      return action.payload;
    }
    case 'score-min': {
      return {
        ...feedbackState,
        score: {
          ...feedbackState.score,
          min: action.payload
        }
      };
    }
    case 'score-max': {
      return {
        ...feedbackState,
        score: {
          ...feedbackState.score,
          max: action.payload
        }
      };
    }
    case 'score-feedback': {
      return {
        ...feedbackState,
        score: {
          ...feedbackState.score,
          feedback: action.payload
        }
      };
    }
    case 'correct-list': {
      return {
        ...feedbackState,
        correct: {
          ...feedbackState.correct,
          correctList: action.payload
        }
      };
    }
    case 'correct-feedback': {
      return {
        ...feedbackState,
        correct: {
          ...feedbackState.correct,
          feedback: action.payload
        }
      };
    }
    case 'incorrect-list': {
      return {
        ...feedbackState,
        incorrect: {
          ...feedbackState.incorrect,
          incorrectList: action.payload
        }
      };
    }
    case 'incorrect-feedback': {
      return {
        ...feedbackState,
        incorrect: {
          ...feedbackState.incorrect,
          feedback: action.payload
        }
      };
    }
    case 'rank-feedback': {
      const { value, idx } = action.payload;
      const { ranks } = feedbackState;
      const rank = ranks[idx];
      const newRank = { ...rank, text: value };
      ranks[idx] = newRank;
      return {
        ...feedbackState,
        ranks
      };
    }
    case 'rank-range': {
      const { value, idx, type } = action.payload;
      const { ranks } = feedbackState;
      const rank = ranks[idx];
      const key = type === 'min' ? 'minRange' : 'maxRange';
      const newRank = { ...rank, ...{ [key]: value } };
      ranks[idx] = newRank;
      return {
        ...feedbackState,
        ranks
      };
    }
    case 'select-evaluation': {
      const selectedEvaluations = new Set([...feedbackState.selectedEvaluations]);
      const { name, checked } = action.payload;
      checked ? selectedEvaluations.add(name) : selectedEvaluations.delete(name);
      return {
        ...feedbackState,
        selectedEvaluations: selectedEvaluations
      };
    }
    case 'toggle-rank': {
      return {
        ...feedbackState,
        ranks: action.payload
      };
    }
    default: {
      throw new Error(action.type + 'not implemented');
    }
  }
}

const initFeedback = feedback => {
  if (!feedback) return FEEDBACK_INITIAL_STATE;
  return {
    score: {
      min: feedback.minScore,
      max: feedback.maxSCore,
      feedback: feedback.scoreFeedback
    },
    correct: {
      correctList: feedback.correctAnswers,
      feedback: feedback.correctAnswersFeedback
    },
    incorrect: {
      incorrectList: feedback.inCorrectAnswers,
      feedback: feedback.inCorrectAnswersFeedback
    },
    ranks: feedback.ranks ? JSON.parse(feedback.ranks) : FEEDBACK_INITIAL_STATE.ranks,
    selectedEvaluations: new Set(feedback.selectedEvaluations)
  };
};

function useEditFeedback(examId) {
  const [feedbackState, dispatch] = useReducer(feedBackReducer, null, initFeedback);
  const { examData, loadingExam } = useLoadExam(examId);

  /** Load feedback from backend */
  useEffect(() => {
    if (!loadingExam) {
      dispatch({ type: 'init', payload: initFeedback(examData) });
    }
  }, [examData, loadingExam]);
  /** keep reactive var in sync */
  useEffect(() => {
    feedbackEditingValuesVar(feedbackState);
  });

  function isNumber(text) {
    if (text === '') return true;
    const re = /^[0-9\b]+$/;
    return re.test(text);
  }

  function handleScoreChange(event) {
    const { name, value } = event.target;

    if (value === '') {
      dispatch({ type: `score-${name}`, payload: null });
    } else if (isNumber(value)) {
      const intValue = parseInt(value);
      dispatch({ type: `score-${name}`, payload: intValue });
    }
  }

  function handleFeedbackChange(event) {
    const { name, value } = event.target;
    dispatch({ type: `${name}-feedback`, payload: value });
  }

  function handleRankChange(event) {
    const { name: idx, value } = event.target;
    dispatch({ type: `rank-feedback`, payload: { value, idx } });
  }

  function handleRankRangeChange(event, idx, type) {
    const { value } = event.target;
    if (!isNumber(value)) return;
    dispatch({ type: `rank-range`, payload: { value, idx, type } });
  }

  function handleListChange(event) {
    const { name, value } = event.target;
    dispatch({ type: `${name}-list`, payload: value });
  }

  function handleSelectEvaluationType(event) {
    const { name, checked } = event.target;
    dispatch({ type: 'select-evaluation', payload: { name, checked } });
  }

  function isEvaluationTypeChecked(evaluationType) {
    return feedbackState.selectedEvaluations.has(evaluationType);
  }

  function handleToggleRank(index) {
    let currentRank = feedbackState.ranks[index - 1];
    currentRank = {
      ...currentRank,
      isActive: currentRank?.isActive ? !currentRank?.isActive : true
    };
    const newArray = feedbackState.ranks.filter((obj, i) => i !== index - 1);
    newArray.splice(index - 1, 0, currentRank);

    dispatch({ type: 'toggle-rank', payload: newArray });
  }

  return {
    feedbackState,
    handleScoreChange,
    handleFeedbackChange,
    handleListChange,
    handleSelectEvaluationType,
    isEvaluationTypeChecked,
    handleRankChange,
    handleRankRangeChange,
    handleToggleRank
  };
}

export { useEditFeedback };
