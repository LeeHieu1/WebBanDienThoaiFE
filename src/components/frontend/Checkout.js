import React, { useEffect, useState } from "react";
import axios from "axios";
import swal from "sweetalert";
import { useHistory } from "react-router-dom";

function Checkout() {
  const history = useHistory();
  if (!localStorage.getItem("auth_token")) {
    history.push("/");
    swal("Warning", "Login to goto Cart Page", "error");
  }

  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState([]);
  var totalCartPrice = 0;

  const [checkoutInput, setCheckoutInput] = useState({
    firstname: "",
    lastname: "",
    phone: "",
    address: "",
  });
  const [error, setError] = useState([]);

  useEffect(() => {
    let isMounted = true;

    axios.get(`/api/user/cart`).then((res) => {
      if (isMounted) {
        if (res.status === 200) {
          setCart(res.data.data);
          setLoading(false);
        } else if (res.status === 401) {
          history.push("/");
          swal("Warning", res.data.message, "error");
        }
      }
    });

    return () => {
      isMounted = false;
    };
  }, [history]);

  const handleInput = (e) => {
    e.persist();
    setCheckoutInput({ ...checkoutInput, [e.target.name]: e.target.value });
  };

  const submitOrder = (e, payment) => {
    e.preventDefault();

    var data = {
      name: checkoutInput.firstname + " " + checkoutInput.lastname,
      phone: checkoutInput.phone,
      address: checkoutInput.address,
      payment: payment,
    };
    axios.post("api/user/createOrder", data).then((res) => {
      if (res.status === 200) {
        swal("Success", "Order successfully !", "success");
        //Send to orders page
        history.push("/orders");

      }
    });
  };

  if (loading) {
    return <h4>Loading Checkout...</h4>;
  }

  var checkout_HTML = "";
  if (cart.length > 0) {
    checkout_HTML = (
      <div>
        <div className="row">
          <div className="col-md-7">
            <div className="card">
              <div className="card-header">
                <h4>Basic Information</h4>
              </div>
              <div className="card-body">
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group mb-3">
                      <label> First Name</label>
                      <input
                        type="text"
                        name="firstname"
                        onChange={handleInput}
                        value={checkoutInput.firstname}
                        className="form-control"
                      />
                      <small className="text-danger">{error.firstname}</small>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group mb-3">
                      <label> Last Name</label>
                      <input
                        type="text"
                        name="lastname"
                        onChange={handleInput}
                        value={checkoutInput.lastname}
                        className="form-control"
                      />
                      <small className="text-danger">{error.lastname}</small>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group mb-3">
                      <label> Phone Number</label>
                      <input
                        type="number"
                        name="phone"
                        onChange={handleInput}
                        value={checkoutInput.phone}
                        className="form-control"
                      />
                      <small className="text-danger">{error.phone}</small>
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="form-group mb-3">
                      <label> Full Address</label>
                      <textarea
                        rows="3"
                        name="address"
                        onChange={handleInput}
                        value={checkoutInput.address}
                        className="form-control"
                      ></textarea>
                      <small className="text-danger">{error.address}</small>
                    </div>
                  </div>

                  <div className="col-md-12">
                    <div className="form-group text-end">
                      <button
                        type="button"
                        className="btn btn-primary mx-1"
                        onClick={(e) => submitOrder(e, 1)}
                      >
                        Place Order
                      </button>

                      <button
                        type="button"
                        className="btn btn-warning mx-1"
                        onClick={(e) => submitOrder(e, 2)}
                      >
                        Pay Online
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-5">
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th width="50%">Book</th>
                  <th>Price</th>
                  <th>Qty</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {cart.map((item, idx) => {
                  totalCartPrice += item.book.price * item.quantity;
                  return (
                    <tr key={idx}>
                      <td>{item.book.name}</td>
                      <td>{item.book.price}</td>
                      <td>{item.quantity}</td>
                      <td>{item.book.price * item.quantity}</td>
                    </tr>
                  );
                })}
                <tr>
                  <td colSpan="2" className="text-end fw-bold">
                    Grand Total
                  </td>
                  <td colSpan="2" className="text-end fw-bold">
                    {totalCartPrice}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  } else {
    checkout_HTML = (
      <div>
        <div className="card card-body py-5 text-center shadow-sm">
          <h4>Your Shopping Cart is Empty. You are in Checkout Page.</h4>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div
        class="modal fade"
        id="payOnlineModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">
                Online Payment Mode
              </h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <hr />
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <h3>Home / Checkout</h3>
      </div>

      <div className="py-4">
        <div className="container">{checkout_HTML}</div>
      </div>
    </div>
  );
}

export default Checkout;
