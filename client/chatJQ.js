$('body').on('click', '.chat-bubble', function(e){
  $('.chat-bubble').css('display', 'none');
  $('.chat-container').css('display', 'block');
})


$('body').on('click', '.chat-head .fa-times', function(e){
  $('.chat-container').css('display', 'none');
  $('.chat-bubble').css('display', 'flex');
})
