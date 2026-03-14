'use client';
import { useState } from 'react';
import styles from './page.module.css';

// --- Tip Calculator ---
function TipCalculator() {
    const [bill, setBill] = useState('');
    const [tipPct, setTipPct] = useState(18);
    const [people, setPeople] = useState(1);

    const b = parseFloat(bill) || 0;
    const tipAmt = (b * tipPct) / 100;
    const total = b + tipAmt;
    const perPerson = people > 0 ? total / people : 0;

    return (
        <div className={styles.miniTool}>
            <h3 className={styles.miniTitle}>🍽️ Tip Calculator</h3>
            <p className={styles.miniDesc}>Split the bill at any US restaurant</p>
            <div className={styles.miniInputs}>
                <div className={styles.inputGroup}>
                    <label className={styles.label}>Bill Amount ($)</label>
                    <input className={styles.input} type="number" placeholder="0.00" value={bill} onChange={e => setBill(e.target.value)} />
                </div>
                <div className={styles.inputGroup}>
                    <label className={styles.label}>Tip %</label>
                    <select className={styles.input} value={tipPct} onChange={e => setTipPct(Number(e.target.value))}>
                        {[10, 15, 18, 20, 22, 25].map(p => <option key={p} value={p}>{p}%</option>)}
                    </select>
                </div>
                <div className={styles.inputGroup}>
                    <label className={styles.label}>Number of People</label>
                    <input className={styles.input} type="number" min="1" value={people} onChange={e => setPeople(Number(e.target.value))} />
                </div>
            </div>
            <div className={styles.miniResults}>
                <div className={styles.miniResult}><span>Tip Amount</span><strong>${tipAmt.toFixed(2)}</strong></div>
                <div className={styles.miniResult}><span>Total Bill</span><strong>${total.toFixed(2)}</strong></div>
                <div className={`${styles.miniResult} ${styles.miniResultBig}`}><span>Per Person</span><strong>${perPerson.toFixed(2)}</strong></div>
            </div>
        </div>
    );
}

// --- Unit Converter (US/Metric) ---
function UnitConverter() {
    const [value, setValue] = useState('');
    const [mode, setMode] = useState('miles-km');
    const conversions = {
        'miles-km': { label: 'Miles → Kilometers', fn: v => v * 1.60934, unit: 'km' },
        'km-miles': { label: 'Kilometers → Miles', fn: v => v * 0.621371, unit: 'miles' },
        'lbs-kg': { label: 'Pounds → Kilograms', fn: v => v * 0.453592, unit: 'kg' },
        'kg-lbs': { label: 'Kilograms → Pounds', fn: v => v * 2.20462, unit: 'lbs' },
        'f-c': { label: '°F → °C', fn: v => (v - 32) * 5 / 9, unit: '°C' },
        'c-f': { label: '°C → °F', fn: v => v * 9 / 5 + 32, unit: '°F' },
        'gal-l': { label: 'Gallons → Liters', fn: v => v * 3.78541, unit: 'L' },
        'oz-g': { label: 'Ounces → Grams', fn: v => v * 28.3495, unit: 'g' },
    };
    const conv = conversions[mode];
    const result = value ? (conv.fn(parseFloat(value))).toFixed(3) : '';

    return (
        <div className={styles.miniTool}>
            <h3 className={styles.miniTitle}>📐 US/Metric Converter</h3>
            <p className={styles.miniDesc}>Instantly convert US customary to metric units</p>
            <div className={styles.miniInputs}>
                <div className={styles.inputGroup}>
                    <label className={styles.label}>Conversion Type</label>
                    <select className={styles.input} value={mode} onChange={e => { setMode(e.target.value); setValue(''); }}>
                        {Object.entries(conversions).map(([k, v]) => <option key={k} value={k}>{v.label}</option>)}
                    </select>
                </div>
                <div className={styles.inputGroup}>
                    <label className={styles.label}>Enter Value</label>
                    <input className={styles.input} type="number" placeholder="Enter value..." value={value} onChange={e => setValue(e.target.value)} />
                </div>
            </div>
            {result && (
                <div className={styles.convResult}>
                    <span className={styles.convValue}>{result}</span>
                    <span className={styles.convUnit}>{conv.unit}</span>
                </div>
            )}
        </div>
    );
}

