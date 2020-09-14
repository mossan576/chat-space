$(function(){
  function buildHTML(message){
    if ( message.image ) {
      let html =
       `<div class="MainChat__message-list__box">
          <div class="MainChat__message-list__box__info">
            <div class="MainChat__message-list__box__info__name">
              ${message.user_name}
            </div>
            <div class="MainChat__message-list__box__info__date">
              ${message.created_at}
            </div>
          </div>
          <div class="MainChat__message-list__box__message" data-message-id=${message.id}>
            <p class="Message__content">
              ${message.content}
            </p>
            <img class="Message__image" src="${message.image}">
          </div>
        </div>`
      return html;
    } else {
      let html =
     `<div class="MainChat__message-list__box">
        <div class="MainChat__message-list__box__info">
          <div class="MainChat__message-list__box__info__name">
            ${message.user_name}
          </div>
          <div class="MainChat__message-list__box__info__date">
            ${message.created_at}
          </div>
        </div>
        <div class="MainChat__message-list__box__message" data-message-id=${message.id}>
          <p class="Message__content">
            ${message.content}
          </p>
        </div>
      </div>`
      return html;
    };
  }

  $('.MainChat__message-form').on('submit', function(e) {
    e.preventDefault();
    let formData = new FormData(this);
    let url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      let html = buildHTML(data);
      $('.MainChat__message-list').append(html);
      $('.MainChat__message-list').animate({scrollTop: $('.MainChat__message-list')[0].scrollHeight});
      $('form')[0].reset();
    })
    .fail(function() { 
      alert("メッセージ送信に失敗しました");
    })
    .always(function(){
      $('.MainChat__message-form__submit-btn').prop('disabled', false);
    });
  });

});