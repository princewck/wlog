import React, { Component } from 'react';
import * as actions from '../../actions';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Nav from '../../components/Nav';
import Footer from '../../components/Footer';
import EditComp from '../../components/Edit';
import './style.scss';

const config = {
  height: '500px',
  width: '100%',
};

@withRouter
class Edit extends Component {


  constructor(props) {
    super(props);
    const { match = {}, initEdit } = this.props;
    const { id } = match.params;
    if (id) {
      initEdit(id);
    }

  }

  componentDidMount() {
    const { setFormat } = this.props;
    setFormat(1);
  }

  render() {
    const { onPost, onContentChange, article = {}, onTitleChange } = this.props;
    return (
      <div>
        {/* <Nav /> */}
        <div className="wlog-edit-page">
          <input type="text" placeholder="请输入标题" value={article.title || ''} onChange={onTitleChange} />
          <EditComp config={config} onContentChange={onContentChange} initArticle={article} />
          <div className="wlog-edit-page-operators">
            <button type="button" className="publish-btn" onClick={onPost}>发布</button>
            <button type="button" className="cancel-btn">取消</button>
            <button type="button" className="draft-btn">存草稿</button>
          </div>
        </div>
        {/* <Footer /> */}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { article: state.edit.article };
};

const mapDispatchToProps = dispatch => {
  return {
    onPost: () => { dispatch(actions.postArticle()) },
    onContentChange: (content) => { dispatch(actions.changeContent(content)) },
    onTitleChange: (e) => { dispatch(actions.changeTitle(e.target.value)) },
    setFormat: (type) => { dispatch(actions.setArticleFormat(type)); },
    initEdit: id => { dispatch(actions.initEditArticle(id)) }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Edit);