import TextInput from './TextInput';
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Carousel from "react-bootstrap/Carousel";


function Reviews() {
    // declare useNavigate to navigate to user list after adding user
    let navigate = useNavigate();

    const [errors, setErrors] = useState([]);


    useEffect(() => {
        if (errors.success === 'done') {
            setErrors([]);
            navigate("/admin");
        }
    }, [errors]);

    //create an empty and stateful user object
    const [reviews, setReviews] = useState({
        user_id: '',
        review: '',
        featured: 1
    });


    // create hnadleChange function to detect typing event on input field
    // match the name of the user object key to the value user types in input field
    const handleChange = (event) => {

        const { name, value } = event.target;

        setUser({
            // spread operator takes user object in-place values and 
            ...user,
            // copy values from input field associated w/ the name of the field into the object values
            [name]: value
        })

    };
    // connect the handleSubmit function to the user.php file in order to facilitate data exchange using an api
    const handleSubmit = async (event) => {

        const apiURL = 'http://localhost:8888/phpreact/frontend/backend/users.php';
        event.preventDefault();


        const response = await fetch(apiURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        })
        const data = await response.json();
        setErrors(data);
    }

    return (
        <>
            <div className="card" style={{ 'width': '30rem' }}>
                <div className="card-header">
                    <div className="row">
                        <div className="col-lg-12"><b>Write a Review</b></div>
                        <div className="col-lg-6">

                        </div>
                    </div>
                </div>
                <div className="card-body" >
                    <div className="row">
                        <div className="col-lg-2">&nbsp;</div>
                        <div className="col-lg-8">
                            <ul className='list-group'>
                                {/* {errors.length > 0 && errors.map((error, index) => (
                                    <li className="list-group-item text-danger" key={index}>
                                        {error}
                                    </li>
                                ))} */}
                            </ul>
                            <form method="POST" onSubmit={handleSubmit} >

                                <div className="mb-3">
                                    <div className="mb-3">
                                        <label htmlFor="message">Your Review:</label>
                                        <textarea id="message" name='message' rows="4" cols="40">

                                        </textarea>
                                    </div>
                                </div>

                                <div className="mb-3">
                                    <input name="review" type="submit" className="btn btn-primary" value="Send Review" />
                                </div>

                            </form>
                        </div>
                    </div>
                </div>

                <Carousel>
                    <Carousel.Item>
                        <Carousel.Caption>
                            <p>This is the caption for the first carousel item.</p>
                        </Carousel.Caption>
                        <img
                            className="d-block w-100"
                            src="../src/assets/images/landscape.jpeg"
                            alt="tu world"
                            width={1710}
                            height={315}
                        />

                    </Carousel.Item>
                    <Carousel.Item>
                        <Carousel.Caption>
                            <p>This is the caption for the second carousel item.</p>
                        </Carousel.Caption>
                        <img
                            className="d-block w-100"
                            src="../src/assets/images/landscape.jpeg"
                            alt="hydraulic pumps"
                            width={1710}
                            height={315}
                        />

                    </Carousel.Item>
                    <Carousel.Item>
                        <Carousel.Caption>
                            <p>This is the caption for the third carousel item.</p>
                        </Carousel.Caption>
                        <img
                            className="d-block w-100"
                            src="../src/assets/images/landscape.jpeg"
                            alt="everything industrial"
                            width={1710}
                            height={315}
                        />

                    </Carousel.Item>
                </Carousel>
            </div>


        </>

    )

}

export default Reviews
