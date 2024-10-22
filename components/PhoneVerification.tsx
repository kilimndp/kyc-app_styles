'use client'

import { useState } from 'react';
import styles from './PhoneVerification.module.css';

export default function PhoneVerification({ formData, updateFormData, onNext }) {
  const [phoneNumber, setPhoneNumber] = useState(formData.phoneNumber);
  const [error, setError] = useState('');

  const handlePhoneChange = (e) => {
    const value = e.target.value.replace(/\D/g, '');
    setPhoneNumber(value);
    setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (phoneNumber.length < 10) {
      setError('Please enter a valid phone number');
      return;
    }
    updateFormData({ phoneNumber });
    onNext();
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.inputGroup}>
        <label htmlFor="phoneNumber" className={styles.label}>
          Phone Number
        </label>
        <div className={styles.inputWrapper}>
          <input
            id="phoneNumber"
            type="tel"
            value={phoneNumber}
            onChange={handlePhoneChange}
            placeholder="Enter your phone number"
            className={styles.input}
          />
        </div>
        {error && <p className={styles.error}>{error}</p>}
      </div>
      <button type="submit" className={styles.button}>
        Next
      </button>
    </form>
  );
}