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
                <div className='row dino__blog__list'>
                    <div className='mb-3 bg-white px-2 dino__blog__write'>
                        <div className='dino__write__item'>
                            <h4 className=''>Tạo bài viết</h4>
                            <i className="fa-solid fa-plus"></i>
                        </div>
                        <div className='dino__write__item'>
                            <form action='' method='POST' onSubmit={(e)=>{e.preventDefault()}}>
                                <div className='form-group mb-3'>
                                    <label className='form-label'>Tên bài viết <strong className='text-danger'>(*)</strong></label>
                                    <input className='form-control' placeholder='Nguyễn Văn An ....' type="text" ></input>
                                </div>
                                <div className='form-group mb-3'>
                                    <label className='form-label'>Thẻ liên quan</label>
                                    <input className='form-control' type="text"></input>
                                </div>
                                <div className='form-group mb-3'>
                                    
                                </div>
                            </form>
                        </div> 
                    </div>
                </div>
            </div>
        );
    }
}

export default Blog;