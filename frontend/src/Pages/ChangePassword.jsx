import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function ChangePassword() {

    const navigate = useNavigate();

    const email = localStorage.getItem("resetEmail");

    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

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
                `/change-password/${encodeURIComponent(email)}`,
                {
                    newPassword,
                    confirmPassword
                }
            );

            if (response.data.success) {

                setMessage(response.data.message);

                localStorage.removeItem("resetEmail");

                setTimeout(() => {
                    navigate("/login");
                }, 1500);
            }

        } catch (error) {

            setError(
                error.response?.data?.message ||
                "Password change failed"
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

                <h1>Change Password</h1>

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

                <label>New Password</label>

                <input
                    type="password"
                    placeholder="New password"
                    value={newPassword}
                    onChange={(e) =>
                        setNewPassword(e.target.value)
                    }
                />

                <label>Confirm Password</label>

                <input
                    type="password"
                    placeholder="Confirm password"
                    value={confirmPassword}
                    onChange={(e) =>
                        setConfirmPassword(e.target.value)
                    }
                />

                <button
                    type="submit"
                    disabled={loading}
                >
                    {loading ? "Changing..." : "Change Password"}
                </button>

            </form>

        </div>
    );
}

export default ChangePassword;
