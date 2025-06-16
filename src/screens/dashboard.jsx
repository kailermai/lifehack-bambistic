import { auth } from "../config/firebase"
import { signOut } from "firebase/auth"
import Button from 'react-bootstrap/Button';
import { useNavigate } from "react-router-dom"

const Dashboard = () => {
    const navigate = useNavigate();

    const logout = async () => {
        try {
            await signOut(auth);
            navigate('/signIn')
        } catch (e) {
            console.error(e);
        }
    }

    return (
        <>
            <Button variant="danger" onClick={logout}>Logout</Button>
        </>
    )
}

export default Dashboard;