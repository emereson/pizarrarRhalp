import { averagesByQuarter, normalizeArray } from './utils';

const MOCK_EVALUATIONS = [
  // first quarter
  {
    date: '01-01-2022',
    name: 'Prueba 1',
    score: 46
  },
  {
    date: '02-01-2022',
    name: 'Prueba 1',
    score: 46
  },
  {
    date: '03-01-2022',
    name: 'Prueba 1',
    score: 46
  },
  // second quarter
  {
    date: '04-01-2022',
    name: 'Prueba 1',
    score: 50
  },
  {
    date: '05-01-2022',
    name: 'Prueba 1',
    score: 50
  },
  {
    date: '06-01-2022',
    name: 'Prueba 1',
    score: 50
  },
  // Third quarter
  {
    date: '07-01-2022',
    name: 'Prueba 1',
    score: 70
  },
  {
    date: '08-01-2022',
    name: 'Prueba 1',
    score: 70
  },
  {
    date: '09-01-2022',
    name: 'Prueba 1',
    score: 70
  },
  // Fourth quarter
  {
    date: '10-01-2022',
    name: 'Prueba 1',
    score: 90
  },
  {
    date: '11-01-2022',
    name: 'Prueba 1',
    score: 90
  },
  {
    date: '12-01-2022',
    name: 'Prueba 1',
    score: 90
  }
];

describe('EvaluationsGraph utils', () => {
  it('should return quarterly averages', () => {
    expect(averagesByQuarter(MOCK_EVALUATIONS)).toEqual([1, 46, 50, 70, 90]);
    expect(
      averagesByQuarter([
        {
          date: '12-01-2022',
          name: 'Prueba 1',
          score: 90
        }
      ])
    ).toEqual([1, null, null, null, 90]);
    expect(
      averagesByQuarter([
        {
          date: '08-01-2022',
          name: 'Prueba 1',
          score: 60
        }
      ])
    ).toEqual([1, null, null, 60, null]);
    expect(averagesByQuarter([])).toEqual([1, null, null, null, null]);
  });
  it('normalizes array of averages', () => {
    expect(normalizeArray([0, 3, 0, 0, 0])).toEqual([0, 3, 3, 3, 3]);
    expect(normalizeArray([0, 3, 5, 4, 7])).toEqual([0, 3, 5, 4, 7]);
    expect(normalizeArray([0, 0, 0, 8, 5])).toEqual([0, 0, 0, 8, 5]);
  });
});
