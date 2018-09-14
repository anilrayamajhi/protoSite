var user;

$('body').on('click', '.chat-bubble', function(e){
  $('.chat-bubble').css('display', 'none');
  $('.chat-container').css('display', 'block');
  user= $('.chat-wrapper').find('.take-me').text().toUpperCase();
})


$('body').on('click', '.chat-head .fa-times', function(e){
  $('.chat-container').css('display', 'none');
  $('.chat-bubble').css('display', 'flex');
})

$('body').on('click', '.chat-head .fa-expand-arrows-alt', function(e){
  $('.chat-container').addClass('chat-container-big');
  $('.chat-body').addClass('chat-body-big');
  $('.chat-input').addClass('chat-input-big');
  $('.fa-expand-compress').removeClass('fa-expand-arrows-alt').addClass('fa-compress');
})

$('body').on('click', '.chat-head .fa-compress', function(e){
  $('.chat-container').removeClass('chat-container-big');
  $('.chat-body').removeClass('chat-body-big');
  $('.chat-input').removeClass('chat-input-big');
  $('.fa-expand-compress').addClass('fa-expand-arrows-alt').removeClass('fa-compress');
})

// Socket.io documentation
var socket = io();
// console.log('HERE:   ', $('.chat-wrapper').find('.take-me').text());


$('body').on('click', '.chat-send', function(){
  submit();
});

$('body').on('keydown', '.chat-input', function(evt) {
    if (evt.which == 13) {
      event.preventDefault();
      submit();
    }
});

socket.on('finish', function(info){
  if(info.user == user){
    $('.chat-body').append(`<div class="message"><div class="message-content text-right">${info.phrase}</div><div class="avatar avatar-primary">${user.charAt(0)}</div></div>`)
  }else{
      $('.chat-body').append(`<div class="message"><div class="avatar avatar-secondary">${info.user.charAt(0)}</div><div class="message-content">${info.phrase}</div></div>`)
  }
  $(".chat-body").scrollTop($(".chat-body")[0].scrollHeight);
});

////////Refactoring click event//////
function submit (){
  let chatInput = $('.chat-input').find('.form-control');
  let chatVal = chatInput.val();
  if(!!chatVal.trim()){
    socket.emit('chat message', {user, phrase: chatInput.val()});
    chatInput.val('');
    return false;
  }
}
