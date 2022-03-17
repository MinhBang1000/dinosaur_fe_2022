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
                                <Link onClick={() => this.props.choose(0)} className="breadcrumb-item dino__breadcum__active" to="/" aria-current="page">Trang chủ</Link>
                                <li className="breadcrumb-item" aria-current="page">Kiến thức</li>
                            </ol>
                        </nav>
                    </div>    
                </div>
                <div className='row dino__list__list' data-aos="fade-up">
                    <div className='mb-3 w-100'>
                        <div className='col-lg-12'>
                            <h4 className='text-center'>Khủng long là gì ?</h4>
                            <hr></hr>
                            <div className='mb-3'>
                                Khủng long là một nhóm động vật đa dạng thuộc nhánh Dinosauria. Chúng bắt đầu xuất hiện vào kỷ Tam Điệp, 231.4 triệu năm trước, và là nhóm động vật có xương sống chiếm ưu thế trong hơn 135 triệu năm, chúng biến mất vào cuối kỷ Phấn Trắng (66 triệu năm trước), khi Sự kiện tuyệt chủng kỷ Creta-Paleogen dẫn đến sự tuyệt chủng của hầu hết các nhóm khủng long và kết thúc Đại Trung Sinh. Các ghi nhận hóa thạch cho thấy chim tiến hóa từ theropoda vào kỷ Jura, do đó, chim được xem là một phân nhóm khủng long bởi nhiều nhà cổ sinh vật học. Vài loài chim sống sót sau sự kiện tuyệt chủng cách đây 66 triệu năm, và chúng tiếp tục phát triển đến ngày nay.
                            </div>
                        </div>
                    </div>

                    <div className='mb-3 w-100 dino__category__list'>
                        <div className='col-lg-12'>
                            <h4 className='text-center'>Khủng long gồm bao nhiêu loại ?</h4>
                            <hr></hr>
                            <table className='mb-3'>
                                <thead>
                                    <tr>
                                        <th>STT</th>
                                        <th>Tên khoa học</th>
                                        <th>Mô tả</th>
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
                            <h4 className='text-center'>Thời đại mà chúng sinh sống ?</h4>
                            <hr></hr>
                            <div className='row'>
                                <div className='col-lg-8 mb-3'>
                                    <table className='dino__mesozoic__table'>
                                        <thead>
                                            <th>STT</th>
                                            <th>Tên khoa học</th>
                                            <th>Ý nghĩa</th>
                                            <th>Khi bắt đầu</th>
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
                                        <label className='form-label me-3'>Niên đại</label>
                                        <select className='form-inline-control flex-grow-1' onChange={(e) => this.changeMesozoicSelect(e)}>
                                            {
                                                !isLoadedMesozoic?<option value={false}>Loading...</option>:
                                                dataMesozoic.map((item,index) => {
                                                    return <option key={index} value={index}>{item.mesozoic_name_en} ~ {item.mesozoic_start} triệu năm trước</option>
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
                            <h4 className='text-center'>Những nơi tìm thấy hóa thạch của chúng ?</h4>
                            <hr></hr>
                            <div className='mb-3 w-100'>
                                Các loài khủng long trên thế giới vẫn còn rất nhiều. Theo thống kê cho đến hiện nay các hóa thạch của chúng chỉ vừa mới được tìm ra trên 39 Quốc gia và vùng lãnh thổ với số lượng loài có hạn. Chính vì thế, các cuộc khảo sát nghiên cứu và thăm dò đã được mở ra gần đây đem đến hi vọng tìm thấy nhiều hơn nữa các loài khủng long mà nhân loại chưa từng biết đến.
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