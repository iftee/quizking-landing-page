(function($){
  'use strict';

  $(document).ready(function(){

    // Language Caching
    if(window.localStorage.getItem('language') === 'bangla' ) {
      $('.language-english').css('display', 'none');
      $('.language-bangla').css('display', 'block');
      $('#languageDropdown').html('<span class="flag-icon flag-icon-bd"></span>বাংলা');
    }

    // Dropdowns
    $('.dropdown').on('show.bs.dropdown', function(){
      $(this).find('.dropdown-menu').first().stop(true, true).slideDown(250);
    });    
    $('.dropdown').on('hide.bs.dropdown', function(){
      $(this).find('.dropdown-menu').first().stop(true, true).slideUp(250);
    });

    // Language Toggle
    $('#language-toggle .dropdown-item').on('click', function(event){
      event.preventDefault();
      var language = $(this).data('language');
      if(language === 'language-bangla') {
        $('.language-english').css('display', 'none');
        $('.language-bangla').css('display', 'block');
        $('#languageDropdown').html('<span class="flag-icon flag-icon-bd"></span>বাংলা');
        window.localStorage.setItem('language', 'bangla');
      } else {
        $('.language-bangla').css('display', 'none');
        $('.language-english').css('display', 'block');
        $('#languageDropdown').html('<span class="flag-icon flag-icon-us"></span>English');
        window.localStorage.removeItem('language', 'bangla');
      }
    });    

    // Scroll To Section
    $('.navbar:not(.navbar-terms) #navbar-smooth-scroll a[href^="#"], .navbar:not(.navbar-terms) .navbar-brand, .smooth-scroll').on('click', function(event) {
      event.preventDefault();
      var target = $($(this).attr('href'));
      if(target.length) {
        $('html, body').animate({
          scrollTop: target.offset().top - 85 // 86 = Navbar height
        }, 300);
        $('#navbar-smooth-scroll').removeClass('show');
      } 
    });

    // Navbar Scroll
    var navbar = $('.navbar');
    $(window).on('load scroll', function() {
      var scrollAmount = $(window).scrollTop();
      if(scrollAmount >= 100) {
        navbar.addClass('navbar-white');
      } else {
        navbar.removeClass('navbar-white');
      }
    }).scroll;
    
    // Fade In Animation
    $(window).on('scroll', function() {
      var windowBottom = $(this).scrollTop() + $(this).innerHeight();
      $('.fade').each(function() {
        var elementMiddle = $(this).offset().top + $(this).outerHeight() / 2;
        if (elementMiddle < windowBottom) {
          if (!$(this).hasClass('fade-in')) {
            $(this).addClass('fade-in');
          }
        } else {
          $(this).removeClass('fade-in');
        }
      });
    }).scroll();

    // Winner List
    var leaderBoardURL = 'http://trivia-java-project-test-1389490078.ap-southeast-1.elb.amazonaws.com/api/v2/quiz/web-leaderboard/'
    function generateLeaderBoard(parameter) {
      $.get(leaderBoardURL + parameter, function() {        
      })
      .done(function(data) {
        $('#leaderboard-' + parameter).children().remove();
        if(data.result.length) {
          $(data.result).each(function(key, value){
            var playerName = value.Name;
            var playerMoney = value.Money;
            var playerImageURL = value.Image;
            $('#leaderboard-' + parameter).append(
              '<li id="#leaderboard-' + parameter + key + '"><span><img src="' + playerImageURL+ '" alt="' + playerName + '" class="mr-4" /></span><span class="player-info"><span>' + playerName + '</span><span>Won: ৳' + playerMoney + '</span></span></li>'
            );
          }); 
        } else {
          $('#leaderboard-' + parameter).append(
            '<li>Couldn\'t find any player.</li>'
          );
        }              
      })
      .fail(function() {
        console.log("Couldn't get data for" + parameter);
      });
    }    
    generateLeaderBoard('all');
    generateLeaderBoard('weekly');

    // Copyright Year
    var date = new Date();
    var fullYear = date.getFullYear();
    $('#copyright-year').html(fullYear);

  });
})(jQuery);

// Rellax Animation
window.addEventListener('DOMContentLoaded', function(event) {
  var rellax = new Rellax('.rellax', {
    center: true
  });
});