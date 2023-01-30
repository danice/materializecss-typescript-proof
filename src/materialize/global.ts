export class M {
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
}

