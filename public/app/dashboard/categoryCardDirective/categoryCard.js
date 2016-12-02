'use strict';

import './categoryCard.scss';

function categoryCard() {
  return {
    restrict: 'E',
    replace: true,
    scope: {
      category: '='
    },
    template: require('./categoryCard.html')
  };
}

export default categoryCard;
