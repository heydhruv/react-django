import { useState } from 'react';
import api from '../api';
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../constants';
import {useNavigate} from 'react-router-dom';
import "../styles/Form.css"

export default function Form({route, method}) {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const name = method === 'login'? "Login" : "Register"

    const handleSubmit = async (e) => {
        setLoading(true)
        e.preventDefault()

        try {
            const res = await api.post(route, {username, password})
            if (method === 'login') {
                localStorage.setItem(ACCESS_TOKEN, res.data.access)
                localStorage.setItem(REFRESH_TOKEN, res.data.refresh)
                navigate("/")
            }
            else {
                navigate("/login")
            }
        } catch (error) {
            alert(error.message)
        }
        finally {
            setLoading(false)
        }
    }

    return <form onSubmit={handleSubmit} className="form-container">
        <h1>{name}</h1>
        <input
            type="text"
            className='form-input'
            onChange={(e) => setUsername(e.target.value)}
            value={username}
            placeholder='Username'
        />
        <input
            type="text"
            className='form-input'
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            placeholder='Password'
        />
        <button type="submit" className='form-submit'>
            {name}
        </button>

    </form>
}