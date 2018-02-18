import React, {Component} from 'react';
import { Link } from 'react-router-dom';


class ArticleListItem extends Component {
  render() {
    return (
      <div className="article-list-item-wrapper">
        <div className="title">这是一个标题</div>
        <div className="meta">2017-12-29</div>
        <div className="content">
          从未见过如此急骤又持久的秋雨，身体和心情的温度在出门的一瞬间就降到了冰点，瑟瑟发抖。尽管在假期开始前就能预料到美好的时光将会流逝得多么飞快，但是当一切戛然而止的时候，还是显得心理准备不足——难以坦然接受残酷的现实，更不愿立即回归枯燥的生活。好像2017年只剩下83天了，听上去很少，但毕竟也接近365天的四分之一。不知道在一年的尾声中等待我的将是什么，是开怀大笑还是阵痛煎熬。不敢奢望富贵荣华，但求能够寻到初心，认识自己。
        </div>
        <div className="more">
          <Link to="/post/1">>>详情...</Link>
        </div>
      </div>
    );
  }
}

export default ArticleListItem;