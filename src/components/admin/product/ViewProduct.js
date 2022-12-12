import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { APP_BASE_URL, numberFormat } from '../../../configs/constants';

function ViewProduct() {

    const [loading, setLoading] = useState(true);
    const [viewProduct, setProduct] = useState([]);

    useEffect(() => {

        let isMounted = true;
        document.title = "Sách";

        axios.get(`/api/admin/book`).then(res => {
            if (isMounted) {
                if (res.data.success === true) {
                    setProduct(res.data.datas);
                    setLoading(false);
                }
            }
        });
        return () => {
            isMounted = false
        };
    }, []);

    var display_Productdata = "";
    if (loading) {
        return <h4>View Products Loading...</h4>
    }
    else {
        display_Productdata = viewProduct.map((item) => {

            return (
                <tr key={item.id}>
                    <td className='center-format'>
                        <Link to={`edit-product/${item.id}`} className="btn btn-success btn-sm">{item.id}</Link>
                    </td>
                    <td className='text-format'>{item.category.name}</td>
                    <td className='text-format'>{item.name}</td>
                    <td className='text-format'>{item.authorname}</td>
                    <td className='center-format'><img src={`${APP_BASE_URL}/images/${item.image}`} width="50px" alt={item.name} /></td>
                    <td className='center-format'>{numberFormat(item.price)}</td>
                    <td className='text-format'>{item.description}</td>

                </tr>
            )
        });
    }

    return (
        <div className="container px-4 mt-3">
            <div className="card">
                <div className="card-header">
                <h4>Danh sách sản phẩm
                        <Link to="/admin/add-product" className="btn btn-primary btn-sm float-end">Thêm sản phẩm</Link>
                    </h4>
                </div>
                <div className="card-body">
                    <div className="table-responsive">
                        <table className="table table-bordered table-striped table-hover">
                            <thead>
                                <tr style={{backgroundColor: "black", color: "white"}}>
                                    <th className='center-format' style={{width: "6%"}}>ID</th>
                                    <th style={{width: "12%"}}>Thể loại</th>
                                    <th style={{width: "20%"}}>Tên sách</th>
                                    <th style={{width: "15%"}}>Tác giả</th>
                                    <th className='center-format' style={{width: "7%"}}>Hình ảnh</th>
                                    <th className='center-format' style={{width: "7%"}}>Giá</th>
                                    <th>Mô tả</th>
                                </tr>
                            </thead>
                            <tbody>
                                {display_Productdata}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ViewProduct;
