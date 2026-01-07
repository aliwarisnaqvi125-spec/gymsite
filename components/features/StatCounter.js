'use client';
import { useState, useEffect, useRef } from 'react';
import styles from './StatCounter.module.css';

export default function StatCounter({ end, label, duration = 2000 }) {
    const [count, setCount] = useState(0);
    const countRef = useRef(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                }
            },
            { threshold: 0.1 }
        );

        if (countRef.current) {
            observer.observe(countRef.current);
        }

        return () => {
            if (countRef.current) {
                observer.unobserve(countRef.current);
            }
        };
    }, []);

    useEffect(() => {
        if (!isVisible) return;

        let startValue = 0;
        const interval = duration / end;

        const timer = setInterval(() => {
            startValue += 1;
            setCount(startValue);
            if (startValue === end) {
                clearInterval(timer);
            }
        }, interval);

        return () => clearInterval(timer);
    }, [isVisible, end, duration]);

    return (
        <div className={styles.container} ref={countRef}>
            <div className={styles.number}>{count}+</div>
            <div className={styles.label}>{label}</div>
        </div>
    );
}
