'use strict';

export default {
  clearObject(obj) {
    for(let key in obj) delete obj[key];
  }
};
