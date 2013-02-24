define(['jquery'], function($) {
  $(".go-to-bottom").click(function() {
    $("html, body").animate({ scrollTop: $(document).height() }, "slow");
  });
});
