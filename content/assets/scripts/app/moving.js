define(['jquery'], function ($) {

  $(".go-to-bottom").click(function () {
    $("html, body").animate({
      scrollTop: $(document).height()
    }, "slow");
  });

  $(".scroll-to").click(function () {
    var $this = $(this);
    $('html, body').animate({
      scrollTop: $("#" + $this.data("scrollTo")).offset().top
    }, "slow");
  });

  $('.select-tab').click(function () {
    $("#" + $(this).data("selectTab")).click();
  });

});
