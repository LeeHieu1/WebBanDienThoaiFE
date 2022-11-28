import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import swal from 'sweetalert';

function Category() {

    const [categoryInput, setCategory] = useState({
        name: '',
        error_list: [],
    });

    const handleInput = (e) => {
        e.persist();
        setCategory({ ...categoryInput, [e.target.name]: e.target.value })
    }

    const submitCategory = (e) => {
        e.preventDefault();

        const data = categoryInput;

        axios.post(`/api/admin/insert_category`, data).then(res => {
            if (res.data.success === true) {
                e.target.reset();
                swal("Success", res.data.message, "success");
            }
            else  {
                swal("Warning", res.data.message, "warning");
            }
        });

    }

    // var display_errors = [];
    // if (categoryInput.error_list) {
    //     display_errors = [
    //         categoryInput.error_list.name,
    //     ]
    // }

    return (
        <div className="container-fluid px-4">

            {/* {
                display_errors.map((item) => {
                    return (<p className="mb-1" key={item}>{item}</p>)
                })
            } */}

            <div className="card mt-4">
                <div className="card-header">
                    <h4>Thêm thể loại
                        <Link to="/admin/view-category" className="btn btn-primary btn-sm float-end">Tất cả thể loại</Link>
                    </h4>
                </div>
                <div className="card-body">

                    <form onSubmit={submitCategory} id="CATEGORY_FORM">
                        {/* <ul className="nav nav-tabs" id="myTab" role="tablist">
                            <li className="nav-item" role="presentation">
                                <button className="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home" type="button" role="tab" aria-controls="home" aria-selected="true">Home</button>
                            </li>
                            <li className="nav-item" role="presentation">
                                <button className="nav-link" id="seo-tags-tab" data-bs-toggle="tab" data-bs-target="#seo-tags" type="button" role="tab" aria-controls="seo-tags" aria-selected="false">SEO Tags</button>
                            </li>
                        </ul> */}
                        <div className="tab-content" id="myTabContent">
                            <div className="form-group mb-3">
                                <label>Tên thể loại</label>
                                <input type="text" name="name" onChange={handleInput} value={categoryInput.name} className="form-control" />
                            </div>
                        </div>
                        <button type="submit" className="btn btn-primary px-4 float-end">Thêm</button>
                    </form>

                </div>
            </div>
        </div>
    )
}

export default Category;

