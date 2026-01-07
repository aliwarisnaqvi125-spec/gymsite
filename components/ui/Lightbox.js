'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import styles from './Lightbox.module.css';

export default function Lightbox({ images, currentIndex, onClose, onNext, onPrev }) {
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') onClose();
            if (e.key === 'ArrowRight') onNext();
            if (e.key === 'ArrowLeft') onPrev();
        };

        window.addEventListener('keydown', handleKeyDown);

        // Prevent body scroll when lightbox is open
        document.body.style.overflow = 'hidden';

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            document.body.style.overflow = 'unset';
        };
    }, [onClose, onNext, onPrev]);

    if (currentIndex === null) return null;

    const currentImage = images[currentIndex];

    return (
        <div className={styles.lightbox} onClick={onClose}>
            <button className={styles.closeButton} onClick={onClose} aria-label="Close">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
            </button>

            <button
                className={`${styles.navButton} ${styles.prevButton}`}
                onClick={(e) => { e.stopPropagation(); onPrev(); }}
                aria-label="Previous image"
            >
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="15 18 9 12 15 6" />
                </svg>
            </button>

            <button
                className={`${styles.navButton} ${styles.nextButton}`}
                onClick={(e) => { e.stopPropagation(); onNext(); }}
                aria-label="Next image"
            >
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="9 18 15 12 9 6" />
                </svg>
            </button>

            <div className={styles.imageContainer} onClick={(e) => e.stopPropagation()}>
                <Image
                    src={currentImage.src}
                    alt={currentImage.alt}
                    fill
                    className={styles.image}
                    quality={100}
                />
            </div>

            <div className={styles.caption}>
                <p>{currentImage.alt}</p>
                <span className={styles.counter}>{currentIndex + 1} / {images.length}</span>
            </div>
        </div>
    );
}
