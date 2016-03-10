var order = [],
    players = {},
    turn = 0,
    lastTurnIndex = 0,
    stack = new Stack();

var command = function(input) {
  if (input.match(/(\d+), *(\d+)/g)) {
    var player = players[order[turn % order.length]];
    if (!player) return 'Player not found';
    var playerName = order[turn % order.length];
    var count = input.match(/(\d+), *(\d+)/i)[1];
    var number = input.match(/(\d+), *(\d+)/i)[2];
    player.turn.play(count, number);
    turn++;
    lastTurnIndex = stack.history.length;
    return 'Player "' + playerName + '" played ' + count + ' ' + number + 's';
  } else if (input.match(/Add *Player *(.\D\S*)/i)) {
    var name = input.match(/Add *Player *(.\D\S*)/i)[1];
    players[name] = new Player(stack);
    order.push(name);
    return 'Added Player "'  + name + '"';
  } else if (input.match(/bs, *(\w*), *(\w*), *(true|false)/i)) {
    var player1 = input.match(/bs, *(\w*), *(\w*), *(true|false)/i)[1];
    if (!players[player1]) return 'Player not found';
    var player2 = input.match(/bs, *(\w*), *(\w*), *(true|false)/i)[2];
    var lie = JSON.parse(input.match(/bs, *(\w*), *(\w*), *(true|false)/i)[3]);
    players[player1].turn.bs(player2, lie);
    if (lie) {
      return 'Nice Call!';
    } else {
      return 'Better luck next time!';
    }
  } else if (input.match(/pb, *(\w*)/i)) {
    var liar = input.match(/pb, *(\w*)/i)[1];
    if (!players[liar]) return 'Player not found';
    players[liar].turn.pb();
    return 'Thanks for telling me!';
  } else if (input.match(/cards, *(\w*)/i)) {
    var cardholder = input.match(/cards, *(\w*)/i)[1];
    if (cardholder === 'stack') {
      return stack.count();
    } else {
      if (!players[cardholder]) return 'Player not found';
      return players[cardholder].cards();
    }
  } else {
    return new Error('Unknown command');
  }
};
