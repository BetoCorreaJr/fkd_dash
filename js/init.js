  $(document).ready(function() {
    $('input#client-card-number').characterCounter();
    $('.profile-btn').dropdown({
      belowOrigin: true, // Displays dropdown below the button
      alignment: 'left' // Displays dropdown with edge aligned to the left of button
    });
  });

