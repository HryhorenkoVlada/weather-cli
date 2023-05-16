#!/usr/bin/env node // <-- This is for cli usage - to run the script from the command line

import { getArgs } from './helpers/args.js';
import { getWeather, getIcon } from './services/api.service.js';
import {
  printHelp,
  printSuccess,
  printError,
  printWeather,
} from './services/log.service.js';
import {
  saveKeyValue,
  KEYS_DICTIONARY,
  getKeyValue,
} from './services/storage.service.js';

const saveToken = async (token) => {
  if (!token.length) {
    printError('Token is required');
    return;
  }
  try {
    await saveKeyValue(KEYS_DICTIONARY.token, token);
    printSuccess('Token saved successfully');
  } catch (err) {
    printError('Error while saving token');
  }
};

const saveCity = async (city) => {
  if (!city.length) {
    printError('Enter city name');
    return;
  }
  try {
    await saveKeyValue(KEYS_DICTIONARY.city, city);
    printSuccess('City name saved successfully');
  } catch (err) {
    printError('Error while saving city');
  }
};

const getForcast = async () => {
  try {
    const city = process.env.CITY ?? (await getKeyValue(KEYS_DICTIONARY.city));
    const data = await getWeather(city);
    printWeather(data, getIcon(data.weather[0].icon));
  } catch (err) {
    if (err.response?.status === 404) {
      printError('City not found');
    } else if (err.response?.status === 401) {
      printError('Invalid token');
    } else {
      printError(err.message);
    }
  }
};

const initCLI = () => {
  const args = getArgs(process.argv);
  if (args.h) {
    return printHelp();
  }
  if (args.s) {
    return saveCity(args.s);
  }
  if (args.t) {
    return saveToken(args.t);
  }
  return getForcast();
};

initCLI();
