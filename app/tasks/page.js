'use client';
import { useState } from 'react';
import styles from './page.module.css';

const ALL_TASKS = {
    Work: [
        { id: 1, text: 'Check and respond to priority emails', points: 20, time: '15 min' },
        { id: 2, text: 'Review & update your to-do list for the week', points: 15, time: '10 min' },
        { id: 3, text: 'Attend or prepare for scheduled meetings', points: 25, time: '30 min' },
        { id: 4, text: 'Complete your most important project task', points: 40, time: '60 min' },
        { id: 5, text: 'Update your LinkedIn profile or resume', points: 20, time: '20 min' },
        { id: 6, text: 'Research one new skill relevant to your career', points: 15, time: '15 min' },
    ],
    Finance: [
        { id: 7, text: 'Review your bank & credit card statements', points: 25, time: '10 min' },
        { id: 8, text: 'Check upcoming bill due dates', points: 20, time: '5 min' },
        { id: 9, text: 'Track your spending in a budget app', points: 20, time: '5 min' },
        { id: 10, text: 'Contribute to savings or 401(k)', points: 35, time: '5 min' },
        { id: 11, text: 'Cancel unused subscriptions', points: 30, time: '10 min' },
        { id: 12, text: 'Check your credit score on Credit Karma', points: 15, time: '5 min' },
    ],
    Health: [
        { id: 13, text: '30-minute workout or walk', points: 30, time: '30 min' },
        { id: 14, text: 'Meal prep or plan healthy meals', points: 25, time: '20 min' },
        { id: 15, text: 'Drink at least 8 glasses of water', points: 15, time: 'All day' },
        { id: 16, text: 'Get 7–8 hours of sleep tonight', points: 30, time: 'Tonight' },
        { id: 17, text: 'Schedule a doctor or dental appointment', points: 20, time: '5 min' },
        { id: 18, text: 'Take a 10-minute mindfulness break', points: 15, time: '10 min' },
    ],
    Home: [
        { id: 19, text: 'Do a quick 15-minute house tidy', points: 20, time: '15 min' },
        { id: 20, text: 'Do laundry or dishes', points: 15, time: '20 min' },
        { id: 21, text: 'Take out the trash/recycling', points: 10, time: '5 min' },
        { id: 22, text: 'Check your fridge and make a grocery list', points: 15, time: '10 min' },
        { id: 23, text: 'Pay rent or mortgage on time', points: 40, time: '5 min' },
        { id: 24, text: 'Check home maintenance needs', points: 20, time: '10 min' },
    ],
    Civic: [
        { id: 25, text: 'Check local news for community updates', points: 10, time: '10 min' },
        { id: 26, text: 'Register to vote or verify registration', points: 25, time: '5 min' },
        { id: 27, text: 'Support a local small business today', points: 15, time: '15 min' },
        { id: 28, text: 'Volunteer or donate to a cause', points: 30, time: 'Varies' },
        { id: 29, text: 'Research upcoming local elections/ballot measures', points: 20, time: '15 min' },
    ],
};

const CATEGORIES = Object.keys(ALL_TASKS);

export default function TasksPage() {
    const [activeCategory, setActiveCategory] = useState('Work');
    const [completedTasks, setCompletedTasks] = useState(new Set());
    const [points, setPoints] = useState(0);

    const toggleTask = (task) => {
        setCompletedTasks(prev => {
            const next = new Set(prev);
            if (next.has(task.id)) {
                next.delete(task.id);
                setPoints(p => p - task.points);
            } else {
                next.add(task.id);
                setPoints(p => p + task.points);
            }
            return next;
        });
    };

    const tasks = ALL_TASKS[activeCategory];
    const done = tasks.filter(t => completedTasks.has(t.id)).length;

    return (
        <div className={styles.page}>
            <div className={styles.header}>
                <div className="container">
                    <span className="section-label">✓ Daily Task Manager</span>
                    <h1 className="section-title">Your USA Daily Tasks</h1>
                    <p style={{ color: 'var(--color-text-muted)', maxWidth: 560, marginBottom: '1.5rem' }}>
                        Complete these tasks daily to stay on top of your work, finances, health, and home — designed for the American lifestyle.
                    </p>
                    <div className={styles.pointsDisplay}>
                        <span className={styles.bigPoints}>{points}</span>
                        <span>Total Points Today</span>
                    </div>
                </div>
            </div>

            <div className="container section">
                <div className={styles.layout}>
                    <div className={styles.sidebar}>
                        {CATEGORIES.map(cat => {
                            const catTasks = ALL_TASKS[cat];
                            const catDone = catTasks.filter(t => completedTasks.has(t.id)).length;
                            return (
                                <button
                                    key={cat}
                                    className={`${styles.catTab} ${activeCategory === cat ? styles.catTabActive : ''}`}
                                    onClick={() => setActiveCategory(cat)}
                                >
                                    <span>{cat}</span>
                                    <span className={styles.catProgress}>{catDone}/{catTasks.length}</span>
                                </button>
                            );
                        })}
                    </div>

                    <div className={styles.main}>
                        <div className={styles.taskHeader}>
                            <h2 className={styles.taskCategory}>{activeCategory} Tasks</h2>
                            <span className={styles.taskProgress}>{done} / {tasks.length} done</span>
                        </div>
                        <div className={styles.taskGrid}>
                            {tasks.map(task => {
                                const isDone = completedTasks.has(task.id);
                                return (
                                    <div
                                        key={task.id}
                                        className={`${styles.taskCard} ${isDone ? styles.taskCardDone : ''}`}
                                        onClick={() => toggleTask(task)}
                                    >
                                        <div className={styles.check}>{isDone ? '✓' : ''}</div>
                                        <div className={styles.taskInfo}>
                                            <p className={styles.taskText}>{task.text}</p>
                                            <span className={styles.timeEst}>⏱ {task.time}</span>
                                        </div>
                                        <div className={styles.pts}>+{task.points} pts</div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
