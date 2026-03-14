import styles from './page.module.css';
import Link from 'next/link';

const POSTS = [
    {
        id: 1, category: 'Finance', readTime: '5 min', emoji: '💰',
        title: '7 Ways to Build an Emergency Fund Fast in 2025',
        excerpt: 'Financial experts recommend 3–6 months of expenses. Here\'s exactly how to build yours quickly using proven American strategies.',
        tags: ['Savings', 'Emergency Fund', 'Budgeting'],
        featured: true,
    },
    {
        id: 2, category: 'Productivity', readTime: '4 min', emoji: '⚡',
        title: 'The American Morning Routine That Top Earners Follow',
        excerpt: 'Research shows that what you do before 9 AM is directly correlated with your daily output and income level. Here\'s the playbook.',
        tags: ['Routine', 'Success', 'Habits'],
        featured: false,
    },
    {
        id: 3, category: 'Housing', readTime: '6 min', emoji: '🏠',
        title: 'Rent vs. Buy: The 2025 American Housing Decision Guide',
        excerpt: 'With mortgage rates shifting, is it smarter to rent or buy right now? We break down the math for every major US city type.',
        tags: ['Real Estate', 'Mortgage', 'Rent'],
        featured: false,
    },
    {
        id: 4, category: 'Health', readTime: '3 min', emoji: '🏃',
        title: 'How to Stay Healthy Without a Gym Membership in the USA',
        excerpt: 'Gym memberships cost $400–$1,000/year. Discover free and low-cost alternatives that Americans are using to stay fit in 2025.',
        tags: ['Fitness', 'Budget', 'Health'],
        featured: false,
    },
    {
        id: 5, category: 'Career', readTime: '7 min', emoji: '💼',
        title: 'Negotiate Your Salary Like a Pro — The American Way',
        excerpt: 'Studies show 70% of Americans never negotiate. Those who do earn $5,000–$15,000 more per year. Here\'s the exact script to use.',
        tags: ['Career', 'Salary', 'Negotiation'],
        featured: false,
    },
    {
        id: 6, category: 'Finance', readTime: '5 min', emoji: '💳',
        title: 'Best No-Fee Credit Cards for Americans in 2025',
        excerpt: 'The best rewards credit cards that earn you cashback, miles, or points with zero annual fee. Ranked by real American spending habits.',
        tags: ['Credit Cards', 'Rewards', 'Finance'],
        featured: false,
    },
    {
        id: 7, category: 'Savings', readTime: '4 min', emoji: '🛒',
        title: '20 Grocery Hacks to Save $200/Month at US Stores',
        excerpt: 'Real strategies used by savvy American shoppers. From store brands to cashback apps, these tips actually work at Walmart, Costco & more.',
        tags: ['Groceries', 'Savings', 'Shopping'],
        featured: false,
    },
    {
        id: 8, category: 'Tax', readTime: '8 min', emoji: '📄',
        title: 'Tax Deductions Most Americans Completely Miss',
        excerpt: 'The IRS allows hundreds of deductions. Most Americans leave thousands on the table every year. Here\'s a complete checklist for 2025.',
        tags: ['Taxes', 'Deductions', 'IRS'],
        featured: false,
    },
    {
        id: 9, category: 'Career', readTime: '5 min', emoji: '🚀',
        title: 'The 10 Highest-Paying Remote Jobs in the USA Right Now',
        excerpt: 'Remote work is here to stay. These 10 roles are paying $80K–$200K+ per year and actively hiring across the United States.',
        tags: ['Remote Work', 'Jobs', 'Career'],
        featured: false,
    },
];

const CATEGORIES = ['All', 'Finance', 'Productivity', 'Housing', 'Health', 'Career', 'Savings', 'Tax'];
const catColors = {
    Finance: 'badge-green',
    Productivity: 'badge-blue',
    Housing: 'badge-purple',
    Health: 'badge-amber',
    Career: 'badge-blue',
    Savings: 'badge-green',
    Tax: 'badge-red',
};

