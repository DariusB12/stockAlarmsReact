import { useState } from "react";
import { login } from "../../api/authService.jsx";
import { useNavigate } from 'react-router-dom';
import MessageBox from "../utils/messageBox/MessageBox.jsx";
import LoadingBox from "../utils/loadingBox/LoadingBox.jsx";


export default function LogInForm() {
    const [userData, setUserData] = useState({
        email: "",
        password: ""
    });
    const navigate = useNavigate();

    const [error, setError] = useState("");
    const [showMessage, setShowMessage] = useState(false);
    const [showLoading, setShowLoading] = useState(false);


    const handleChange = (e) => {
        setUserData({
            ...userData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        setShowLoading(true);
        e.preventDefault();
        try {
            await login(userData);
            setShowLoading(false);
        } catch (err) {
            setShowLoading(false);
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
            {/* conditional rendering*/}
            {showLoading && <LoadingBox></LoadingBox>}
            {showMessage && <MessageBox message={error} success={false} onClose={handleOnCloseMsgBox} />}
            <button type="submit">LogIn</button>
        </form>
        <div>
            <button onClick={handleRegisterNewUser}>New there? Create an account</button>
        </div>
        </>
    );
}
