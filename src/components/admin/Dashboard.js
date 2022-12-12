import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { numberFormat } from '../../configs/constants';


function Dashboard() {
    const [loading, setLoading] = useState(true);
    const [orders, setOrders] = useState([]);

    useEffect(() => {

        let isMounted = true;
        document.title = "Orders";

        axios.get(`/api/admin/order?status=0`).then(res => {
            if (isMounted) {
                if (res.data.success === true) {
                    setOrders(res.data.datas);
                    setLoading(false);
                }else{
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
        if(orders.length === 0){
            display_orders = (
                <tr><td className='center-format' colSpan="8">Không có đơn hàng nào</td></tr>
            )
        }else{
            display_orders = orders.map((item) => {
                return (
                    <tr key={item.id}>
                        <td className='center-format'><Link to={`order/${item.id}`} className="btn btn-success btn-sm">{item.id}</Link></td>
                        <td className='text-format'>{item.username}</td>
                        <td className='text-format'>{item.name}</td>
                        <td className='text-format'>{item.phone}</td>
                        <td className='text-format'>{item.address}</td>
                        <td className='center-format'>{item.date}</td>
                        <td className='center-format'>{numberFormat(item.total_price)}</td>
                        <td className='text-format'>{item.status}</td>
                    </tr>
                )
            });
        }
    }

    return (
        <div className="container px-4 mt-3">
            <div className="card">
                <div className="card-header">
                    <h4>Đơn hàng mới</h4>
                </div>
                <div className="card-body">
                    <div className="table-responsive">
                        <table className="table table-bordered table-striped">
                            <thead>
                                <tr style={{backgroundColor: "black", color: "white"}}>
                                    <th className='center-format' style={{width: "6%"}}>ID</th>
                                    <th style={{width: "15%"}}>Tài khoản</th>
                                    <th style={{width: "15%"}}>Người nhận</th>
                                    <th className='center-format' style={{width: "9%"}}>Số điện thoại</th>
                                    <th>Địa chỉ</th>
                                    <th className='center-format' style={{width: "8%"}}>Ngày đặt</th>
                                    <th className='center-format' style={{width: "11%"}}>Tổng tiền</th>
                                    <th style={{width: "11%"}}>Trạng thái</th>
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

export default Dashboard;

