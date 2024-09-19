import { useState } from "react";
import { register } from "../../api/authService.jsx";
import { useNavigate } from 'react-router-dom';
import MessageBox from "../utils/MessageBox.jsx";

export default function RegisterForm() {
    const handleLogInPage = () =>{
        navigate("/logIn");
    }
    
    const [userData, setUserData] = useState({
        confirmPassword: "",
        password: "",
        email: "",
        firstName: "",
        lastName: "",
    });
    const [error, setError] = useState("");
    const [showMessage, setShowMessage] = useState(false);

    const navigate = useNavigate();

    const handleChange = (e) => {
        setUserData({
            ...userData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await register(userData);
        } catch (err) {
            setError(err.message);
            setShowMessage(true);
        }
    };

    const handleOnCloseMsgBox = () => {
        setShowMessage(false);
    }


    return (
        <>
        <form onSubmit={handleSubmit}>
        <div >
                <label>First Name:</label>
                <input
                    type="text"
                    name="firstName"
                    value={userData.firstName}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label>Last Name:</label>
                <input
                    type="text"
                    name="lastName"
                    value={userData.lastName}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label>Email:</label>
                <input
                    type="email"
                    name="email"
                    value={userData.email}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label>Password:</label>
                <input
                    type="password"
                    name="password"
                    value={userData.password}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label>Confirm Password:</label>
                <input
                    type="password"
                    name="confirmPassword"
                    value={userData.confirmPassword}
                    onChange={handleChange}
                />
            </div>
            {/* conditional rendering*/}
            {showMessage && <MessageBox message={error} success={false} onClose={handleOnCloseMsgBox} />}
            <button type="submit">Register</button>
        </form>
        <div>
            <button onClick={handleLogInPage}>Already have an account? Log In</button>
        </div>
        </>
    );
}
