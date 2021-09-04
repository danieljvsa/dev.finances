import React, {useEffect, useState} from 'react';
import api from '../../services/api';
import './styles.css'
import {useHistory, Link} from 'react-router-dom'

import logoImg from '../../assets/logo.svg'
import incomeImg from '../../assets/income.svg'
import lossesImg from '../../assets/expense.svg'
import totalImg from '../../assets/total.svg'
import minusImg from '../../assets/minus.svg'

export default function Profile() {
    const [payments, setPayments] = useState([])
    const [earnings, setEarnings] = useState([])
    const [total, setTotal] = useState([])
    
    const history = useHistory()

    async function renderPayments() {
        const userToken = localStorage.getItem('usertoken')
        api.get('payments', {
            headers: {
                Authorization: "Bearer " + userToken,
            }
        }).then(res => {
            setPayments(res.data.payments)
        })
    }

    async function renderEarnings(){
        const userToken = localStorage.getItem('usertoken')
        api.get('sum-earnings', {
            headers: {
                Authorization: "Bearer " + userToken,
            }
        }).then(res => {
            setEarnings(res.data)
        })
    }

    async function renderTotal(){
        const userToken = localStorage.getItem('usertoken')
        api.get('sum-total', {
            headers: {
                Authorization: "Bearer " + userToken,
            }
        }).then(res => {
            setTotal(res.data)
        })
    }

    useEffect(() => {
        renderPayments()
        renderEarnings()
        renderTotal()
    })

    async function handleDeleteIncident(id){
        const userToken = localStorage.getItem('usertoken')
        console.log(id)
        try {
          await api.delete('payments/' + id,{ headers: {
            Authorization: "Bearer " + userToken,
            }})  
            console.log(id)
          setPayments(payments.filter(payment => payment._id !== id))
        } catch (err) {
            alert('Não é possivel eliminar ' + err)
        }
    }

    function handleLogout(){
        localStorage.clear()
        history.push('/')
    }
    return(
        
        <body>
            <header>
                <img id="logo" src={logoImg} alt="Logo Dev Finances" onClick={() => handleLogout()}/>
            </header>
            
            <main class="container">
                <section id="balance">
                <h2 class="sr-only">Balanço</h2>
                <div class="card">
                    <h3>
                    <span>Entradas</span>
                    <img src={incomeImg} alt="Imagem de Entradas" />
                    </h3>
                    <p id="incomeDisplay">{earnings.map(sum => (sum._id == "Entrada" ? sum.totalamount + " €" : ""))}</p>
                </div>
                <div class="card">
                    <h3>
                    <span>Saídas</span>
                    <img src={lossesImg} alt="Imagem de Saídas" />
                    </h3>
                    <p id="expenseDisplay">{earnings.map(sum => (sum._id == "Saída" ? sum.totalamount + " €" : ""))}</p>
                </div>
                <div class="card total">
                    <h3>
                    <span>Total</span>
                    <img src={totalImg} alt="Imagem de Total" />
                    </h3>
                    <p id="totalDisplay">{total.map(sum => sum.totalamount + " €" )}</p>
                </div>
                </section>
                <section id="transactions">
                <h2 class="sr-only">Transações</h2>

                <div class="actions">
                    <Link to="/create_payment"><a 
                    href="#" 
                    class="button new"
                     
                    >
                    + Nova Transação
                    </a></Link>
                </div>

                <table id="data-table">
                    <thead>
                    <tr>
                        <th  id="th-description">Descrição</th>
                        <th id="th-value">Valor</th>
                        <th  id="th-date">Data</th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                    {payments.map(payment => (
                         payment.status == "Entrada" ?
                            ( <tr>
                                <td class="description">{payment.type}</td>
                                <td class="income">{payment.value}</td>
                                <td class="date">{payment.date}</td>
                                <td className=""><img src={minusImg} alt="Remover transação" width={22} height={22} onClick={() => handleDeleteIncident(payment._id)}/></td>
                            </tr>)
                            
                        : payment.status == "Saída" ?
                            <tr>
                                <td class="description">{payment.type}</td>
                                <td class="expense">{payment.value}</td>
                                <td class="date">{payment.date}</td>
                                <td className=""><img src={minusImg} alt="Remover transação" width={22} height={22} onClick={() => handleDeleteIncident(payment._id)}/></td>
                            </tr> : "" 
                          
                      ))
                      }
                    </tbody>
                </table>
                </section>
            </main>
        </body>
            
        
    )
}