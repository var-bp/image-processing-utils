import sharp from 'sharp';
import argv from 'minimist';
import filesize from 'filesize';
import fs from 'fs-extra';
import { basename, join, extname } from 'path';
import { __dirname, outputFolderPath, filterItemFromArray } from './utils.js';

// https://sharp.pixelplumbing.com/api-resize#resize
// https://css-tricks.com/almanac/properties/b/background-size/#keywords
const RESIZE_OPTIONS = [
  {
    width: 1200,
    height: undefined,
    options: {
      fit: "contain",
    },
  },
  {
    width: 992,
    height: undefined,
    options: {
      fit: "contain",
    },
  },
  {
    width: 768,
    height: undefined,
    options: {
      fit: "contain",
    },
  },
];

const folderPath = join(__dirname, argv(process.argv).folder);

fs
  .readdir(folderPath)
  .then((files) => {
    const filteredFiles = filterItemFromArray(files, '.DS_Store');

    for (let i = 0; i < filteredFiles.length; i++) {
      const fileBasename = basename(filteredFiles[i]);
      const fileExtname = extname(fileBasename);

      for (let j = 0; j < RESIZE_OPTIONS.length; j++) {
        const modifiedFileBasename = `${basename(filteredFiles[i], fileExtname)}_${RESIZE_OPTIONS[j].width}w${fileExtname}`;

        sharp(join(folderPath, fileBasename))
          .resize(RESIZE_OPTIONS[j].width, RESIZE_OPTIONS[j].height, RESIZE_OPTIONS[j].options)
          .toFile(join(outputFolderPath, modifiedFileBasename))
          .then(({ width, height, size }) => {
            console.info(`Success! File ${modifiedFileBasename} was resized to ${width}x${height} ${filesize(size)}.`);
          })
          .catch((err) => {
            console.error(err);
          });
      }
    }
  })
  .catch(err => {
    console.error(err);
  });
