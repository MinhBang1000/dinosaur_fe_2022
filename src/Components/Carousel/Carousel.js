import React, { Component } from 'react';

class Carousel extends Component {
    render() {
        return (
            <div id="demo" className="carousel slide" data-bs-ride="carousel">
            {/* Indicators/dots */}
            <div className="carousel-indicators">
                <button type="button" data-bs-target="#demo" data-bs-slide-to={0} className="active" />
                <button type="button" data-bs-target="#demo" data-bs-slide-to={1} />
                <button type="button" data-bs-target="#demo" data-bs-slide-to={2} />
            </div>
            {/* The slideshow/carousel */}
            <div className="carousel-inner">
                <div className="carousel-item active">
                <img src={process.env.PUBLIC_URL+"/Images/la.jpg"} alt="Los Angeles" className="d-block" style={{width: '100%'}} />
                <div className="carousel-caption">
                    <h3>Los Angeles</h3>
                    <p>We had such a great time in LA!</p>
                </div>
                </div>
                <div className="carousel-item">
                <img src={process.env.PUBLIC_URL+"/Images/chicago.jpg"} alt="Chicago" className="d-block" style={{width: '100%'}} />
                <div className="carousel-caption">
                    <h3>Chicago</h3>
                    <p>Thank you, Chicago!</p>
                </div> 
                </div>
                <div className="carousel-item">
                <img src={process.env.PUBLIC_URL+"/Images/ny.jpg"} alt="New York" className="d-block" style={{width: '100%'}} />
                <div className="carousel-caption">
                    <h3>New York</h3>
                    <p>We love the Big Apple!</p>
                </div>  
                </div>
            </div>
            {/* Left and right controls/icons */}
            <button className="carousel-control-prev" type="button" data-bs-target="#demo" data-bs-slide="prev">
                <span className="carousel-control-prev-icon" />
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#demo" data-bs-slide="next">
                <span className="carousel-control-next-icon" />
            </button>
            </div>

        );
    }
}

export default Carousel;