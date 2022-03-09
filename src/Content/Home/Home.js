import axios from 'axios';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Home extends Component {
    constructor(props){
        super(props);
        this.state = {
            dataCountry: null,
            isLoadedCountry: false,
            dataMesozoic: null,
            isLoadedMesozoic: false,
            dataCategory: null,
            isLoadedCategory: false,
            dataDiet: null,
            isLoadedDiet: false,
            isLoadedDinosaur: false,
            dataDinosaur: null,
        }
    }
    
    componentDidMount = () => {
        axios.get('http://dinosaur_2022:8000/api/country')
        .then((res) => {
            this.setState({
                dataCountry: res.data.data,
                isLoadedCountry: true,
            });
        })
        .catch((err)=>{
            console.log(err.data);
        });

        axios.get('http://dinosaur_2022:8000/api/mesozoic')
        .then((res) => {
            this.setState({
                dataMesozoic: res.data.data,
                isLoadedMesozoic: true,
            });
        })
        .catch((err)=>{
            console.log(err.data);
        });

        axios.get('http://dinosaur_2022:8000/api/category')
        .then((res) => {
            this.setState({
                dataCategory: res.data.data,
                isLoadedCategory: true,
            });
        })
        .catch((err)=>{
            console.log(err.data);
        });

        axios.get('http://dinosaur_2022:8000/api/diet')
        .then((res) => {
            this.setState({
                dataDiet: res.data.data,
                isLoadedDiet: true,
            });
        })
        .catch((err)=>{
            console.log(err.data);
        });

        axios.get('http://dinosaur_2022:8000/api/dinosaur')
        .then((res) => {
            this.setState({
                isLoadedDinosaur: true,
                dataDinosaur: res.data.data,
            });
            console.log(res.data.data);
        })
        .catch((err) => {
            console.log(err.data);
        })
    }

    render() {
        const {dataCountry,isLoadedCountry,dataMesozoic,isLoadedMesozoic,dataCategory,isLoadedCategory,dataDiet,isLoadedDiet,isLoadedDinosaur,dataDinosaur} = this.state;
        return (
            <div className='home__board py-4'>
                <div className='row'>
                    <div className='col-lg-12'>
                        <nav aria-label="breadcrumb">
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item" aria-current="page">Trang chủ</li>
                            </ol>
                        </nav>
                    </div>    
                </div>
                <div className='row align-items-start'>
                    <div className='col-lg-4'>
                        <div className='row dino__search mb-3'>
                            <div className='form-group'>
                                <div className='d-flex mb-2 dino__search__bar'>
                                    <input className='form-control' placeholder='Tìm kiếm ...'></input>
                                    <button className='btn'><i className="fa-solid fa-magnifying-glass"></i></button>
                                </div>
                                <div className='d-flex mb-2'>
                                    {   
                                        !isLoadedDinosaur?<div>Loading...</div>:
                                        dataDinosaur.slice(0,3).map((item,index) => {
                                            return <Link key={index} to={"/detail/"+item.dinosaur_name_en+"/"+item.id} class="badge bg-secondary me-2">{item.dinosaur_name_en}</Link>
                                        })
                                    }
                                </div>
                            </div>
                        </div>
                        <div className='row  dino__filter'>
                            <div className='form-group mb-4'>
                                <h5 className='form-label'><i className="fa-solid fa-file-signature"></i> Chủng loại</h5>
                                <select className="form-select" aria-label="Default select example">
                                    {
                                        !isLoadedCategory?<div>Loading...</div>:
                                        dataCategory.map((item,index) => {
                                            return <option key={index} value={item.id}>{item.category_name_en}</option>
                                        })
                                    }
                                </select>
                            </div>
                            <div className='form-group mb-4'>
                                <h5 className='form-label'><i className="fa-solid fa-earth-americas"></i> Niên đại</h5>
                                <select className="form-select" aria-label="Default select example">
                                    {
                                        !isLoadedMesozoic?<div>Loading...</div>:
                                        dataMesozoic.map((item,index) => {
                                            return <option key={index} value={item.id}>{item.mesozoic_name_vn}</option>
                                        })
                                    }
                                </select>
                            </div>
                            <div className='form-group mb-4'>
                                <h5 className='form-label'><i className="fa-solid fa-apple-whole"></i> Thức ăn</h5>
                                <select className="form-select" aria-label="Default select example">
                                    {
                                        !isLoadedDiet?<div>Loading...</div>:
                                        dataDiet.map((item,index) => {
                                            return <option key={index} value={item.id}>{item.diet_name_vn}</option>
                                        })
                                    }
                                </select>
                            </div>
                            <div className='form-group mb-4'>
                                <h5 className='form-label'><i className="fa-solid fa-map-location-dot"></i> Khu vực</h5>
                                <select className="form-select" aria-label="Default select example">
                                    {
                                        !isLoadedCountry?<div>Loading...</div>:
                                        dataCountry.map((item,index) => {
                                            return <option key={index} value={item.id}>{item.country_name}</option>
                                        })
                                    }
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className='col-lg-8 dino__content'>
                        <h3><i className="fa-solid fa-list"></i> Danh sách loài</h3>
                        <div className='row align-items-end dino__list'>
                            {
                                !isLoadedDinosaur?<div>Loading...</div>:
                                dataDinosaur.map((item,index) => {
                                    return <Link key={index} to={"/detail/"+item.dinosaur_name_en+"/"+item.id} className='card col-lg-3 dino__item border-0'>
                                    <img src={"http://dinosaur_2022:8000/images/avatars/"+item.image}></img>
                                    <div className='card-body d-flex'>
                                        <div><strong>{item.dinosaur_name_en}</strong></div>
                                        <div className='ms-auto'>
                                            <i className="fa-solid fa-share-nodes"></i>
                                        </div>
                                    </div>
                                    </Link>  
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Home;