export const metadata = {
    title: 'Tips & Tricks – TaskFlow USA',
    description: 'Practical guides and articles for Americans on finance, productivity, housing, health, and more.',
};

export default function BlogPage() {
    const featured = POSTS.find(p => p.featured);
    const rest = POSTS.filter(p => !p.featured);

    return (
        <div className={styles.page}>
            <div className={styles.pageHeader}>
                <div className="container">
                    <span className="section-label">📰 Tips & Tricks</span>
                    <h1 className={styles.pageTitle}>Practical Guides for American Life</h1>
                    <p className={styles.pageSubtitle}>
                        Real advice on money, productivity, health, housing, and career — written for everyday Americans.
                    </p>
                </div>
            </div>

            <div className="container section">
                {/* Featured Post */}
                {featured && (
                    <div className={styles.featuredPost}>
                        <div className={styles.featuredEmoji}>{featured.emoji}</div>
                        <div className={styles.featuredContent}>
                            <div className={styles.featuredMeta}>
                                <span className={`badge ${catColors[featured.category] || 'badge-blue'}`}>{featured.category}</span>
                                <span className={styles.readTime}>⏱ {featured.readTime} read</span>
                                <span className={styles.featuredLabel}>★ Featured</span>
                            </div>
                            <h2 className={styles.featuredTitle}>{featured.title}</h2>
                            <p className={styles.featuredExcerpt}>{featured.excerpt}</p>
                            <div className={styles.featuredTags}>
                                {featured.tags.map(t => <span key={t} className={styles.tag}>#{t}</span>)}
                            </div>
                            <Link href={`/blog/${featured.id}`} className="btn btn-primary" target="_blank" rel="noopener noreferrer">Read Article →</Link>
                        </div>
                    </div>
                )}

                <div className={styles.mainLayout}>
                    <div className={styles.postsGrid}>
                        {rest.map(post => (
                            <div key={post.id} className={styles.postCard}>
                                <div className={styles.postEmoji}>{post.emoji}</div>
                                <div className={styles.postMeta}>
                                    <span className={`badge ${catColors[post.category] || 'badge-blue'}`}>{post.category}</span>
                                    <span className={styles.readTime}>⏱ {post.readTime}</span>
                                </div>
                                <h3 className={styles.postTitle}>{post.title}</h3>
                                <p className={styles.postExcerpt}>{post.excerpt}</p>
                                <div className={styles.postFooter}>
                                    <div className={styles.postTags}>
                                        {post.tags.slice(0, 2).map(t => <span key={t} className={styles.tag}>#{t}</span>)}
                                    </div>
                                    <Link href={`/blog/${post.id}`} className={styles.readMore} target="_blank" rel="noopener noreferrer">Read →</Link>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className={styles.sidebar}>
                        {/* Popular Tags */}
                        <div className={styles.sideWidget}>
                            <h3 className={styles.widgetTitle}>Popular Topics</h3>
                            <div className={styles.tagCloud}>
                                {['Budgeting', 'Savings', 'Remote Work', 'Credit Score', '401k', 'Home Buying', 'Side Hustle', 'Tax Tips', 'Meal Prep', 'Health Insurance'].map(t => (
                                    <span key={t} className={styles.cloudTag}>#{t}</span>
                                ))}
                            </div>
                        </div>

                        {/* Newsletter Mini */}
                        <div className={styles.sideWidget}>
                            <h3 className={styles.widgetTitle}>📧 Weekly Newsletter</h3>
                            <p className={styles.widgetText}>Get the top 5 tips for American life every Sunday — free.</p>
                            <input className={styles.sideInput} type="email" placeholder="your@email.com" />
                            <button className="btn btn-primary" style={{ width: '100%', marginTop: '0.75rem', justifyContent: 'center' }}>
                                Subscribe Free 🇺🇸
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
