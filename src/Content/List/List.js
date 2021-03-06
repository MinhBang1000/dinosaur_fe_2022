import AOS from "aos";
import "aos/dist/aos.css";
import axios from 'axios';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import GeoChart from '../../Components/GeoChart/GeoChart';

class List extends Component {
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
            mesozoicLink: 'https://dinosaurpictures.org/ancient-earth/#220',
            geoData : [
                ['Country'],
            ],
        }
    }
    
    componentDidMount = () => {
        axios.get('http://dinosaur_2022:8000/api/country')
        .then((res) => {
            let data = res.data.data;
            let geo = [];
            geo[0] = ['Country'];
            for (let i=0;i<data.length;i++){
                geo[i+1] = [data[i].country_name+""];
            }
            this.setState({
                dataCountry: res.data.data,
                isLoadedCountry: true,
                geoData: geo,
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
        });
        this.props.background();
        AOS.init({
            duration: 1000
        });
    }

    changeMesozoicSelect = (e) => {
        let item = this.state.dataMesozoic[e.target.value].mesozoic_earth;
        this.setState({
            mesozoicLink: 'https://dinosaurpictures.org/ancient-earth/#'+item,
        });
    }

    render() {
        
        const {dataCountry,isLoadedCountry,dataMesozoic,isLoadedMesozoic,dataCategory,isLoadedCategory,dataDiet,isLoadedDiet,isLoadedDinosaur,dataDinosaur} = this.state;
        const mesozoicLink = this.state.mesozoicLink;
        const geoData = this.state.geoData;
        return (
            <div className='list__board py-4'>
                <div className='row'>
                    <div className='col-lg-12'>
                        <nav aria-label="breadcrumb">
                            <ol className="breadcrumb">
                                <Link onClick={() => this.props.choose(0)} className="breadcrumb-item dino__breadcum__active" to="/" aria-current="page">Trang ch???</Link>
                                <li className="breadcrumb-item" aria-current="page">Ki???n th???c</li>
                            </ol>
                        </nav>
                    </div>    
                </div>
                <div className='row dino__list__list' data-aos="fade-up">
                    <div className='mb-3 w-100'>
                        <div className='col-lg-12'>
                            <h4 className='text-center'>Kh???ng long l?? g?? ?</h4>
                            <hr></hr>
                            <div className='mb-3'>
                                Kh???ng long l?? m???t nh??m ?????ng v???t ??a d???ng thu???c nh??nh Dinosauria. Ch??ng b???t ?????u xu???t hi???n v??o k??? Tam ??i???p, 231.4 tri???u n??m tr?????c, v?? l?? nh??m ?????ng v???t c?? x????ng s???ng chi???m ??u th??? trong h??n 135 tri???u n??m, ch??ng bi???n m???t v??o cu???i k??? Ph???n Tr???ng (66 tri???u n??m tr?????c), khi S??? ki???n tuy???t ch???ng k??? Creta-Paleogen d???n ?????n s??? tuy???t ch???ng c???a h???u h???t c??c nh??m kh???ng long v?? k???t th??c ?????i Trung Sinh. C??c ghi nh???n h??a th???ch cho th???y chim ti???n h??a t??? theropoda v??o k??? Jura, do ????, chim ???????c xem l?? m???t ph??n nh??m kh???ng long b???i nhi???u nh?? c??? sinh v???t h???c. V??i lo??i chim s???ng s??t sau s??? ki???n tuy???t ch???ng c??ch ????y 66 tri???u n??m, v?? ch??ng ti???p t???c ph??t tri???n ?????n ng??y nay.
                            </div>
                        </div>
                    </div>

                    <div className='mb-3 w-100 dino__category__list'>
                        <div className='col-lg-12'>
                            <h4 className='text-center'>Kh???ng long g???m bao nhi??u lo???i ?</h4>
                            <hr></hr>
                            <table className='mb-3'>
                                <thead>
                                    <tr>
                                        <th>STT</th>
                                        <th>T??n khoa h???c</th>
                                        <th>M?? t???</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        !isLoadedCategory?<tr><td colSpan={3}>Loading...</td></tr>:
                                        dataCategory.map((item,index) => {
                                            return <tr key={index}>
                                                <td>{index+1}</td>
                                                <td>{item.category_name_en}</td>
                                                <td>{item.category_description_vn}</td>
                                            </tr>
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div className='w-100 mb-3'>
                        <div className='col-lg-12 dino__mesozoic__list'>
                            <h4 className='text-center'>Th???i ?????i m?? ch??ng sinh s???ng ?</h4>
                            <hr></hr>
                            <div className='row'>
                                <div className='col-lg-8 mb-3'>
                                    <table className='dino__mesozoic__table'>
                                        <thead>
                                            <th>STT</th>
                                            <th>T??n khoa h???c</th>
                                            <th>?? ngh??a</th>
                                            <th>Khi b???t ?????u</th>
                                        </thead>
                                        <tbody>
                                        {
                                            !isLoadedMesozoic?<div>Loading...</div>:
                                            dataMesozoic.map((item,index) => {
                                                return <tr key={index}>
                                                    <td>{index+1}</td>
                                                    <td>{item.mesozoic_name_en}</td>
                                                    <td>{item.mesozoic_name_vn}</td>
                                                    <td>{item.mesozoic_start}</td>
                                                </tr>
                                            })
                                        }
                                        </tbody>
                                    </table>
                                </div>
                                <div className='col-lg-4 mb-3 d-flex flex-column'>
                                    <div className='form-group mb-2 d-flex align-items-baseline'>
                                        <label className='form-label me-3'>Ni??n ?????i</label>
                                        <select className='form-inline-control flex-grow-1' onChange={(e) => this.changeMesozoicSelect(e)}>
                                            {
                                                !isLoadedMesozoic?<option value={false}>Loading...</option>:
                                                dataMesozoic.map((item,index) => {
                                                    return <option key={index} value={index}>{item.mesozoic_name_en} ~ {item.mesozoic_start} tri???u n??m tr?????c</option>
                                                })
                                            }
                                        </select>
                                    </div>
                                    <iframe key={this.state.mesozoicLink} className='d-block w-100 flex-grow-1 list__mesozoic__iframe' src={mesozoicLink} title="DINOWHEN"></iframe>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='w-100 mb-3'>
                        <div className='col-lg-12 dino__country__list'>
                            <h4 className='text-center'>Nh???ng n??i t??m th???y h??a th???ch c???a ch??ng ?</h4>
                            <hr></hr>
                            <div className='mb-3 w-100'>
                                C??c lo??i kh???ng long tr??n th??? gi???i v???n c??n r???t nhi???u. Theo th???ng k?? cho ?????n hi???n nay c??c h??a th???ch c???a ch??ng ch??? v???a m???i ???????c t??m ra tr??n 39 Qu???c gia v?? v??ng l??nh th??? v???i s??? l?????ng lo??i c?? h???n. Ch??nh v?? th???, c??c cu???c kh???o s??t nghi??n c???u v?? th??m d?? ???? ???????c m??? ra g???n ????y ??em ?????n hi v???ng t??m th???y nhi???u h??n n???a c??c lo??i kh???ng long m?? nh??n lo???i ch??a t???ng bi???t ?????n.
                            </div>
                            <GeoChart geodata={geoData}></GeoChart>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default List;