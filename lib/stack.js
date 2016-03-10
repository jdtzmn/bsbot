var Stack = function(start) {
  var stack = start ? start : [];
  var t = this;

  this.history = stack;

  this.add = function(count, number) {
    if (typeof count === 'object' && !Array.isArray(count)) {
      for (var i in count) {
        t.add(count[i], i);
      }
    } else {
      stack.push({'num': number, 'cnt': count});
    }
  };

  this.bs = function(lie) {
    var c = t.count();
    stack.push(lie);
    return c;
  };

  this.pb = function(index) {
    if (index) return stack.splice(index, 0, 'PB');
    stack.push('PB');
  };

  this.count = function() {
    var total = {};
    for (var i in stack) {
      if (typeof stack[i] === 'object') {
        if (!total[stack[i].num]) total[stack[i].num] = 0;
        total[stack[i].num] += +stack[i].cnt;
        if (total[stack[i].num] < 0) total[stack[i].num] = 0;
      } else if (typeof stack[i] === 'string' && stack[i] === 'PB') {
        total[stack[i-1].num] -= +stack[i-1].cnt;
      } else if (typeof stack[i] === 'boolean') {
        total = {};
      }
    }
    return total;
  };

  this.count.total = function() {
    var cards = t.count();
    var total = 0;
    for (var i in cards) {
      total += cards[i];
    }
    return total;
  };

  this.has = function(count, number, total) {
    total = total ? total : t.count();
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

if (typeof module !== 'undefined') module.exports = Stack;
