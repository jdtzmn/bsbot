var Player = function Player(name) {
  var history = [];

  this.add = function(number, quantity) {
    if (typeof number === 'object') {
      for (var i in number) {
        history.push(i);
      }
    }
    history.push([number, quantity]);
    return history;
  };

  this.remove = function(number, quantity) {
    var has = (this.has(number)[0] ? this.has(number)[1] : 0);
    if (has < quantity) quantity = has;
    history.push([number, -quantity]);
    return history;
  };

  this.history = history;

  this.cards = function() {
    cards = JSON.parse(JSON.stringify(history));
    cards.sort();

    var obj = {};

    for (var i in cards) {
      if (!obj[cards[i][0]]) obj[cards[i][0]] = 0;
      obj[cards[i][0]] += cards[i][1];
    }

    return obj;

  };

  this.has = function(number, quantity) {
    if (!quantity) quantity = 1;

    if (this.cards()[number] >= quantity) {
      return [true, this.cards()[number]];
    }
    return [false];

  };

  this.last = function(number) {
    if (!number) number = 1;
    return history[history.length - number];
  };

  this.last.remove = function(number) {
    if (!number) number = 1;
    history.splice(history.length - number, 1);
    return history;
  };

};

module.exports = Player;
