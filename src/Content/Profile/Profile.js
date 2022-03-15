import axios from 'axios';
import React, { Component } from 'react';
import $ from'jquery';
import { Link } from 'react-router-dom';
import Chart from 'react-google-charts';
import { Redirect } from 'react-router-dom';

class Profile extends Component {
    constructor(props){
        super(props);
        this.state = {
            isLoadedUser: false,
            dataUser: null,
            profileEmail: "Loading...",
            profileName: "Loading...",
            profileBorn: "1970",
            profileGender: "Male",
            profileAvatar: "Loading...",
            redirectHome: false,
        }
    }

    componentDidMount = () => {
        const config = {
            headers: { Authorization: `Bearer ${this.props.accessToken}` }
        };
        axios.get('http://dinosaur_2022:8000/api/user/'+this.props.userID,config)
        .then((res) => {
            this.setState({
                isLoadedUser: true,
                dataUser: res.data.data,
                profileEmail: res.data.data.email,
                profileName: res.data.data.name,
                profileBorn: res.data.data.born,
                profileGender: res.data.data.gender,
                profileAvatar: res.data.data.avatar,
            });
        })
        .catch((err) => {
            console.log(err);
        });
        this.props.background();
    }

    triggerUpload = () => {
        $('#registerAvatar').trigger("click");
    }

    handleEmail = (value) =>{
        this.setState({
            profileEmail: value,
        });
    }

    handleName = (value) =>{
        this.setState({
            profileName: value,
        });
    }

    handleBorn = (value) =>{
        this.setState({
            profileBorn: value,
        });
    }

    handleGender = (value) =>{
        this.setState({
            profileGender: value,
        });
    }

    handleProfile = () => {
        const config = {
            headers: { Authorization: `Bearer ${this.props.accessToken}` }
        };
        let fd = new FormData(document.getElementById('profileForm'));
        axios.get('http://dinosaur_2022:8000/sanctum/csrf-cookie')
        .then((res) => {
            axios.post('http://dinosaur_2022:8000/api/user/'+this.props.userID,fd,config)
            .then((res) => {
                this.setState({
                    isLoadedUser: true,
                    dataUser: res.data.data,
                    profileEmail: res.data.data.email,
                    profileName: res.data.data.name,
                    profileBorn: res.data.data.born,
                    profileGender: res.data.data.gender,
                    profileAvatar: res.data.data.avatar,
                });
            })
            .catch((err) => {
                console.log(err);
            });
        });
    }

    handleLogout = () => {
        const config = {
            headers: { Authorization: `Bearer ${this.props.accessToken}` }
        };
        axios.get('http://dinosaur_2022:8000/sanctum/csrf-cookie')
        .then((res) => {
            axios.post('http://dinosaur_2022:8000/api/logout/'+this.props.userID,[],config)
            .then((res) => {
                this.props.logged(null,null);
                this.props.choose(0);
                this.setState({
                    redirectHome: true,
                    isLoadedUser: false,
                    dataUser: null,
                    profileEmail: "Loading...",
                    profileName: "Loading...",
                    profileBorn: "Loading...",
                    profileGender: "Loading...",
                    profileAvatar: "Loading...",
                });
                this.props.remove();
            })
            .catch((err) => {
                console.log(err);
            });
        });
    }


