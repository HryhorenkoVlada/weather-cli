import { homedir } from 'os';
import { join } from 'path';
import * as fs from 'fs/promises';

const filePath = join(homedir(), 'weather-data.json');

export const KEYS_DICTIONARY = {
  token: 'token',
  city: 'city',
};

const isExist = async (path) => {
  try {
    await fs.stat(path);
    return true;
  } catch (err) {
    return false;
  }
};

export const saveKeyValue = async (key, value) => {
  let data = {};
  if (await isExist(filePath)) {
    const file = await fs.readFile(filePath);
    data = JSON.parse(file);
  }
  data[key] = value;

  await fs.writeFile(filePath, JSON.stringify(data));
};

export const getKeyValue = async (key) => {
  if (await isExist(filePath)) {
    const file = await fs.readFile(filePath);
    const data = JSON.parse(file);
    return data[key];
  }
  return null;
};
