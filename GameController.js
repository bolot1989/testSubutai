(() => {

'use strict';
let game = angular.module('game', [])

function GameController($scope) {
    $scope.winner = null;
    $scope.startButtons = false;
    $scope.table = [
        [null, null, null],
        [null, null, null],
        [null, null, null]
    ];
    $scope.tableLength = [0, 1, 2];

    $scope.startWithO = () => {
        $scope.playerType = 'O';
        $scope.startButtons = true;
    }

    $scope.startWithX = () => {
        $scope.playerType = 'X';
        $scope.startButtons = true;
    }

    $scope.startOver = () => {
        for (let i in $scope.tableLength) {
            for (let j in $scope.tableLength) {
                setTableValue(i, j, null);
            }
        }
        $scope.startButtons = false;
        $scope.winner = null;
    }

    $scope.showData = (row, column) => {
        let value = cell(row, column)
        return value ? value : '-';
    }
    $scope.clickCell = (row, column) => {
        setTableValue(row, column, $scope.playerType)
        checkCombination();
        $scope.playerType = switchPlayerType($scope.playerType)
    }
    
    function cell(row, column) {
        return $scope.table[row][column];
    }

    function setTableValue(row, column, value) {
        $scope.table[row][column] = value;
    }

    function switchPlayerType(playerType) {
        if (playerType === 'X')
            return 'O';
        else if (playerType === 'O')
            return 'X';    
    }

    function checkCombination() {
        let winner = null, empty = false;

        for (let i in $scope.tableLength) {
            for (let j in $scope.tableLength) {
                if (!cell(i, j)) empty = true
            }
        }

        if (!empty) {
            $scope.winner = 'NONE'
            return;
        }

        for (let i in $scope.tableLength) {
            if (cell(i, 0) && cell(i, 0) == cell(i, 1) && cell(i, 1) == cell(i, 2)) {
                winner = cell(i, 0);
            }
            if (cell(0, i) && cell(0, i) == cell(1, i) && cell(1, i) == cell(2, i)) {
                winner = cell(0, i);
            }
        }

        if (cell(0, 0) && cell(0, 0) == cell(1, 1) && cell(1, 1) == cell(2, 2)) {
            winner = cell(0, 0);
        }
        if (cell(0, 2) && cell(0, 2) == cell(1, 1) && cell(1, 1) == cell(2, 0)) {
            winner = cell(0, 2);
        }

        winner !== null ? $scope.winner = winner : winner;
    }
};

GameController.$inject = ['$scope'];

game.controller('GameController', GameController);

})();