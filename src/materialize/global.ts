import { Carousel } from './carousel';
import { Tabs } from './tabs';

module.exports = {
  Tabs,
  Carousel
}

export class M {   
    Tabs: typeof Tabs = Tabs; 
    Carousel: typeof Carousel = Carousel; 

    static escapeHash(hash) {
        return hash.replace(/(:|\.|\[|\]|,|=|\/)/g, '\\$1');
      }
      
      
      AutoInit(context) {        
        // Use document.body if no context is given
        let root = !!context ? context : document.body;
      
        let registry = {
          Autocomplete: root.querySelectorAll('.autocomplete:not(.no-autoinit)'),
          Carousel: root.querySelectorAll('.carousel:not(.no-autoinit)'),
          Chips: root.querySelectorAll('.chips:not(.no-autoinit)'),
          Collapsible: root.querySelectorAll('.collapsible:not(.no-autoinit)'),
          Datepicker: root.querySelectorAll('.datepicker:not(.no-autoinit)'),
          Dropdown: root.querySelectorAll('.dropdown-trigger:not(.no-autoinit)'),
          Materialbox: root.querySelectorAll('.materialboxed:not(.no-autoinit)'),
          Modal: root.querySelectorAll('.modal:not(.no-autoinit)'),
          Parallax: root.querySelectorAll('.parallax:not(.no-autoinit)'),
          Pushpin: root.querySelectorAll('.pushpin:not(.no-autoinit)'),
          ScrollSpy: root.querySelectorAll('.scrollspy:not(.no-autoinit)'),
          FormSelect: root.querySelectorAll('select:not(.no-autoinit)'),
          Sidenav: root.querySelectorAll('.sidenav:not(.no-autoinit)'),
          Tabs: root.querySelectorAll('.tabs:not(.no-autoinit)'),
          TapTarget: root.querySelectorAll('.tap-target:not(.no-autoinit)'),
          Timepicker: root.querySelectorAll('.timepicker:not(.no-autoinit)'),
          Tooltip: root.querySelectorAll('.tooltipped:not(.no-autoinit)'),
          FloatingActionButton: root.querySelectorAll('.fixed-action-btn:not(.no-autoinit)')
        };
    }

    public static throttle(func, wait, options) {
      let context, args, result;
      let timeout = null;
      let previous = 0;
      options || (options = {});
      let later = function() {
        previous = options.leading === false ? 0 : this.getTime();
        timeout = null;
        result = func.apply(context, args);
        context = args = null;
      };
      return function() {
        let now = this.getTime();
        if (!previous && options.leading === false) previous = now;
        let remaining = wait - (now - previous);
        context = this;
        args = arguments;
        if (remaining <= 0) {
          clearTimeout(timeout);
          timeout = null;
          previous = now;
          result = func.apply(context, args);
          context = args = null;
        } else if (!timeout && options.trailing !== false) {
          timeout = setTimeout(later, remaining);
        }
        return result;
      };
    }

    getTime =  function() {
      return new Date().getTime();
    };
}
