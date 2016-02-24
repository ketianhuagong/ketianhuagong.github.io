jQuery(function() {
  $ = jQuery;
  //templatemo_banner_slide camera function
  $('#templatemo_banner_slide > div').camera({
    height: 'auto',
    loader: 'bar',
    playPause: false,
    pagination: false,
    thumbnails: false,
    hover: false,
    opacityOnGrid: false,
    imagePath: 'images/'
  });

  var cache = {};

  jQuery.tmpl = function tmpl(str, data) {
    // Figure out if we're getting a template, or if we need to
    // load the template - and be sure to cache the result.
    var fn = !/\W/.test(str) ?
      cache[str] = cache[str] ||
      tmpl(document.getElementById(str).innerHTML) :

      // Generate a reusable function that will serve as a template
      // generator (and which will be cached).
      new Function("obj",
        "var p=[],print=function(){p.push.apply(p,arguments);};" +

        // Introduce the data as local variables using with(){}
        "with(obj){p.push('" +

        // Convert the template into pure JavaScript
        str
        .replace(/[\r\t\n]/g, " ")
        .split("<%").join("\t")
        .replace(/((^|%>)[^\t]*)'/g, "$1\r")
        .replace(/\t=(.*?)%>/g, "',$1,'")
        .split("\t").join("');")
        .split("%>").join("p.push('")
        .split("\r").join("\\'") + "');}return p.join('');");

    // Provide some basic currying to the user
    return data ? fn(data) : fn;
  };

  //banner slider height window height
  //(top banner height + logo height + main menu height )
  banner_slider_height = $(window).outerHeight() - 285;
  banner_slider_height = (banner_slider_height < 540) ? 540 : banner_slider_height;
  $("#templatemo_banner_slide > div").height(banner_slider_height);
  $("#templatemo_banner_slide").height(banner_slider_height);
  $(window).resize(function() {
    banner_slider_height = $(window).outerHeight() - 285;
    banner_slider_height = (banner_slider_height < 540) ? 540 : banner_slider_height;
    $("#templatemo_banner_slide > div").height(banner_slider_height);
    $("#templatemo_banner_slide").height(banner_slider_height);
  });
  //banner slider caption margin top
  //(window height - (top banner height + logo height + main menu height ) - caption height ) / 2
  banner_h1_margin_top = (($(window).height() - 280) - 285) / 2;
  $(".camera_caption h1").css("marginTop", banner_h1_margin_top);
  $(window).resize(function() {
    banner_h1_margin_top = (($(window).height() - 280) - 285) / 2;
    $(".camera_caption h1").css("marginTop", banner_h1_margin_top);
  });
  //mobile menu and desktop menu
  hide_left = $(document).width();
  $("#mobile_menu").css({
    left: hide_left
  });
  $("#mobile_menu").hide();
  $("#mobile_menu_btn a").click(function() {
    if ($('#mobile_menu').is(':visible')) {
      hide_left = $(document).width();
      $("#mobile_menu").animate({
        left: hide_left
      }, 1000, function() {
        $("#mobile_menu").hide();
      });
    } else {
      $("#mobile_menu").show();
      show_left = $(document).width() - 250;
      $("#mobile_menu").animate({
        left: show_left
      }, 1000);
    }
    return false;
  });
  jQuery.fn.anchorAnimate = function(settings) {
      settings = jQuery.extend({
        speed: 1100
      }, settings);
      return this.each(function() {
        var caller = this
        $(caller).click(function(event) {
          event.preventDefault();
          var locationHref = window.location.href;
          var elementClick = $(caller).attr("href");
          var destination = $(elementClick).offset().top;
          $("#menu_mobile_list").fadeOut();
          $("html,body").stop().animate({
            scrollTop: destination
          }, settings.speed, function() {
            // Detect if pushState is available
            if (history.pushState) {
              history.pushState(null, null, elementClick);
            }
          });
          return false;
        });
      });
    }
    //animate scroll function calll
  $("#mobile_menu a").anchorAnimate();
  //main menu auto select and animate scroll
  $("#templatemo_main_menu ul").singlePageNav({
    offset: jQuery('#templatemo_main_menu').outerHeight()
  });
  //define main menu position
  if ($(document).scrollTop() > ($(window).height() - 105)) {
    $("#templatemo_main_menu").css({
      "position": "fixed",
      "top": "0"
    });
  } else {
    menu_top = $(window).height() - 105;
    $("#templatemo_main_menu").css({
      "position": "absolute",
      "top": menu_top
    });
  }
  $(window).scroll(function() {
    if ($(this).scrollTop() > ($(this).height() - 105)) {
      $("#templatemo_main_menu").css({
        "position": "fixed",
        "top": "0"
      });
    } else {
      menu_top = $(this).height() - 105;
      $("#templatemo_main_menu").css({
        "position": "absolute",
        "top": menu_top
      });
    }
  });
  $(window).resize(function() {
    if ($(this).scrollTop() > ($(this).height() - 105)) {
      $("#templatemo_main_menu").css({
        "position": "fixed",
        "top": "0"
      });
    } else {
      menu_top = $(this).height() - 105;
      $("#templatemo_main_menu").css({
        "position": "absolute",
        "top": menu_top
      });
    }
  });
  //event
  $(document).scroll(function() {
    document_top = $(document).scrollTop();
    event_wapper_top = $("#templatemo_upcomming_event").position().top;
    if (document_top < event_wapper_top) {
      event_animate_num = event_wapper_top - document_top;
      event_animate_alpha = (1 / event_wapper_top) * (document_top);
      $("#templatemo_upcomming_event .event_animate_left").css({
        'left': -event_animate_num,
        'opacity': event_animate_alpha
      });
      $("#templatemo_upcomming_event .event_animate_right").css({
        'left': event_animate_num,
        'opacity': event_animate_alpha
      });
    } else {
      $("#templatemo_upcomming_event .event_animate_left").css({
        'left': 0,
        'opacity': 1
      });
      $("#templatemo_upcomming_event .event_animate_right").css({
        'left': 0,
        'opacity': 1
      });
    }

  });

  //blog
  $(document).scroll(function() {
    document_top = $(document).scrollTop() - 2000;
    event_wapper_top = $("#templatemo_blog").position().top - 2110;
    if (document_top < event_wapper_top) {
      event_animate_num = event_wapper_top - document_top;
      event_animate_alpha = (1 / event_wapper_top) * (document_top);
      $("#templatemo_blog .event_animate_left").css({
        'left': -event_animate_num,
        'opacity': event_animate_alpha
      });
      $("#templatemo_blog .event_animate_right").css({
        'left': event_animate_num,
        'opacity': event_animate_alpha
      });
    } else {
      $("#templatemo_blog .event_animate_left").css({
        'left': 0,
        'opacity': 1
      });
      $("#templatemo_blog .event_animate_right").css({
        'left': 0,
        'opacity': 1
      });
    }
  });
  //contact
  $(document).scroll(function() {
    document_top = $(document).scrollTop() - 3000;
    event_wapper_top = $("#templatemo_contact").position().top - 3110;
    if (document_top < event_wapper_top) {
      event_animate_alpha = (1 / event_wapper_top) * (document_top);
      $("#templatemo_contact p, #templatemo_contact_map_wapper").css({
        'opacity': event_animate_alpha
      });
    } else {
      $("#templatemo_contact p, #templatemo_contact_map_wapper").css({
        'opacity': 1
      });
    }
  });
  $(".event_box").flip();

  $.getJSON("js/product.json", {}, function(data) {
    var str = "";
    for (var feature in Modernizr) {
      if (typeof Modernizr[feature] === "boolean") {
        str += feature + ":" + Modernizr[feature] + "\n";
      }
    }
    alert(str);
    for (var i = 0; i < data.length; i++) {
      var item = data[i];
      if (Modernizr.csstransitions) {
        var it = $($.tmpl("item_tmpl", item)).flip();
        $("#product_list").append(it);
      } else {
        var it = $($.tmpl("item_tmpl", item));
        $(".event_box").css("min-height", "1100px");
        $("#product_list").append(it);
      }
    }
  });
  // alert( "\ncssanimations: "+Modernizr.cssanimations
  // +"\ncsscolumns: "+Modernizr.csscolumns
  // +"\ncssgradients: "+Modernizr.cssgradients
  // +"\ncssreflections: "+Modernizr.cssreflections
  // +"\ncsstransforms: "+Modernizr.csstransforms
  // +"\ncsstransforms3d: "+Modernizr.csstransforms3d
  // +"\ncsstransitions: "+Modernizr.csstransitions);
});
