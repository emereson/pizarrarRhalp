import groupBy from 'lodash.groupby';
import moment from 'moment';

/**
 * Get averges score grouping evaluations by quarter
 * @param {Array<object>} evaluations
 * @returns
 */
export function averagesByQuarter(evaluations) {
  const response = {};
  const initial = {
    1: null,
    2: null,
    3: null,
    4: null
  };
  const byQuarter = groupBy(evaluations, function (evaluation) {
    const quarter = moment(evaluation.date, 'MM-DD-YYYY').quarter();
    return quarter;
  });
  const merged = { ...initial, ...byQuarter };
  for (let [quarter, evals] of Object.entries(merged)) {
    response[quarter] = Array.isArray(evals)
      ? average(evals.map(value => value.score))
      : null;
  }
  return [1, ...Object.values(response)];
}
/**
 * normalizes  array of number for missing values represented as 0
 * see unit tests
 * @param {Array<number>} values
 * @returns
 */
export function normalizeArray(values) {
  let position = 1;
  while (position < values.length) {
    if (values[position] < values[position - 1] && values[position] === 0) {
      values[position] = values[position - 1];
    }
    position++;
  }
  return values;
}

export function evaluationsAverage(evaluations = []) {
  return average(evaluations.map(value => value.score));
}

export function average(values = []) {
  if (!values || !Array.isArray(values) || values.length === 0) {
    return 0;
  }
  const sum = values.reduce((a, b) => a + b);
  return sum / values.length;
}
