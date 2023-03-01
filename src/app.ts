import { shuffle } from './shuffle';
import { createArrayCsvWriter } from 'csv-writer';

const MAX_COUNT = 14685;
const DIST_COUNT = 50;
const DIST_MEMBER_NAMES = ['Koo', 'Joey', 'Jay', 'Liam'];
const DIST_MEMBER = DIST_MEMBER_NAMES.length;
const FILE_NAME = 'random_4.csv';

const csvWriter = createArrayCsvWriter({
  header: ['Member', 'Number'],
  path: FILE_NAME
});

const values = [];

for (var i = 1; i <= MAX_COUNT; i++) {
  values.push(i);
}

const shuffled = shuffle(values);
const allSamples = shuffled
  .slice(0, DIST_COUNT * DIST_MEMBER)
  .sort((a, b) => (a > b ? 1 : -1));

const sample = (arr: Array<number>, x: number) =>
  allSamples.slice(x * DIST_COUNT, (x + 1) * DIST_COUNT);
const result = [];

DIST_MEMBER_NAMES.forEach((name, i) => {
  sample(shuffled, i).forEach((v) => result.push([name, v]));
});

csvWriter.writeRecords(result);
