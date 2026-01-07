import Image from 'next/image';
import styles from './ServiceCard.module.css';

export default function ServiceCard({ title, description, image }) {
    return (
        <div className={styles.card}>
            <div className={styles.imageOverlay}></div>
            <Image
                src={image}
                alt={title}
                fill
                className={styles.image}
            />
            <div className={styles.content}>
                <h3 className={styles.title}>{title}</h3>
                <p className={styles.description}>{description}</p>
            </div>
        </div>
    );
}
