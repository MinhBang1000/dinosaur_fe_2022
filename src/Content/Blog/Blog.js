import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import 'react-quill/dist/quill.snow.css';
import ReactQuill, { Quill } from "react-quill";
import axios from 'axios';
import AOS from "aos";
import "aos/dist/aos.css";
import ImageUploader from "quill-image-uploader";
Quill.register("modules/imageUploader", ImageUploader);

class Blog extends Component {
    constructor(props){
        super(props);
        this.state = {
            body: "",
            isLoadedDinosaur: false,
            dataDinosaur: null,
            dataAllDinosaur: null,
            isLoadedPost:false,
            dataPost: null,
        };
        this.toolbarOptions = [
            [{header: "1"},{header: "2"},{header: [3,4,5,6]}, {font: []}],
            [{size: []}],
            [{ align: '' }, { align: 'center' }, { align: 'right' }, { align: 'justify' }],
            ["bold","italic","underline","strike","blockquote"],
            [{kist: "ordered"}, {list: "bullet"}],
            ["link","image","video"],
            ["clean"],
            ["code-block"]
        ];
        this.modules = { //cách dùng React Quill upload ảnh ngắn có dấu trang 
            toolbar: this.toolbarOptions,
            imageUploader: {
                upload: file => {
                  return new Promise((resolve, reject) => {
                    const formData = new FormData();
                    formData.append("postImage", file);
                    const config = {
                        headers: { Authorization: `Bearer ${this.props.accessToken}` }
                    };
                    axios.get('http://dinosaur_2022:8000/sanctum/csrf-cookie')
                    .then((res) => {
                        axios.post('http://dinosaur_2022:8000/api/post-image',formData,config)
                        .then((res) => {
                            resolve("http://dinosaur_2022:8000/images/posts/"+res.data.data.post_image_path);
                        })
                        .catch((err) => {
                            console.log(err);
                        });
                    });
                  });
                }
              }
        }
        this.formats = [
            "header",
            "font",
            "size",
            "align",
            "bold",
            "italic",
            "underline",
            "strike",
            "blockquote",
            "list",
            "bullet",
            "link",
            "image",
            "video",
            "code-block"
        ];
    }
    onChangeBody = (html) => {
        this.setState({
            body: html,
        });
    }
    componentDidMount = () => {
        axios.get('http://dinosaur_2022:8000/api/dinosaur')
        .then((res) => {
            this.setState({
                isLoadedDinosaur: true,
                dataDinosaur: res.data.data,
                dataAllDinosaur: res.data.data,
            });
        })
        .catch((err) => {
            console.log(err.data);
        });

        axios.get('http://dinosaur_2022:8000/api/post')
        .then((res) => {
            this.setState({
                isLoadedPost: true,
                dataPost: res.data.data,
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
    onShowHideWriteBlog = (e) => {
        let div = document.querySelector('.dino__blog__write');
        if (div.classList.contains("dino__blog__active")){
            div.classList.remove("dino__blog__active");
        }else{
            div.classList.add("dino__blog__active");
        }
        if (e.target.classList.contains('dino__blog__write__toggle__active')){
            e.target.classList.remove('dino__blog__write__toggle__active');
        }else{
            e.target.classList.add('dino__blog__write__toggle__active');
        }
    }
    handleSubmitBlog = () => {
        let fd = new FormData(document.getElementById('blogForm'));
        const config = {
            headers: { Authorization: `Bearer ${this.props.accessToken}` }
        };
        if (this.state.body!=null){ 
            fd.append('postContent',this.state.body);
            fd.append('userID',this.props.userID);
            axios.get('http://dinosaur_2022:8000/sanctum/csrf-cookie')
            .then((res) => {
                axios.post('http://dinosaur_2022:8000/api/post',fd,config)
                .then((res) => {
                    console.log(res);
                })
                .catch((err) => {
                    console.log(err);
                });
            });
        }else{
            alert("You must write something for blog content! Please check them again");
        }
    }

      
    render() {
        const {isLoadedDinosaur, isLoadedPost, dataPost, dataAllDinosaur, dataDinosaur} = this.state;
        return (
            <div className='blog__board py-4'>
                <div className='row'>
                    <div className='col-lg-12'>
                        <nav aria-label="breadcrumb">
                            <ol className="breadcrumb">
                                <Link  onClick={() => this.props.choose(0)} className="breadcrumb-item dino__breadcum__active" to="/" aria-current="page">Trang chủ</Link>
                                <li className="breadcrumb-item" aria-current="page">Viết bài    </li>
                            </ol>
                        </nav>
                    </div>    
                </div>
                <div className='row dino__blog__list bg-white pt-3' data-aos="fade-up">
                    <div className='mb-3 dino__blog__write '  >
                        <div className='dino__write__item mb-4'>
                            <h4 className='text-center'><i className="fa-solid fa-feather-pointed"></i> Tạo bài viết </h4>
                        </div>
                        <div className='dino__write__item'>
                            <form action='' method='POST' id='blogForm' onSubmit={(e)=>{e.preventDefault()}}>
                                <div className='form-group mb-3'>
                                    <label className='form-label'>Tên bài viết <strong className='text-danger'>(*)</strong></label>
                                    <input className='form-control' name='postTitle' placeholder='Nguyễn Văn An ....' type="text" ></input>
                                </div>
                                <div className='form-group mb-3'>
                                    <label for="formFile" className="form-label">Hình ảnh đại diện <strong className='text-danger'>(*)</strong></label>
                                    <input className="form-control" type="file" name='postAvatar' />
                                </div>
                                <div className='form-group mb-3'>
                                    <label className='form-label'>Các loài khủng long có liên quan</label>
                                    <input className='form-control' name='postName' placeholder='Tìm kiếm ...' type="text"></input>
                                    <div className='rounded-0 form-control border-top-0' id='dinosaurRelate'>
                                        {
                                            !isLoadedDinosaur?<div>Loading...</div>:dataDinosaur.map((item,index) => {
                                                return <div className="form-check" key={index}>
                                                <input className="form-check-input post__relate" type="checkbox" name='postRelate[]' value={item.id} id="flexCheckDefault" />
                                                <label className="form-check-label" htmlFor="flexCheckDefault">
                                                  {item.dinosaur_name_en}
                                                </label>
                                              </div>
                                            })
                                        }
                                    </div>
                                </div>
                                <div className='form-group mb-3'>
                                    <label className='form-label'>Nội dung <strong className='text-danger'>(*)</strong></label>
                                    <ReactQuill  
                                        value={this.state.body} 
                                        modules={this.modules} 
                                        onChange={this.onChangeBody} 
                                            
                                    />
                                </div>
                                <div className='form-group mb-3'>
                                    <button className='btn btn-success' onClick={()=>this.handleSubmitBlog()}>Xuất bản bài viết</button>
                                </div>
                            </form>
                        </div> 
                    </div>

                    
                </div>
                {/* style={{backgroundImage: 'url("'++'")'}} */}
            </div>
        );
    }
}

export default Blog;