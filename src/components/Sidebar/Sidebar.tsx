import React from 'react';
import styles from './Sidebar.module.css';
import {
  IconHome,
  IconCard,
  IconPayments,
  IconCredit,
  IconAccount
} from '../../assets/icons';
import AspireLogo from "../../assets/aspire_logo.svg";

interface NavItem {
  id: string;
  label: string;
  icon: React.ReactNode;
}

const NAV_ITEMS: NavItem[] = [
  { id: 'home',     label: 'Home',     icon: <IconHome /> },
  { id: 'cards',    label: 'Cards',    icon: <IconCard /> },
  { id: 'payments', label: 'Payments', icon: <IconPayments /> },
  { id: 'credit',   label: 'Credit',   icon: <IconCredit /> },
  { id: 'account',  label: 'Account',  icon: <IconAccount /> },
];

const Sidebar: React.FC = () => {
  const [activeNav, setActiveNav] = React.useState('cards');

  return (
    <>
        <aside className={styles.sidebar}>
        <div className={styles.brand}>
            <span className={styles.brandLogo}>
                <img src={AspireLogo} alt="Aspire logo" />
            {/* aspire<span className={styles.brandDot}>.</span> */}
            </span>
        </div>

        <p className={styles.tagline}>
            Trusted way of banking for 3,000+ SMEs and startups in Singapore
        </p>

        <nav className={styles.nav}>
            {NAV_ITEMS.map((item) => (
            <button
                key={item.id}
                className={`${styles.navItem} ${activeNav === item.id ? styles.navItemActive : ''}`}
                onClick={() => setActiveNav(item.id)}
                aria-current={activeNav === item.id ? 'page' : undefined}
            >
                <span className={styles.navIcon}>{item.icon}</span>
                <span className={styles.navLabel}>{item.label}</span>
            </button>
            ))}
        </nav>
        </aside>
        {/* ── Mobile bottom nav bar ── */}
      <nav className={styles.mobileNav} aria-label="Mobile navigation">
        {NAV_ITEMS.map((item) => (
          <button
            key={item.id}
            className={`${styles.mobileNavItem} ${activeNav === item.id ? styles.mobileNavItemActive : ''}`}
            onClick={() => setActiveNav(item.id)}
            aria-current={activeNav === item.id ? 'page' : undefined}
          >
            <span className={styles.mobileNavIcon}>{item.icon}</span>
            <span className={styles.mobileNavLabel}>{item.label}</span>
          </button>
        ))}
      </nav>
    </>
  );
};

export default Sidebar;