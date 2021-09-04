import api from '../../services/api';
import logoImg from '../../assets/logo.svg'
import {Link, useHistory} from 'react-router-dom'
import React, {useEffect, useState} from 'react';



export default function Reset_password() {
  
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [token, setToken] = useState('');


  const history = useHistory()
  
  async function handleLogin(e){
      e.preventDefault()
      try {
          const res = await api.post('reset-password', {email, password, token})
          history.push('/')
      } catch (err) {
          alert('Email Inválido' + err)
      }
    }
  return (
    <body>
    <header>
            <img id="logo" src={logoImg} alt="Logo Dev Finances" />
    </header>
    <div className="logon-container container" align="center">
        <section className="input-group">
            <form onSubmit={handleLogin}>
                <h3 align="center"><span>Insira uma nova password</span></h3><br/>
                <input placeholder="Email" type="email" value={email} onChange={e => setEmail(e.target.value)} ></input><br/><br/>
                <input placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} ></input><br/><br/>
                <input placeholder="Token" value={token} onChange={e => setToken(e.target.value)} ></input><br/><br/>
                <button className="button" type="submit">Submit</button><br/><br/>
            </form>
        </section>
      </div>
      </body>
      )
}