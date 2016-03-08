var Player = function(start) {
  var stack = start ? start : [];
  var t = this;

  this.add = function(count, number) {
    if (typeof count === 'object' && !Array.isArray(count)) {
      for (var i in count) {
        t.add(count[i], i);
      }
    } else {
      stack.push({'num': number, 'cnt': count});
    }
  };

  this.cards = function() {
    var total = {};
    for (var i in stack) {
      if (typeof stack[i] === 'object') {
        if (!total[stack[i].num]) total[stack[i].num] = 0;
        total[stack[i].num] += +stack[i].cnt;
      }
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
};

module.exports = Player;
