/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require */

const path = require("path");
const fs = require("fs");
const camelCase = require("lodash.camelcase");

/**
 * Object with parameters to be used in this function.
 * @param {Object} options - options object
 * @param {string} options.pathToModels - path where models can be found, i.e "../models"
 * @returns {Object} models - object with all models as keys
 */
const mergeModels = ({ pathToModels }) => {
  // models object to be exported at the end
  let models = {};

  try {
    // joining path of directory
    const directoryPath = path.join(__dirname, `../${pathToModels}`);

    const files = fs.readdirSync(directoryPath);

    // loop through all the files/models found
    files.forEach(currentFileName => {
      let newName = camelCase(path.parse(currentFileName).name);
      newName = newName.charAt(0).toUpperCase() + newName.slice(1);

      // add this new/current file dynamically to the models object
      models = {
        ...models,
        [newName]: require(`${directoryPath}/${currentFileName}`)
      };
    });
  } catch (error) {
    throw new Error(error);
  }

  return models;
};

module.exports = mergeModels;
