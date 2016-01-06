var Stack = function Stack() {
  var history = [];

  this.add = function(number, quantity, player) {
    player.remove(number, quantity);
    history.push([number, quantity, player]);
    return history;
  };

  this.remove = function(number, quantity, player) {
    var has = (this.has(number)[0] ? this.has(number)[1] : 0);
    if (has < quantity) quantity = has;
    history.push([number, -quantity, player]);
    return history;
  };

  this.cards = function() {
    stack = JSON.parse(JSON.stringify(history));
    stack.sort();

    var obj = {};

    var start = 0;
    if (stack.lastIndexOf('BS') >= 0) start = stack.lastIndexOf('BS');

    for (var i = start; i < stack.length; i++) {
      if (!obj[stack[i][0]]) obj[stack[i][0]] = 0;
      obj[stack[i][0]] += stack[i][1];
    }

    return obj;

  };

  this.history = history;

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
    history[history.length - number][2].last.remove(number);
    history.splice(history.length - number, 1);
    return history;
  };


  this.bs = function bs() {
    for (var i = 0; i < history.length - 1; i++) {
      if (this.last[2]) this.last[2].add(history[i][0], history[i][1]);
    }
    this.last.remove();
    history.push('BS');
  };

  this.pb = function pb() {
    this.last.remove();
  };

};

module.exports = Stack;
