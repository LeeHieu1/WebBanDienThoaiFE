import React, { useState } from 'react';
import axios from 'axios';
import swal from 'sweetalert';
import { useHistory } from 'react-router-dom';

function ForgotPassword() {
    const history = useHistory();

    const [mailInput, setMail] = useState({
        email: '',
    });

    const handleInput = (e) => {
        e.persist();
        setMail({ ...mailInput, [e.target.name]: e.target.value });
    }

    const mailSubmit = (e) => {
        e.preventDefault();

        const data = {
            text: mailInput.email,
        }

        axios.post(`/api/forgot_password`, data).then(res => {
            if (res.status === 200) {
                if (res.data.success === true) {
                    swal("Success", res.data.message, "success");
                    history.push('/login');
                }else{
                    swal("Warning", res.data.message, "warning");
                }

            }

            else {
                setMail({ ...mailInput, error_list: res.data.message });
            }
        })
            .catch(err => {
                swal("Warning", err.message, "warning");
            });
    }

    return (
        <div>
            <div className="container py-5">
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <div className="card">
                            <div className="card-header">
                                <h4 className='text-center'>Quên mật khẩu</h4>
                            </div>
                            <div className="card-body">
                                <form onSubmit={mailSubmit}>
                                    <div className="form-group mb-3">
                                        <p style={{color: "red", textAlign: "center"}}>Vui lòng nhập email bạn đã đăng ký</p>
                                        <label>Nhập email</label>
                                        <input type="email" name="email" onChange={handleInput} value={mailInput.email} className="form-control" required />

                                    </div>
                                    <div className="form-group mb-3 d-flex justify-content-center">
                                        <button type="submit" className="btn btn-primary">Xác nhận</button>
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

export default ForgotPassword;
