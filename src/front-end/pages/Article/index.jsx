import React, {Component} from 'react';
import './style.scss';
import Nav from '../../components/Nav';
import ArticleDetail from '../../components/Article';
import Footer from '../../components/Footer';
import ScrollTop from '../../components/ScrollTop';
import { connect } from 'react-redux';
import { ActionCreator } from 'redux';

class Article extends Component {

  componentDidMount() {
    console.log(this.props.match);  
  }

  render () {
    return (
      <div>
        <Nav/>
        <ArticleDetail/>
        <Footer/>
        <ScrollTop />
      </div>
    );
  }
}

export default Article;