const React = require('react')
const input = '# This is a header\n\nAnd this is a paragraph'

require('codemirror/lib/codemirror.css') // codemirror
require('tui-editor/dist/tui-editor.css'); // editor ui
require('tui-editor/dist/tui-editor-contents.css'); // editor content
require('highlight.js/styles/github.css'); // code block highlight

const Editor = require('tui-editor');

class EditMD extends React.Component {

  constructor(props) {
    super(props);
    this.container = null;
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.value !== this.props.value) {
      this.editor.setValue(nextProps.value);
    }
  }

  shouldComponentUpdate(nextProps) {
    if (this.props.value === nextProps.value) {
      console.log('不更新');
      return false;
    }
    return false;
  }

  componentDidMount = () => {
    const { onChange, value = '' } = this.props;
    this.editor = new Editor({
        el: this.container,
        initialEditType: 'markdown',
        initialValue: value,
        previewStyle: 'vertical',
        height: '500px'
    });
    this.editor.eventManager.listen('contentChangedFromMarkdown', (editor) => {
      onChange && onChange(editor.getValue());
    });
  }
  

  render () {
    return (
      <div ref={node => {this.container = node;}} />
    );
  }

}

export default EditMD;