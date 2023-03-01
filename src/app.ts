import { shuffle } from './shuffle';
import { createArrayCsvWriter } from 'csv-writer';

// ### Configurations
const MAX_COUNT: number = 14674; // total candidates
const DIST_COUNT: number = 50; // count of items to distribute
const DIST_MEMBER_NAMES: Array<string> = ['Koo', 'Joey', 'Jay', 'Liam']; // members who is distributed
const FILE_NAME: string = 'random_seed.csv'; // filename to export
const RAMDOM_SEED: string | undefined = 'peertec.com'; // random seed (to export same samples)
// ### End configurations

const csvWriter = createArrayCsvWriter({
  header: ['Member', 'Number'],
  path: FILE_NAME
});

const values = [];

for (var i = 1; i <= MAX_COUNT; i++) {
  values.push(i);
}

const shuffled = shuffle(values, RAMDOM_SEED);
const allSamples = shuffled
  .slice(0, DIST_COUNT * DIST_MEMBER_NAMES.length)
  .sort((a, b) => (a > b ? 1 : -1));

const sample = (arr: Array<number>, x: number) =>
  allSamples.slice(x * DIST_COUNT, (x + 1) * DIST_COUNT);
const result = [];

DIST_MEMBER_NAMES.forEach((name, i) => {
  sample(shuffled, i).forEach((v) => result.push([name, v]));
});

csvWriter.writeRecords(result);
