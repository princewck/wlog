import React, { Component } from 'react';
import { connect } from 'dva';
import { withRouter } from 'react-router-dom';
import EditComp from '../../components/Edit';
import './style.scss';

const config = {
  height: '500px',
  width: '100%',
};

@withRouter
@connect(state => ({
  article: state.edit.article,
}))
class Edit extends Component {


  constructor(props) {
    super(props);
    const { match = {}, initEdit, dispatch } = this.props;
    const { id } = match.params;
    if (id && id !== 'new') {
      dispatch({
        type: 'edit/init',
        payload: id,
      });
    }
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'edit/setFormat',
      payload: 1,
    })
  }

  onChangeContent = (value) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'edit/changeContent',
      payload: value,
    });
  }

  onTitleChange = (e) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'edit/changeTitle',
      payload: e.target.value,
    });
  }

  onPost = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'edit/publish',
    }).catch(e => {
      alert('发布失败！');
    });
  }

  render() {
    const { article = {} } = this.props;
    return (
      <div>
        <div className="wlog-edit-page">
          <input type="text" placeholder="请输入标题" value={article.title || ''} onChange={this.onTitleChange} />
          <EditComp config={config} onContentChange={this.onChangeContent} initArticle={article} />
          <div className="wlog-edit-page-operators">
            <button type="button" className="publish-btn" onClick={this.onPost}>发布</button>
            <button type="button" className="cancel-btn">取消</button>
            <button type="button" className="draft-btn">存草稿</button>
          </div>
        </div>
      </div>
    );
  }
}

export default Edit;