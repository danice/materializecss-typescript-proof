import * as _ from 'lodash';
import { Tabs } from './materialize/tabs';
import "./style.scss";
import $ from "jquery";


  $(document).ready(function(){
    var el = document.getElementById("mytabs");
  
    Tabs.init(el, {});
  
    console.info("loaded...");
  
  });

  
  