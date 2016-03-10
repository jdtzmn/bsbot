#!/usr/bin/env node
var prompt = require('prompt');
var colors = require('colors');

var Player = require('./lib/player.js');
var Card = require('./lib/card.js');
var Stack = require('./lib/stack.js');

var order = [],
    players = {},
    stack = new Stack();
    
