import * as _ from 'lodash';
import { Tabs } from './materialize/tabs';
import "./style.scss";
import $ from "jquery";
import { Carousel } from './materialize/carousel';


  $(document).ready(function(){
    var el = document.getElementById("mytabs");
  
    Tabs.init(el, {});

    var elem = document.getElementById('carousel');
    Carousel.init(elem, {
      // specify options here
    });
  
    console.info("loaded...");
  
  });

  
  