
  $(document).ready(function(){
    var el = document.getElementById("mytabs");
  
    M.Tabs.init(el, {});

    var elem = document.getElementById('carousel');
    M.Carousel.init(elem, {
      // specify options here
    });
  
    console.info("loaded...");
  
  });

  
  