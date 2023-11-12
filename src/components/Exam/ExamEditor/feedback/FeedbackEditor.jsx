import TextareaAutosize from 'react-textarea-autosize';
import { EditableCheckBox } from '../../CheckBox/';
import { Tabs, Tab } from 'react-bootstrap';
import { useEditFeedback } from '../hooks/useEditFeedback';
import Rank from './Rank';
import { useEffect, useState } from 'react';

function FeedbackEditor({ examId }) {
  const {
    feedbackState,
    handleScoreChange,
    handleFeedbackChange,
    handleListChange,
    handleSelectEvaluationType,
    isEvaluationTypeChecked,
    handleRankChange,
    handleRankRangeChange,
    handleToggleRank
  } = useEditFeedback(examId);
  const [currentTabSelected, setcurrentTabSelected] = useState(0);

  return (
    <section className="results px-3 mt-3">
      <div className="evaluation-type-container mb-2">
        <div className="evaluation-type">
          <div className="evaluation-type__checkbox">
            <EditableCheckBox
              labelText={'Rank'}
              small
              isChecked={isEvaluationTypeChecked('rank')}
              onCheckBoxChange={handleSelectEvaluationType}
              className="editable-checkbox"
              inputName="rank"
            />
          </div>
          <div className="rank">
            <div className="row --no-margin">
              <div className="col-12 pl-0 ranks-container" style={{ padding: 0 }}>
                <Tabs
                  defaultActiveKey="1"
                  onSelect={e => setcurrentTabSelected(parseInt(e))}
                  className="rank-tabs-container"
                >
                  {feedbackState.ranks.map((rank, idx) => (
                    <Tab
                      eventKey={idx}
                      key={idx}
                      tabClassName="ranksTabs"
                      title={
                        <Rank
                          id={idx + 1}
                          isSelected={currentTabSelected + 1}
                          isActive={rank.isActive}
                          minRangeValue={rank.minRange}
                          maxRangeValue={rank.maxRange}
                          onToggle={id => handleToggleRank(id)}
                          onRangeMinChange={event =>
                            handleRankRangeChange(event, idx, 'min')
                          }
                          onRangeMaxChange={event =>
                            handleRankRangeChange(event, idx, 'max')
                          }
                        />
                      }
                    >
                      <div className="col-12 pl-0 col-background" style={{ padding: 0 }}>
                        <div
                          onClick={() => handleToggleRank(currentTabSelected + 1)}
                          className={
                            rank.isActive
                              ? 'Rank__id__selected inRankButton'
                              : 'Rank__id inRankButton'
                          }
                          style={{ marginTop: 5, marginLeft: 5 }}
                          // this styles are only for this specific div
                        >
                          <p style={{ margin: 0 }}>{currentTabSelected + 1}</p>
                        </div>
                        <TextareaAutosize
                          name={idx}
                          type="text"
                          className="input-feedback Rank__textarea-autosize"
                          onChange={handleRankChange}
                          value={rank.text}
                          spellCheck="false"
                        />
                      </div>
                    </Tab>
                  ))}
                </Tabs>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="evaluation-type-container mb-2">
        <div className="evaluation-type">
          <div className="evaluation-type__checkbox">
            <EditableCheckBox
              labelText={'Score'}
              small
              isChecked={isEvaluationTypeChecked('score')}
              onCheckBoxChange={handleSelectEvaluationType}
              inputName="score"
              className="editable-checkbox"
            />
          </div>
          <div className="evaluation-type__input">
            <div className="row --no-margin">
              <div className="flex-r-ac-jfs" style={{ width: '100%' }}>
                <div>
                  <input
                    className="results__bounds"
                    type="text"
                    value="≥"
                    disabled
                  ></input>
                  <input
                    className="results__bounds-input"
                    type="text"
                    name="min"
                    maxLength={3}
                    value={feedbackState.score.min || ''}
                    onChange={handleScoreChange}
                  ></input>
                </div>
                <div>
                  <input
                    className="results__bounds lte"
                    type="text"
                    value="≤"
                    disabled
                  ></input>
                  <input
                    className="results__bounds-input"
                    maxLength={3}
                    type="text"
                    name="max"
                    value={feedbackState.score.max || ''}
                    onChange={handleScoreChange}
                  ></input>
                </div>
              </div>
              <div className="col-12 pl-0" style={{ padding: 0 }}>
                <TextareaAutosize
                  name="score"
                  type="text"
                  placeholder="Feedback..."
                  className="input-feedback"
                  value={feedbackState.score.feedback || ''}
                  onChange={handleFeedbackChange}
                  spellCheck="false"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="evaluation-type-container mb-2">
        <div className="evaluation-type">
          <div className="evaluation-type__checkbox">
            <EditableCheckBox
              labelText={'Correct no.'}
              small
              isChecked={isEvaluationTypeChecked('correct')}
              onCheckBoxChange={handleSelectEvaluationType}
              className="editable-checkbox"
              inputName="correct"
            />
          </div>
          <div className="evaluation-type__input">
            <div className="row --no-margin">
              <div className="col-12 pl-0" style={{ padding: 0 }}>
                <TextareaAutosize
                  name="correct"
                  type="text"
                  onChange={handleListChange}
                  className="outlineNone"
                  value={feedbackState.correct.correctList || ''}
                  spellCheck="false"
                />
              </div>
              <div className="col-12 pl-0" style={{ marginTop: '-6px', padding: 0 }}>
                <TextareaAutosize
                  name="correct"
                  type="text"
                  placeholder="Feedback..."
                  value={feedbackState.correct.feedback || ''}
                  className="input-feedback"
                  onChange={handleFeedbackChange}
                  spellCheck="false"
                  style={{ borderTop: '1px solid transparent' }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="evaluation-type-container mb-2">
        <div className="evaluation-type">
          <div className="evaluation-type__checkbox">
            <EditableCheckBox
              labelText={'Incorrect no.'}
              small
              isChecked={isEvaluationTypeChecked('incorrect')}
              onCheckBoxChange={handleSelectEvaluationType}
              className="editable-checkbox"
              inputName="incorrect"
            />
          </div>
          <div className="evaluation-type__input">
            <div className="row --no-margin">
              <div className="col-12 pl-0" style={{ padding: 0 }}>
                <TextareaAutosize
                  name="incorrect"
                  type="text"
                  className="outlineNone"
                  onChange={handleListChange}
                  value={feedbackState.incorrect.incorrectList || ''}
                  spellCheck="false"
                />
              </div>
              <div className="col-12 pl-0" style={{ marginTop: '-7px', padding: 0 }}>
                <TextareaAutosize
                  name="incorrect"
                  type="text"
                  placeholder="Feedback"
                  className="input-feedback --border-top-none"
                  value={feedbackState.incorrect.feedback || ''}
                  onChange={handleFeedbackChange}
                  spellCheck="false"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default FeedbackEditor;
