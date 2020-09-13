$(function(){
  function buildHTML(message){
    if ( message.image ) {
      let html =
        ` <div class="MainChat__message-list__info">
            <div class="MainChat__message-list__info__name">
              ${message.user_name}
            </div>
            <div class="MainChat__message-list__info__data">
              ${message.created_at}
            </div>
          </div>
          <div class="MainChat__message-list__message" data-message-id=${message.id}>
            <p class="Message__content">
              ${message.content}
            </p>
            <img class="Message__image" src="${message.image}">
          </div>`
      return html;
    } else {
      let html =
      ` <div class="MainChat__message-list__info">
          <div class="MainChat__message-list__info__name">
            ${message.user_name}
          </div>
          <div class="MainChat__message-list__info__data">
            ${message.created_at}
          </div>
        </div>
        <div class="MainChat__message-list__message" data-message-id=${message.id}>
          <p class="Message__content">
            ${message.content}
          </p>
        </div>`
      return html;
    };
  }
  let reloadMessages = function() {
    let last_message_id = $('.MainChat__message-list__message:last').data("message-id") || 0;
    $.ajax({
      url: "api/messages",
      type: 'get',
      dataType: 'json',
      data: {id: last_message_id}
    })
    .done(function(messages) {
      if (messages.length !== 0) {
        let insertHTML = '';
        $.each(messages, function(i, message){
          insertHTML += buildHTML(message)
        });
        $('.MainChat__message-list').append(insertHTML);
        $('.MainChat__message-list').animate({scrollTop: $('.MainChat__message-list')[0].scrollHeight});
      }
    })
    .fail(function() {
      alert('error');
    });
  };
  setInterval(reloadMessages, 7000);
});