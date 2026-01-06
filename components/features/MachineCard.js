import Image from 'next/image';
import styles from './MachineCard.module.css';

export default function MachineCard({ machine }) {
    return (
        <div className={styles.card}>
            <div className={styles.imageWrapper}>
                <Image
                    src={machine.image}
                    alt={machine.name}
                    width={400}
                    height={300}
                    className={styles.image}
                />
                <div className={styles.categoryTag}>{machine.category}</div>
            </div>
            <div className={styles.content}>
                <h3 className={styles.name}>{machine.name}</h3>
                <p className={styles.description}>{machine.description}</p>
            </div>
        </div>
    );
}
