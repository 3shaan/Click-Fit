$(document).ready(function(){
    $('#navbar-toggle').click(function() {
        $('nav ul').slideToggle();
      });

      // Hamburger toggle
      $('#navbar-toggle').on('click', function() {
        this.classList.toggle('active');
      });
    

})

