import React, { useState } from 'react';
import axios from 'axios';
import swal from 'sweetalert';
import { useHistory } from 'react-router-dom';

function Verify() {
    const history = useHistory();

    const [verifyInput, setVerify] = useState({
        text: '',
    });

    const handleInput = (e) => {
        e.persist();
        setVerify({ ...verifyInput, [e.target.name]: e.target.value });
    }

    const verifySubmit = (e) => {
        e.preventDefault();

        const data = {
            text: verifyInput.text,
        }

        axios.post(`/api/verify`, data).then(res => {
            if (res.status === 200) {
                if (res.data.success === true) {
                    swal("Success", res.data.message, "success");
                    history.push('/login');
                }else{
                    swal("Warning", res.data.message, "warning");
                }

            }

            else {
                setVerify({ ...verifyInput, error_list: res.data.message });
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
                                <h4 className='text-center'>Xác nhận Email</h4>
                            </div>
                            <div className="card-body">
                                <form onSubmit={verifySubmit}>
                                    <div className="form-group mb-3">
                                        <p style={{color: "red", textAlign: "center"}}>Vui lòng kiểm tra mail để lấy mã xác nhận</p>
                                        <label>Nhập mã xác nhận</label>
                                        <input type="text" name="text" onChange={handleInput} value={verifyInput.text} className="form-control" required />

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

export default Verify;
