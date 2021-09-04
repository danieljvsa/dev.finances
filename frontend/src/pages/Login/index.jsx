import api from '../../services/api';
import logoImg from '../../assets/logo.svg'
import {Link, useHistory} from 'react-router-dom'
import React, {useEffect, useState} from 'react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const history = useHistory()
  
  async function handleLogin(e){
      e.preventDefault()
      try {
            const res = await api.post('authenticate', {email, password})
          
            localStorage.setItem('usertoken', res.data.token)
            localStorage.setItem('useremail', res.data.email)
          
          //alert('usertoken: '+ res.data.token + ' useremail: ' + res.data.email)
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
            
            <section align="center" className="">
                <form onSubmit={handleLogin} className="input-group">
                    <h3 align="center" ><span>Login</span></h3><br/>
                    <input placeholder="Email" type="email" value={email} onChange={e => setEmail(e.target.value)} ></input><br/><br/>
                    <input placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} ></input><br/><br/>
                    <button className="button" type="submit">Entrar</button><br/><br/>
                    <Link to="/register"><a>Não tenho conta</a></Link><br/><br/>
                    <Link to="/forgot_password"><a>Esqueceu a palavra-passe</a></Link><br/><br/>
                </form>
            </section>
        </div>
      
    </body>  
      )
  }
    
   