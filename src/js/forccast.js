$( document ).ready(function() {

    /* handle navbar-mobile */
    $('.hamburger').click(function(){
      $('.sidebar-mobile-container').toggleClass('collapse')
      $('.hamburger > .glyphicon').toggleClass('glyphicon-menu-hamburger')
      $('.hamburger > .glyphicon').toggleClass('glyphicon-remove')
    })

    /* handle slide news arrows */
    $('.latest-news-btn-group > .left').click(function(){
      var left = $('.last-news-container').scrollLeft();
      var step = $('.last-news').outerWidth();
      var scroll = left - step;
      if(scroll < ($('.last-news-container')[0].scrollWidth - $('.last-news-container').width())){
        $('.latest-news-btn-group > .right').removeClass('disabled')
      }
      $('.last-news-container').animate({scrollLeft: scroll }, '500');
      if(scroll<0){
        $(this).addClass('disabled')
        return;
      }

    })

    $('.latest-news-btn-group > .right').click(function(){
      var left = $('.last-news-container').scrollLeft();
      var step = $('.last-news').outerWidth();
      var scroll = left + step;
      if(scroll>0){
        $('.latest-news-btn-group > .left').removeClass('disabled')
      }
      $('.last-news-container').animate({scrollLeft: scroll }, '500');
      if(scroll>= ($('.last-news-container')[0].scrollWidth - $('.last-news-container').width())){
        $(this).addClass('disabled');
        return;
      }
    })

    $('.last-news-container').scroll(function(){
      var left = $(this).scrollLeft();
      if(left<=0){
        $('.latest-news-btn-group > .left').addClass('disabled')
      }else{
        $('.latest-news-btn-group > .left').removeClass('disabled')
      }
      var scrollright = Math.floor($(this)[0].scrollWidth - $(this).width())
      if(left >= scrollright){
        $('.latest-news-btn-group > .right').addClass('disabled');
      }else{
        $('.latest-news-btn-group > .right').removeClass('disabled')
      }

    })

});
