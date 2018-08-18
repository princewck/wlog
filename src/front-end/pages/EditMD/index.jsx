import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import Editor from '../../components/EditMD';
import Nav from '../../components/Nav';
import Footer from '../../components/Footer';
import * as actions from '../../actions';
import './style.scss';

class EditMD extends Component {

  componentDidMount() {
    const { setFormat } = this.props;
    setFormat(2);
  }


  render() {
    const { article, onChange, onPost }  = this.props;
    return (
      <Fragment>
        {/* <Nav/> */}
        <Editor value={article.content} onChange={onChange}/>
        <div className="wlog-md-edit-page-operators">
          <button type="button" className="publish-btn" onClick={onPost}>发布</button>
          <button type="button" className="cancel-btn">取消</button>
          <button type="button" className="draft-btn">存草稿</button>
        </div>
        {/* <Footer/> */}
      </Fragment>
    );
  }
}

export default connect(state => ({
  article: state.edit.article,
}), 
dispatch => ({
  onChange: content => dispatch(actions.changeContent(content)),
  onPost: () => { dispatch(actions.postArticle()) },
  setFormat: (type) => { dispatch(actions.setArticleFormat(type)); }
}))(EditMD);