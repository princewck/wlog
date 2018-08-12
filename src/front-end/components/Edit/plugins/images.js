import { selectFiles } from '../../../utils';
!function () {

  tinymce.PluginManager.add('wlog_image', function (editor) {
    editor.addButton('wlog_image', {
      icon: 'image',
      tooltip: '插入图片',
      onclick() {
        editor.fire('upload_image');
      }
    });

    // XXX
    editor.on('paste', (e) => {
      // Paste image instead of HTML when copied from Excel
      if (includes(e.clipboardData.types, 'Files')) {
        const getData = e.clipboardData.getData;
        e.clipboardData.getData = function (key) {
          if (key === 'text/html' || key === 'text/plain') return '';
          return getData.call(e.clipboardData, key);
        };
      }
    }, true);

    editor.on('change', () => {
      const dom = editor.dom;
      editor.$('img').each((_i, img) => {
        // Limit maximum loops, just in case
        for (let l = 20; l--;) {
          const p = dom.getParent(img, 'p');
          const parent = img.parentNode;
          if (p && p !== parent && parent.innerHTML.trim() === img.outerHTML) {
            dom.replace(img, parent);
          } else {
            break;
          }
        }
      });
    });

    // 删除本地blob图
    editor.on('GetContent', (e) => {
      const dom = editor.dom;
      const el = dom.create('body');
      el.innerHTML = e.content;
      // Filter local images
      editor.$('img[src]', el).each((_i, img) => {
        /^(data|blob):/.test(img.src) && editor.$(img).remove();
      });
      e.content = el.innerHTML;
    });

  });
}();