define([],function(){
    /*!
   * contentloaded.js
   *
   * Author: Diego Perini (diego.perini at gmail.com)
   * Summary: cross-browser wrapper for DOMContentLoaded
   * Updated: 20101020
   * License: MIT
   * Version: 1.2
   *
   * URL:
   * http://javascript.nwbox.com/ContentLoaded/
   * http://javascript.nwbox.com/ContentLoaded/MIT-LICENSE
   *
   */

  // @fn function reference
  return function (fn) {
    var done = false, top = true,

    doc = window.document,
    root = doc.documentElement,
    modern = doc.addEventListener,

    add = modern ? 'addEventListener' : 'attachEvent',
    rem = modern ? 'removeEventListener' : 'detachEvent',
    pre = modern ? '' : 'on',

    init = function(e) {
      if (e.type == 'readystatechange' && doc.readyState != 'complete') return;
      (e.type == 'load' ? window : doc)[rem](pre + e.type, init, false);
      if (!done && (done = true)) fn.call(window, e.type || e);
    },

    poll = function() {
      try { root.doScroll('left'); } catch(e) { setTimeout(poll, 50); return; }
      init('poll');
    };

    if (doc.readyState == 'complete') fn.call(window, 'lazy');
    else {
      if (!modern && root.doScroll) {
        try { top = !window.frameElement; } catch(e) { }
        if (top) poll();
      }
      doc[add](pre + 'DOMContentLoaded', init, false);
      doc[add](pre + 'readystatechange', init, false);
      window[add](pre + 'load', init, false);
    }
  };
});