import { Link } from "react-router-dom";

const Home = () => {
    return (
        <>
            <ul>
                <li><Link to="/signIn">Sign In</Link></li>
                <li><Link to="/dashboard">Dashboard</Link></li>
            </ul>
        </>
    )
}

export default Home;