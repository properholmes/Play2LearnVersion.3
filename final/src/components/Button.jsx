import {Link} from 'react-router-dom';

function Button( {buttondata} ) { 

    if(buttondata.type === "math") {

        return (
            <a className="btn btn-primary" href={buttondata.src}>Play {buttondata.title}</a>
        )
       
    } else {

        return (
            <Link className="btn btn-primary" to={buttondata.src}>Play {buttondata.title}</Link>
        )

    }

   
}

export default Button