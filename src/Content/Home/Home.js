import AOS from "aos";
import "aos/dist/aos.css";
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
            dataAllDinosaur: null,
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
                dataAllDinosaur: res.data.data,
            });
        })
        .catch((err) => {
            console.log(err.data);
        });
        this.props.background();
        AOS.init({
            duration: 1000
        });
    }

    handleFilter = (e) => {
        e.preventDefault();
        let selectors = document.querySelectorAll('.dino__filter__form select');
        let dataTemp = this.state.dataAllDinosaur;
        let dataDinosaur = [];
        for (let i=0;i<selectors.length;i++){
            let item = selectors[i]; // id of each selector
            if (item.value != 0){
                let anyID = item.value;
                switch (i){
                    case 0:{
                        // Category
                        for (let j=0;j<dataTemp.length;j++){
                            if (dataTemp[j].category.id == anyID){
                                dataDinosaur.push(dataTemp[j]);
                            }
                        }
                        dataTemp = [...dataDinosaur];
                        dataDinosaur = [];
                        break;
                    }
                    case 1:{
                        // Mesozoic
                        for (let j=0;j<dataTemp.length;j++){
                            for (let k=0;k<dataTemp[j].mesozoics.length;k++){
                                if (dataTemp[j].mesozoics[k].id == anyID){
                                    dataDinosaur.push(dataTemp[j]);
                                    break;
                                }
                            }
                        }
                        dataTemp = [...dataDinosaur];
                        dataDinosaur = [];
                        break;
                    }
                    case 2:{
                        // Food
                        for (let j=0;j<dataTemp.length;j++){
                            if (dataTemp[j].diet.id == anyID){
                                dataDinosaur.push(dataTemp[j]);
                            }
                        }
                        dataTemp = [...dataDinosaur];
                        dataDinosaur = [];
                        break;
                    }
                    case 3:{
                        // Location
                        for (let j=0;j<dataTemp.length;j++){
                            for (let k=0;k<dataTemp[j].countries.length;k++){
                                if (dataTemp[j].countries[k].id == anyID){
                                    dataDinosaur.push(dataTemp[j]);
                                    break;
                                }
                            }
                        }
                        dataTemp = [...dataDinosaur];
                        dataDinosaur = [];
                        break;
                    }
                }
            }
        }
        this.setState({
            dataDinosaur: dataTemp,
        }); 
    }

    handleFilterReset = () => {
        this.setState({
            dataDinosaur: this.state.dataAllDinosaur,
        });
    }

    render() {
        
        const {dataCountry,isLoadedCountry,dataMesozoic,dataAllDinosaur,isLoadedMesozoic,dataCategory,isLoadedCategory,dataDiet,isLoadedDiet,isLoadedDinosaur,dataDinosaur} = this.state;
        return (
            <div className='home__board py-4'>
                <div className='row'>
                    <div className='col-lg-12'>
                        <nav aria-label="breadcrumb">
                            <ol className="breadcrumb">
                            <Link  onClick={() => this.props.choose(0)} className="breadcrumb-item dino__breadcum__active" to="/" aria-current="page">Trang chủ</Link>
                                <li className="breadcrumb-item" aria-current="page">Khủng long</li>
                            </ol>
                        </nav>
                    </div>    
                </div>
                <div className='row align-items-start'>
                    <div className='col-lg-12'>
                        <h3 className="text-center">Tìm kiếm thông tin</h3>
                        <hr></hr>
                        <div className='row dino__search bg-white' data-aos="fade-up">
                            <div className='form-group px-4'>
                                <div className='d-flex dino__search__bar'>
                                    <input className='form-control' placeholder='Tìm kiếm theo tên khủng long...'></input>
                                    <button className='btn'><i className="fa-solid fa-magnifying-glass"></i></button>
                                </div>
                            </div>
                        </div>
                        <div className='row justify-content-center dino__filter bg-white mb-3 '  data-aos="fade-up">
                            <form onSubmit={(e) => this.handleFilter(e) } className="row dino__filter__form">
                                <div className='col-lg-2 form-group'>
                                    <h5 className='form-label'>Chủng loại</h5>
                                    <select className="form-select" aria-label="Default select example">
                                        <option value={0}>Tất cả</option>
                                        {
                                            !isLoadedCategory?<option>Loading...</option>:
                                            dataCategory.map((item,index) => {
                                                return <option key={index} value={item.id}>{item.category_name_en}</option>
                                            })
                                        }
                                    </select>
                                    
                                </div>
                                <div className='col-lg-2 form-group'>
                                    <h5 className='form-label'>Niên đại</h5>
                                    <select className="form-select" aria-label="Default select example">
                                        <option value={0}>Tất cả</option>
                                        {
                                            !isLoadedMesozoic?<option>Loading...</option>:
                                            dataMesozoic.map((item,index) => {
                                                return <option key={index} value={item.id}>{item.mesozoic_name_vn}</option>
                                            })
                                        }
                                    </select>
                                    
                                </div>
                                <div className='col-lg-2 form-group'>
                                    <h5 className='form-label'>Thức ăn</h5>
                                    <select className="form-select" aria-label="Default select example">
                                        <option value={0}>Tất cả</option>
                                        {
                                            !isLoadedDiet?<option>Loading...</option>:
                                            dataDiet.map((item,index) => {
                                                return <option key={index} value={item.id}>{item.diet_name_vn}</option>
                                            })
                                        }
                                    </select>
                                    
                                </div>
                                <div className='col-lg-2 form-group'>
                                    <h5 className='form-label'>Khu vực có hóa thạch</h5>
                                    <select className="form-select" aria-label="Default select example">
                                        <option value={0}>Tất cả</option>
                                        {
                                            !isLoadedCountry?<option>Loading...</option>:
                                            dataCountry.map((item,index) => {
                                                return <option key={index} value={item.id}>{item.country_name}</option>
                                            })
                                        }
                                    </select>
                                    
                                </div>
                                <div className='col-lg-2 flex-grow-1 d-flex form-group '>
                                    <button className='btn d-block w-50 me-3 mt-4 rounded-0' type='submit'><i className="fa-solid fa-filter"></i> Tìm kiếm</button>
                                    <button className='btn d-block w-50 mt-4 ms-auto rounded-0' type='reset'  onClick={() => this.handleFilterReset()}><i className="fa-solid fa-share"></i> Đặt lại</button>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className='col-lg-12 dino__content'>
                        <h3 className="text-center">Danh sách các loài khủng long</h3>
                        <hr></hr>
                        <div className='row align-items-end dino__list'>
                            {
                                !isLoadedDinosaur?<div>Loading...</div>:
                                dataDinosaur.map((item,index) => {
                                    return <Link  data-aos="fade-up" key={index} to={"/detail/"+item.dinosaur_name_en+"/"+item.id} className='col-lg-2'>
                                        <div className="card dino__item border-0">
                                            <img src={"http://dinosaur_2022:8000/images/avatars/"+item.image}></img>
                                            <div className='card-body d-flex'>
                                                <div><strong>{item.dinosaur_name_en}</strong></div>
                                                <div className='ms-auto'>
                                                    <i className="fa-solid fa-share-nodes"></i>
                                                </div>
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