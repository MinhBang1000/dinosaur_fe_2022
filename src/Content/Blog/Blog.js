import React, { Component } from 'react';
import { Link } from 'react-router-dom';
class Blog extends Component {
    componentDidMount = () => {
        this.props.background();
    }
    render() {
        
        return (
            <div className='blog__board py-4'>
                <div className='row'>
                    <div className='col-lg-12'>
                        <nav aria-label="breadcrumb">
                            <ol className="breadcrumb">
                                <Link  onClick={() => this.props.choose(0)} className="breadcrumb-item dino__breadcum__active" to="/" aria-current="page">Trang chủ</Link>
                                <li className="breadcrumb-item" aria-current="page">Diễn đàn</li>
                            </ol>
                        </nav>
                    </div>    
                </div>
            </div>
        );
    }
}

export default Blog;