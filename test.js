$('.has-dropdown').hover(function() {
    $(this).find('.dropdown-menu').stop(true, true).fadeIn('fast');
  }, function() {
    $(this).find('.dropdown-menu').stop(true, true).fadeOut('fast');
  });
  