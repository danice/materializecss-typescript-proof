
  $(document).ready(function(){
	  $('.tabs').tabs();
    $('.carousel').carousel({
      // specify options here
    });
	  
	  $('input.autocomplete').autocomplete({
      // specify options here
      data: {
        "Apple": null,
        "Microsoft": null,
        "Google": 'https://placehold.it/250x250'
      },
    });
	 /*
    var el = document.getElementById("mytabs");
  
  
    M.Tabs.init(el, {});

    var elem = document.getElementById('carousel');
    M.Carousel.init(elem, {
      // specify options here
    });
	*/
  
    console.info("loaded...");
  
  });

  
  