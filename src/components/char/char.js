import React, { Component } from 'react';
import './char.css';

export default class Char extends Component {
  constructor(props) {
    super(props);

    //global
    this.PIXEL_SIZE = 32;
    this.MOVING_SPEED = 2.5;
    this.KEY_MAP = {
      ArrowDown : 'ArrowDown',
      ArrowUp : 'ArrowUp',
      ArrowRight : 'ArrowRight',
      ArrowLeft : 'ArrowLeft',
      w:'ArrowUp',
      a:'ArrowLeft',
      s:'ArrowDown',
      d:'ArrowRight'
    }

    // TODO : Merge the below three global obj
    this.DIR_POSITION = {
      ArrowDown : 0,
      ArrowUp : this.PIXEL_SIZE * -1,
      ArrowRight : this.PIXEL_SIZE * -2,
      ArrowLeft : this.PIXEL_SIZE * -3
    }
    this.MOVING_POSITION = {
      ArrowRight : this.PIXEL_SIZE * -1,
      ArrowUp : this.PIXEL_SIZE * -2,
      ArrowDown : this.PIXEL_SIZE * -3,
      ArrowLeft : this.PIXEL_SIZE * -4
    }
    this.MOVING_OFFSET= {
      ArrowRight : {
        dir : 'left',
        offset : 1
      },
      ArrowLeft : {
        dir : 'left',
        offset : -1
      },
      ArrowDown : {
        dir : 'top',
        offset : 1
      },
      ArrowUp : {
        dir : 'top',
        offset : -1
      }
    }

    this.MOVING_TIMEOUT = undefined;
    //this is how the vertical pos is picked for the sprite sheet on which char model is desired.
    this.MODEL_Y_POSITION = this.PIXEL_SIZE * this.props.model * -5;

    //state
    this.state = {
      tilemap : this.props.tilemap,
      position : {
        x : 0,
        y : this.MODEL_Y_POSITION,
        left : 0,
        top : 0
      }
    }
  }

  componentDidMount() {
    document.addEventListener("keydown", this.handleKeyDown, false);
    document.addEventListener("keyup", this.handleKeyUp, false);
  }

  handleKeyDown = (event) => {
    //if there's an ongoing moving animation, ignore.
    if(this.MOVING_TIMEOUT){
      return;
    }

    const key = this.KEY_MAP[event.key]
    if(this.MOVING_POSITION[key] !== undefined) {
      let position = this.state.position;
      //initiate moving animation
      const that = this;
      let counter = 0;

      function move() {
        position.y = that.MODEL_Y_POSITION + that.MOVING_POSITION[key];
        //assuming the sprite sheet has 8 animations for directional moving ...
        if(counter >= 8){
          counter = 0;
        }
        position.x = that.PIXEL_SIZE * counter * -1;
        position[that.MOVING_OFFSET[key].dir] = position[that.MOVING_OFFSET[key].dir] + (that.MOVING_OFFSET[key].offset * that.MOVING_SPEED);
        that.setState({
          position: position
        });
        counter++;
      }

      move();
      this.MOVING_TIMEOUT = setInterval(function() {
        move();
      },125);

    }
  }

  handleKeyUp = (event) => {
    clearTimeout(this.MOVING_TIMEOUT);
    //clearing timeout doesn't set this to undefined, so we are going to force it.
    this.MOVING_TIMEOUT = undefined;

    const key = this.KEY_MAP[event.key]
    if(this.DIR_POSITION[key] !== undefined) {
      //change direction
      let position = this.state.position;
      position.x = this.DIR_POSITION[key];
      position.y = this.MODEL_Y_POSITION;
      this.setState({
        position : position
      });
    }
  }

  render() {
    return (
      <div className="char"
           alt="nada"
           style={{
             width:this.PIXEL_SIZE + 'px',
             height:this.PIXEL_SIZE + 'px',
             backgroundImage : 'url(' + this.state.tilemap + ')',
             zoom : this.props.scale,
             backgroundPositionX : this.state.position.x + 'px',
             backgroundPositionY : this.state.position.y + 'px',
             position : 'relative',
             left : this.state.position.left + 'px',
             top : this.state.position.top + 'px'
           }}
      />
    );
  }
}
