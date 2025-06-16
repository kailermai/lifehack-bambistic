import { Link } from "react-router-dom";

const Dashboard = () => {
    return (
        <>
            <ul>
                <li><Link to="/signIn">Sign In</Link></li>
                <li><Link to="/register">Register</Link></li>
            </ul>
        </>
    )
}

export default Dashboard;