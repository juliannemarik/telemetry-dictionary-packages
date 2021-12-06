const defaultDimensions = {
  CATEGORY: "category",
  ACTION: "action",
  LABEL: "label"
}

/**
 * constants map for additional dimensions
 */
const dimensions = {
  ...defaultDimensions
  // add additional dimensions here
}

/**
 * dimensions to include in dictionary entries. When using
 * the addEntry script, these are the dimensions you will
 * be prompted for.
 */
export const dictionaryDimensions = [ dimensions.CATEGORY, dimensions.ACTION, dimensions.LABEL ];

/**
 * dimensions to include in the constants file. When using
 * the addConstant script, these are the dimensions you will
 * be prompted to add a constant for.
 */
export const constantDimensions = [ ...dictionaryDimensions ];

/**
 * config containing the mappings of your custom dimensions
 * arcgis-telemetry.js and the Telemetry API use these mappings
 * when logging and reading events
 */
 export const customDimensionsMap = {}