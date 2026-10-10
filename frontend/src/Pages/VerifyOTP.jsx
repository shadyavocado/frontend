import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


function VerifyOTP() {
    const navigate = useNavigate();

    const [otp, setOtp] = useState(["", "", "", "", "", ""]);
    const [timer, setTimer] = useState(60);
    const [error, setError] = useState("");

    useEffect(() => {
        if (timer <= 0) return;

        const interval = setInterval(() => {
            setTimer((prev) => prev - 1);
        }, 1000);

        return () => clearInterval(interval);
    }, [timer]);

    const handleChange = (value, index) => {
        if (!/^\d?$/.test(value)) return;

        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);
        setError("");

        if (value && index < 5) {
            document.getElementById(`otp-${index + 1}`).focus();
        }
    };

    const handleKeyDown = (e, index) => {
        if (e.key === "Backspace" && !otp[index] && index > 0) {
            document.getElementById(`otp-${index - 1}`).focus();
        }
    };

    const handleVerify = (e) => {
        e.preventDefault();

        const enteredOTP = otp.join("");

        if (enteredOTP.length !== 6) {
            setError("Please enter the complete 6-digit OTP.");
            return;
        }

        // Backend API yahan call karna hai
        console.log("OTP:", enteredOTP);

        // Successful verification ke baad
        navigate("/change-password");
    };

    const handleResend = () => {
        if (timer > 0) return;

        setTimer(60);
        setOtp(["", "", "", "", "", ""]);
        setError("");

        // Backend resend OTP API yahan call karna hai
        console.log("Resend OTP");
    };

    return (
        <div className="otp-page">
            <div className="otp-card">

                <div className="otp-icon">
                    ✉
                </div>

                <h1>Verify OTP</h1>

                <p className="otp-description">
                    Enter the 6-digit verification code sent to your email.
                </p>

                <form onSubmit={handleVerify}>

                    <div className="otp-inputs">
                        {otp.map((digit, index) => (
                            <input
                                key={index}
                                id={`otp-${index}`}
                                type="text"
                                inputMode="numeric"
                                maxLength="1"
                                value={digit}
                                onChange={(e) =>
                                    handleChange(e.target.value, index)
                                }
                                onKeyDown={(e) =>
                                    handleKeyDown(e, index)
                                }
                                className={error ? "error-input" : ""}
                            />
                        ))}
                    </div>

                    {error && (
                        <p className="error-message">
                            {error}
                        </p>
                    )}

                    <button type="submit" className="verify-btn">
                        Verify OTP
                    </button>
                </form>

                <div className="resend-section">
                    {timer > 0 ? (
                        <p>
                            Resend OTP in{" "}
                            <span>00:{String(timer).padStart(2, "0")}</span>
                        </p>
                    ) : (
                        <button
                            type="button"
                            className="resend-btn"
                            onClick={handleResend}
                        >
                            Resend OTP
                        </button>
                    )}
                </div>

                <button
                    className="back-btn"
                    onClick={() => navigate("/forgot-password")}
                >
                    ← Back
                </button>

            </div>
        </div>
    );
}

export default VerifyOTP;