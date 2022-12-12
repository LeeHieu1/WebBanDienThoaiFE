import React, { useState } from 'react';
import axios from 'axios';
import swal from 'sweetalert';
import { useHistory } from 'react-router-dom';

function ChangePassword() {
    const history = useHistory();

    const [passwordInput, setPassword] = useState({
        oldPassword: '',
        newPassword: '',
        confirmNewPassword: '',
    });

    const handleInput = (e) => {
        e.persist();
        setPassword({ ...passwordInput, [e.target.name]: e.target.value });
    }

    const mailSubmit = (e) => {
        e.preventDefault();

        const data = {
            oldPassword: passwordInput.oldPassword,
            newPassword: passwordInput.newPassword,
            confirmNewPassword: passwordInput.confirmNewPassword,
        }

        axios.post(`/api/user/change_password`, data).then(res => {
            if (res.status === 200) {
                if (res.data.success === true) {
                    swal("Success", res.data.message, "success");
                    history.push('/login');
                }else{
                    swal("Warning", res.data.message, "warning");
                }

            }

            else {
                setPassword({ ...passwordInput, error_list: res.data.message });
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
                                        <label>Nhập mật khẩu cũ</label>
                                        <input type="password" name="oldPassword" onChange={handleInput} value={passwordInput.oldPassword} className="form-control" required />
                                    </div>
                                    <div className="form-group mb-3">
                                        <label>Nhập mật khẩu mới</label>
                                        <input type="password" name="newPassword" onChange={handleInput} value={passwordInput.newPassword} className="form-control" required />
                                    </div>
                                    <div className="form-group mb-3">
                                        <label>Nhập lại mật khẩu mới</label>
                                        <input type="password" name="confirmNewPassword" onChange={handleInput} value={passwordInput.confirmNewPassword} className="form-control" required />
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

export default ChangePassword;
