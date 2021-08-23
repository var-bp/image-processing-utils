import sharp from 'sharp';
import argv from 'minimist';
import filesize from 'filesize';
import fs from 'fs-extra';
import { basename, join, extname } from 'path';
import { __dirname, outputFolderPath, filterItemFromArray } from './utils.js';

// https://sharp.pixelplumbing.com/api-output#webp
// https://developers.google.com/speed/webp/docs/cwebp#options
const WEBP_OPTIONS = {
  quality: 80,
  alphaQuality: 100,
  reductionEffort: 6,
};

const folderPath = join(__dirname, argv(process.argv).folder);

fs
  .readdir(folderPath)
  .then((files) => {
    const filteredFiles = filterItemFromArray(files, '.DS_Store');

    for (let i = 0; i < filteredFiles.length; i++) {
      const fileBasename = basename(filteredFiles[i]);
      const fileExtname = extname(fileBasename);
      const modifiedFileBasename = `${basename(filteredFiles[i], fileExtname)}.webp`;

      sharp(join(folderPath, fileBasename))
        .webp(WEBP_OPTIONS)
        .toFile(join(outputFolderPath, modifiedFileBasename))
        .then(({ size }) => {
          console.info(`Success! File ${fileBasename} was converted to .webp ${filesize(size)}.`);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  })
  .catch(err => {
    console.error(err);
  });
