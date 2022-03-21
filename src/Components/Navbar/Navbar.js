import axios from 'axios';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
class Navbar extends Component {
    constructor(props){
        super(props);
        this.state = {
            isLoadedUser: false,
            dataUser: null,
        }
    }
    handleLogout = () => {
        const config = {
            headers: { Authorization: `Bearer ${this.props.accessToken}` }
        };
        axios.get('http://dinosaur_2022:8000/sanctum/csrf-cookie')
        .then((res) => {
            axios.post('http://dinosaur_2022:8000/api/logout/'+this.props.userID,[],config)
            .then((res) => {
                this.props.loggedManage(null,null);
                // this.props.choose(0);
                this.setState({
                    isLoadedUser: false,
                    dataUser: null,
                });
                this.props.remove();
            })
            .catch((err) => {
                console.log(err);
            });
        });
    }  
    render() {
        const isLogged = this.props.logged;
        const {isLoadedUser, dataUser} =  this.state;
        return (
            <nav className="navbar navbar-expand-lg navbar-light bg-light dino__navbar py-0">
                <div className="container-fluid">
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

                            <Link to="/home" className="nav-item dino__navbar__item" onClick={() => this.props.choose(1)}>
                                <div className="nav-link" aria-current="page" >Khủng long</div>
                            </Link>

                            <Link to="/list" className="nav-item  dino__navbar__item" onClick={() => this.props.choose(2)}>
                                <div className="nav-link" aria-current="page" >Kiến thức</div>
                            </Link>

                            {
                                !isLogged?"":<Link to="/blog" className="nav-item  dino__navbar__item" onClick={() => this.props.choose(3)}>
                                    <div className="nav-link" aria-current="page">Viết bài</div>
                                </Link>
                            }

                            {
                                !isLogged?<Link to="/post" className="nav-item  dino__navbar__item" onClick={() => this.props.choose(3)}>
                                <div className="nav-link" aria-current="page">Tạp chí</div>
                                </Link>:<Link to="/post" className="nav-item  dino__navbar__item" onClick={() => this.props.choose(4)}>
                                    <div className="nav-link" aria-current="page">Tạp chí</div>
                                </Link>
                            }

                            {
                                !isLogged?<Link to="/login" className="nav-item  dino__navbar__item" onClick={() => this.props.choose(4)}>
                                        <div className="nav-link" aria-current="page" >Đăng nhập</div>
                                    </Link>:                            <div className="nav-item dropdown dino__toggle">
                                <div className="nav-link dropdown-toggle" id="dinoNavbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    
                                        <img src={"http://dinosaur_2022:8000/images/users/"+window.localStorage.getItem('avatar')}></img>
                                        <span>{window.localStorage.getItem('name')}</span>
                                    
                                    <i class="bi bi-person-hearts"></i>
                                </div>
                                <ul className="dropdown-menu" aria-labelledby="dinoNavbarDropdown">
                                    <li><Link to="/profile" className="dropdown-item" ><i className="fa-solid fa-user-astronaut"></i> Tài khoản</Link></li>
                                    <li><Link to="/post" className="dropdown-item" ><i className="fa-solid fa-signs-post"></i> Bài viết của tôi</Link></li>
                                    <li><Link to="/post" className="dropdown-item" ><i className="fa-solid fa-bookmark"></i> Bookmark</Link></li>
                                    <li><Link to="/post" className="dropdown-item" ><i className="fa-solid fa-box-open"></i> Đóng góp của tôi</Link></li>
                                    <li><hr className="dropdown-divider" /></li>
                                    <li><div onClick={() => this.handleLogout()} role="button" className="dropdown-item text-danger"><i className="fa-solid fa-power-off"></i> Đăng xuất</div></li>
                                </ul>
                            </div>
                            }

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