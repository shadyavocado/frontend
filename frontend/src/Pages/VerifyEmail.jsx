import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function VerifyEmail() {

    const navigate = useNavigate();

    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const verifyEmail = async () => {

        const token = localStorage.getItem("registerToken");

        if (!token) {
            setError("Verification token not found. Please register again.");
            return;
        }

        setLoading(true);
        setError("");
        setMessage("");

        try {

            const response = await api.post(
                "/verify",
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            if (response.data) {
                setMessage(response.data.message);

                localStorage.removeItem("registerToken");

                setTimeout(() => {
                    navigate("/login");
                }, 1500);
            }

        } catch (error) {

            setError(
                error.response?.data?.message ||
                "Verification failed"
            );

        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-container">

            <div className="auth-card">

                <h1>Verify Email</h1>

                <p>
                    Please verify your email address.
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

                <button
                    onClick={verifyEmail}
                    disabled={loading}
                >
                    {loading ? "Verifying..." : "Verify Email"}
                </button>

            </div>

        </div>
    );
}

export default VerifyEmail;
