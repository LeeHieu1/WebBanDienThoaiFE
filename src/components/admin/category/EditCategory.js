import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';
import swal from 'sweetalert';

function EditCategory(props) {
    const history = useHistory();
    const [loading, setLoading] = useState(true);
    const [categoryInput, setCategory] = useState([]);

    useEffect(() => {

        const category_id = props.match.params.id;
        axios.get(`/api/category/${category_id}`).then(res => {
            if (res.data.status === 200) {
                setCategory(res.data.category);
            }
            else if (res.data.status === 404) {
                swal("Error", res.data.message, "error");
                history.push('/admin/view-category');
            }
            setLoading(false);
        });

    }, [props.match.params.id, history]);

    const handleInput = (e) => {
        e.persist();
        setCategory({ ...categoryInput, [e.target.name]: e.target.value });
    }

    const updateCategory = (e) => {
        e.preventDefault();

        const category_id = props.match.params.id;
        const data = categoryInput;
        axios.put(`/api/admin/update_category/${category_id}`, data).then(res => {
            if (res.data.success === true) {
                swal("Success", res.data.message, "success");
                history.push('/admin/view-category');
            }
            else if(res.data.success === false){
                swal("Warning", res.data.message, "warning");
            }
            else if (res.data.status === 422) {
                swal("All fields are mandetory", "", "error");
            }
            else if (res.data.status === 404) {
                swal("Error", res.data.message, "error");
                history.push('/admin/view-category');
            }
        });
    }

    if (loading) {
        return <h4>Loading Edit Category...</h4>
    }

    return (
        <div className="container px-4">
            <div className="card mt-4">
                <div className="card-header">
                    <h4>Sửa thể loại
                        <Link to="/admin/view-category" className="btn btn-primary btn-sm float-end">Quay lại</Link>
                    </h4>
                </div>
                <div className="card-body">

                    <form onSubmit={updateCategory}>
                        <div className="tab-content" id="myTabContent">
                            <div className="form-group mb-3">
                                <label>Tên thể loại</label>
                                <input type="text" name="name" onChange={handleInput} value={categoryInput.name} className="form-control" />
                            </div>
                        </div>
                        <button type="submit" className="btn btn-primary px-4 float-end">Cập nhật</button>
                    </form>

                </div>
            </div>
        </div>
    )
}

export default EditCategory;
