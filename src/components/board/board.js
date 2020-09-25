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
    return this[value + '_ref'].getBoundingClientRect();
  }

  createBoard = () => {
    let tiles = [];
    const tilesProp = {
      '1_1' : 'blocked'
    };
    
    for(let i = 0; i < 5; i++){

      for (let j = 0; j < 10; j++) {
        const prop = tilesProp[j + '_' + i] ? tilesProp[j + '_' + i] : '';
        const key = 'board_' + j + '_' + i;
        tiles.push(
          <div key={key}
               ref={ ref => { this[`${key}_ref`] = ref } }
               style={{
                 zoom : this.props.scale
               }}
               className={'board ' + prop}>{
            i + ' ' + j
          }</div>
        );
      }
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
