import 'tinymce/tinymce.js';
import 'tinymce/themes/modern';
import 'tinymce/skins/lightgray/skin.min.css';
import './plugins';

tinymce.addI18n('zh_CN', {
  'File': '文件',
  'Edit': '编辑',
  'Cut': '剪切',
  'Copy': '复制',
  'Paste': '粘贴',
  'Paste as text': '粘贴为文字',
  'Select all': '选择全部',
  'New document': '新建',
  'Source code': '源代码',
  'View': '查看',
  'Format': '格式',
  'Italic': '斜体',
  Underline: '下划线',
  Strikethrough: '删除线',
  'Superscript': '上标',
  'Subscript': '下标',
  'Blocks': '文字格式',
  'Paragraph': '普通段落',
  'Heading 1': '标题1',
  'Heading 2': '标题2',
  'Heading 3': '标题3',
  'Heading 4': '标题4',
  'Heading 5': '标题5',
  'Heading 6': '标题6',
  Align: '对齐方式',
  Left: '左对齐',
  Center: '居中',
  Right: '右对齐',
  Justify: '自动',
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
  Insert: '插入',
  Image: '图片',
  Link: '超链接',
  Table: '表格',
  'Could not find the specified string.': '没有找到指定内容。'
});

export default {
  plugins: 'code searchreplace autoresize link table wlog_autofloat wlog_image',
  toolbar: 'code | undo redo | searchreplace link table wlog_image',
  statusbar: false,
  resize: false,
  // menubar: '',
  paste_data_images: true,
  paste_preprocess: function (_plugin, e) {
    e.content = e.content.replace(/<br \/>/g, '</p><p>');
  },
  content_style: `
  * { font-size: 16px; color: #333;}
  `,
  skin: 'lightgray',
  skin_url: '/static/skins/lightgray',
  autoresize_min_height: 400,
  autofloat_top_offset: 60,
  convert_urls: false,
  setup: () => {
    console.log('editor initialized');
  }
}