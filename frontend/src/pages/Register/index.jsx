import api from '../../services/api';
import logoImg from '../../assets/logo.svg'
import {Link, useHistory} from 'react-router-dom'
import React, {useEffect, useState} from 'react';


export default function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
  
    const history = useHistory()
    
    async function handleLogin(e){
        e.preventDefault()
        try {
            const res = await api.post('create', {email, password, name})
            localStorage.setItem('usertoken', res.data.token)
            localStorage.setItem('useremail', res.data.email)
            alert('usertoken: '+ res.data.token)
            history.push('/profile')
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
                  <h3 align="center"><span>Faça o seu registro</span></h3><br/>
                  <input placeholder="Nome" value={name} onChange={e => setName(e.target.value)} ></input><br/><br/>
                  <input placeholder="Email" type="email" value={email} onChange={e => setEmail(e.target.value)} ></input><br/><br/>
                  <input placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} ></input><br/><br/>
                  <button className="button" type="submit">Entrar</button><br/><br/>
                  <Link to="/"><a>Já tenho conta</a></Link><br/><br/>
              </form>
          </section>
        </div>
        </body>
        )
    }
    