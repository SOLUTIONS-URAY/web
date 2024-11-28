import React, {useState} from "react";
import "./AuthBlock.scss";
import {FullLogo} from "../Images/FullLogo/FullLogo.tsx";
import {auth} from "../../api/auth.ts";
import {toast} from "react-toastify";

const validateEmail = (email: string) => {
    return String(email)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
};
export const AuthBlock = () => {
    const [emailText, setEmailText] = useState("");
    const [passwordText, setPasswordText] = useState("");

    const onEmailTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmailText(e.target.value);
    }
    const onPasswordTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPasswordText(e.target.value);
    }

    const onAuthButtonClick = () => {
        console.log(emailText, passwordText);
        if (emailText == ""){
            toast.error("Введите почту");
            return;
        }
        if (passwordText == ""){
            toast.error("Введите пароль");
            return;
        }
        if (!validateEmail(emailText)){
            toast.error("Введите верную почту");
            return;
        }

        auth(emailText, passwordText)
            .then(({access_token, user_data})=>{
                console.log("Sus", access_token);
                localStorage.setItem("access_token", access_token);
                localStorage.setItem("user_data", JSON.stringify(user_data));

                window.location.href = '/control';
            })
            .catch((err)=>{
                toast.error(err.message || "Неизвестная ошибка");
                console.error("AuthBlock auth error:", err);
            })
    }

    return (
        <div className="auth_block">
            <div className="auth_block_inner_content">
                <div className="auth_block_logo">
                    <FullLogo/>
                </div>
                <div className="auth_block_form">
                    <div className="auth_block_form_inputs">
                        <div className="auth_block_input_login">
                            <input
                                type="email"
                                placeholder="Почта"
                                value={emailText}
                                onChange={onEmailTextChange}
                            />
                        </div>
                        <div className="auth_block_input_password">
                            <input
                                type="password"
                                placeholder="Пароль"
                                value={passwordText}
                                onChange={onPasswordTextChange}
                            />
                        </div>
                    </div>
                    <div className="auth_block_form_button">
                        <button className="auth_block_form" onClick={onAuthButtonClick}>
                            Войти
                        </button>
                    </div>
                </div>
                <div className="auth_block_legal_info">
                    <p className="auth_legal">
                        Нажимая кнопку вы соглашаетесь с <a href="" className="legal_link">политикой конфиденциальности</a>
                    </p>

                </div>
            </div>
        </div>
    );
};