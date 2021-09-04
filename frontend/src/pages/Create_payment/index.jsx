import api from '../../services/api';
import logoImg from '../../assets/logo.svg'
import {Link, useHistory} from 'react-router-dom'
import React, {useEffect, useState} from 'react';           



export default function Create_payment() {
  
    const [type, setType] = useState('');
    const [value, setValue] = useState('');
    const [date, setDate] = useState('');
    const [status, setStatus] = useState('');

  const history = useHistory()
  
  async function handleLogin(e){
    const userToken = localStorage.getItem('usertoken')
      e.preventDefault()
      try {
          await api.post('create-payment', {type, value, date, status}, { headers: {
            Authorization: "Bearer " + userToken,
            }})  
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
                <h3 align="center" ><span>Pagamento</span></h3><br/>
                <input placeholder="Descrição" value={type} onChange={e => setType(e.target.value)} ></input><br/><br/>
                <input placeholder="Valor" type="number" value={value} onChange={e => setValue(e.target.value)} ></input><br/><br/>
                <input placeholder="Data" type="date" value={date} onChange={e => setDate(e.target.value)} ></input><br/><br/>
                <button className="button" type="submit">Inserir</button><br/><br/>
                <Link to="/profile"><a>Cancelar</a></Link><br/><br/>
            </form>
        </section>
      </div>
      </body>
      )
}

