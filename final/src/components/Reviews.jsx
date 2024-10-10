import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Carousel from "react-bootstrap/Carousel";


function Reviews() {
    // declare useNavigate to navigate to user list after adding user
    let navigate = useNavigate();

    const { user_id } = useParams();

    const [errors, setErrors] = useState([]);

    //create an empty and stateful review object
    const [review, setReview] = useState({
        user_id: user_id,
        review: '',
        featured: 1
    });

    const [allReviews, setAllReviews] = useState([]);

    useEffect(() => {
        // when form is successfully sent
        if (errors.success === 'done') {
            setErrors([]);
            navigate("/");
        }
        // Getting review data for carousel
        const apiURL = 'http://localhost:8888/phpreact/final/backend/reviews.php';
        async function fetchReviews() {
            try {
                const response = await fetch(apiURL);
                const data = await response.json();
                setAllReviews(data);
            } catch (error) {
                console.error('Error fetching reviews:', error);
            }
        }
        fetchReviews();
    }, [errors]);



    // create hnadleChange function to detect typing event on input field
    // match the name of the user object key to the value user types in input field
    const handleChange = (event) => {

        const { name, value } = event.target;

        setReview({
            // spread operator takes user object in-place values and 
            ...review,
            // copy values from input field associated w/ the name of the field into the object values
            [name]: value
        })

    };
    // connect the handleSubmit function to the user.php file in order to facilitate data exchange using an api
    const handleSubmit = async (event) => {

        const apiURL = `http://localhost:8888/phpreact/final/backend/reviews.php?id=${user_id}`;
        event.preventDefault();


        const response = await fetch(apiURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(review)
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
                                {errors.length > 0 && errors.map((error, index) => (
                                    <li className="list-group-item text-danger" key={index}>
                                        {error}
                                    </li>
                                ))}
                            </ul>
                            <form method="POST" onSubmit={handleSubmit} >

                                <div className="mb-3">
                                    <div className="mb-3">
                                        <label htmlFor="review" className="form-label">Your Review:</label>
                                        <textarea id="review" name='review' className="form-control" rows="4" cols="40" onChange={handleChange}>

                                        </textarea>
                                    </div>
                                </div>

                                <div className="mb-3">
                                    <input name="review-button" type="submit" className="btn btn-primary" value="Send Review" />
                                </div>

                            </form>
                        </div>
                    </div>
                </div>

                <Carousel>
                    {allReviews.length > 0 ? (
                        allReviews.map((item, index) => (
                            <Carousel.Item key={index}>
                                <Carousel.Caption>
                                    <p>{item.review}</p>
                                </Carousel.Caption>
                                <img
                                    className="d-block w-100"
                                    src="../src/assets/images/landscape.jpeg"
                                    alt="tu world"
                                    width={1710}
                                    height={315}
                                />
                            </Carousel.Item>
                        ))
                    ) : (
                        <div>Loading reviews...</div>
                    )}
                </Carousel>
            </div>


        </>

    )

}

export default Reviews
