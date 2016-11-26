'use strict';

function QuizzyController($state, $rootScope) {
  this.onBodyClick = () => {
    $rootScope.$emit('hide:menu');
  };
}

export default QuizzyController;
