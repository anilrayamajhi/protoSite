$('body').on('click', '.chat-bubble', function(e){
  $('.chat-bubble').css('display', 'none');
  $('.chat-container').css('display', 'block');
})


$('body').on('click', '.chat-head .fa-times', function(e){
  $('.chat-container').css('display', 'none');
  $('.chat-bubble').css('display', 'flex');
})


// Socket.io documentation

var socket = io();


$('body').on('click', '.chat-send', function(){
  submit();
});

$('body').on('keydown', '.chat-input', function(evt) {
    if (evt.which == 13) {
      event.preventDefault();
      submit();
    }
});

socket.on('finish', function(phrase){
  $('.chat-body').append(`<div class="message"><div class="avatar">GI</div><div class="message-content">${phrase}</div></div>`)
});

////////Refactoring click event//////
function submit (){
  let chatInput = $('.chat-input').find('.form-control');
  socket.emit('chat message', chatInput.val());
  chatInput.val('');
  return false;
}
