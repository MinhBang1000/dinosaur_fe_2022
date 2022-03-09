import React, { Component } from 'react';
import { Link } from 'react-router-dom';
class Register extends Component {
    render() {
        return (
            <div className='register__board py-4'>
                <div className='row'>
                    <div className='col-lg-12'>
                        <nav aria-label="breadcrumb">
                            <ol className="breadcrumb">
                                <Link className="breadcrumb-item dino__breadcum__active" to="/" aria-current="page">Trang chủ</Link>
                                <li className="breadcrumb-item" aria-current="page">Đăng ký</li>
                            </ol>
                        </nav>
                    </div>    
                </div>
            </div>
        );
    }
}

export default Register;