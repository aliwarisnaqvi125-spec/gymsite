'use client';

import { useState } from 'react';
import Image from 'next/image';
import Lightbox from '@/components/ui/Lightbox';
import styles from './page.module.css';

const galleryImages = [
    { src: '/images/hero_gym_8k.png', alt: 'Elite Gym Interior' },
    { src: '/images/weight_training.png', alt: 'Premium Weights' },
    { src: '/images/cardio_machines.png', alt: '8K Cardio Machines' },
    { src: '/images/hero_gym_8k.png', alt: 'Transformation Zone' },
    { src: '/images/weight_training.png', alt: 'Pure Strength' },
    { src: '/images/cardio_machines.png', alt: 'Endurance Studio' },
];

export default function GalleryPage() {
    const [lightboxIndex, setLightboxIndex] = useState(null);

    const openLightbox = (index) => {
        setLightboxIndex(index);
    };

    const closeLightbox = () => {
        setLightboxIndex(null);
    };

    const nextImage = () => {
        setLightboxIndex((prev) => (prev + 1) % galleryImages.length);
    };

    const prevImage = () => {
        setLightboxIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
    };

    return (
        <main className="section container animate-fade-in">
            <div className={styles.header}>
                <h1 className={styles.title}>Visual <span className="red-text">Excellence</span></h1>
                <p className={styles.subtitle}>A glimpse into the sanctuary of strength.</p>
            </div>

            <div className={styles.galleryGrid}>
                {galleryImages.map((img, index) => (
                    <div key={index} className={styles.imageItem}>
                        <div
                            className={styles.imageWrapper}
                            onClick={() => openLightbox(index)}
                            role="button"
                            tabIndex={0}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' || e.key === ' ') {
                                    e.preventDefault();
                                    openLightbox(index);
                                }
                            }}
                        >
                            <Image
                                src={img.src}
                                alt={img.alt}
                                fill
                                className={styles.image}
                            />
                            <div className={styles.overlay}>
                                <span className={styles.expandedLabel}>View Details</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <Lightbox
                images={galleryImages}
                currentIndex={lightboxIndex}
                onClose={closeLightbox}
                onNext={nextImage}
                onPrev={prevImage}
            />
        </main>
    );
}

