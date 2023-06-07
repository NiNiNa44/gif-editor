import { Player } from 'video-react';
import { useState, useEffect, useRef} from 'react';
import "video-react/dist/video-react.css"


const VideoPlayer = ({vid, onPlayerChange, onStateChange}) => {

    //const [player, setPlayer] = useState(undefined)
    const [player, setPlayer] = useState(undefined);
    const [playerState, setPlayerState] = useState(undefined);
    //const playerRef = useRef(null);

    useEffect(() => {
        if (playerState) {
            onStateChange(playerState)
            //console.log(playerState)
        }
    }, [playerState])

    useEffect(() => {
        onPlayerChange(player);
        if (player) {
            player.subscribeToStateChange(setPlayerState);
        }
    }, [player]);
    
    return(
        <Player
            ref={(player) => setPlayer(player)}
            fluid
            className='react-player'
            width='100%'
            height='100%'
            >
            <source src={URL.createObjectURL(vid)} />
        </Player>);


}


export default VideoPlayer;