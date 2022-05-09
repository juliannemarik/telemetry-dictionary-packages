import telemetryDictionary from './dictionary.json';
import telemetryConstants from './constants.json';
import dimensions from './dimensions.json';
import * as base from '@juliannemarik/telemetry-dictionary-base';

// testing
export const dictionary = telemetryDictionary;
export const constants = telemetryConstants;
export const read = base.read.bind({ dimensions });
export const write = base.write;