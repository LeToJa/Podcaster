import { AudioPlayerTypes } from "./types"

const AudioPlayer = ({ url, type }: AudioPlayerTypes) => <>
    <audio controls>
        <source src={url} type={type} />
        Your browser does not support the audio element.
    </audio>
</>

export default AudioPlayer