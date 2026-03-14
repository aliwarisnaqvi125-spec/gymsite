'use client';
import { useState } from 'react';
import styles from './page.module.css';

export default function FinancePage() {
    // Budget Calculator State
    const [income, setIncome] = useState('');
    const [housing, setHousing] = useState('');
    const [transport, setTransport] = useState('');
    const [food, setFood] = useState('');
    const [utilities, setUtilities] = useState('');
    const [subscriptions, setSubscriptions] = useState('');
    const [other, setOther] = useState('');

    const inc = parseFloat(income) || 0;
    const totalExpenses = [housing, transport, food, utilities, subscriptions, other]
        .reduce((sum, v) => sum + (parseFloat(v) || 0), 0);
    const leftover = inc - totalExpenses;
    const savingsRate = inc > 0 ? ((leftover / inc) * 100).toFixed(1) : 0;

    // Tax Estimator State
    const [salary, setSalary] = useState('');
    const [filingStatus, setFilingStatus] = useState('single');
    const taxBrackets = {
        single: [
            { max: 11600, rate: 0.10 },
            { max: 47150, rate: 0.12 },
            { max: 100525, rate: 0.22 },
            { max: 191950, rate: 0.24 },
            { max: 243725, rate: 0.32 },
            { max: 609350, rate: 0.35 },
            { max: Infinity, rate: 0.37 },
        ],
        married: [
            { max: 23200, rate: 0.10 },
            { max: 94300, rate: 0.12 },
            { max: 201050, rate: 0.22 },
            { max: 383900, rate: 0.24 },
            { max: 487450, rate: 0.32 },
            { max: 731200, rate: 0.35 },
            { max: Infinity, rate: 0.37 },
        ],
    };

    const calcTax = () => {
        const s = parseFloat(salary) || 0;
        const brackets = taxBrackets[filingStatus];
        let tax = 0;
        let prev = 0;
        for (const b of brackets) {
            if (s <= prev) break;
            const taxable = Math.min(s, b.max) - prev;
            tax += taxable * b.rate;
            prev = b.max;
        }
        return tax;
    };
    const estimatedTax = calcTax();
    const takeHome = (parseFloat(salary) || 0) - estimatedTax;
    const effectiveRate = parseFloat(salary) > 0
        ? ((estimatedTax / parseFloat(salary)) * 100).toFixed(1)
        : 0;

    // Debt Payoff
    const [debtAmount, setDebtAmount] = useState('');
    const [debtRate, setDebtRate] = useState('');
    const [debtPayment, setDebtPayment] = useState('');

    const calcPayoff = () => {
        const bal = parseFloat(debtAmount) || 0;
        const rate = (parseFloat(debtRate) || 0) / 100 / 12;
        const pmt = parseFloat(debtPayment) || 0;
        if (!pmt || pmt <= bal * rate) return null;
        let months = 0;
        let b = bal;
        let totalPaid = 0;
        while (b > 0 && months < 1200) {
            const interest = b * rate;
            b = b + interest - pmt;
            totalPaid += pmt;
            months++;
        }
        return { months, totalPaid: totalPaid.toFixed(2), interest: (totalPaid - bal).toFixed(2) };
    };
    const payoff = calcPayoff();

    const tips = [
        { icon: '🏦', title: '50/30/20 Rule', body: 'Allocate 50% of income to needs, 30% to wants, and 20% to savings/debt payoff. This is the gold standard budget rule in the US.' },
        { icon: '📈', title: 'Max Your 401(k)', body: 'Contribute at least enough to get your employer match — it\'s free money. In 2024, the limit is $23,000 ($30,500 if 50+).' },
        { icon: '🚨', title: 'Emergency Fund First', body: 'Before investing, build 3–6 months of expenses in a high-yield savings account (5%+ APY at Marcus, Ally, or SoFi).' },
        { icon: '💳', title: 'Beat Credit Card Debt', body: 'Use the avalanche method: pay minimums on all cards, then throw extra money at the highest-interest card first.' },
        { icon: '🏠', title: 'Home Ownership Tips', body: 'Budget 1%–2% of your home\'s value annually for maintenance. Don\'t forget property taxes and HOA fees in your mortgage budget.' },
        { icon: '🎓', title: 'Student Loan Options', body: 'Check if you qualify for SAVE plan (income-driven) or Public Service Loan Forgiveness (PSLF). Both can drastically cut payments.' },
    ];

    return (
        <div className={styles.page}>
            <div className={styles.pageHeader}>
                <div className="container">
                    <span className="section-label">💰 US Finance Tools</span>
                    <h1 className={styles.pageTitle}>Free Finance Tools for Americans</h1>
                    <p className={styles.pageSubtitle}>
                        Budget calculator, tax estimator, debt payoff planner — all free, all built for the US financial system.
                    </p>
                </div>
            </div>

            <div className="container section">
                {/* Budget Calculator */}
                <div className={styles.toolCard}>
                    <div className={styles.toolHeader}>
                        <div>
                            <h2 className={styles.toolTitle}>💵 Monthly Budget Calculator</h2>
                            <p className={styles.toolDesc}>Enter your monthly income and expenses to see where your money goes.</p>
                        </div>
                    </div>
                    <div className={styles.calcGrid}>
                        <div className={styles.inputsCol}>
                            <label className={styles.label}>Monthly Take-Home Income ($)</label>
                            <input className={styles.input} type="number" placeholder="e.g. 5000" value={income} onChange={e => setIncome(e.target.value)} />

                            <label className={styles.label}>Housing (Rent/Mortgage) ($)</label>
                            <input className={styles.input} type="number" placeholder="e.g. 1500" value={housing} onChange={e => setHousing(e.target.value)} />

                            <label className={styles.label}>Transportation ($)</label>
                            <input className={styles.input} type="number" placeholder="e.g. 400" value={transport} onChange={e => setTransport(e.target.value)} />

                            <label className={styles.label}>Groceries & Food ($)</label>
                            <input className={styles.input} type="number" placeholder="e.g. 600" value={food} onChange={e => setFood(e.target.value)} />

                            <label className={styles.label}>Utilities & Internet ($)</label>
                            <input className={styles.input} type="number" placeholder="e.g. 200" value={utilities} onChange={e => setUtilities(e.target.value)} />

                            <label className={styles.label}>Subscriptions (Netflix, Gym...) ($)</label>
                            <input className={styles.input} type="number" placeholder="e.g. 100" value={subscriptions} onChange={e => setSubscriptions(e.target.value)} />

                            <label className={styles.label}>Other Expenses ($)</label>
                            <input className={styles.input} type="number" placeholder="e.g. 300" value={other} onChange={e => setOther(e.target.value)} />
                        </div>

                        <div className={styles.resultsCol}>
                            <div className={styles.resultBox}>
                                <div className={styles.resultItem}>
                                    <span>Monthly Income</span>
                                    <strong className={styles.greenText}>${inc.toLocaleString()}</strong>
                                </div>
                                <div className={styles.resultItem}>
                                    <span>Total Expenses</span>
                                    <strong className={styles.redText}>${totalExpenses.toLocaleString()}</strong>
                                </div>
                                <div className={`${styles.resultItem} ${styles.resultBig}`}>
                                    <span>Left Over / Savings</span>
                                    <strong className={leftover >= 0 ? styles.greenText : styles.redText}>
                                        ${leftover.toLocaleString()}
                                    </strong>
                                </div>
                                <div className={styles.resultItem}>
                                    <span>Savings Rate</span>
                                    <strong>{savingsRate}%</strong>
                                </div>
                                <div className={styles.budgetMeter}>
                                    <div className={styles.budgetLabel}>
                                        <span>Expenses vs Income</span>
                                        <span>{inc > 0 ? ((totalExpenses / inc) * 100).toFixed(1) : 0}%</span>
                                    </div>
                                    <div className={styles.meterTrack}>
                                        <div
                                            className={styles.meterFill}
                                            style={{
                                                width: `${Math.min((totalExpenses / (inc || 1)) * 100, 100)}%`,
                                                background: totalExpenses > inc ? '#ef4444' : '#10b981',
                                            }}
                                        />
                                    </div>
                                </div>
                                <div className={styles.ruleBox}>
                                    <p className={styles.ruleTitle}>50/30/20 Guideline</p>
                                    <p>Needs: ${(inc * 0.5).toLocaleString()} · Wants: ${(inc * 0.3).toLocaleString()} · Savings: ${(inc * 0.2).toLocaleString()}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={styles.twoCol}>
                    {/* Tax Estimator */}
                    <div className={styles.toolCard}>
                        <h2 className={styles.toolTitle}>📊 Federal Tax Estimator (2024)</h2>
                        <p className={styles.toolDesc}>Rough estimate of your federal income tax.</p>

                        <label className={styles.label}>Annual Gross Salary ($)</label>
                        <input className={styles.input} type="number" placeholder="e.g. 75000" value={salary} onChange={e => setSalary(e.target.value)} />

                        <label className={styles.label}>Filing Status</label>
                        <select className={styles.input} value={filingStatus} onChange={e => setFilingStatus(e.target.value)}>
                            <option value="single">Single</option>
                            <option value="married">Married Filing Jointly</option>
                        </select>

                        <div className={styles.taxResults}>
                            <div className={styles.taxRow}>
                                <span>Estimated Tax</span>
                                <strong className={styles.redText}>${estimatedTax.toLocaleString(undefined, { maximumFractionDigits: 0 })}</strong>
                            </div>
                            <div className={styles.taxRow}>
                                <span>Effective Rate</span>
                                <strong>{effectiveRate}%</strong>
                            </div>
                            <div className={`${styles.taxRow} ${styles.taxBig}`}>
                                <span>Estimated Take-Home</span>
                                <strong className={styles.greenText}>${takeHome.toLocaleString(undefined, { maximumFractionDigits: 0 })}/yr</strong>
                            </div>
                            <p className={styles.disclaimer}>* This is a simplified estimate. Does not include FICA, state taxes, or deductions. Consult a tax professional.</p>
                        </div>
                    </div>

                    {/* Debt Payoff */}
                    <div className={styles.toolCard}>
                        <h2 className={styles.toolTitle}>💳 Debt Payoff Calculator</h2>
                        <p className={styles.toolDesc}>Find out when you'll be debt-free and how much interest you'll pay.</p>

                        <label className={styles.label}>Total Debt Balance ($)</label>
                        <input className={styles.input} type="number" placeholder="e.g. 8000" value={debtAmount} onChange={e => setDebtAmount(e.target.value)} />

                        <label className={styles.label}>Annual Interest Rate (%)</label>
                        <input className={styles.input} type="number" placeholder="e.g. 22.99" value={debtRate} onChange={e => setDebtRate(e.target.value)} />

                        <label className={styles.label}>Monthly Payment ($)</label>
                        <input className={styles.input} type="number" placeholder="e.g. 300" value={debtPayment} onChange={e => setDebtPayment(e.target.value)} />

                        {payoff ? (
                            <div className={styles.taxResults}>
                                <div className={styles.taxRow}>
                                    <span>Months to Pay Off</span>
                                    <strong>{payoff.months} months ({(payoff.months / 12).toFixed(1)} yrs)</strong>
                                </div>
                                <div className={styles.taxRow}>
                                    <span>Total Interest Paid</span>
                                    <strong className={styles.redText}>${Number(payoff.interest).toLocaleString()}</strong>
                                </div>
                                <div className={`${styles.taxRow} ${styles.taxBig}`}>
                                    <span>Total Amount Paid</span>
                                    <strong>${Number(payoff.totalPaid).toLocaleString()}</strong>
                                </div>
                            </div>
                        ) : debtAmount && debtRate && debtPayment ? (
                            <p className={styles.disclaimer} style={{ color: '#ef4444', marginTop: '1rem' }}>
                                ⚠️ Your payment is too low to cover the interest. Increase your monthly payment.
                            </p>
                        ) : null}
                    </div>
                </div>

                {/* Finance Tips */}
                <div className={styles.tipsSection}>
                    <h2 className={styles.sectionHeading}>💡 Smart Money Tips for Americans</h2>
                    <div className={styles.tipsGrid}>
                        {tips.map((tip, i) => (
                            <div key={i} className={styles.tipCard}>
                                <span className={styles.tipIcon}>{tip.icon}</span>
                                <h3 className={styles.tipTitle}>{tip.title}</h3>
                                <p className={styles.tipBody}>{tip.body}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
