import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import swal from 'sweetalert';
import { numberFormat } from '../../../configs/constants';

function EditProduct(props) {
    const history = useHistory();

    const [categorylist, setCategorylist] = useState([]);
    const [bookInput, setBook] = useState({

    });
    const [pricture, setPicture] = useState([]);
    // const [errorlist, setError] = useState([]);
    const [loading, setLoading] = useState(true);

    const handleInput = (e) => {
        e.persist();
        setBook({ ...bookInput, [e.target.name]: e.target.value });
    }

    const handleImage = (e) => {
        setPicture({ img: e.target.files[0] });
    }

    useEffect(() => {

        axios.get(`/api/category`).then(res => {
            if (res.data.success === true) {
                setCategorylist(res.data.datas);
            }
        });

        const book_id = props.match.params.id
        axios.get(`/api/admin/book/${book_id}`).then(res => {
            if (res.data.success === true) {
                setBook(res.data.data);
            }
            else if (res.data.status === 404) {
                swal("Error", res.data.message, "error");
                history.push('/admin/view-product');
            }
            setLoading(false);
        });

    }, [props.match.params.id, history]);

    const updateProduct = (e) => {
        e.preventDefault();

        const book_id = props.match.params.id

        const formData = new FormData();
        formData.append('img', pricture.img);
        formData.append('id_category', bookInput.category.id);
        formData.append('name', bookInput.name);
        formData.append('description', bookInput.description);
        formData.append('authorname', bookInput.authorname);
        formData.append('price', bookInput.price);

        console.log(Object.fromEntries(formData))

        axios.put(`/api/admin/update_book/${book_id}`, formData).then(res => {
            if (res.data.success === true) {
                swal("Success", res.data.message, "success");
                //setError([]);
                history.push('/admin/view-product');
            }
        });

    }

    if (loading) {
        return <h4>Edit Product Data Loading...</h4>
    }

    return (
        <div className="container-fluid px-4">
            <div className="card mt-4">
                <div className="card-header">
                    <h4>Edit Product
                        <Link to="/admin/view-product" className="btn btn-primary btn-sm float-end">View Product</Link>
                    </h4>
                </div>
                <div className="card-body">
                    <form onSubmit={updateProduct} encType="multipart/form-data">
                        <div className="tab-content" id="myTabContent">
                            <div className="form-group mb-3">
                                <label>Thể loại</label>
                                <select name="id_category" onChange={handleInput} value={bookInput.category.id} className="form-control">
                                    {
                                        categorylist.map((item) => {
                                            return (
                                                <option value={item.id} key={item.id}>{item.name}</option>
                                            )
                                        })
                                    }
                                </select>
                            </div>
                            <div className="form-group mb-3">
                                <label>Tên sách</label>
                                <input type="text" name="name" onChange={handleInput} value={bookInput.name} className="form-control" required/>
                            </div>
                            <div className="form-group mb-3">
                                <label>Mô tả</label>
                                <textarea name="description" onChange={handleInput} value={bookInput.description} className="form-control" required></textarea>
                            </div>
                            <div className="form-group mb-3">
                                <label>Tác giả</label>
                                <input name="authorname" type="text" onChange={handleInput} value={bookInput.authorname} className="form-control" required></input>
                            </div>
                            <div className="form-group mb-3">
                                <label>Giá (Định dạng: {numberFormat(bookInput.price)})</label>
                                <input name="price" type="number" onChange={handleInput} value={bookInput.price} className="form-control" required></input>
                            </div>
                            <div className="form-group mb-3">
                                <label>Hình ảnh</label>
                                <input type="file" name="img" onChange={handleImage} className="form-control" />
                            </div>
                        </div>
                        <button type="submit" className="btn btn-primary px-4 mt-2">Submit</button>

                    </form>
                </div>
            </div>
        </div>
    )
}

export default EditProduct;
