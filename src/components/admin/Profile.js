import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Profile() {
    const [loading, setLoading] = useState(true);
    const [accounts, setAccounts] = useState([]);

    useEffect(() => {

        let isMounted = true;
        document.title = "Tài khoản";

        axios.get(`/api/admin/accounts`).then(res => {
            if (isMounted) {
                if (res.data.success === true) {
                    setAccounts(res.data.datas);
                    setLoading(false);
                }
            }
        });
        return () => {
            isMounted = false
        };
    }, []);


    var display_accounts = "";
    if (loading) {
        return <h4>Loading Accounts...</h4>
    }
    else {
        display_accounts = accounts.map((item) => {

            return (
                <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.username}</td>
                    <td>{item.name}</td>
                    <td>{item.phone}</td>
                    <td>{item.email}</td>
                    <td>
                        {item.enable? "Đã kích hoạt" : "Chưa kích hoạt"}
                    </td>
                    <td>
                        {item.status? "Hoạt động" : "Block"}
                    </td>
                    <td>
                        <Link to={`view-order/${item.id}`} className="btn btn-success btn-sm">View</Link>
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
                        <table className="table table-bordered table-striped">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Tài khoản</th>
                                    <th>Tên</th>
                                    <th>Số điện thoại</th>
                                    <th>Email</th>
                                    <th>Kích hoạt email</th>
                                    <th>Trạng thái</th>
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
