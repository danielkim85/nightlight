import React, { Component } from 'react';
import './char.css';

export default class Char extends Component {
  constructor(props) {
    console.info(props);
    super(props);

    //global
    this.PIXEL_SIZE = 32;
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
    this.MOVING_TIMEOUT = undefined;
    this.MODEL_Y_POSITION= this.PIXEL_SIZE * this.props.model * -5;

    //state
    this.state = {
      tilemap : this.props.tilemap,
      position : {
        x:0,
        y:this.MODEL_Y_POSITION
      }
    }
  }

  componentDidMount() {
    document.addEventListener("keydown", this.handleKeyDown, false);
    document.addEventListener("keyup", this.handleKeyUp, false);
  }


  componentDidUpdate() {
    //console.info('component did update');
  }

  handleKeyDown = (event) => {
    if(this.MOVING_TIMEOUT){
      return;
    }
    let position = this.state.position;
    if(this.MOVING_POSITION[event.key] !== undefined) {
      //initiate moving animation
      const that = this;
      let counter = 0;
      function move() {
        position.y = that.MODEL_Y_POSITION + that.MOVING_POSITION[event.key];
        if(counter >= 8){
          counter = 0;
        }
        position.x = that.PIXEL_SIZE * counter * -1;
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
    //clear moving timeout
    console.info('clearing timeout');
    clearTimeout(this.MOVING_TIMEOUT);
    this.MOVING_TIMEOUT = undefined;
    let position = this.state.position;
    if(this.DIR_POSITION[event.key] !== undefined) {
      //change direction
      position.x = this.DIR_POSITION[event.key];
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
           }} />
    );
  }
}
