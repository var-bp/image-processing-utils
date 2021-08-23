import sharp from 'sharp';
import argv from 'minimist';
import filesize from 'filesize';
import fs from 'fs-extra';
import { basename, join, extname } from 'path';
import { __dirname, outputFolderPath, filterItemFromArray } from './utils.js';

// https://sharp.pixelplumbing.com/api-output#png
// https://medium.com/hd-pro/jpeg-formats-progressive-vs-baseline-73b3938c2339
const PNG_OPTIONS = {
  quality: 80,
  compressionLevel: 9,
  progressive: true,
};

const folderPath = join(__dirname, argv(process.argv).folder);

fs
  .readdir(folderPath)
  .then((files) => {
    const filteredFiles = filterItemFromArray(files, '.DS_Store');

    for (let i = 0; i < filteredFiles.length; i++) {
      const fileBasename = basename(filteredFiles[i]);
      const fileExtname = extname(fileBasename);
      const modifiedFileBasename = `${basename(filteredFiles[i], fileExtname)}.png`;

      sharp(join(folderPath, fileBasename))
        .png(PNG_OPTIONS)
        .toFile(join(outputFolderPath, modifiedFileBasename))
        .then(({ size }) => {
          console.info(`Success! File ${fileBasename} was converted to .png ${filesize(size)}.`);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  })
  .catch(err => {
    console.error(err);
  });
