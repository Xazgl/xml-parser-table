import { FormEvent, useState } from "react";
import type { NextApiRequest, NextApiResponse } from 'next'
import router from "next/router";
import admin from '/public/images/label.png';

export function Login() {
    const [login, setLogin] = useState('')
    const [pass, setPass] = useState('')
    async function submit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
        console.log(login);
        console.log(pass);
     const res = await fetch(`/api/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ login, pass })
        })
        if (res.ok) {
        const result = await (await res).json()
            if (result.redirectUrl) {
               router.push(result.redirectUrl as string)
            }
        console.log(result);
         }
}
    return (
    <>  
    <div className="background">
      <form className="form"onSubmit={submit}>
      <div className="mb-3">
            <label>
                <input className="input" placeholder="Логин" value={login} onChange={(event) => setLogin(event.target.value)} type="text"/>
            </label>
        </div>   
        <div className="mb-3">
            <label>
                <input className="input" placeholder="Пароль" value={pass} onChange={(event) => setPass(event.target.value)} type="password"/>
            </label>
        </div>   
        <div className="mb-3">
            <button className="btn"  id="btnMedia" type="submit">Вход</button>
        </div>  
      </form>
    </div>

<style jsx>{`

@media(max-width: 700px) {
    #btnMedia{
      width: 200px;
      height: 40px;
      font-size: 20px;
    }
}

@media(max-width: 400px) {
.input.input {
    width: 273px;
    height: 33px;
    font-family: 'Montserrat', sans-serif;
    font-size: 19px;
    }
}

.background{
    display: flex;
    justify-content: center;
    top: 0;
    right: 0;
    left: 0;
    height: 100vh;
    background-position: center center;
    background-repeat:no-repeat;
    background-size: contain;
    background-image: url('${admin.src}');

}
.form {
    display:flex;
    justify-content: center;
    flex-direction: column;
    align-items:center;
}

.mb-3 {
    display: flex;
    justify-content: center;
    flex-direction: row;
    margin-top:30px;
}

.input {
    width: 300px;
    height: 35px;
    font-family: 'Montserrat', sans-serif;
    font-size: 20px;
}

.btn {
    font-family: 'Montserrat', sans-serif;
    border-radius: 3px;
    border:none;
    transition: transform.3s ;
    color: #ffffff;
    background-color:  #4285B4;
    width: 220px;
    height: 50px;
    font-size: 25px;
}

.btn:hover {
    background-color:#D6AE01;
    border: none;
    font-family: 'Montserrat', sans-serif;
    color:black;
    transform: scale(1.01);
    box-shadow: -3px 15px 9px 3px rgba(34, 60, 80, 0.2);
    font-weight:bold;
} 

`}</style>

    </> )
}