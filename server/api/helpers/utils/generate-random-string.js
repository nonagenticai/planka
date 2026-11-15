/*!
 * Copyright (c) 2024 PLANKA Software GmbH
 * Licensed under the Fair Use License: https://github.com/plankanban/planka/blob/master/LICENSE.md
 */

const crypto = require('crypto');

const CHARS = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

module.exports = {
  sync: true,

  inputs: {
    size: {
      type: 'number',
      required: true,
    },
  },

  fn(inputs) {
    let result = '';
    for (let i = 0; i < inputs.size; i += 1) {
      result += CHARS[crypto.randomInt(CHARS.length)];
    }

    return result;
  },
};
