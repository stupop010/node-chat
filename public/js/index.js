var socket = io();

socket.on('connect', function(){
    console.log('Connect to server');

});

socket.on('disconnect', function(){
    console.log('Disconnect from server');
});

socket.on('newMessage', function (message) {
    let formattedTime = moment(message.createdAt).format('h:mm a');
    let template = jQuery('#message-template').html();
    let html = Mustache.render(template, {
        text: message.text,
        from: message.from,
        createdAt: formattedTime
    });

    jQuery('#message').append(html);
  });

socket.on('newLocationMessage', function(message){
    let formattedTime = moment(message.createdAt).format('h:mm a');
    let template = jQuery('#location-message-template').html();
    let html = Mustache.render(template, {
        from: message.from,
        createdAt: formattedTime,
        url: message.url
    })
    jQuery('#message').append(html);
})

  jQuery('#message-form').on('submit', function(e){
      e.preventDefault();
      var messageTextbox = jQuery('[name=message]')

      socket.emit('createMessage', {
          from: 'User',
          text: messageTextbox.val()
      },function(){
            messageTextbox.val('')
      })
  });

  let locationButton = jQuery('#send-location');

  locationButton.on('click', function(e){
      if(!navigator.geolocation) {
          return alert('Geolocation not supported by your browser.');
      }

      locationButton.attr('disabled', 'disabled').text('Sending location...');

      navigator.geolocation.getCurrentPosition(function(position){
        locationButton.removeAttr('disabled').text('Send location');
        socket.emit('createLocationMessage', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
        })
      }, function(){
        locationButton.removeAttr('disabled').text('Send location');
        alert('Unable to fetch location.')
      })
  })