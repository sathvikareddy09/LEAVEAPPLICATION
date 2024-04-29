import { useState } from 'react';
import './login.css';
import { useLocation, useNavigate } from 'react-router';
function Login() {
    const [employeeId, setEmployeeId] = useState('');
    const [password, setPassword] = useState('');
    const location = useLocation();
    const navigate = useNavigate()
    const handleLogin = async (e) => {
        e.preventDefault();
        let vals = {
            empId: employeeId,
            password:password
        };
        console.log(vals)
        try {
            const response = await fetch("https://localhost:7125/api/Employees/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(vals)
            });
            if (!response.ok) {
                console.log(response)
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            alert("logged in successfully");
            console.log(data);
            navigate('/leaveform', { state: { data: data } });

        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
        }
    }

    return (
        <div className="App">
            <h1>Login Page</h1>
            <form onSubmit={handleLogin} className="login-form">
                <div className="form-group">
                    <label htmlFor="employeeId">Employee ID:</label>
                    <input
                        className="input"
                        type="number"
                        id="employeeId"
                        value={employeeId}
                        onChange={(e) => setEmployeeId(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input
                        className="input"
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Login</button>
            </form>
        </div>
    );
}

export default Login;