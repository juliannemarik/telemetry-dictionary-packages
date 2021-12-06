import telemetryDictionary from './dictionary.json';
import telemetryConstants from './constants.json';
import { dimensionsMap } from './dimensions';
import * as base from '@juliannemarik/telemetry-dictionary-base';

export const dictionary = telemetryDictionary;
export const constants = telemetryConstants;
export const read = base.read.bind({ dimensionsMap });
export const write = base.write;