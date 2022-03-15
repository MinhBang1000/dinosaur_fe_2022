import axios from 'axios';
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { Link } from 'react-router-dom';

class Login extends Component {
    constructor(props){
        super(props);
        this.state = {
            isLogined: false,
        };
    }

    componentDidMount = () => {
        this.props.background();
    }

    handleLogin = () => {
        let fd = new FormData(document.getElementById('loginForm'));
        axios.get('http://dinosaur_2022:8000/sanctum/csrf-cookie')
        .then((res) => {
            axios.post('http://dinosaur_2022:8000/api/login',fd)
            .then((res) => {
                let success = res.data.success;
                if (success){
                    let accessToken = res.data.data.accessToken;
                    let userID = res.data.data.userID;
                    this.props.logged(accessToken,userID);
                    this.setState({
                        isLogined: true,
                    });
                    this.props.choose(0);
                    this.props.save(userID,accessToken);
                }else{
                    alert("Something went wrong, please check your account");   
                }
            })
            .catch((err) => {
                console.log(err);
            })
        });
    }

    render() {
        
        return (
            <div className='login__board py-4'>
                {
                    this.state.isLogined?<Redirect to='/' />:""
                }
                <div className='row'>
                    <div className='col-lg-12'>
                        <nav aria-label="breadcrumb">
                            <ol className="breadcrumb">
                                <Link  onClick={() => this.props.choose(0)} className="breadcrumb-item dino__breadcum__active" to="/" aria-current="page">Trang chủ</Link>
                                <li className="breadcrumb-item" aria-current="page">Đăng nhập</li>
                            </ol>
                        </nav>
                    </div>    
                </div>
                <div className='row'>
                    <div className='col-lg-4 my-5 mx-auto dino__login__list'>
                        <h4 className='text-center my-5'>Đăng nhập</h4>
                        <form id='loginForm' onSubmit={(e) => {e.preventDefault()}} action='' method='POST'>
                            <div className='form-group mb-3'>
                                <label className='form-label'>Tên đăng nhập</label>
                                <input className='form-control' name='loginUsername' placeholder='Nguyễn Văn An' required type='text'/>
                            </div>
                            <div className='form-group mb-5'>
                                <label className='form-label'>Mật khẩu</label>
                                <input className='form-control' name='loginPassword' placeholder='Nhập mật khẩu' required type='password'/>
                            </div>
                            <div className='form-group mb-5'>
                                <button className='btn text-white w-100 d-block' type='submit' onClick={() => this.handleLogin()}>Đăng nhập</button>
                            </div>
                        </form>
                        <p className='text-center mb-3'>Hoặc đăng nhập với</p>
                        <div className='mb-5 dino__login__social justify-content-center d-flex'>
                            <i className="fa-brands fa-facebook"></i>
                            <i className="fa-brands fa-twitter"></i>
                            <i className="fa-brands fa-google-plus-g"></i>
                        </div>
                        <div className='mb-3 text-center'>
                            <strong>Bạn chưa có tài khoản ?</strong> <Link to="/register">Đăng ký</Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Login;