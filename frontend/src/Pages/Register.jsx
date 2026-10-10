import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";

function Register() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: ""
    });

    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setMessage("");
        setError("");
        setLoading(true);

        try {
            const response = await api.post("/register", formData);

            if (response.data.success) {

                // Backend register token
                const token = response.data.data?.token;

                if (token) {
                    localStorage.setItem("registerToken", token);
                }

                localStorage.setItem("registerEmail", formData.email);

                setMessage(response.data.message);

                setTimeout(() => {
                    navigate("/verify-email");
                }, 1000);
            }

        } catch (error) {
            setError(
                error.response?.data?.message ||
                "Registration failed"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-container">

            <form className="auth-card" onSubmit={handleSubmit}>

                <h1>Create Account</h1>

                <p className="subtitle">
                    Register your account
                </p>

                {message && (
                    <div className="success">
                        {message}
                    </div>
                )}

                {error && (
                    <div className="error">
                        {error}
                    </div>
                )}

                <label>Username</label>

                <input
                    type="text"
                    name="username"
                    placeholder="Enter username"
                    value={formData.username}
                    onChange={handleChange}
                />

                <label>Email</label>

                <input
                    type="email"
                    name="email"
                    placeholder="Enter email"
                    value={formData.email}
                    onChange={handleChange}
                />

                <label>Password</label>

                <input
                    type="password"
                    name="password"
                    placeholder="Enter password"
                    value={formData.password}
                    onChange={handleChange}
                />

                <button type="submit" disabled={loading}>
                    {loading ? "Creating..." : "Register"}
                </button>

                <p>
                    Already have an account?{" "}
                    <Link to="/login">Login</Link>
                </p>

            </form>

        </div>
    );
}

export default Register;
