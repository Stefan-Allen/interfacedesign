"use client"
import React, { useState } from 'react';
import styles from './Login.module.css';
import RegistrationForm from '../Register/RegistrationForm'; // Update the import path

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showRegistrationModal, setShowRegistrationModal] = useState(false);

    const handleLogin = async () => {
        try {
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Login was successful:', data.message);
            } else {
                const data = await response.json();
                console.error('Login error:', data.message);
            }
        } catch (error) {
            console.error('API call error:', error);
        }
    }

    const handleCloseRegistrationModal = () => {
        setShowRegistrationModal(false);
    };

    const handleShowRegistrationModal = () => {
        setShowRegistrationModal(true);
    };

    return (
        <div className={styles.AppWrapper}>
            <div className={styles.MainContainerStyle}>
                <div className={styles.LogoContainer}>
                    <div className={styles.Logo}>Your Logo Text</div>
                    <div className={styles.TextUnderLogo}>Text Under Logo</div>
                </div>

                <div className={styles.MainContainer}>
                    <div className={styles.TxtBoxStyle}>
                        <input
                            required
                            type="email"
                            className={styles.TxtBox1}
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <input
                            required
                            type="password"
                            className={styles.TxtBox2}
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <button className={styles.LoginButton} onClick={handleLogin}>
                            Log in
                        </button>
                        <a href="#" className={styles.ForgotPassword}>Forgot Password?</a>

                        <div className={styles.Underline}></div>
                        <button className={styles.Register} onClick={handleShowRegistrationModal}>
                            Create a new account
                        </button>
                    </div>
                </div>
            </div>

            {showRegistrationModal && (
                <div className={styles.Modal}>
                    <div className={styles.ModalContent}>
                        <RegistrationForm onClose={handleCloseRegistrationModal} />
                    </div>
                </div>
            )}
        </div>
    );
}