import { useRouter } from "next/router";
import { FormEvent, useState } from "react";
import admin from '/public/images/label.png';

export function RegComponent() {
    const [login, setLogin] = useState('')
    const [pass, setPass] = useState('')
    const router = useRouter()

    async function reg(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()

        const res = await fetch('/api/reg', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ login, pass })
        })
        if (res.ok) {
            const result = await res.json()
            if (result.redirectUrl) {
                router.push(result.redirectUrl as string)
            }
            console.log(result);
        }
    }
    return (
        <>
            <div className="background">
                <form className="form" onSubmit={reg}>
                    <div className="mb-3">
                        <label>
                            <input className="input" placeholder="Логин" value={login} onChange={(event) => setLogin(event.target.value)} type="text" />
                        </label>
                    </div>
                    <div className="mb-3">
                        <label>
                            <input className="input" placeholder="Пароль" value={pass} onChange={(event) => setPass(event.target.value)} type="password" />
                        </label>
                    </div>
                    <div className="mb-3">
                        <button className="btn" id="btnMedia" type="submit">Зарегистрироваться</button>
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
    background-image: url('${admin.src}');
    background-repeat:no-repeat;
    background-size: contain;

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

@media(max-width: 600px) {
    .input.input {
      width: 150px;
      height: 20px;
      font-family: 'Montserrat', sans-serif;
      font-size: 15px;
    }
}
`}</style>

        </>)
}