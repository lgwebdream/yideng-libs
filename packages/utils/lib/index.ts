'use strict';
import core from '@yideng/core';
console.log('core: ', core);

const normalTask = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('normal task');
  }, 1000);
});
