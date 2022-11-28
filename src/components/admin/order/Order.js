import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Order() {
    const [loading, setLoading] = useState(true);
    const [orders, setOrders] = useState([]);

    useEffect(() => {

        let isMounted = true;
        document.title = "Orders";

        axios.get(`/api/admin/orders`).then(res => {
            if (isMounted) {
                if (res.data.success === true) {
                    setOrders(res.data.datas);
                    setLoading(false);
                }
            }
        });
        return () => {
            isMounted = false
        };
    }, []);


    var display_orders = "";
    if (loading) {
        return <h4>Loading Orders...</h4>
    }
    else {
        display_orders = orders.map((item) => {

            return (
                <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.username}</td>
                    <td>{item.name}</td>
                    <td>{item.phone}</td>
                    <td>{item.address}</td>
                    <td>{item.date}</td>
                    <td>{item.total_price}</td>
                    <td>{item.status}</td>
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
                    <h4>Danh sách đơn hàng  </h4>
                </div>
                <div className="card-body">
                    <div className="table-responsive">
                        <table className="table table-bordered table-striped">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Tài khoản</th>
                                    <th>Người nhận</th>
                                    <th>Số điện thoại</th>
                                    <th>Địa chỉ</th>
                                    <th>Ngày đặt</th>
                                    <th>Tổng tiền</th>
                                    <th>Trạng thái</th>
                                    <th>Chi tiết đơn hàng</th>
                                </tr>
                            </thead>
                            <tbody>
                                {display_orders}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default Order;