import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

// https://github.com/nodejs/help/issues/2907#issuecomment-858874660
export const __dirname = dirname(fileURLToPath(import.meta.url));

export const inputFolderPath = join(__dirname, 'input');

export const outputFolderPath = join(__dirname, 'output');

export const filterItemFromArray = (array, itemToFilter) => array.filter((item) => item !== itemToFilter);
