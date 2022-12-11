import React, { useState } from "react";

import axios from "axios";
import swal from "sweetalert";
import { useHistory } from "react-router-dom";

function Login() {
  const history = useHistory();

  const [loginInput, setLogin] = useState({
    username: "",
    password: "",
    error_list: "",
  });

  const [adminLogin, setAdminLogin] = useState(false)

  const handleInput = (e) => {
    e.persist();
    setLogin({ ...loginInput, [e.target.name]: e.target.value });
  };

  const loginSubmit = (e) => {
    e.preventDefault();

    const data = {
      username: loginInput.username,
      password: loginInput.password,
    };
    try {
      let url = ''
      if (adminLogin)
        url = 'api/admin/login'
      else
        url = 'api/login'
      axios
        .post(url, data)
        .then((res) => {
          console.log(res);
          if (res.status === 200) {
            localStorage.setItem("auth_token", res.data.data.token);
            localStorage.setItem("auth_name", res.data.data.username);
            if (res.data.data.roles[0].authority === "ROLE_ADMIN") {
              history.push("/admin/dashboard");
            } else {
              history.push("/");
            }
          } else {
            swal("Warning", "Try again", "warning");
          }
        })
        .catch((err) => {
          swal("Warning", "Wrong user name or pasword", "warning");
        });
    } catch (error) {
      swal("Warning", "Wrong user name or pasword", "warning");

    }

  };

  return (
    <div>
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card">
              <div className="card-header">
                <h4 className="text-center">Đăng nhập</h4>
              </div>
              <div className="card-body">
                <form onSubmit={loginSubmit}>
                  <div className="form-group mb-3">
                    <label>Tên đăng nhập</label>
                    <input
                      type="text"
                      name="username"
                      onChange={handleInput}
                      value={loginInput.username}
                      className="form-control"
                      required
                    />
                    <span>{loginInput.error_list.username}</span>
                  </div>
                  <div className="form-group mb-3">
                    <label>Mật khẩu</label>
                    <input
                      type="password"
                      name="password"
                      onChange={handleInput}
                      value={loginInput.password}
                      className="form-control"
                      required
                    />
                    <span>{loginInput.error_list.password}</span>
                  </div>
                  <div>
                    <span>{loginInput.error_list}</span>
                  </div>
                  <div className="form-group mb-3 d-flex justify-content-center">
                    <select name='adminLogin' onChange={(e) => {
                      e.preventDefault()
                      console.log(e.target.value)
                      if (e.target.value === 'admin')
                        setAdminLogin(true)
                      else setAdminLogin(false)
                    }}>
                      <option value="user">User</option>
                      <option value="admin">Admin</option>

                    </select>

                    <button type="submit" className="btn btn-primary">
                      Đăng nhập
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
