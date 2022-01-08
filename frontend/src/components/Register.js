import React, { useState } from 'react';
import axios from 'axios';
import { API_URL } from '../util/constants';
import { useNavigate } from 'react-router-dom';

function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confPassword, setConfPassword] = useState('');
    const [msg, setMsg] = useState();
    const navi = useNavigate();

    const submitRegister = async (e) => {
        e.preventDefault();

        try {
            if(name !== '' || email !== '' || password !== '' || confPassword !== ''){
                await axios.post(API_URL +'users', {
                    nama: name,
                    email: email,
                    password: password,
                    confPassword: confPassword
                });
                navi('/');
            }else{
                setMsg('Fields must be filled !');
            }
        } catch (err) {
            if(err.response){
                setMsg(err.response.data.msg);
            }
        }
    };
    return (
        <div>
            <section className="hero has-background-grey-light is-fullheight is-fullwidth">
                <div className="hero-body">
                    <div className="container">
                        <div className="columns is-centered">
                            <div className="column is-4-desktop">
                                <form onSubmit={(e) => submitRegister(e)} className="box">
                                    <p className='has-text-centered has-text-danger'>{msg}</p>
                                    <div className="field">
                                        <label className="label">Name</label>
                                        <div className="controls">
                                            <input type="text" className="input" value={name} onChange={(e) => setName(e.target.value)} placeholder='Full Name' />
                                        </div>
                                    </div>
                                    <div className="field">
                                        <label className="label">Email</label>
                                        <div className="controls">
                                            <input type="email" className="input" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Email' />
                                        </div>
                                    </div>
                                    <div className="field">
                                        <label className="label">Password</label>
                                        <div className="controls">
                                            <input type="Password" className="input" value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Password' />
                                        </div>
                                    </div>
                                    <div className="field">
                                        <label className="label">Confrim Password</label>
                                        <div className="controls">
                                            <input type="password" className="input" value={confPassword} onChange={(e) => setConfPassword(e.target.value)} placeholder='Confrim Password' />
                                        </div>
                                    </div>
                                    <div className="field">
                                        <button className="button is-success is-fullwidt2h">Register</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Register
