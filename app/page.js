'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from './page.module.css';

// Simulated tasks for the Daily Task List
const DAILY_TASKS = [
  { id: 1, text: 'Check and reply to important emails', category: 'Work', priority: 'high', points: 20 },
  { id: 2, text: 'Pay monthly bills (utilities, rent, subscriptions)', category: 'Finance', priority: 'high', points: 30 },
  { id: 3, text: 'Plan weekly grocery list & meal prep', category: 'Home', priority: 'medium', points: 15 },
  { id: 4, text: '30-min walk or workout session', category: 'Health', priority: 'medium', points: 25 },
  { id: 5, text: 'Review and update budget spreadsheet', category: 'Finance', priority: 'medium', points: 20 },
  { id: 6, text: 'Read news headlines (15 minutes)', category: 'Personal', priority: 'low', points: 10 },
  { id: 7, text: 'Follow up on job applications or work projects', category: 'Work', priority: 'high', points: 25 },
  { id: 8, text: 'Call or text a family member / friend', category: 'Personal', priority: 'low', points: 10 },
];

const TIPS = [
  { emoji: '💡', title: 'Save on Gas', tip: 'Use GasBuddy app to find the cheapest gas in your ZIP code. Save $30–$60/month on average.' },
  { emoji: '🏦', title: 'Boost Your Credit Score', tip: 'Pay your credit card balance before the statement closes, not just the due date, to lower your utilization.' },
  { emoji: '🛒', title: 'Grocery Savings', tip: 'Shop at ALDI or Lidl for staples. Use Ibotta app for cash back on groceries at major chains.' },
  { emoji: '📱', title: 'Lower Your Phone Bill', tip: 'Switch to Mint Mobile or Visible. Get unlimited data for $25–$35/mo instead of $80+ with big carriers.' },
  { emoji: '🏠', title: 'Home Energy Savings', tip: 'Set your thermostat to 68°F in winter. Each degree lower saves about 1% on heating costs.' },
  { emoji: '💊', title: 'Save on Prescriptions', tip: 'Use GoodRx or Mark Cuban\'s Cost Plus Drugs. Many meds are 80–90% cheaper than retail pharmacy prices.' },
];

const CATEGORIES = ['All', 'Work', 'Finance', 'Home', 'Health', 'Personal'];

const STATS = [
  { value: '2.1M+', label: 'Americans Using TaskFlow', icon: '👥' },
  { value: '$4,200', label: 'Average Annual Savings', icon: '💰' },
  { value: '94%', label: 'User Satisfaction Rate', icon: '⭐' },
  { value: '50+', label: 'Free Life Tools', icon: '🛠️' },
];

