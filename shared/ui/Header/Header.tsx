import Link from 'next/link';
import Image from 'next/image';
import { Icon } from '@/shared/ui/Icon';
import { getHeaderText } from '@/shared/constants/header';
import styles from './Header.module.scss';

export function Header() {
  const text = getHeaderText();

  return (
    <header className={styles.header} role="banner">
      <div className={styles.container}>
        {/* Logo */}
        <Link href="/" className={styles.logo} aria-label={text.logoAriaLabel}>
          <Image
            src="/logo.svg"
            alt=""
            width={120}
            height={32}
            priority
            className={styles.logoImage}
          />
          <span className={styles.logoText}>Inspire</span>
        </Link>

        {/* Security Badge */}
        <div
          className={styles.securityBadge}
          role="complementary"
          aria-label={text.securityAriaLabel}
        >
          <div className={styles.shieldIcon} aria-hidden="true">
            <Icon name="shield-check" size={24} aria-hidden={true} />
          </div>
          <div className={styles.badgeText}>
            <span className={styles.badgeTitle}>{text.securityTitle}</span>
            <span className={styles.badgeSubtitle}>{text.securitySubtitle}</span>
          </div>
        </div>
      </div>
    </header>
  );
}
