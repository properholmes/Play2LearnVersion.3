import {Link} from 'react-router-dom'

function AnagramBtn(props) {
    return (
       <Link className={props.bootstrapClass} id="playButton" to={props.route}> {props.label}</Link>
    )
}

export default AnagramBtn;
