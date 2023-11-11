'use client'
import React, {useState} from 'react';
import styles from './Login.module.css';
import RegistrationForm from '../Register/RegistrationForm';

export default function Login() {
    const [showRegistrationModal, setShowRegistrationModal] = useState(false);

    const openRegistrationModal = () => {
        setShowRegistrationModal(true);
    };

    const closeRegistrationModal = () => {
        setShowRegistrationModal(false);
    };

    return (
        <div className={styles.AppWrapper}>
            <div className={styles.MainContainerStyle}>
                <div className={styles.MainContainer}>
                    <div className={styles.TxtBoxStyle}>
                        <input type="email" className={styles.TxtBox1} placeholder="Email"/>
                        <input type="password" className={styles.TxtBox2} placeholder="Password"/>
                        <button className={styles.LoginButton}>Log in</button>
                        <a href="/password-reset" className={styles.ForgotPassword}>Forgot password?</a>
                        <div className={styles.Underline}></div>
                        <button className={styles.Register} onClick={openRegistrationModal}>
                            Create new account
                        </button>
                    </div>
                </div>
            </div>

            {showRegistrationModal && (
                <div className={styles.Modal}>
                    <div className={styles.ModalContent}>
                        <RegistrationForm onClose={closeRegistrationModal}/>
                    </div>
                </div>
            )}
        </div>
    );
}
