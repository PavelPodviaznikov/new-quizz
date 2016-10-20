'use strict';

angular.module('quizzy.questions')
    .factory('questionsService', [
        '$http',
        questionsService
    ]);

function questionsService($http) {
    var self = {};

    self.themes = [];

    self.loadQuestions = function() {
        $http.get('/questions').then(onQuestionsLoaded, onQuestionsLoadingFailed);
    };

    self.loadThemes = function() {
        $http.get('/themes').then(onThemesLoaded, onThemesLoadingFailed);
    };

    function onQuestionsLoaded(response) {
        console.log(response.data);
    }

    function onQuestionsLoadingFailed(response) {
        alert('Sorry, can`t load questions');
    }

    function onThemesLoaded(response) {
        self.themes.length = 0;
        self.themes.push.apply(self.themes, response.data);
    }

    function onThemesLoadingFailed(response) {
        alert('Sorry, can`t load questions');
    }

    return self;
}