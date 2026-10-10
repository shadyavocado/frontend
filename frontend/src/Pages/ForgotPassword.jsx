import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function ForgotPassword() {

    const navigate = useNavigate();

    const [email, setEmail] = useState("");

    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {

        e.preventDefault();

        setMessage("");
        setError("");
        setLoading(true);

        try {

            const response = await api.post(
                "/forgot-password",
                { email }
            );

            if (response.data.success) {

                localStorage.setItem(
                    "resetEmail",
                    email
                );

                setMessage(response.data.message);

                setTimeout(() => {
                    navigate("/verify-otp");
                }, 1000);
            }

        } catch (error) {

            setError(
                error.response?.data?.message ||
                "Something went wrong"
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

                <h1>Forgot Password</h1>

                <p>
                    Enter your email to receive OTP.
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

                <label>Email</label>

                <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <button
                    type="submit"
                    disabled={loading}
                >
                    {loading ? "Sending..." : "Send OTP"}
                </button>

            </form>

        </div>
    );
}

export default ForgotPassword;
