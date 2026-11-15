/*!
 * Copyright (c) 2024 PLANKA Software GmbH
 * Licensed under the Fair Use License: https://github.com/plankanban/planka/blob/master/LICENSE.md
 */

const bcrypt = require('bcrypt');
const crypto = require('crypto');

const CHARS = 'abcdefghijklmnopqrstuvwxyz0123456789';
const CODE_COUNT = 10;
const GROUP_LENGTH = 5;
const BCRYPT_ROUNDS = 10;

// randomInt rejection-samples internally, so every character is equally likely.
const pickCharacter = () => CHARS[crypto.randomInt(CHARS.length)];

const generateCode = () => {
  let left = '';
  let right = '';
  for (let i = 0; i < GROUP_LENGTH; i += 1) {
    left += pickCharacter();
    right += pickCharacter();
  }
  return `${left}-${right}`;
};

module.exports = {
  inputs: {},

  async fn() {
    const plain = [];
    const hashed = [];

    for (let i = 0; i < CODE_COUNT; i += 1) {
      const code = generateCode();
      plain.push(code);
      // eslint-disable-next-line no-await-in-loop
      hashed.push(await bcrypt.hash(code, BCRYPT_ROUNDS));
    }

    return { plain, hashed };
  },
};
