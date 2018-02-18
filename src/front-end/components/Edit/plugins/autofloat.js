/**
 * @desc Autofloat plugin for TinyMCE
 *
 * This plugin floats the toolbar when page scrolls up.
 *
 * Settings:
 * - autofloat_top_offset {Number} default as 0
 *
 */

!function () {
  var callbacks = function () {
    function update(key) {
      return function () {
        callbacks.forEach(function (item) {
          var cb = item[key];
          cb && cb();
        });
      };
    }
    function add(cb) {
      var i = callbacks.indexOf(cb);
      if (!~i) callbacks.push(cb);
    }
    function remove(cb) {
      var i = callbacks.indexOf(cb);
      if (~i) callbacks.splice(i, 1);
    }
    var callbacks = [];
    document.addEventListener('scroll', update('scroll'), true);
    window.addEventListener('resize', update('resize'), false);
    return {
      add: add,
      remove: remove,
    };
  }();
  tinymce.PluginManager.add('wlog_autofloat', function (editor) {
    editor.on('init', function () {
      var topOffset = editor.settings.autofloat_top_offset || 0;
      var container = editor.getContainer();
      var toolbar = container.querySelector('.mce-toolbar-grp');
      var toolbarBody = toolbar.firstElementChild;
      var floated = false;
      callbacks.add({
        scroll: onScroll,
        resize: onResize,
      });
      editor.on('remove', function () {
        callbacks.remove(onScroll);
      });

      function onResize() {
        if (!floated) return;
        var rect = toolbar.getBoundingClientRect();
        editor.$(toolbarBody).css('width', rect.width);
      }
      function onScroll() {
        var rect = toolbar.getBoundingClientRect();
        var prect = container.getBoundingClientRect();
        if (rect.top < topOffset && prect.bottom > topOffset + rect.height) floatToolbar();
        else fixToolbar();
      }
      function floatToolbar() {
        if (floated) return;
        floated = true;
        var rect = toolbarBody.getBoundingClientRect();
        var css = {
          position: 'fixed',
          left: rect.left,
          top: topOffset,
          width: rect.width,
          backgroundColor: '#f0f0f0',
          padding: '2px 0',
          borderBottom: '1px solid rgba(0,0,0,.2)',
          zIndex: 9999,
        };
        editor.$(toolbar).css('height', toolbarBody.offsetHeight);
        editor.$(toolbarBody).css(css);
      }
      function fixToolbar() {
        if (!floated) return;
        floated = false;
        editor.$(toolbarBody).attr('style', '');
        editor.$(toolbar).css('height', '');
      }
    });
  });
}();
