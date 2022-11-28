import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import swal from "sweetalert";

const Order = () => {
  const history = useHistory();

  const [Orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  if (!localStorage.getItem("auth_token")) {
    history.push("/");
    swal("Warning", "Login to goto Cart Page", "error");
  }
  useEffect(() => {
    async function getOrders() {
      try {
        const response = await axios.get("/api/user/order");
        setOrders(response.data.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    }
    getOrders();
  }, []);

  let body;

  if (loading) body = <div>Loading....</div>;
  else if (Orders.length === 0)
    body = (
      <div>
        <div className="card card-body py-5 text-center shadow-sm">
          <h4>Your orders is Empty</h4>
        </div>
      </div>
    );
  else {
    body = (
      <div>
        <div className="table-responsive">
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>Order</th>
                <th>Date Ordered</th>
                <th>Payment</th>
                <th>Total</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {Orders.map((item, idx) => {
                return (
                  <tr key={idx}>
                    <td>
                      <Link to={"/orders/" + item.id}>Order {item.id}</Link>
                    </td>
                    <td>{item.createdDate} </td>
                    <td>{item.paymentMethod}</td>
                    <td width="15%">{item.totalPrice} đ</td>
                    <td> {item.status === 0 ? "PENDDING" : "DONE"}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="py-4">
        <div className="container text-center">
          <h3>Your Orders</h3>
          <div className="row">
            <div className="col-md-12">{body}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Order;
