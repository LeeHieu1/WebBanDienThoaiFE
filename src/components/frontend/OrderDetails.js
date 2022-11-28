import axios from "axios";
import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import swal from "sweetalert";

const OrderDetail = () => {
  let { id } = useParams();
  const history = useHistory();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  if (!localStorage.getItem("auth_token")) {
    history.push("/");
    swal("Warning", "Login to goto Cart Page", "error");
  }
  useEffect(() => {
    async function getOrderDetail() {
      try {
        const response = await axios.get("api/user/order/" + id);
        setOrder(response.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    }
    getOrderDetail();
  }, []);
  let body;
  if (loading) {
    body = <h4>Loading Product Detail...</h4>;
  } else
    body = (
      <div>
        <div className="table-responsive">
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>Image</th>
                <th>Product</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total Price</th>
              </tr>
            </thead>
            <tbody>
              {order.orderDetails.map((item, idx) => {
                return (
                  <tr key={idx}>
                    <td width="10%">
                      <img
                        src={`https://image.freepik.com/free-photo/books_87394-845.jpg`}
                        alt={item.book.name}
                        width="50px"
                        height="50px"
                      />
                    </td>
                    <td>{item.book.name}</td>
                    <td width="15%">{item.book.price}</td>
                    <td>{item.quantity}</td>
                    <td>{item.book.price * item.quantity}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div>
          <div className="row">
            <div className="col-md-7">
              <div className="card">
                <div className="card-header">
                  <h4>Thông tin đặt hàng</h4>
                </div>
                <div className="card-body">
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group mb-3">
                        <label> Name</label>
                        <input
                          type="text"
                          name="firstname"
                          value={order.name}
                          className="form-control"
                        />
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="form-group mb-3">
                        <label> Phone Number</label>
                        <input
                          type="number"
                          name="phone"
                          value={order.phone}
                          className="form-control"
                        />
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="form-group mb-3">
                        <label> Full Address</label>
                        <textarea
                          rows="3"
                          name="address"
                          value={order.address}
                          className="form-control"
                        ></textarea>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );

  return (
    <div>
      <div className="py-4">
        <div className="container text-center">
          <h3>Order details</h3>
          <div className="row">
            <div className="col-md-12">{body}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;
