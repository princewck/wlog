import 'tinymce/tinymce.js';
import 'tinymce/themes/modern/theme.js';
import 'tinymce/skins/lightgray/skin.min.css';
import 'tinymce/plugins/code/plugin.js';
import 'tinymce/plugins/autoresize/plugin.js';
import 'tinymce/plugins/paste/plugin.js';
import 'tinymce/plugins/searchreplace/plugin.js';

import './plugins/autofloat';

tinymce.addI18n('zh_CN', {
  'Source code': '源代码',
  Undo: '撤销 Ctrl+Z',
  Redo: '恢复 Ctrl+Shift+Z',
  Bold: '加粗 Ctrl+B',
  'Clear formatting': '去除格式',
  'Find and replace': '查找替换 Ctrl+F',
  Find: '查找',
  Replace: '替换',
  'Replace all': '全部替换',
  Prev: '上一个',
  Next: '下一个',
  'Replace with': '替换为',
  'Match case': '匹配大小写',
  'Whole words': '完整匹配',
  Ok: '确定',
  Cancel: '取消',
  'Could not find the specified string.': '没有找到指定内容。'
});

export default {
  plugins: 'code searchreplace autoresize paste wlog_autofloat',
  statusbar: false,
  resize: false,
  menubar: '',
  paste_data_images: true,
  paste_preprocess: function (_plugin, e) {
    e.content = e.content.replace(/<br \/>/g, '</p><p>');
  },
  skin: false,
  autoresize_min_height: 500,
  autofloat_top_offset: 60,
  convert_urls: false,
  setup: () => {
    console.log('editor initialized');
  }
}