import React,{Component} from 'react';
import ArticleListItem from './ArticleListItem';
import './styles.scss';

class ArticleList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      articles: [1,1,1,1,1]
    };
  }

  componentWillReceiveProps(nextProps) {
    const { articles = [1,2,3,4,5] }  = nextProps;
    this.setState({
      articles
    });
  }


  render() {
    const { articles} = this.state;
    return (
      <div className="article-list">
        <div className="article-list-title">
          文章列表
        </div>
        { articles.map((article, index) => (<ArticleListItem key={ index } {...article} />)) }
      </div>
    );
  }
}

export default ArticleList;