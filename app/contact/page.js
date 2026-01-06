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
        <main className="section container">
            <h1 className={styles.title}>Get In <span style={{ color: 'var(--color-primary)' }}>Touch</span></h1>
            <p className={styles.subtitle}>Ready to start your journey? Contact us today.</p>

            <div className={styles.grid}>
                <div className={styles.formContainer}>
                    <form className={styles.form} onSubmit={handleSubmit}>
                        <div className={styles.formGroup}>
                            <label htmlFor="name">Name</label>
                            <input
                                id="name"
                                name="name"
                                type="text"
                                placeholder="Your Name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className={styles.formGroup}>
                            <label htmlFor="email">Email</label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                placeholder="Your Email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className={styles.formGroup}>
                            <label htmlFor="subject">Subject</label>
                            <select
                                id="subject"
                                name="subject"
                                value={formData.subject}
                                onChange={handleChange}
                            >
                                <option>Membership Inquiry</option>
                                <option>Personal Training</option>
                                <option>General Question</option>
                            </select>
                        </div>
                        <div className={styles.formGroup}>
                            <label htmlFor="message">Message</label>
                            <textarea
                                id="message"
                                name="message"
                                rows="5"
                                placeholder="How can we help you?"
                                value={formData.message}
                                onChange={handleChange}
                                required
                            ></textarea>
                        </div>

                        {status.error && <p className={styles.error} style={{ color: 'red', marginBottom: '1rem' }}>{status.error}</p>}
                        {status.success && <p className={styles.success} style={{ color: 'green', marginBottom: '1rem' }}>Message sent successfully!</p>}

                        <Button variant="primary" type="submit" disabled={status.loading}>
                            {status.loading ? 'Sending...' : 'Send Message'}
                        </Button>
                    </form>
                </div>

                <div className={styles.infoContainer}>
                    <div className={styles.infoBox}>
                        <h3>Contact Information</h3>
                        <p><strong>Email:</strong> <br /> {contactConfig.email}</p>
                        <p><strong>Address:</strong> <br /> {contactConfig.address.line1}, {contactConfig.address.line2}</p>
                        <p><strong>Phone:</strong> <br /> {contactConfig.formattedPhone}</p>
                    </div>

                    <div className={styles.infoBox}>
                        <h3>Opening Hours</h3>
                        <ul className={styles.hoursList}>
                            <li><span>Mon - Fri:</span> {contactConfig.hours.weekdays}</li>
                            <li><span>Saturday:</span> {contactConfig.hours.saturday}</li>
                            <li><span>Sunday:</span> {contactConfig.hours.sunday}</li>
                        </ul>
                    </div>
                </div>
            </div>
        </main>
    );
}
