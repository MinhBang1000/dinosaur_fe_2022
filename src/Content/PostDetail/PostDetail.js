import React, { Component } from 'react';
import axios from 'axios';
import AOS from "aos";
import "aos/dist/aos.css";
import { Link } from 'react-router-dom';
class PostDetail extends Component {
    constructor(props){
        super(props);
        this.state = {
            isLoadedPost: false,
            dataPost: null,
        };
    }
    componentDidMount = () => {
        axios.get('http://dinosaur_2022:8000/api/post/'+this.props.match.params.id)
        .then((res) => {
            this.setState({
                isLoadedPost: true,
                dataPost: res.data.data,
            });
            let item = document.getElementById('postDetailContent');
            item.innerHTML = this.state.dataPost.post_content;
        })
        .catch((err) => {
            console.log(err);
        })
        AOS.init({
            duration: 1000
        });
        this.props.background();
    }
    formatDate = (dateString) => {
        const options = { year: "numeric", month: "long", day: "numeric" }
        return new Date(dateString).toLocaleDateString(undefined, options)
    }
    render() {
        const {isLoadedPost,dataPost} = this.state;
        return (
            <div className='blog__board py-4'>
                <div className='row'>
                    <div className='col-lg-12'>
                        <nav aria-label="breadcrumb">
                            <ol className="breadcrumb">
                                <Link  onClick={() => this.props.choose(0)} className="breadcrumb-item dino__breadcum__active" to="/" aria-current="page">Trang chủ</Link>
                                <li className="breadcrumb-item" aria-current="page">
                                    {
                                        !isLoadedPost?<div>Loading...</div>:dataPost.post_title
                                    }
                                </li>
                            </ol>
                        </nav>
                    </div>    
                </div>

                <div className='row bg-white dino__post__main__list'  data-aos="fade-up">
                    <div className='col-lg-10 dino__post__detail__list'>
                        {
                            !isLoadedPost?<div>Loading...</div>:
                            <div className='detail__post__content__header'>
                                <img className='img-fluid rounded-1 mb-3' src={"http://dinosaur_2022:8000/images/avatars/"+dataPost.post_avatar}></img>
                                <h4 className=''>{dataPost.post_title}</h4>
                                <p className='mb-4'><strong>Cập nhật vào: </strong>{this.formatDate(dataPost.created_at)}</p>
                                <h5 className='mb-3'>Nội dung bài viết:</h5>
                            </div>
                        }
                        <div className='mb-3 text-justify detail__post__content__body' id='postDetailContent'>

                        </div>
                    </div>

                    <div className='col-lg-2 dino__post__detail__control'>
                        <div className='detail__control__fixed'>
                            {
                                !isLoadedPost?<div>Loading...</div>:
                                <img className='mb-1' src={'http://dinosaur_2022:8000/images/users/'+dataPost.user.avatar}></img>
                            }
                            {
                                !isLoadedPost?<div>Loading...</div>:
                                <a className='mb-4' href={dataPost.user.id}>{dataPost.user.name}</a>
                            }
                            <span className='mb-4'>
                                <i className="fa-solid fa-hashtag"></i>
                                Theo dõi
                            </span>
                            <span className='mb-4'>
                                <i className="fa-solid fa-bookmark"></i>
                                Bookmark
                            </span>
                            <span className='mb-4'>
                                <i className="fa-solid fa-share"></i>
                                Chia sẻ
                            </span>
                            <span>
                                <i className="fa-solid fa-hand-point-up"></i>
                                Về giữa
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default PostDetail;