// --- GPA Calculator ---
function GpaCalculator() {
    const [courses, setCourses] = useState([
        { name: 'Math', grade: 'A', credits: 3 },
        { name: 'English', grade: 'B+', credits: 3 },
        { name: 'History', grade: 'A-', credits: 3 },
    ]);
    const gradePoints = { 'A+': 4.0, 'A': 4.0, 'A-': 3.7, 'B+': 3.3, 'B': 3.0, 'B-': 2.7, 'C+': 2.3, 'C': 2.0, 'C-': 1.7, 'D': 1.0, 'F': 0.0 };

    const totalCredits = courses.reduce((s, c) => s + Number(c.credits), 0);
    const totalPoints = courses.reduce((s, c) => s + (gradePoints[c.grade] || 0) * Number(c.credits), 0);
    const gpa = totalCredits > 0 ? (totalPoints / totalCredits).toFixed(2) : '0.00';

    const updateCourse = (i, field, val) => {
        setCourses(prev => prev.map((c, idx) => idx === i ? { ...c, [field]: val } : c));
    };

    const addCourse = () => setCourses(prev => [...prev, { name: '', grade: 'B', credits: 3 }]);

    return (
        <div className={styles.miniTool}>
            <h3 className={styles.miniTitle}>🎓 GPA Calculator</h3>
            <p className={styles.miniDesc}>Calculate your US college GPA on a 4.0 scale</p>
            <div className={styles.gpaTable}>
                {courses.map((c, i) => (
                    <div key={i} className={styles.gpaRow}>
                        <input
                            className={`${styles.input} ${styles.gpaInput}`}
                            placeholder="Course name"
                            value={c.name}
                            onChange={e => updateCourse(i, 'name', e.target.value)}
                        />
                        <select className={styles.input} value={c.grade} onChange={e => updateCourse(i, 'grade', e.target.value)}>
                            {Object.keys(gradePoints).map(g => <option key={g}>{g}</option>)}
                        </select>
                        <input
                            className={`${styles.input} ${styles.credInput}`}
                            type="number" min="1" max="6"
                            value={c.credits}
                            onChange={e => updateCourse(i, 'credits', e.target.value)}
                        />
                    </div>
                ))}
            </div>
            <button className="btn btn-outline" style={{ marginTop: '0.75rem', fontSize: '0.85rem' }} onClick={addCourse}>+ Add Course</button>
            <div className={styles.gpaResult}>
                <span>Your GPA</span>
                <span className={styles.gpaScore}>{gpa} / 4.0</span>
            </div>
        </div>
    );
}

// --- Habit Tracker ---
function HabitTracker() {
    const defaultHabits = [
        { id: 1, name: 'Drink 8 glasses of water', icon: '💧', streak: 0 },
        { id: 2, name: 'Exercise 30 minutes', icon: '🏃', streak: 0 },
        { id: 3, name: 'Read for 15 minutes', icon: '📖', streak: 0 },
        { id: 4, name: 'No fast food', icon: '🥗', streak: 0 },
        { id: 5, name: 'Budget check-in', icon: '💰', streak: 0 },
        { id: 6, name: 'Practice gratitude', icon: '🙏', streak: 0 },
    ];
    const [habits, setHabits] = useState(defaultHabits.map(h => ({ ...h, today: false })));

    const toggleHabit = (id) => {
        setHabits(prev => prev.map(h => {
            if (h.id !== id) return h;
            const today = !h.today;
            return { ...h, today, streak: today ? h.streak + 1 : Math.max(0, h.streak - 1) };
        }));
    };

    const done = habits.filter(h => h.today).length;

    return (
        <div className={styles.miniTool}>
            <h3 className={styles.miniTitle}>🎯 Daily Habit Tracker</h3>
            <p className={styles.miniDesc}>{done}/{habits.length} habits completed today</p>
            <div className={styles.habitList}>
                {habits.map(h => (
                    <div key={h.id} className={`${styles.habitItem} ${h.today ? styles.habitDone : ''}`} onClick={() => toggleHabit(h.id)}>
                        <span className={styles.habitIcon}>{h.icon}</span>
                        <span className={styles.habitName}>{h.name}</span>
                        <div className={styles.habitRight}>
                            <span className={styles.habitStreak}>🔥 {h.streak}</span>
                            <div className={styles.habitCheck}>{h.today ? '✓' : ''}</div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

const TOOLS = [
    { id: 'tip', label: 'Tip Calculator', icon: '🍽️' },
    { id: 'convert', label: 'Unit Converter', icon: '📐' },
    { id: 'gpa', label: 'GPA Calculator', icon: '🎓' },
    { id: 'habit', label: 'Habit Tracker', icon: '🎯' },
];

export default function ToolsPage() {
    const [active, setActive] = useState('tip');

    return (
        <div className={styles.page}>
            <div className={styles.pageHeader}>
                <div className="container">
                    <span className="section-label">🛠️ Free Tools</span>
                    <h1 className={styles.pageTitle}>Life Tools Built for Americans</h1>
                    <p className={styles.pageSubtitle}>
                        Handy calculators and trackers for everyday American life — no signup, 100% free.
                    </p>
                </div>
            </div>

            <div className="container section">
                <div className={styles.toolLayout}>
                    <div className={styles.toolNav}>
                        {TOOLS.map(t => (
                            <button
                                key={t.id}
                                className={`${styles.toolNavBtn} ${active === t.id ? styles.toolNavActive : ''}`}
                                onClick={() => setActive(t.id)}
                            >
                                <span>{t.icon}</span>
                                <span>{t.label}</span>
                                <span className={styles.navArrow}>→</span>
                            </button>
                        ))}
                    </div>

                    <div className={styles.toolContent}>
                        {active === 'tip' && <TipCalculator />}
                        {active === 'convert' && <UnitConverter />}
                        {active === 'gpa' && <GpaCalculator />}
                        {active === 'habit' && <HabitTracker />}
                    </div>
                </div>
            </div>
        </div>
    );
}
