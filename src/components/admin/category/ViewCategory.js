import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

function ViewCategory() {

    const [loading, setLoading] = useState(true);
    const [categorylist, setCategorylist] = useState([]);

    useEffect(() => {
        let isMounted = true;

        axios.get(`/api/category`).then(res=>{
            if(isMounted)
            {
                if(res.status === 200)
                {
                    setCategorylist(res.data.datas)
                    setLoading(false);
                }
            }
        });

        return () => {
            isMounted = false
        };

    }, []);

    // const deleteCategory = (e, id) => {
    //     e.preventDefault();
        
    //     const thisClicked = e.currentTarget;
    //     thisClicked.innerText = "Deleting";

    //     axios.delete(`/api/delete-category/${id}`).then(res=>{
    //         if(res.data.status === 200)
    //         {
    //             swal("Success",res.data.message,"success");
    //             thisClicked.closest("tr").remove();
    //         }
    //         else if(res.data.status === 404)
    //         {
    //             swal("Success",res.data.message,"success");
    //             thisClicked.innerText = "Delete";
    //         }
    //     });

    // }

    var viewcategory_HTMLTABLE = "";
    if(loading)
    {
        return <h4>Loading Category...</h4>
    }
    else
    {
        viewcategory_HTMLTABLE = 
        categorylist.map( (item) => {
            return (
                <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.name}</td>
                    <td>
                        <Link to={`edit-category/${item.id}`} className="btn btn-success btn-sm">Sửa</Link>
                    </td>
                    {/* <td>
                        <button type="button" onClick={ (e) => deleteCategory(e, item.id) } className="btn btn-danger btn-sm">Xóa</button>
                    </td> */}
                </tr>
            )
        });
    }

    return  (
        <div className="container px-4">
            <div className="card mt-4">
                <div className="card-header">
                    <h4>Thể loại 
                        <Link to="/admin/add-category" className="btn btn-primary btn-sm float-end">Thêm thể loại</Link>
                    </h4>
                </div>
                <div className="card-body">
                    <table className="table table-bordered table-striped">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Edit</th>
                                {/* <th>Delete</th> */}
                            </tr>
                        </thead>
                        <tbody>
                            {viewcategory_HTMLTABLE}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default ViewCategory;

