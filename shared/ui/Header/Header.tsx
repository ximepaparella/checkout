import Link from 'next/link';
import Image from 'next/image';
import styles from './Header.module.scss';

export function Header() {
  return (
    <header className={styles.header} role="banner">
      <div className={styles.container}>
        {/* Logo */}
        <Link href="/" className={styles.logo} aria-label="Inspire - Ir para página inicial">
          <Image
            src="/logo.svg"
            alt="Inspire"
            width={120}
            height={32}
            priority
            className={styles.logoImage}
          />
          <span className={styles.logoText}>Inspire</span>
        </Link>

        {/* Security Badge */}
        <div className={styles.securityBadge} role="complementary" aria-label="Compra segura">
          <div className={styles.shieldIcon} aria-hidden="true">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 2L4 5V11C4 16.55 7.16 21.74 12 23C16.84 21.74 20 16.55 20 11V5L12 2Z"
                fill="#22c55e"
              />
              <path
                d="M9 12L11 14L15 10"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div className={styles.badgeText}>
            <span className={styles.badgeTitle}>COMPRA SEGURA</span>
            <span className={styles.badgeSubtitle}>100% PROTEGIDO</span>
          </div>
        </div>
      </div>
    </header>
  );
}
