import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import swal from 'sweetalert';

function Profile() {
    const [loading, setLoading] = useState(true);
    const [accounts, setAccounts] = useState([]);
    const [isUpdate, setIsUpdate] = useState(false);

    useEffect(() => {
        document.title = "Tài khoản";

        axios.get(`/api/admin/accounts`).then(res => {
            if (res.data.success === true) {
                setAccounts(res.data.datas);
                setLoading(false);
            }
        });
        
    }, [isUpdate]);

    const blockUser = (id) =>{
        axios.get(`/api/admin/block/${id}`).then(res => {
            if (res.data.success === true) {
                swal("Success", res.data.message, "success");
                setIsUpdate(oldState => !oldState);
            }
            
        });

    }

    var display_accounts = "";
    var display_status ="";
    if (loading) {
        return <h4>Loading Accounts...</h4>
    }
    else {
        display_accounts = accounts.map((item) => {
            if(item.status){
                display_status = (
                    <div className="p-2 flex-fill bd-highlight text-right"><button onClick={()=>blockUser(item.id)} className='btn btn-success btn-sm' /></div>
                )
            }else{
                display_status = (
                    <div className="p-2 flex-fill bd-highlight text-right"><button onClick={()=>blockUser(item.id)} className='btn btn-danger btn-sm' /></div>
                )
            }
            

            return (
                <tr key={item.id}>
                    <td className='center-format'><Link to='/admin/profile' className="btn btn-success btn-sm">{item.id}</Link></td>
                    <td className='text-format'>{item.username}</td>
                    <td className='text-format'>{item.name}</td>
                    <td className='text-format'>{item.phone}</td>
                    <td className='text-format'>{item.email}</td>
                    <td className='text-format'>
                        {item.enable ? "Đã kích hoạt" : "Chưa kích hoạt"}
                    </td>
                    <td className='text-format'>
                        <div class="d-flex flex-row bd-highlight">
                            <div class="p-2 flex-fill bd-highlight">{item.status ? "Hoạt động" : "Block"}</div>
                            {display_status}
                        </div>
                    </td>
                </tr>
            )
        });

    }

    return (
        <div className="container px-4 mt-3">
            <div className="card">
                <div className="card-header">
                    <h4>Danh sách tài khoản khách hàng  </h4>
                </div>
                <div className="card-body">
                    <div className="table-responsive">
                        <table className="table table-bordered table-striped table-hover">
                            <thead>
                                <tr style={{ backgroundColor: "black", color: "white" }}>
                                    <th className='center-format' style={{ width: "6%" }}>ID</th>
                                    <th>Tài khoản</th>
                                    <th>Tên</th>
                                    <th>Số điện thoại</th>
                                    <th>Email</th>
                                    <th>Kích hoạt email</th>
                                    <th className='center-format' style={{ width: "12%" }}>Trạng thái</th>
                                </tr>
                            </thead>
                            <tbody>
                                {display_accounts}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Profile;
