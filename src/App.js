import React from 'react';
//import logo from './logo.svg';
import './App.css';

import YouTube from './components/youtube/api.js'
import Char from './components/char/char.js'
import Board from './components/board/board.js'

class App extends React.Component {

  componentDidMount() {
    // On mount, check to see if the API script is already loaded

    if (!window.YT) { // If not, load the script asynchronously
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';

      // onYouTubeIframeAPIReady will load the video after the script is loaded
      window.onYouTubeIframeAPIReady = this.onYouTubeIframeAPIReady;

      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    } else { // If script is already there, load the video directly
      this.onYouTubeIframeAPIReady();
    }
  }

  onYouTubeIframeAPIReady = async () => {
    const youTube = new YouTube('AIzaSyArMLqNzP-hCwsVnRvUzeX0XR8fWEyi6HI');
    /*
    const mostPopular = await youTube.listMostPopular();
    console.info(mostPopular);
    this.player = new window.YT.Player(`player`, {
      videoId: mostPopular.items[0].id,
      events: {
        onReady: this.onPlayerReady,
      },
    });
    */
    console.info('yt player ready');
  };

  onPlayerReady = event => {
    //event.target.playVideo();
  };

  render() {
    return (
      <div className="App">
        {/*<div id="player"></div>*/}
        <div className={'key-help'}>
          ↑  ← ↓ →/ w a s d
        </div>
        <Board scale={3} 
               sizeY={5} 
               sizeX={10}>
          <Char model="15"
                id="mychar"
                tilemap="/assets/char_tilemap.png">foo</Char>
        </Board>
      </div>
    );
  }
}

export default App;
