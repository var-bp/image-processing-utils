import argv from 'minimist';
import { emptyDir } from 'fs-extra';
import { join } from 'path';
import { __dirname } from './utils.js';

const { folder } = argv(process.argv);
const folderPath = join(__dirname, folder);

emptyDir(folderPath)
  .then(() => {
    console.info(`Success! Content of folder ${folder} was deleted.`);
  })
  .catch(err => {
    console.error(err);
  });
