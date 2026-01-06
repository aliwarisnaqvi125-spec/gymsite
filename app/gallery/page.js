import Image from 'next/image';
import styles from './page.module.css';

const galleryImages = [
    { src: '/images/gym-interior.png', alt: 'Modern Gym Interior' },
    { src: '/images/gym-weights.png', alt: 'Professional Weights Area' },
    { src: '/images/gym-cardio.png', alt: 'Cardio Section with View' },
    { src: '/images/gym-weights.png', alt: 'Strength Training Zone' },
    { src: '/images/gym-cardio.png', alt: 'Treadmills & Ellipticals' },
    { src: '/images/gym-interior.png', alt: 'Spacious Workout Floor' },
];

export default function GalleryPage() {
    return (
        <main className="section container">
            <h1 className={styles.title}>Gym <span style={{ color: 'var(--color-primary)' }}>Gallery</span></h1>
            <p className={styles.subtitle}>Take a look inside ALEE'S GYM.</p>

            <div className={styles.galleryGrid}>
                {galleryImages.map((img, index) => (
                    <div key={index} className={styles.imageItem}>
                        <Image
                            src={img.src}
                            alt={img.alt}
                            width={600}
                            height={400}
                            className={styles.image}
                        />
                    </div>
                ))}
            </div>
        </main>
    );
}
