#!/usr/bin/env node
var prompt = require('prompt');
var colors = require('colors');

var Player = require('./lib/player.js');
var Card = require('./lib/card.js');
var Stack = require('./lib/stack.js');

var order = [],
    players = {},
    stack = new Stack();


prompt.start();

prompt.get({
  properties: {
    number: {
      description: 'number of players'
    }
  }
}, function(err, result) {
  if (err) return console.log(err);
  getPlayer(result.number);

});

var getPlayer = function(num) {
  if (order.length < num) {
    prompt.get({
      properties: {
        name: {
          description: 'name of player ' + (order.length + 1)
        }
      }
    }, function(err, result) {
      if (err) return console.log(err);
      order.push(result.name);
      players[result.name] = new Player(result.name);
      getPlayer(num);
    });
  } else {
    turn(1);
  }
};

var turn = function(number) {
  prompt.get([
    'cards'
  ], function(err, result) {
    if (err) return console.log(err);

    var re = /cards\('(.*)'\)/;

    if (re.test(result.cards)) {
      var player = re.exec(result.cards);
      console.log(players[order[order.indexOf(player[1])]].cards());
    } else if (result.cards === 'bs') {
      stack.bs();
      turn(number);
      return;
    } else {

      var first = +result.cards.slice(0,1);
      var second = +result.cards.slice(-(result.cards.length - 1));

      if (4 - stack.has(second)[1] < first) {
        console.log(colors.red('Call BS!'));
      }

      stack.add(second, first, players[order[number % order.length]]);

    }

    turn(number + 1);
  });
};
