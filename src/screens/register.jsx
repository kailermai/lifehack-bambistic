import { useState } from "react"
import { auth } from "../config/firebase"
import { createUserWithEmailAndPassword } from "firebase/auth"
import { Link } from "react-router-dom";

export const Register = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const register = async () => {
        await createUserWithEmailAndPassword(auth, email, password);
    };

    return (
        <>
            <div>
                <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
                <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                <button onClick={register}>Register</button>
                <Link to='/signIn'>
                    <button>
                        Back
                    </button>
                </Link>
            </div>
        </>
    );
};