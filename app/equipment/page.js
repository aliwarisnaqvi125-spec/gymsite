'use client';
import { useState } from 'react';
import { equipmentData, categories } from '@/data/equipment';
import MachineCard from '@/components/features/MachineCard';
import styles from './page.module.css';

export default function EquipmentPage() {
    const [activeCategory, setActiveCategory] = useState('All');

    const filteredEquipment = activeCategory === 'All'
        ? equipmentData
        : equipmentData.filter(item => item.category === activeCategory);

    return (
        <main className="section container animate-fade-in">
            <div className={styles.header}>
                <span className={styles.tagline}>The Arsenal</span>
                <h1 className={styles.title}>Gold Standard <span className="red-text">Equipment</span></h1>
                <p className={styles.subtitle}>Curated selection of the world's most advanced fitness technology.</p>
            </div>

            <div className={styles.filterContainer}>
                {categories.map((cat) => (
                    <button
                        key={cat}
                        className={`${styles.filterBtn} ${activeCategory === cat ? styles.active : ''}`}
                        onClick={() => setActiveCategory(cat)}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            <div className={styles.grid}>
                {filteredEquipment.length > 0 ? (
                    filteredEquipment.map((item) => (
                        <MachineCard key={item.id} machine={item} />
                    ))
                ) : (
                    <p className={styles.noResults}>No equipment found in this category.</p>
                )}
            </div>
        </main>
    );
}

