import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Navbar extends Component {
    constructor(props){
        super(props);

    }
    render() {
        const isLogged = this.props.logged;
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

                            <Link to="/blog" className="nav-item  dino__navbar__item" onClick={() => this.props.choose(2)}>
                                <div className="nav-link" aria-current="page">Diễn đàn</div>
                            </Link>

                            {
                                !isLogged?<Link to="/login" className="nav-item  dino__navbar__item" onClick={() => this.props.choose(3)}>
                                        <div className="nav-link" aria-current="page" >Đăng nhập</div>
                                    </Link>:<Link to="/profile" className="nav-item  dino__navbar__item" onClick={() => this.props.choose(3)}>
                                        <div className="nav-link" aria-current="page" >Tài khoản</div>
                                    </Link>
                            }
                            
                            <div className='ms-3  nav-item dino__navbar__item__search'  data-bs-toggle="modal" data-bs-target="#searchModal">
                                <i className="fa-solid fa-magnifying-glass"></i> Tra cứu
                            </div>

                            
                        </ul>
                    </div>
                </div>
                <div className="modal fade" id="searchModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header d-block">
                                <button type="button" className="btn-close modal__close" data-bs-dismiss="modal" aria-label="Close" />
                                <h4 className='text-center d-block'>Tìm kiếm thông tin</h4>
                            </div>
                            <div className="modal-body">
                                <div className='dino__search__board d-flex'>
                                    <input className='form-control' placeholder='Tìm kiếm ...'></input>
                                    <button className='btn bg-light'><i className="fa-solid fa-magnifying-glass"></i></button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        );
    }
}

export default Navbar;