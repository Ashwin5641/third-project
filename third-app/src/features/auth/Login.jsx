import { useState } from "react";
import api from "../../api/axios";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "./AuthContext";

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const navigate = useNavigate();
    const {login} = useAuth();
    
    const handleLogin = async (e) => {
        e.preventDefault();

        if (!email || !password) {
            setMessage('fill all the missing fields');
            return
        }

        try {
            const data = await api.post('/auth/login', {email, password});

            if (data.success) {
                login(data.token, data.user);
                setMessage('login successful!');
                navigate('/')
            } else {
                setMessage(data.message)
            }
        } catch (err) {
            setMessage('Please try again later!')
        }
    }

    return (
        <div className="signup">
            <form onSubmit={handleLogin}>
                <input type="email" placeholder="enter your email" onChange={(e) => setEmail(e.target.value)} /><br /><br />
                <input type="password" placeholder="enter your password" onChange={(e) => setPassword(e.target.value)} /><br /><br />
                <button>Login</button>
                <p>I don't have an account? <Link to={'/signup'}>Signup</Link></p>
            </form>
        </div>
    )
}