import React, { Component } from 'react';
import axios from 'axios';
import AOS from "aos";
import "aos/dist/aos.css";
import { Link } from 'react-router-dom';
import Carousel from '../../Components/Carousel/Carousel';
class Post extends Component {
    constructor(props){
        super(props);
        this.state = {
            isLoadedPost:false,
            dataPost: null,
            dataAllPost: null,
            searchVal: null,
        };
    }
    componentDidMount = () => {
        axios.get('http://dinosaur_2022:8000/api/post')
        .then((res) => {
            this.setState({
                isLoadedPost: true,
                dataPost: res.data.data,
                dataAllPost: res.data.data,
            });
        })
        .catch((err) => {
            console.log(err);
        });
        AOS.init({
            duration: 1000
        });
        this.props.background();
    }
    searchOnChange = (e) => {
        this.setState({
            searchVal: e.target.value,
        });
    }
    searchSomePost = () => {
        let keywords = this.state.searchVal;
        axios.get('http://dinosaur_2022:8000/api/post-search?postSearch='+keywords)
        .then((res) => {
            console.log(res);
            // this.setState({
            //     isLoadedPost: true,
            //     dataPost: res.data.data,
            // });
        })
        .catch((err) => {
            console.log(err);
        });
    }
    formatDate = (dateString) => {
        const options = { year: "numeric", month: "long", day: "numeric" }
        return new Date(dateString).toLocaleDateString(undefined, options)
    }
    render() {
        const {isLoadedPost,dataPost} = this.state;
        return (
            <div className='post__board py-4'>
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
                
                <div className='row mb-3'>
                    <div className='col-lg-8'>
                    <h4 className='mb-3'>Bài viết mới nhất ...</h4>
                    <div className='row mb-3 d-flex'>
                    {
                        !isLoadedPost?<div>Loading...</div>:
                        dataPost.map((item,index) => {
                            return <Link to={"/post-detail/"+item.id} className='col-lg-6 mb-4 text-decoration-none dino__post__item' key={index}>
                            <div className="card rounded-0 text-dark h-100 " >
                            <div className="card-img-top"
                                style={{ 
                                    backgroundImage: `url(` + 'http://dinosaur_2022:8000/images/avatars/' + `${item.post_avatar})` }}
                            > 

                            </div>
                            <div className="card-body position-relative">
                              <h5 className="card-title">{item.post_title}</h5>
                              {
                                  item.dinosaurs.map((itemDino,indexDino) => {
                                      return <Link className='badge bg-secondary me-2 text' key={indexDino} to={"/detail/"+itemDino.dinosaur_name_en+"/"+itemDino.id}>{itemDino.dinosaur_name_en}</Link>
                                  })
                              } 
                              <Link className='dino__post__user text-decoration-none text-dark'>
                                <div className='dino__post__avatar'
                                    style={{ 
                                        backgroundImage: `url(` + 'http://dinosaur_2022:8000/images/users/' + `${item.user.avatar})` }}
                                >
                                </div>
                                <span>{item.user.name}</span>
                              </Link>
                            </div>
                          </div>
                          </Link>
                          
                        })
                    }
                    </div>
                    </div>
                    <div className='col-lg-4'>
                        <h4 className='mb-3'>Danh mục</h4>
                        <div className='mb-5 dino__blog__search'>
                        <form action='' method='POST' className='d-flex' onSubmit={(e) => {e.preventDefault()}}>
                            <input onChange={(e) => this.searchOnChange(e)} value={this.state.searchVal} className='form-control rounded-0'  placeholder='Tìm kiếm ...'></input>
                            <button onClick={() => this.searchSomePost()} className='btn flex-grow-1 px-5 text-center rounded-0'><i className="fa-solid fa-magnifying-glass"></i></button>
                        </form>
                        <div className='search__blog__suggest'>
                        </div>
                    </div>
                    </div>
                </div>
                <h4 className='text-center mb-3'>Danh sách các bài viết ...</h4>    
                <div className='row mb-3'>
                    
                </div>

            </div>
        );
    }
}

export default Post;