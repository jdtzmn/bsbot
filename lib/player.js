var Player = function(start, stack) {
  var cards = start ? start : [];
  var t = this;
  var lastTurnStackSize = 0;

  this.history = cards;

  this.add = function(count, number) {
    if (typeof count === 'object' && !Array.isArray(count)) {
      for (var i in count) {
        t.add(count[i], i);
      }
    } else {
      cards.push({'num': number, 'cnt': count});
    }
  };

  this.cards = function() {
    var total = {};
    for (var i in cards) {
      if (typeof cards[i] === 'object') {
        if (!total[cards[i].num]) total[cards[i].num] = 0;
        total[cards[i].num] += +cards[i].cnt;
        if (total[cards[i].num] < 0) total[cards[i].num] = 0;
      }
    }
    return total;
  };

  this.cards.total = function() {
    var cards = t.cards();
    var total = 0;
    for (var i in cards) {
      total += cards[i];
    }
    return total;
  };

  this.has = function(count, number, total) {
    total = total ? total : t.cards();
    if (total[number] >= count || count === 0 && !total[number]) return {
      'has': true,
      'total': total[number] || 0
    };
    return {
      'has': false,
      'total': total[number] || 0
    };
  };

  this.remove = function(count, number) {
    if (typeof count === 'object' && !Array.isArray(count)) {
      for (var i in count) {
        t.remove(count[i], i);
      }
    } else {
      t.add(-count, number);
    }
  };

  this.turn = function(cb) {
    cb(t.turn.play, t.turn.bs, t.turn.pb);
  };

  this.turn.play = function(count, number) {
    t.remove(count, number);
    var total = stack.count();
    stack.add(count, number);
    lastTurnStackSize = stack.history.length;
    if (stack.has(0, number, total).total + count > 4) return "Call BS!";
  };

  this.turn.bs = function(player, lie) {
    if (lie === true) {
      player.add(stack.bs(true));
    } else {
      t.add(stack.bs(false));
    }
  };

  this.turn.pb = function() {
    stack.pb(lastTurnStackSize || stack.history.length);
  };
};

if (typeof module !== 'undefined') module.exports = Player;
