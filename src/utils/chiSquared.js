import chiSquaredTest from 'chi-squared-test';

export default function chiSquaredCalc(observed) {
  const totalChar = {
    a: observed.a1 + observed.a2,
    b: observed.b1 + observed.b2,
  }
  const totalNum = {
    one: observed.a1 + observed.b1,
    two: observed.a2 + observed.b2,
  }
  const total = Object.keys(observed).reduce((acc, key) => acc +observed[key], 0);
  const percent1 = totalNum.one / total;
  const percent2 = totalNum.two / total;
  const expected = [
    Math.round(totalChar.a * percent1),
    Math.round(totalChar.a * percent2),
    Math.round(totalChar.b * percent1),
    Math.round(totalChar.b * percent2),
  ];
  const observedArray = [observed.a1, observed.a2, observed.b1, observed.b2];
  const p = chiSquaredTest(observedArray, expected, 1).probability;
  if (p <= 0.001) {
    return '***';
  } else if (p <= 0.01) {
    return '**';
  } else if (p <= 0.05) {
    return '*';
  }
  return '-';
};
