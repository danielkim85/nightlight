import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './board.css';

export default class Char extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    console.info('component did mount (board)');
  }

  getCoord = (value) => {
    return ReactDOM
           .findDOMNode(this.refs[value])
           .getBoundingClientRect();;
  }

  createBoard = () => {
    let tiles = [];
    const tilesProp = {
      '1_1' : 'blocked'
    };
    for(let i = 0; i < 5; i++){
      let children = [];
      for (let j = 0; j < 10; j++) {
        const prop = tilesProp[j + '_' + i] ? tilesProp[j + '_' + i] : '';
        const key = 'board_' + j + '_' + i;
        children.push(
          <div key={key}
               ref={key}
               style={{
                 zoom : this.props.scale
               }}
               className={'board ' + prop}>{
            i + ' ' + j
          }</div>
        );
      }
      tiles.push(<tr key={'tr_' + i}>{children}</tr>)
    }

    return tiles;
  }

  render() {
    return (
      <div className={'board-parent'}>
        {this.createBoard()}
        {React.cloneElement(this.props.children, { getCoord: this.getCoord })}
      </div>
    );
  }
}
