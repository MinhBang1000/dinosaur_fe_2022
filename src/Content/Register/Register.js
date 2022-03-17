import axios from 'axios';
import $ from 'jquery';
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { Link } from 'react-router-dom';
import AOS from "aos";
import "aos/dist/aos.css";
class Register extends Component {

    constructor(props){
        super(props);
        this.state = {
            isRegistered: false,
        };
    }

    // http://dinosaur_2022:8000/api/register

    handleRegister = () => { 
        let fd = new FormData(document.getElementById('registerForm'));
        axios.get('http://dinosaur_2022:8000/sanctum/csrf-cookie')
        .then((res) => {
            axios.post('http://dinosaur_2022:8000/api/register',fd)
            .then((res) => {
                // Cập nhật tình trang logging và token
                let accessToken = res.data.data.accessToken;
                let userID = res.data.data.userID;
                this.props.logged(accessToken,userID);  
                this.props.choose(0);
                this.setState({
                    isRegistered: true,
                });
                this.props.save(userID,accessToken);
            })
            .catch((err) => {
                console.log(err);
            });
        });
    }

    componentDidMount = () => {
        this.props.background();
        AOS.init({
            duration: 1000,
        });
    }


    render() {
        
        const {isRegistered} = this.state;
        let token = $('meta[name="csrf-token"]').attr('content');
        return (
            <div className='register__board py-4'>
                {
                    isRegistered?<Redirect to="/" />:""
                }
                <div className='row'>
                    <div className='col-lg-12'>
                        <nav aria-label="breadcrumb">
                            <ol className="breadcrumb">
                                <Link  onClick={() => this.props.choose(0)} className="breadcrumb-item dino__breadcum__active" to="/" aria-current="page">Trang chủ</Link>
                                <li className="breadcrumb-item" aria-current="page">Đăng ký</li>
                            </ol>
                        </nav>
                    </div>    
                </div>

                <div className='row'>
                    <div className='col-lg-4  my-5 mx-auto  dino__register__list' data-aos="fade-up">
                        <h4 className='text-center my-5'>Đăng ký</h4>
                        <form id='registerForm' method='POST' action='' onSubmit={(e) => {e.preventDefault()}}>
                            <div className='form-group mb-3'>
                                <label className='form-label'>Tên đăng nhập</label>
                                <input className='form-control' name="registerUsername" placeholder='Nguyễn Văn An' required type='text'/>
                            </div>
                            <div className='form-group mb-3'>
                                <label className='form-label'>Mật khẩu</label>
                                <input className='form-control' name="registerPassword" placeholder='Nhập mật khẩu' required type='password'/>
                            </div>
                            <div className='form-group mb-3'>
                                <label className='form-label'>Nhập lại mật khẩu</label>
                                <input className='form-control' name='registerConfirm' required placeholder='Nhập lại' type='password'/>
                            </div>
                            <div className='form-group mb-3'>
                                <label className='form-label'>Họ và tên</label>
                                <input className='form-control' name='registerName' placeholder='Nhập họ và tên' required type='text'/>
                            </div>
                            <div className='form-group mb-3'>
                                <label className='form-label'>Năm sinh</label>
                                <input className='form-control' name='registerBorn' placeholder='Nhập năm sinh' required type='number' min={1900}/>
                            </div>
                            <div className='form-group mb-3'>
                                <label className='form-label d-block'>Giới tính</label>
                                <div className="form-check form-check-inline">
                                    <input className="form-check-input" type="radio" name="registerGender" value='Male' />
                                    <label className="form-check-label" htmlFor="inlineRadio2">Nam</label>
                                </div>
                                <div className="form-check form-check-inline">
                                    <input className="form-check-input" type="radio" name="registerGender" value='Female' />
                                    <label className="form-check-label" htmlFor="inlineRadio2">Nữ</label>
                                </div>
                                <div className="form-check form-check-inline">
                                    <input className="form-check-input" type="radio" name="registerGender" value='Other' />
                                    <label className="form-check-label" htmlFor="inlineRadio2">Khác</label>
                                </div>
                            </div>
                            <div className='form-group mb-5'>
                                <label for="formFile" className="form-label">Hình đại diện</label>
                                <input className="form-control" type="file" name='registerAvatar' />
                            </div>
                            <input type="hidden" name="_token" value={token}></input>
                            <div className='form-group mb-3'>
                                <button className='btn text-white w-100 d-block'  onClick={() => this.handleRegister()} type='submit'>Đăng ký</button>
                            </div>
                        </form>
                        <p className='text-center mb-3'>Hoặc đăng nhập với</p>
                        <div className='mb-5 dino__login__social justify-content-center d-flex'>
                            <i className="fa-brands fa-facebook"></i>
                            <i className="fa-brands fa-twitter"></i>
                            <i className="fa-brands fa-google-plus-g"></i>
                        </div>
                        <div className='mb-3 text-center'>
                            <strong>Bạn đã có tài khoản ?</strong> <Link to="/login">Đăng nhập</Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Register;