export default function HomePage() {
  const [tasks, setTasks] = useState(DAILY_TASKS.map(t => ({ ...t, done: false })));
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [totalPoints, setTotalPoints] = useState(0);
  const [tipIndex, setTipIndex] = useState(0);
  const [customTask, setCustomTask] = useState('');

  const today = new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

  const filteredTasks = selectedCategory === 'All'
    ? tasks
    : tasks.filter(t => t.category === selectedCategory);

  const doneCount = tasks.filter(t => t.done).length;
  const progress = Math.round((doneCount / tasks.length) * 100);

  const toggleTask = (id) => {
    setTasks(prev => prev.map(t => {
      if (t.id === id) {
        const newDone = !t.done;
        setTotalPoints(p => newDone ? p + t.points : p - t.points);
        return { ...t, done: newDone };
      }
      return t;
    }));
  };

  const addCustomTask = () => {
    if (!customTask.trim()) return;
    const newTask = {
      id: Date.now(),
      text: customTask.trim(),
      category: 'Personal',
      priority: 'medium',
      points: 15,
      done: false,
    };
    setTasks(prev => [...prev, newTask]);
    setCustomTask('');
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setTipIndex(i => (i + 1) % TIPS.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const priorityColor = { high: '#ef4444', medium: '#f59e0b', low: '#10b981' };

  return (
    <div className={styles.page}>
      {/* HERO */}
      <section className={styles.hero}>
        <div className={styles.heroPattern} />
        <div className={`container ${styles.heroContainer}`}>
          <div className={styles.heroContent}>
            <div className={`badge badge-blue ${styles.heroBadge}`}>
              🇺🇸 Built for Americans
            </div>
            <h1 className={styles.heroTitle}>
              Your Daily <span className={styles.heroAccent}>Productivity</span> Hub for American Life
            </h1>
            <p className={styles.heroSubtitle}>
              Manage your daily tasks, track finances, discover money-saving tips, and tools designed specifically for life in the USA.
            </p>
            <div className={styles.heroCta}>
              <Link href="/tasks" className="btn btn-primary btn-lg">
                Get Today's Task List ✓
              </Link>
              <Link href="/tools" className={`btn btn-lg ${styles.btnGhost}`}>
                Explore Free Tools
              </Link>
            </div>
            <div className={styles.heroSocial}>
              <div className={styles.avatars}>
                {['👩', '👨', '👩‍💼', '👨‍💻', '👩‍🏫'].map((a, i) => (
                  <span key={i} className={styles.avatar}>{a}</span>
                ))}
              </div>
              <span className={styles.socialProof}>
                <strong>2.1M+</strong> Americans boosting productivity daily
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* STATS BAR */}
      <section className={styles.statsBar}>
        <div className="container">
          <div className={styles.statsGrid}>
            {STATS.map((s, i) => (
              <div key={i} className={styles.statItem}>
                <span className={styles.statIcon}>{s.icon}</span>
                <div>
                  <div className={styles.statValue}>{s.value}</div>
                  <div className={styles.statLabel}>{s.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DAILY TASK LIST */}
      <section className={`section ${styles.tasksSection}`}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <div>
              <p className="section-label">✓ Today's Checklist</p>
              <h2 className="section-title">Daily Task Manager</h2>
              <p className={`section-subtitle`}>{today}</p>
            </div>
            <div className={styles.pointsBadge}>
              <span className={styles.pointsNumber}>{totalPoints}</span>
              <span className={styles.pointsLabel}>Points Earned</span>
            </div>
          </div>

          {/* Progress */}
          <div className={styles.progressBar}>
            <div className={styles.progressInfo}>
              <span>{doneCount} of {tasks.length} tasks completed</span>
              <span>{progress}%</span>
            </div>
            <div className={styles.progressTrack}>
              <div className={styles.progressFill} style={{ width: `${progress}%` }} />
            </div>
          </div>

          {/* Category Filter */}
          <div className={styles.categoryFilter}>
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                className={`${styles.catBtn} ${selectedCategory === cat ? styles.catBtnActive : ''}`}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Task List */}
          <div className={styles.taskList}>
            {filteredTasks.map(task => (
              <div
                key={task.id}
                className={`${styles.taskItem} ${task.done ? styles.taskDone : ''}`}
                onClick={() => toggleTask(task.id)}
              >
                <div className={styles.taskCheck}>
                  {task.done ? '✓' : ''}
                </div>
                <div className={styles.taskContent}>
                  <span className={styles.taskText}>{task.text}</span>
                  <div className={styles.taskMeta}>
                    <span className={`badge badge-blue`}>{task.category}</span>
                    <span
                      className={styles.priority}
                      style={{ color: priorityColor[task.priority] }}
                    >
                      ● {task.priority}
                    </span>
                  </div>
                </div>
                <div className={styles.taskPoints}>+{task.points} pts</div>
              </div>
            ))}
          </div>

          {/* Add Custom Task */}
          <div className={styles.addTask}>
            <input
              type="text"
              className={styles.taskInput}
              placeholder="Add your own task..."
              value={customTask}
              onChange={(e) => setCustomTask(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && addCustomTask()}
            />
            <button className="btn btn-primary" onClick={addCustomTask}>
              + Add Task
            </button>
          </div>
        </div>
      </section>

      {/* MONEY TIPS */}
      <section className={`section ${styles.tipsSection}`}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <div>
              <p className="section-label">💰 Smart Money</p>
              <h2 className="section-title">USA Life & Money Tips</h2>
              <p className="section-subtitle">Practical tips to save money and live smarter as an American.</p>
            </div>
          </div>

          <div className={styles.tipsGrid}>
            {TIPS.map((tip, i) => (
              <div
                key={i}
                className={`${styles.tipCard} ${i === tipIndex ? styles.tipHighlight : ''}`}
              >
                <span className={styles.tipEmoji}>{tip.emoji}</span>
                <h3 className={styles.tipTitle}>{tip.title}</h3>
                <p className={styles.tipText}>{tip.tip}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* QUICK TOOLS */}
      <section className={`section ${styles.toolsSection}`}>
        <div className="container">
          <div className={styles.toolsLayout}>
            <div className={styles.toolsContent}>
              <p className="section-label">🛠️ Quick Access</p>
              <h2 className="section-title">Free Tools for American Life</h2>
              <p className="section-subtitle">Calculators, trackers, and planners — 100% free, no signup needed.</p>
              <div className={styles.toolsGrid}>
                {[
                  { icon: '💵', label: 'Budget Calculator', href: '/finance', color: '#10b981' },
                  { icon: '🏠', label: 'Mortgage Helper', href: '/tools', color: '#2563eb' },
                  { icon: '📊', label: 'Tax Estimator', href: '/finance#tax', color: '#7c3aed' },
                  { icon: '🎯', label: 'Goal Planner', href: '/tools#goals', color: '#f59e0b' },
                  { icon: '💳', label: 'Debt Payoff', href: '/finance#debt', color: '#ef4444' },
                  { icon: '📅', label: 'Weekly Planner', href: '/tasks', color: '#0891b2' },
                ].map((tool, i) => (
                  <Link key={i} href={tool.href} className={styles.toolCard}>
                    <span className={styles.toolIcon} style={{ background: `${tool.color}20`, color: tool.color }}>
                      {tool.icon}
                    </span>
                    <span className={styles.toolLabel}>{tool.label}</span>
                    <span className={styles.toolArrow}>→</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className={`section ${styles.howSection}`}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <p className="section-label">⚡ How It Works</p>
            <h2 className="section-title">Designed for Busy Americans</h2>
          </div>
          <div className={styles.stepsGrid}>
            {[
              { step: '1', title: 'Get Your Daily Tasks', desc: 'Each morning, receive a curated task list tailored to American daily life — work, home, finances, and health.' },
              { step: '2', title: 'Check Off & Earn Points', desc: 'Complete tasks and earn productivity points. Track your streak and see your consistency grow over time.' },
              { step: '3', title: 'Use Free Life Tools', desc: 'Access 50+ free calculators and tools — from tax estimators to grocery budgeters. No subscription needed.' },
              { step: '4', title: 'Learn & Save Smarter', desc: 'Discover practical tips and guides to save money on everyday American expenses, from gas to groceries.' },
            ].map((step, i) => (
              <div key={i} className={styles.stepCard}>
                <div className={styles.stepNumber}>{step.step}</div>
                <h3 className={styles.stepTitle}>{step.title}</h3>
                <p className={styles.stepDesc}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* NEWSLETTER + AD */}
      <section className={`section ${styles.newsletterSection}`}>
        <div className="container">
          <div className={styles.newsletterBox}>
            <div className={styles.newsletterContent}>
              <h2 className={styles.newsletterTitle}>Get Weekly USA Life Tips</h2>
              <p className={styles.newsletterSubtitle}>
                Join 350,000+ Americans who get our free weekly newsletter with productivity tips, money-saving deals, and life hacks.
              </p>
              <form className={styles.newsletterForm} onSubmit={(e) => e.preventDefault()}>
                <input
                  type="email"
                  placeholder="Enter your email address..."
                  className={styles.emailInput}
                />
                <button type="submit" className="btn btn-primary btn-lg">
                  Subscribe Free 🇺🇸
                </button>
              </form>
              <p className={styles.newsletterNote}>No spam ever. Unsubscribe anytime.</p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
