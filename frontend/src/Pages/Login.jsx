import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";

function Login() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

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

        setError("");
        setLoading(true);

        try {

            const response = await api.post(
                "/login",
                formData
            );

            if (response.data.success) {

                localStorage.setItem(
                    "accessToken",
                    response.data.accesstoken
                );

                localStorage.setItem(
                    "refreshToken",
                    response.data.refreshtoken
                );

                localStorage.setItem(
                    "username",
                    response.data.username
                );

                navigate("/dashboard");
            }

        } catch (error) {

            setError(
                error.response?.data?.message ||
                "Login failed"
            );

        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-container">

            <form
                className="auth-card"
                onSubmit={handleSubmit}
            >

                <h1>Welcome Back</h1>

                <p className="subtitle">
                    Login to your account
                </p>

                {error && (
                    <div className="error">
                        {error}
                    </div>
                )}

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
                    {loading ? "Logging in..." : "Login"}
                </button>

                <div className="links">

                    <Link to="/forgot-password">
                        Forgot Password?
                    </Link>

                    <span>
                        Don't have an account?{" "}
                        <Link to="/register">
                            Register
                        </Link>
                    </span>

                </div>

            </form>

        </div>
    );
}

export default Login;
