'use client';

import { useState } from 'react';
import Button from '@/components/ui/Button';
import styles from './page.module.css';
import { contactConfig } from '@/data/config';

export default function ContactPage() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: 'Membership Inquiry',
        message: ''
    });
    const [status, setStatus] = useState({
        loading: false,
        success: false,
        error: null
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus({ loading: true, success: false, error: null });

        if (!contactConfig.contactScriptUrl || contactConfig.contactScriptUrl.includes('YOUR_GOOGLE')) {
            setStatus({
                loading: false,
                success: false,
                error: 'Configuration Error: Contact API URL not set.'
            });
            return;
        }

        try {
            const response = await fetch(contactConfig.contactScriptUrl, {
                method: 'POST',
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                setStatus({ loading: false, success: true, error: null });
                setFormData({
                    name: '',
                    email: '',
                    subject: 'Membership Inquiry',
                    message: ''
                });
            } else {
                throw new Error('Failed to send message');
            }
        } catch (err) {
            setStatus({
                loading: false,
                success: false,
                error: 'Something went wrong. Please try again later.'
            });
        }
    };

    return (
        <main className="section container animate-fade-in">
            <div className={styles.header}>
                <h1 className={styles.title}>Join the <span className="red-text">Elite</span></h1>
                <p className={styles.subtitle}>Begin your transformation journey today.</p>
            </div>

            <div className={styles.grid}>
                <div className={styles.formContainer}>
                    <form className={styles.form} onSubmit={handleSubmit}>
                        <div className={styles.formGroup}>
                            <input
                                id="name"
                                name="name"
                                type="text"
                                placeholder="FULL NAME"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                className={styles.input}
                            />
                        </div>
                        <div className={styles.formGroup}>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                placeholder="EMAIL ADDRESS"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                className={styles.input}
                            />
                        </div>
                        <div className={styles.formGroup}>
                            <select
                                id="subject"
                                name="subject"
                                value={formData.subject}
                                onChange={handleChange}
                                className={styles.select}
                            >
                                <option>Membership Inquiry</option>
                                <option>Personal Training</option>
                                <option>General Question</option>
                            </select>
                        </div>
                        <div className={styles.formGroup}>
                            <textarea
                                id="message"
                                name="message"
                                rows="5"
                                placeholder="HOW CAN WE HELP YOU?"
                                value={formData.message}
                                onChange={handleChange}
                                required
                                className={styles.textarea}
                            ></textarea>
                        </div>

                        {status.error && <p className={styles.error}>{status.error}</p>}
                        {status.success && <p className={styles.success}>Message sent successfully!</p>}

                        <Button variant="primary" type="submit" disabled={status.loading} className={styles.submitBtn}>
                            {status.loading ? 'Processing...' : 'Send Message'}
                        </Button>
                    </form>
                </div>

                <div className={styles.infoContainer}>
                    <div className={styles.infoBox}>
                        <h3 className={styles.boxTitle}>Contact</h3>
                        <p className={styles.infoText}><strong>Email:</strong> {contactConfig.email}</p>
                        <p className={styles.infoText}><strong>Direct:</strong> {contactConfig.formattedPhone}</p>
                    </div>

                    <div className={styles.infoBox}>
                        <h3 className={styles.boxTitle}>Hours</h3>
                        <ul className={styles.hoursList}>
                            <li><span>WEEKDAYS:</span> {contactConfig.hours.weekdays}</li>
                            <li><span>SATURDAY:</span> {contactConfig.hours.saturday}</li>
                            <li><span>SUNDAY:</span> {contactConfig.hours.sunday}</li>
                        </ul>
                    </div>

                    <div className={styles.mapPlaceholder}>
                        <div className={styles.mapTag}>LUXURY DISTRICT, GC</div>
                    </div>
                </div>
            </div>
        </main>
    );
}

