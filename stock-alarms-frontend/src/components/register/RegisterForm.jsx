import { useState } from "react";
import { register } from "../../api/authentication/authService.jsx";
import { useNavigate } from 'react-router-dom';
import MessageBox from "../utils/messageBox/MessageBox.jsx";
import LoadingBox from "../utils/loadingBox/LoadingBox.jsx";

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
    const [message, setMessage] = useState("");
    const [success, setSuccess] = useState("");
    const [showMessage, setShowMessage] = useState(false);
    const [showLoading, setShowLoading] = useState(false);


    const navigate = useNavigate();

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
            await register(userData);
            setMessage("Registered with Success! Log In into your new account");
            setSuccess(true);
            setShowMessage(true);
            setShowLoading(false);
        } catch (err) {
            setShowLoading(false);
            console.log(err);
            // if(err.message)
            //     setMessage(err.message);
            // else
                setMessage(err.message)
            setSuccess(false);
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
                <label className="registerFormLabel">First Name:</label>
                <input
                    type="text"
                    name="firstName"
                    value={userData.firstName}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label className="registerFormLabel">Last Name:</label>
                <input
                    type="text"
                    name="lastName"
                    value={userData.lastName}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label className="registerFormLabel">Email:</label>
                <input
                    type="email"
                    name="email"
                    value={userData.email}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label className="registerFormLabel">Password:</label>
                <input
                    type="password"
                    name="password"
                    value={userData.password}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label className="registerFormLabel">Confirm Password:</label>
                <input
                    type="password"
                    name="confirmPassword"
                    value={userData.confirmPassword}
                    onChange={handleChange}
                />
            </div>
            {/* conditional rendering*/}
            {showLoading && <LoadingBox></LoadingBox>}
            {showMessage && <MessageBox message={message} success={success} onClose={handleOnCloseMsgBox} />}
            <button type="submit">Register</button>
        </form>
        <div>
            <button onClick={handleLogInPage}>Already have an account? Log In</button>
        </div>
        </>
    );
}
