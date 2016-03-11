PNotify.prototype.options.styling = "fontawesome";
$(document).ready(function() {

  //input keypress event:
  $('input.command').keyup(function() {
    var isCommand = false;
    var input = $('input.command').val();
    if (input.match(/(\d+), *(\d+)/g)) isCommand = true;
    if (input.match(/Add *Player,? *(\w*)/i)) isCommand = true;
    if (input.match(/bs,? *(\w*),? *(\w*),? *(true|false)/i)) isCommand = true;
    if (input.match(/pb,? *(\w*)/i)) isCommand = true;
    if (input.match(/cards,? *(\w*)/i)) isCommand = true;
    if ($('input.command').val() === '') {
      $(this).removeClass('form-control-success').removeClass('form-control-error').parent().removeClass('has-success').removeClass('has-error');
    } else if (isCommand) {
      $(this).addClass('form-control-success').removeClass('form-control-error').parent().addClass('has-success').removeClass('has-error');
    } else {
      $(this).addClass('form-control-error').removeClass('form-control-success').parent().addClass('has-error').removeClass('has-success');
    }
  });

  //command submit event:
  $('.submit').click(function() {
    var input = $('input.command').val();
    var output = command(input);
    if (output instanceof Error) {
      new PNotify({
        text: output.message,
        type: 'error'
      });
    } else if (typeof output === 'object') {
      new PNotify({
        text: JSON.stringify(output),
        type: 'info'
      });
      clearTextbox();
    } else {
      new PNotify({
        text: output,
        type: 'success'
      });
      clearTextbox();
    }
  });
});

var clearTextbox = function(cb) {
  $('.submit').prop('disabled', true).parent().find('input.command').prop('disabled', true);
  var textboxInterval = setInterval(function() {
    $('input.command').val($('input.command').val().slice(0, -1));
    if ($('input.command').val() === '') {
      $('.submit').prop('disabled', false).parent().find('input.command').prop('disabled', false);
      clearInterval(textboxInterval);
      $('input.command').focus().keyup();
      if (cb) cb();
    }
  }, 50);
};
