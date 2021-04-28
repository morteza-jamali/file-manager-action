import {getInput, debug, setFailed, setOutput} from '@actions/core';

const run = async (): Promise<void> => {
  try {
    const ms: string = getInput('milliseconds');
    debug(`Waiting ${ms} milliseconds ...`);

    debug(new Date().toTimeString());
    debug(new Date().toTimeString());

    setOutput('time', new Date().toTimeString());
  } catch (error) {
    setFailed(error.message);
  }
};

run();
