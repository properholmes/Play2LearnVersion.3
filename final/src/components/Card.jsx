import Button from './Button'
// create the card for the games, pass in data via props
function Card({ data }) {

    return (

            <div className="card" style={{'maxWidth': '800px'}}>
                <img className="card-img-top" src={data.image}  
                     alt="background image overlay of random numbers" 
                     style={{'maxHeight': '40%'}}/>
                <div className="card-body">
                    <h5 className="card-title">{data.title}</h5>
                    <p className="card-text">{data.description}</p>   
                </div>
                <Button buttondata={data} />
            </div>

    )

}

export default Card