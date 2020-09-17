import React, { Component } from 'react';
import './char.css';

export default class Char extends Component {
  constructor(props) {
    super(props);

    //global
    this.PIXEL_SIZE = 32;
    this.MOVING_SPEED = 2.5;

    //multiple key support for directions
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

    this.KEY_MAP_SIMPLE = {
      ArrowDown : {
        DIR_POSITION : 0,
        MOVING_POSITION : this.PIXEL_SIZE * -3,
        MOVING_OFFSET : {
          dir : 'top',
          offset : 1
        }
      },
      ArrowUp : {
        DIR_POSITION : this.PIXEL_SIZE * -1,
        MOVING_POSITION : this.PIXEL_SIZE * -2,
        MOVING_OFFSET : {
          dir : 'top',
          offset : -1
        }
      },
      ArrowRight : {
        DIR_POSITION : this.PIXEL_SIZE * -2,
        MOVING_POSITION : this.PIXEL_SIZE * -1,
        MOVING_OFFSET : {
          dir : 'left',
          offset : 1
        },
      },
      ArrowLeft : {
        DIR_POSITION : this.PIXEL_SIZE * -3,
        MOVING_POSITION : this.PIXEL_SIZE * -4,
        MOVING_OFFSET : {
          dir : 'left',
          offset : -1
        },
      }
    };

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
    //if there's an ongoing moving animation OR key unknown, ignore
    const key = this.KEY_MAP[event.key]
    if(this.MOVING_TIMEOUT || !this.KEY_MAP_SIMPLE[key]){
      return;
    }

    if(this.KEY_MAP_SIMPLE[key].MOVING_POSITION !== undefined) {
      let position = this.state.position;
      //initiate moving animation
      const that = this;
      let counter = 0;

      function move() {
        position.y = that.MODEL_Y_POSITION + that.KEY_MAP_SIMPLE[key].MOVING_POSITION;
        //assuming the sprite sheet has 8 animations for directional moving ...
        if(counter >= 8){
          counter = 0;
        }
        position.x = that.PIXEL_SIZE * counter * -1;
        position[that.KEY_MAP_SIMPLE[key].MOVING_OFFSET.dir] += (that.KEY_MAP_SIMPLE[key].MOVING_OFFSET.offset * that.MOVING_SPEED);
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
    //if key unknown, quit
    if(!this.KEY_MAP_SIMPLE[key]){
      return;
    }

    if(this.KEY_MAP_SIMPLE[key].DIR_POSITION !== undefined) {
      //change direction
      let position = this.state.position;
      position.x = this.KEY_MAP_SIMPLE[key].DIR_POSITION;
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
