import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Navbar extends Component {
    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top dino__navbar py-0">
                <div className="container">
                    <Link className="navbar-brand d-flex align-items-baseline" to="/">
                        <img src={process.env.PUBLIC_URL+"/Icons/LOGO.svg"} alt="" width={30} height={24} className="d-inline-block align-text-top" />
                        <h2 className='fw-bold m-0'>DINOR</h2>
                    </Link>
                    <button className="navbar-toggler my-2" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon" />
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav flex-grow-1 me-auto mb-2 mb-lg-0 d-flex justify-content-end">
                            <Link to="/" className="nav-item dino__navbar__item active" onClick={() => this.props.choose(0)}>
                                <div className="nav-link" aria-current="page" >Trang chủ</div>
                            </Link>

                            <Link to="/list" className="nav-item  dino__navbar__item" onClick={() => this.props.choose(1)}>
                                <div className="nav-link" aria-current="page" >Kiến thức</div>
                            </Link>

                            <Link to="/login" className="nav-item  dino__navbar__item" onClick={() => this.props.choose(2)}>
                                <div className="nav-link" aria-current="page" >Đăng nhập</div>
                            </Link>
                            
                            <Link to="/register" className="nav-item  dino__navbar__item" onClick={() => this.props.choose(3)}>
                                <div className="nav-link" aria-current="page" >Đăng ký</div>
                            </Link>

                            <Link to="/blog" className="nav-item  dino__navbar__item" onClick={() => this.props.choose(4)}>
                                <div className="nav-link" aria-current="page">Diễn đàn</div>
                            </Link>

                            {/* <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Tài khoản
                                </a>
                                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                    <li><a className="dropdown-item" href="#">Thông tin cá nhân</a></li>
                                    <li><a className="dropdown-item" href="#">Bài viết</a></li>
                                    <li><hr className="dropdown-divider" /></li>
                                    <li><a className="dropdown-item" href="#">Đăng xuất</a></li>
                                </ul>
                            </li> */}

                        </ul>
                    </div>
                </div>
            </nav>
        );
    }
}

export default Navbar;