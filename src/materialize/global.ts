import { Autocomplete } from './autocomplete';
import { AutoInit } from './autoinit';
import { Bounding } from './bounding';
import { Carousel } from './carousel';
import { Dropdown } from './dropdown';
import { Edges } from './edges';
import { Tabs } from './tabs';

module.exports = {
  Tabs,
  Carousel,
  Autocomplete,
  Dropdown,
  AutoInit
}

export class M {   
    static version = '1.2.1';
    static keys = {
      TAB: 9,
      ENTER: 13,
      ESC: 27,
      ARROW_UP: 38,
      ARROW_DOWN: 40
    };

  static Tabs: typeof Tabs = Tabs; 
  static Carousel: typeof Carousel = Carousel; 
    
         

/**
 * TabPress Keydown handler
 */
static tabPressed:boolean = false;
static keyDown:boolean = false;
static docHandleKeydown(e) {
  M.keyDown = true;
  if (e.which === M.keys.TAB || e.which === M.keys.ARROW_DOWN || e.which === M.keys.ARROW_UP) {
    M.tabPressed = true;
  }
};
static docHandleKeyup(e) {
  M.keyDown = false;
  if (e.which === M.keys.TAB || e.which === M.keys.ARROW_DOWN || e.which === M.keys.ARROW_UP) {
    M.tabPressed = false;
  }
};
static docHandleFocus(e) {
  if (M.keyDown) {
    document.body.classList.add('keyboard-focused');
  }
};
static docHandleBlur(e) {
  document.body.classList.remove('keyboard-focused');
};

static {
  document.addEventListener('keydown', this.docHandleKeydown, true);
  document.addEventListener('keyup', this.docHandleKeyup, true);
  document.addEventListener('focus', this.docHandleFocus, true);
  document.addEventListener('blur', this.docHandleBlur, true);  
}

static jQueryLoaded(): boolean
{
  return !!(<any>window).jQuery;      
}
 

/**
 * Initialize jQuery wrapper for plugin
 * @param {Class} plugin  javascript class
 * @param {string} pluginName  jQuery plugin name
 * @param {string} classRef  Class reference name
 */
static initializeJqueryWrapper(plugin, pluginName, classRef) {
  if (!this.jQueryLoaded())
    return;
  var jq = (<any>window).jQuery;
  
  jq().fn[pluginName] = function(methodOrOptions) {
    // Call plugin method if valid method name is passed in
    if (plugin.prototype[methodOrOptions]) {
      let params = Array.prototype.slice.call(arguments, 1);

      // Getter methods
      if (methodOrOptions.slice(0, 3) === 'get') {
        let instance = this.first()[0][classRef];
        return instance[methodOrOptions].apply(instance, params);
      }

      // Void methods
      return this.each(function() {
        let instance = this[classRef];
        instance[methodOrOptions].apply(instance, params);
      });

      // Initialize plugin if options or no argument is passed in
    } else if (typeof methodOrOptions === 'object' || !methodOrOptions) {
      plugin.init(this, arguments[0]);
      return this;
    }

    // Return error if an unrecognized  method name is passed in
    jq.error(`Method ${methodOrOptions} does not exist on jQuery.${pluginName}`);
  };
};


/**
 * Generate approximated selector string for a jQuery object
 * @param {jQuery} obj  jQuery object to be parsed
 * @returns {string}
 */
static objectSelectorString(obj) {
  let tagStr = obj.prop('tagName') || '';
  let idStr = obj.attr('id') || '';
  let classStr = obj.attr('class') || '';
  return (tagStr + idStr + classStr).replace(/\s/g, '');
};

// Unique Random ID
static guid():string {
  function s4():string {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();      
}

/**
 * Escapes hash from special characters
 * @param {string} hash  String returned from this.hash
 * @returns {string}
 */
static escapeHash(hash: string): string {
  return hash.replace(/(:|\.|\[|\]|,|=|\/)/g, '\\$1');
}



/**
 * Escapes hash from special characters
 * @param {Element} container  Container element that acts as the boundary
 * @param {Bounding} bounding  element bounding that is being checked
 * @param {Number} offset  offset from edge that counts as exceeding
 * @returns {Edges}
 */
static checkWithinContainer(container: Element, bounding: Bounding, offset: number):Edges  {
  let edges = {
    top: false,
    right: false,
    bottom: false,
    left: false
  };

  let containerRect = container.getBoundingClientRect();
  // If body element is smaller than viewport, use viewport height instead.
  let containerBottom =
    container === document.body
      ? Math.max(containerRect.bottom, window.innerHeight)
      : containerRect.bottom;

  let scrollLeft = container.scrollLeft;
  let scrollTop = container.scrollTop;

  let scrolledX = bounding.left - scrollLeft;
  let scrolledY = bounding.top - scrollTop;

  // Check for container and viewport for each edge
  if (scrolledX < containerRect.left + offset || scrolledX < offset) {
    edges.left = true;
  }

  if (
    scrolledX + bounding.width > containerRect.right - offset ||
    scrolledX + bounding.width > window.innerWidth - offset
  ) {
    edges.right = true;
  }

  if (scrolledY < containerRect.top + offset || scrolledY < offset) {
    edges.top = true;
  }

  if (
    scrolledY + bounding.height > containerBottom - offset ||
    scrolledY + bounding.height > window.innerHeight - offset
  ) {
    edges.bottom = true;
  }

  return edges;
};

static checkPossibleAlignments(el, container, bounding, offset) {
  let canAlign = {
    top: true,
    right: true,
    bottom: true,
    left: true,
    spaceOnTop: null,
    spaceOnRight: null,
    spaceOnBottom: null,
    spaceOnLeft: null
  };

  let containerAllowsOverflow = getComputedStyle(container).overflow === 'visible';
  let containerRect = container.getBoundingClientRect();
  let containerHeight = Math.min(containerRect.height, window.innerHeight);
  let containerWidth = Math.min(containerRect.width, window.innerWidth);
  let elOffsetRect = el.getBoundingClientRect();

  let scrollLeft = container.scrollLeft;
  let scrollTop = container.scrollTop;

  let scrolledX = bounding.left - scrollLeft;
  let scrolledYTopEdge = bounding.top - scrollTop;
  let scrolledYBottomEdge = bounding.top + elOffsetRect.height - scrollTop;

  // Check for container and viewport for left
  canAlign.spaceOnRight = !containerAllowsOverflow
    ? containerWidth - (scrolledX + bounding.width)
    : window.innerWidth - (elOffsetRect.left + bounding.width);
  if (canAlign.spaceOnRight < 0) {
    canAlign.left = false;
  }

  // Check for container and viewport for Right
  canAlign.spaceOnLeft = !containerAllowsOverflow
    ? scrolledX - bounding.width + elOffsetRect.width
    : elOffsetRect.right - bounding.width;
  if (canAlign.spaceOnLeft < 0) {
    canAlign.right = false;
  }

  // Check for container and viewport for Top
  canAlign.spaceOnBottom = !containerAllowsOverflow
    ? containerHeight - (scrolledYTopEdge + bounding.height + offset)
    : window.innerHeight - (elOffsetRect.top + bounding.height + offset);
  if (canAlign.spaceOnBottom < 0) {
    canAlign.top = false;
  }

  // Check for container and viewport for Bottom
  canAlign.spaceOnTop = !containerAllowsOverflow
    ? scrolledYBottomEdge - (bounding.height - offset)
    : elOffsetRect.bottom - (bounding.height + offset);
  if (canAlign.spaceOnTop < 0) {
    canAlign.bottom = false;
  }

  return canAlign;
};

static getOverflowParent(element) {
  if (element == null) {
    return null;
  }

  if (element === document.body || getComputedStyle(element).overflow !== 'visible') {
    return element;
  }

  return this.getOverflowParent(element.parentElement);
};

/**
 * Gets id of component from a trigger
 * @param {Element} trigger  trigger
 * @returns {string}
 */
static getIdFromTrigger(trigger: Element):string {
  let id = trigger.getAttribute('data-target');
  if (!id) {
    id = trigger.getAttribute('href');
    if (id) {
      id = id.slice(1);
    } else {
      id = '';
    }
  }
  return id;
};

/**
 * Multi browser support for document scroll top
 * @returns {Number}
 */
static getDocumentScrollTop():number {
  return window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
};

/**
 * Multi browser support for document scroll left
 * @returns {Number}
 */
static getDocumentScrollLeft():number {
  return window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft || 0;
};

/**
 * @typedef {Object} Edges
 * @property {Boolean} top  If the top edge was exceeded
 * @property {Boolean} right  If the right edge was exceeded
 * @property {Boolean} bottom  If the bottom edge was exceeded
 * @property {Boolean} left  If the left edge was exceeded
 */

/**
 * @typedef {Object} Bounding
 * @property {Number} left  left offset coordinate
 * @property {Number} top  top offset coordinate
 * @property {Number} width
 * @property {Number} height
 */


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

    getTime(): number {
      return new Date().getTime();
    };

          
}


