import { useState } from "react";
import api from "../../api/axios";
import { useNavigate, Link } from "react-router-dom";

export default function Signup() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const navigate = useNavigate();
    
    const handleSignup = async (e) => {
        e.preventDefault();

        if (!name || !email || !password) {
            setMessage('fill all the missing fields');
            return
        }

        try {
            const data = await api.post('/auth/signup', {name, email, password});

            if (data.success) {
                setMessage('signup successful!');
                navigate('/login')
            } else {
                setMessage(data.message)
            }
        } catch (err) {
            setMessage('Please try again later!')
        }
    }

    return (
        <div className="signup">
            <form onSubmit={handleSignup}>
                <input type="text" placeholder="enter your name" onChange={(e) => setName(e.target.value)} /><br /><br />
                <input type="email" placeholder="enter your email" onChange={(e) => setEmail(e.target.value)} /><br /><br />
                <input type="password" placeholder="enter your password" onChange={(e) => setPassword(e.target.value)} /><br /><br />
                <button>Signup</button>
                <p>I already have an account? <Link to={'/login'}>Login</Link> </p>
            </form>
            {
                message && <p>{message}</p>
            }
        </div>
    )
}