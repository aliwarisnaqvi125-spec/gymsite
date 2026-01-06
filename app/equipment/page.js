'use client';
import { useState } from 'react';
import { equipmentData, categories } from '@/data/equipment';
import MachineCard from '@/components/features/MachineCard';
import styles from './page.module.css';
import Button from '@/components/ui/Button';

export default function EquipmentPage() {
    const [activeCategory, setActiveCategory] = useState('All');

    const filteredEquipment = activeCategory === 'All'
        ? equipmentData
        : equipmentData.filter(item => item.category === activeCategory);

    return (
        <main className="section container">
            <div className={styles.header}>
                <h1 className={styles.title}>Our <span style={{ color: 'var(--color-primary)' }}>Equipment</span></h1>
                <p className={styles.subtitle}>Explore our state-of-the-art machinery and training zones.</p>
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
