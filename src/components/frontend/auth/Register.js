import React, { useState } from 'react';
import axios from 'axios';
import swal from 'sweetalert';
import { useHistory } from 'react-router-dom';

function Register() {

    const history = useHistory();
    const [registerInput, setRegister] = useState({
        name: '',
        email: '',
        password: '',
        username: '',
        phone: '',
        error_list: '',
    });

    const handleInput = (e) => {
        e.persist();
        setRegister({...registerInput, [e.target.name]: e.target.value });
    }

    const registerSubmit = (e) => {
        e.preventDefault();
        
        const data = {
            name: registerInput.name,
            email: registerInput.email,
            password: registerInput.password,
            username: registerInput.username,
            phone: registerInput.phone,
        }

        axios.post(`/api/signup`, data).then(res => { 
            if(res.data.success === true)
            {
                swal("Success",res.data.message,"success");
                history.push('/login');
            }
            else
            {
                setRegister({...registerInput, error_list: res.data.message});
            }
        })
        .catch(err =>{
            swal("Warning","Mật khẩu không hợp lệ","success");
        });

    }

    return (
        <div>
            <div className="container py-5">
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <div className="card">
                            <div className="card-header">
                                <h4 className='text-center'>Đăng ký tài khoản</h4>
                            </div>
                            <div className="card-body">
                                <form onSubmit={registerSubmit}>
                                    <div className="form-group mb-3">
                                        <label>Tên</label>
                                        <input type="text" name="name" onChange={handleInput} value={registerInput.name} className="form-control" required />
                                        <span>{registerInput.error_list.name}</span>
                                    </div>
                                    <div className="form-group mb-3">
                                        <label>Tên đăng nhập</label>
                                        <input type="text" name="username" onChange={handleInput} value={registerInput.username} className="form-control" required />
                                        <span>{registerInput.error_list.username}</span>
                                    </div>
                                    <div className="form-group mb-3">
                                        <label>Mật khẩu</label>
                                        <input type="password" name="password" onChange={handleInput} value={registerInput.password} minLength="8" className="form-control" required />
                                        <span>{registerInput.error_list.password}</span>
                                    </div>
                                    <div className="form-group mb-3">
                                        <label>Email</label>
                                        <input type="text" name="email" onChange={handleInput} value={registerInput.email} className="form-control" required />
                                        <span>{registerInput.error_list.email}</span>
                                    </div>
                                    <div className="form-group mb-3">
                                        <label>Số điện thoại</label>
                                        <input type="text" name="phone" onChange={handleInput} value={registerInput.phone} className="form-control" required />
                                        <span>{registerInput.error_list.phone}</span>
                                    </div>
                                    <div className='d-flex justify-content-center'>
                                        <span style={{color: 'red'}}>{registerInput.error_list}</span>
                                    </div>
                                    <br/>
                                    <div className="form-group mb-3 d-flex justify-content-center">
                                        <button type="submit" className="btn btn-primary">Đăng ký</button>
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

export default Register;
