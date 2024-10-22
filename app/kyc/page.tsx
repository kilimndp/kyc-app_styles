import KYCForm from '@/components/KYCForm';
import styles from './page.module.css';

export default function KYCPage() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Know Your Customer (KYC)</h1>
      <KYCForm />
    </div>
  );
}