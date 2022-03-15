import axios from 'axios';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import GeoChart from '../../Components/GeoChart/GeoChart';

class Detail extends Component {

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
            itemDetail: null,
            isLoadedDetail: false,
            dinosaurCollection: null,
            urlIframe: "https://dinosaurpictures.org/ancient-earth/view/Guanlong#220",
            geoData: [['Country']],
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
            console.log(this.state);
        })
        .catch((err) => {
            console.log(err.data);
        });

        axios.get('http://dinosaur_2022:8000/api/dinosaur/'+this.props.match.params.id)
        .then((res) => {
            let count = res.data.data.collection;
            let collection = [];
            for (let i=1;i<=count;i++){
                collection[i] = res.data.data.dinosaur_name_en+"-"+i+".jpg";
            }
            let mesozoicEarth = res.data.data.mesozoics[0].mesozoic_earth;
            let countries = res.data.data.countries;
            let geo = [];
            geo[0] = ['Country'];
            for (let i=0;i<countries.length;i++){
                geo[i+1]=[countries[i].country_name+""];
            }
            this.setState({
                itemDetail: res.data.data,
                isLoadedDetail: true,
                dinosaurCollection: collection,
                urlIframe: "https://dinosaurpictures.org/ancient-earth/view/Guanlong#"+mesozoicEarth,
                geoData: geo,
            });
            console.log(res.data.data);
        })
        .catch((err)=>{
            console.log(err.data);
        });
        this.props.background();
    }

    openImageToSave = (url) => {
        let newWindow = window.open(url, '_blank', 'noopener,noreferrer');
        if (newWindow){
            newWindow.opener = null;
        }
    }

    render() {
        
        const {dataCountry,isLoadedCountry,dataMesozoic,isLoadedMesozoic,dataCategory,isLoadedCategory,dataDiet,isLoadedDiet,isLoadedDinosaur,dataDinosaur} = this.state;
        const {itemDetail,isLoadedDetail,dinosaurCollection,urlIframe,geoData} = this.state;
        return (
            <div className='detail__board py-4'>
                <div className='row'>
                    <div className='col-lg-12'>
                        <nav aria-label="breadcrumb">
                            <ol className="breadcrumb">
                                <Link className="breadcrumb-item dino__breadcum__active" onClick={()=>this.props.choose(0)} to="/" aria-current="page">Trang chủ</Link>
                                <li className="breadcrumb-item" aria-current="page">
                                    {
                                        !isLoadedDetail?<div>Loading...</div>:itemDetail.dinosaur_name_en
                                    }
                                </li>
                            </ol>
                        </nav>
                    </div>    
                </div>

                <div className='row'>
                    <div className='col-lg-6'>
                        <div className='row dino__detail__list mb-3'>
                            <h4>{!isLoadedDetail?<div>Loading...</div>:itemDetail.dinosaur_name_en}</h4>
                            <div>Cách gọi: {!isLoadedDetail?<div>Loading...</div>:itemDetail.dinosaur_name_spelling}</div>
                            <div className='mb-3'>Ý nghĩa:  {!isLoadedDetail?<div>Loading...</div>:itemDetail.dinosaur_name_explain}</div>
                            <div className='dino__detail__img mb-3'>
                                {
                                    !isLoadedDetail?<div>Loading...</div>:<img className='d-block w-100 h-auto' src={"http://dinosaur_2022:8000/images/avatars/"+itemDetail.image}></img>
                                }
                            </div>

                            <h4>Đặc trưng</h4>
                            <table className='mb-3'>
                                {
                                    !isLoadedDetail?<div>Loading...</div>:
                                    <tbody>
                                        {
                                            itemDetail.length!==null?<tr><th>Chiều dài</th><td>{itemDetail.length} M</td></tr>:""
                                        }
                                        {
                                            itemDetail.weight!==null?<tr><th>Cân nặng</th><td>{itemDetail.weight} KG</td></tr>:""
                                        }
                                        {
                                            itemDetail.teeth!==null?<tr><th>Cấu tạo hàm</th><td>{itemDetail.teeth}</td></tr>:""
                                        }
                                        {
                                            itemDetail.food!==null?<tr><th>Thức ăn</th><td>{itemDetail.food}</td></tr>:""
                                        }
                                        {
                                            itemDetail.how_it_move!==null?<tr><th>Cách di chuyển</th><td>{itemDetail.how_it_move}</td></tr>:""
                                        }
                                        {
                                            itemDetail.lived!==null?<tr><th>Thời gian sống</th><td>{itemDetail.lived} triệu năm trước</td></tr>:""
                                        }
                                        {
                                            itemDetail.diet.diet_charater_en!==null?<tr><th>Phân loại theo thức ăn</th><td>{itemDetail.diet.diet_charater_en} <img src={"http://dinosaur_2022:8000/images/diets/"+itemDetail.diet.diet_icon}></img></td></tr>:""
                                        }
                                        {
                                            itemDetail.category.category_name_en!==null?<tr><th>Phân loại theo loài</th><td>{itemDetail.category.category_name_en}</td></tr>:""
                                        }
                                        {
                                            itemDetail.author!==null?<tr><th>Người tìm ra</th><td>{itemDetail.author}</td></tr>:""
                                        }
                                    </tbody>
                                }
                            </table>
                        </div>
                        <div className='row dino__detail__earth mb-3'>
                            <h4>Niên đại sinh sống</h4>
                            <iframe key={urlIframe} src={urlIframe} title="DINOWHEN"></iframe>
                            <a className='d-block text-center mb-3' href={urlIframe} target="blank">Xem đầy đủ</a>
                            <table>
                                <tr>
                                    <th>
                                        Tên khoa học
                                    </th>
                                    {
                                        !isLoadedDetail?<td>Loading...</td>:
                                        <td>{itemDetail.mesozoics[0].mesozoic_name_en}</td>
                                    }
                                </tr>
                                <tr>
                                    <th>
                                        Tên gọi
                                    </th>
                                    {
                                        !isLoadedDetail?<td>Loading...</td>:
                                        <td>{itemDetail.mesozoics[0].mesozoic_name_vn}</td>
                                    }
                                </tr>
                                <tr>
                                    <th>
                                        Năm bắt đầu
                                    </th>
                                    {
                                        !isLoadedDetail?<td>Loading...</td>:
                                        <td>{itemDetail.mesozoics[0].mesozoic_start} triệu năm trước</td>
                                    }
                                </tr>
                            </table>
                        </div>
                        <div className='row dino__detail__map mb-3'>
                            <h4>Khu vực phát hiện hóa thạch</h4>
                            <table className='mb-3'>
                                <thead>
                                    <tr>
                                        <th>STT</th>
                                        <th>Tên Quốc gia</th>
                                    </tr>
                                </thead>
                                <tbody>
                                {
                                    !isLoadedDetail?<div>Loading...</div>:
                                    itemDetail.countries.map((item,index) => {
                                        return <tr key={index} className='dino__detail__map__item'><td>{index+1}</td><td>{item.country_name}</td></tr>
                                    })
                                }
                                </tbody>

                            </table>
                            <GeoChart geodata={geoData}></GeoChart>
                        </div>

                    </div>
                    <div className='col-lg-6'>
                        <h4>Bộ sưu tập</h4>
                        <div className='dino__detail__collection__list'>
                            {
                                !isLoadedDetail?<div>Loading...</div>:
                                dinosaurCollection.map((item,index) => {
                                    return <div key={index} className='dino__detail__collection__item'>
                                        <img className='w-100 h-auto' src={"http://dinosaur_2022:8000/images/collections/"+item} onClick={() => this.openImageToSave("http://dinosaur_2022:8000/images/collections/"+item)}></img>
                                    </div>
                                })
                            }
                        </div>
                    </div>
                </div>

            </div>
        );
    }
}

export default Detail;