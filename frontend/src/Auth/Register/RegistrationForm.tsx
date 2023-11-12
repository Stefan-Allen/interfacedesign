import React, { useState, ChangeEvent, FormEvent } from 'react';
import styles from './RegistrationForm.module.css';

interface RegistrationFormProps {
    onClose: () => void;
}

const RegistrationForm: React.FC<RegistrationFormProps> = ({ onClose }) => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const response = await fetch('/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Registration was successful:', data.message);
                onClose();
            } else {
                const data = await response.json();
                console.error('Registration error:', data.message);
            }
        } catch (error) {
            console.error('API call error:', error);
        }
    };

    return (
        <div className={styles['background']}>
            <div className={styles['registration-form']}>
                <button className={styles['close-button']} onClick={onClose}>X</button>
                <h2>Registration Form</h2>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="username">Username</label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                        />
                    </div>

                    <div>
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                        />
                    </div>

                    <div>
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                        />
                    </div>

                    <div>
                        <label htmlFor="confirmPassword">Confirm Password</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                        />
                    </div>

                    <button type="submit" className={styles['submitbutton']}>Sign Up</button>
                </form>
            </div>
        </div>
    );
};

export default RegistrationForm;
