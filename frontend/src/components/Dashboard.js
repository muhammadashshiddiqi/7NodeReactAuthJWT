import React, {useState, useEffect} from 'react';
import axios from 'axios';
import jwt_decode from "jwt-decode";
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../util/constants';

const Dashboard = () => {
    const [name, setName] = useState('');
    const [token, setToken] = useState('');
    const [expire, setExpire] = useState('');
    const [row_data, setRow] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        refreshToken(); 
        getUser();
    }, []);

    const refreshToken = async () => {
        try {
            const response = await axios.get(API_URL+'token');

            const decode = jwt_decode(response.data.access_token);
            setToken(response.data.access_token);
            setName(decode.userName);
            setExpire(decode.exp);


            //console.log(response.data.access_token);
            //console.log(decode);
        } catch (error) {
            if(error.response){
                navigate('/');
            }
        }
    }

    const getUser = async () => {
        try {
            const all = await axiosJWT.get(API_URL+'users', {
                headers : {
                    Authorization: `Bearer ${token}`
                }
            });
            //console.log(all.data);

            setRow(all.data);
        } catch (error) {
            console.log(error.response);
        }
    };

    const axiosJWT = axios.create();
    axiosJWT.interceptors.request.use(async(config) => {
        const datenow = new Date();
        if(expire * 1000 < datenow.getTime()){
            const respon = await axios.get(API_URL+'token');
            config.headers.Authorization = `Bearer ${respon.data.access_token}`;

            const decode = jwt_decode(respon.data.access_token);
            setToken(respon.data.access_token);
            setName(decode.userName);
            setExpire(decode.exp);
        }
        return config;

    }, (error) => {
        return Promise.reject(error);
    });

    return (
        <div className='container my-5'>
            <h2>Welcome back : {name}</h2>
            <button onClick={() => getUser() } className="button is-primary">Get Users</button>

            <div className="row">
                <div className="table-container mt-4">
                    <table className="table table is-bordered is-striped is-narrow is-hoverable is-fullwidth">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Name</th>
                                <th>Email</th>
                            </tr>
                        </thead>
                        <tbody>

                            {
                                (row_data.length === 0) ?
                                <tr>
                                    <td colSpan={3}> Data Kosong</td>
                                </tr> : 
                                row_data.map((data, index) => (
                                    <tr key={data.id}>
                                        <td>{index+1}</td>
                                        <td>{data.name}</td>
                                        <td>{data.email}</td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default Dashboard
