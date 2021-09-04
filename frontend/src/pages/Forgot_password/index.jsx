import api from '../../services/api';
import logoImg from '../../assets/logo.svg'
import {Link, useHistory} from 'react-router-dom'
import React, {useEffect, useState} from 'react';



export default function Forgot_password() {
  
    const [email, setEmail] = useState('');


    const history = useHistory()
  
  async function handleLogin(e){
      e.preventDefault()
      try {
          const res = await api.post('forgot-password', {email})
          history.push('/reset_password')
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
                <h3 align="center"><span>Esqueceu a sua password</span></h3><br/>
                <input placeholder="Seu Email" type="email" value={email} onChange={e => setEmail(e.target.value)} ></input><br/><br/>
                <button className="button" type="submit">Fazer pedido de Token</button><br/><br/>
                <Link to="/"><a>Já me lembrei</a></Link><br/><br/>
            </form>
        </section>
      </div>
      </body>
      )
}

