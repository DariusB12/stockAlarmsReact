import { useState } from "react";
import { login } from "../../api/authService.jsx";
import { useNavigate } from 'react-router-dom';
import MessageBox from "../utils/MessageBox.jsx";


export default function LogInForm() {
    const [userData, setUserData] = useState({
        email: "",
        password: ""
    });
    const navigate = useNavigate();

    const [error, setError] = useState("");
    const [showMessage, setShowMessage] = useState(false);


    const handleChange = (e) => {
        setUserData({
            ...userData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await login(userData);
        } catch (err) {
            setError(err.message);
            setShowMessage(true);
        }
    };
    const handleRegisterNewUser = () =>{
        navigate("/register");
    }
    const handleOnCloseMsgBox = () => {
        setShowMessage(false);
    }

    return (
        <>
        <form onSubmit={handleSubmit}>
        <div >
                <label>Email:</label>
                <input
                    type="text"
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
            {showMessage && <MessageBox message={error} success={false} onClose={handleOnCloseMsgBox} />}
            <button type="submit">LogIn</button>
        </form>
        <div>
            <button onClick={handleRegisterNewUser}>New there? Create an account</button>
        </div>
        </>
    );
}
