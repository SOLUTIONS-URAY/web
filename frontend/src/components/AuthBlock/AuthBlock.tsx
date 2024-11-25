import React from "react";
import "./AuthBlock.scss";
import {FullLogo} from "../Images/FullLogo/FullLogo.tsx";

export const AuthBlock = () => {
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
                                type="text"
                                placeholder="Почта или телефон"
                            />
                        </div>
                        <div className="auth_block_input_password">
                            <input
                                type="password"
                                placeholder="Пароль"
                            />
                        </div>
                    </div>
                    <div className="auth_block_form_button">
                        <button className="auth_block_form">
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