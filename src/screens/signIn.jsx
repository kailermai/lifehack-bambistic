import { useState } from "react"
import { auth } from "../config/firebase"
import { signInWithEmailAndPassword } from "firebase/auth"
import './signIn.css'
import { Link } from "react-router-dom"

export const SignIn = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const signIn = async () => {
        try {
            await signInWithEmailAndPassword(auth, email, password);
        } catch (e) {
            console.error(e);
        }
    }


    return (
        <>
            <div className="login">
                <div className="title"><h1>LOGIN</h1></div>
                <div className="username">
                    <label htmlFor="uname"><b>Username</b></label>
                    <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="password">
                    <label htmlFor="psw"><b>Password</b></label>
                    <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                </div>
                <button onClick={signIn}>Sign In</button>
                <Link to='/register'>
                    <button>
                        Register
                    </button>
                </Link>
            </div>
        </>
    )
}