#!/usr/bin/env node // <-- This is for cli usage - to run the script from the command line

import { getArgs } from './helpers/args.js';
import { printHelp, printSuccess } from './services/log.service.js';
import { saveKeyValue } from './services/storage.service.js';

const initCLI = () => {
  const args = getArgs(process.argv);
  if (args.h) {
    printHelp();
  }
  if (args.s) {
    // save the city to the config file
  }
  if (args.t) {
    return saveToken(args.t);
  }
  // show the weather
};

const saveToken = async (token) => {
  try {
    await saveKeyValue('token', token);
    printSuccess('Token saved successfully');
  } catch (err) {
    printError('Error while saving token');
  }
};

initCLI();
