import React, {Component} from 'react';
import ArticleList from '../../components/ArticleList';
import NavBar from '../../components/Nav';
import ScrollTop from '../../components/ScrollTop';
import Footer from '../../components/Footer';
import './style.scss';


class Home extends Component {

  render() {
    return (
      <div className="wlog-home-page">
        <NavBar />
        <div className="article-list">
          <ArticleList />
        </div>
        <ScrollTop />
        <Footer/>
      </div>
    );
  }
}
export default Home;