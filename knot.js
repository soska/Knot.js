(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
  window.Knot = {
    __bindings: {},
    __data: {},
    bind: function(el, type, property) {
      if (type === "syndicate") {
        this.syndicate(el, property);
        if ((this.__data[property] != null) && (this.__bindings[property].length != null)) {
          return this.__bindings[property].forEach(__bind(function(binding) {
            if (el.hasOwnProperty("value")) {
              return el.value = this.__data[property];
            }
          }, this));
        }
      } else {
        if (typeof this.__bindings[property] === "undefined") {
          this.__bindings[property] = [];
        }
        this.__bindings[property].push({
          el: el,
          type: type
        });
        return this.__data[property] = __bind(function() {
          var matches;
          if (type === "html") {
            return el.innerHTML;
          }
          if (matches = type.match('^style\:(.+)')) {
            return window.getComputedStyle(el)[matches[1]];
          }
        }, this)();
      }
    },
    syndicate: function(el, property) {
      if (el.hasOwnProperty("value")) {
        return $(el).keyup(__bind(function(e) {
          return this.set(property, el.value);
        }, this));
      }
    },
    set: function(property, value) {
      this.__data[property] = value;
      if (this.__bindings[property] != null) {
        return this.__bindings[property].forEach(function(o) {
          var matches;
          if (o.type === "html") {
            return o.el.innerHTML = value;
          } else if (matches = o.type.match('^style\:(.+)')) {
            return o.el.style[matches[1]] = value;
          }
        });
      }
    }
  };
  $.fn.knot = function(type, property) {
    this.each(function() {
      return Knot.bind(this, type, property);
    });
    return this;
  };
}).call(this);
