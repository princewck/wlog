import React, { Component } from 'react';
import Nav from '../../components/Nav';
import Footer from '../../components/Footer';
import EditComp from '../../components/Edit';
import './style.scss';

const config = {
  height: '500px',
  width: '100%',
};

class Edit extends Component {

  render() {
    return (
      <div>
        <Nav />
        <div className="wlog-edit-page">
          <input type="text" placeholder="请输入标题" />
          <EditComp config={ config } />
          <div className="wlog-edit-page-operators">
            <button type="button" className="publish-btn">发布</button>
            <button type="button" className="cancel-btn">取消</button>
            <button type="button" className="draft-btn">存草稿</button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default Edit;