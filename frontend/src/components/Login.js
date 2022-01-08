import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { API_URL } from '../util/constants';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [msg, setMsg] = useState('');
    const navigate = useNavigate();

    const Auth = async (e) => {
        e.preventDefault();
        try {
            if(email !== '' || password !== ''){
                await axios.post(API_URL+'login', {
                    email: email,
                    password: password
                });
                navigate("/dashboard");
            } else {
                setMsg('Fields must be filled !');
            }
        } catch (err) {

            if (err.response) {
                setMsg(err.response.data.msg);
            }
        }
    };
    return (
        <section className="hero has-background-grey-light is-fullheight is-fullwidth">
          <div className="hero-body">
            <div className="container">
                <div className="columns is-centered">
                    <div className="column is-4-desktop">
                        <form onSubmit={(e) => Auth(e) } className="box">
                            {msg && <article class="message is-danger mb-3">
                                <div class="message-body">{msg}</div>
                            </article>}
                            
                            <div className="field">
                                <label className="label">Email or Username</label>
                                <div className="controls">
                                    <input type="text" className="input" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Email or  Username'/>
                                </div>
                            </div>
                            <div className="field">
                                <label className="label">Password</label>
                                <div className="controls">
                                    <input type="password" className="input" value={password} onChange={(e) => setPassword(e.target.value)} placeholder='*********' />
                                </div>
                            </div>
                            <div className="field">
                                <button className="button is-success is-fullwidt2h">Login</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
          </div>
        </section>
    )
}

export default Login
