  $(document).ready(function() {
      $('input#client-card-number').characterCounter();
      $('.profile-btn').dropdown({
          belowOrigin: true, // Displays dropdown below the button
          alignment: 'left' // Displays dropdown with edge aligned to the left of button
      });
      $('.datepicker').pickadate({
          selectMonths: true, // Creates a dropdown to control month
          selectYears: 15 // Creates a dropdown of 15 years to control year
      });
      $('select').material_select();
  });