    render() {
        
        const {dataUser,isLoadedUser} = this.state;
        const options = {
            chart: {
              title: "Biểu đồ đóng góp",
              subtitle: "Loài và Bài viết",
            },
          };
        const data = [
            [
                "Day",
                "Loài khủng long",
                "Bài viết",
            ],
              [1, 80.8, 41.8],
              [2, 69.5, 32.4],
              [3, 57, 25.7],
              [4, 18.8, 10.5],
              [5, 17.6, 10.4],
              [6,13.6, 7.7],
              [7,12.3, 9.6],
              [8, 29.2, 10.6],
              [9, 42.9, 14.8],
              [10, 30.9, 11.6],
              [11,7.9, 4.7],
              [12,8.4, 5.2],
        ]
        return (
            <div className='profile__board py-4'>
                {
                    !this.state.redirectHome?"":<Redirect to='/' />
                }
                <div className='row'>
                    <div className='col-lg-12'>
                        <nav aria-label="breadcrumb">
                            <ol className="breadcrumb">
                                <Link  onClick={() => this.props.choose(0)} className="breadcrumb-item dino__breadcum__active" to="/" aria-current="page">Trang chủ</Link>
                                <li className="breadcrumb-item" aria-current="page">Tài khoản</li>
                            </ol>
                        </nav>
                    </div>    
                </div>
                <div className='row'>
                    <div className='col-lg-4 dino__profile__info'>
                        <h4 className='text-center'>Thông tin cá nhân</h4>
                        <div className='mb-3 dino__profile__avatar'>
                            {
                                !isLoadedUser?<div>Loading...</div>:
                                <img src={'http://dinosaur_2022:8000/images/users/'+dataUser.avatar} onClick={()=>this.triggerUpload()} className="rounded-circle d-block w-50 mx-auto img-thumbnail"></img>
                            }
                        </div>
                        <form id='profileForm' className='mb-3' action='' onSubmit={(e) => {e.preventDefault()}} method='POST'>
                            <input type="hidden" name="_method" value="PUT" />
                            <div className='form-group mb-3'>
                                <label className='form-label'>Tên đăng nhập</label>
                                <input className='form-control'onChange={(e) => this.handleEmail(e.target.value)} name="profileUsername" value={
                                    this.state.profileEmail
                                } placeholder='Nguyễn Văn An' required type='text'/>
                            </div>
                            <div className='form-group mb-3'>
                                <label className='form-label'>Họ và tên</label>
                                <input onChange={(e) => this.handleName(e.target.value)} className='form-control' name='profileName' value={
                                    this.state.profileName
                                } placeholder='Nhập họ và tên' required type='text'/>
                            </div>
                            <div className='form-group mb-3'>
                                <label className='form-label'>Năm sinh</label>
                                <input onChange={(e) => this.handleBorn(e.target.value)}  className='form-control' name='profileBorn' value={
                                    this.state.profileBorn
                                } placeholder='Nhập năm sinh' required type='number' min={1900}/>
                            </div>
                            <div className='form-group mb-3'>
                                <label className='form-label d-block'>Giới tính</label>
                                <div className="form-check form-check-inline">
                                    {
                                        this.state.profileGender=="Male"?<input onClick={(e) => this.handleGender("Male")}  className="form-check-input" type="radio" name="profileGender" checked={true} value='Male' />:<input onClick={(e) => this.handleGender("Male")} className="form-check-input" type="radio" name="profileGender" value='Male' />
                                    }
                                    <label className="form-check-label"  >Nam</label>
                                </div>
                                <div className="form-check form-check-inline">
                                    {
                                        this.state.profileGender=="Female"?<input onClick={(e) => this.handleGender("Female")} className="form-check-input" type="radio" name="profileGender" checked={true} value='Female' />:<input onClick={(e) => this.handleGender("Female")}  className="form-check-input" type="radio" name="profileGender" value='Female' />
                                    }
                                    <label className="form-check-label" >Nữ</label>
                                </div>
                                <div className="form-check form-check-inline">
                                    {
                                        this.state.profileGender=="Other"?<input onClick={(e) => this.handleGender("Other")} className="form-check-input" type="radio" name="profileGender" checked={true} value='Other' />:<input onClick={(e) => this.handleGender("Other")} className="form-check-input" type="radio" name="profileGender" value='Other' />
                                    }
                                    <label className="form-check-label" >Khác</label>
                                </div>
                            </div>
                            <div className='form-group mb-3 d-none'>
                                <label for="formFile" className="form-label">Hình đại diện</label>
                                <input className="form-control" id='registerAvatar' type="file" name='profileAvatar' />
                            </div>
                            <div className='form-group mb-3'>
                                <button className='btn btn-secondary me-2'  onClick={() => this.handleProfile()} type='submit'>Cập nhật</button>
                                <button className='btn btn-danger' onClick={() => this.handleLogout()} type='button'>Đăng xuất</button>
                            </div>
                        </form>
                    </div>

                    <div className='col-lg-8'>
                        <div className='mb-3 row mx-0'>
                            <div className=' col-lg-6'>
                                <div className='text-center dino__profile__post'>
                                    <strong>10 bài viết</strong>
                                </div>
                            </div>
                            <div className=' col-lg-6'>
                                <div className='text-center dino__profile__update'>
                                    <strong>50 loài</strong>
                                </div>
                            </div>
                        </div>
                        <div className='row mx-0'>
                            <div className='col-lg-12'>
                                <div className='dino__profile__favorite'>
                                    <Chart chartType="Line"
                                        width="100%"
                                        height="400px"
                                        data={data}
                                        options={options} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Profile;