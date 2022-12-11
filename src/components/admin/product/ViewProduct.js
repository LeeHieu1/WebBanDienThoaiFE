import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { APP_BASE_URL } from '../../../configs/constants';

function ViewProduct() {

    const [loading, setLoading] = useState(true);
    const [viewProduct, setProduct] = useState([]);

    useEffect(() => {

        let isMounted = true;
        document.title = "Sách";

        axios.get(`/api/book`).then(res => {
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
                    <td>
                        <Link to={`edit-product/${item.id}`} className="btn btn-success btn-sm">{item.id}</Link>
                    </td>
                    <td>{item.category.name}</td>
                    <td>{item.name}</td>
                    <td>{item.authorname}</td>
                    <td><img src={`${APP_BASE_URL}/images/${item.image}`} width="50px" alt={item.name} /></td>
                    <td>{item.price}</td>
                    <td>{item.description}</td>

                </tr>
            )
        });
    }

    return (
        <div className="container px-4 mt-3">
            <div className="card">
                <div className="card-header">
                    <h4>View Product
                        <Link to="/admin/add-product" className="btn btn-primary btn-sm float-end">Add Product</Link>
                    </h4>
                </div>
                <div className="card-body">
                    <div className="table-responsive">
                        <table className="table table-bordered table-striped">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Thể loại</th>
                                    <th>Tên sách</th>
                                    <th>Tác giả</th>
                                    <th>Hình ảnh</th>
                                    {/* <th>Edit</th> */}
                                    <th>Giá</th>
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
