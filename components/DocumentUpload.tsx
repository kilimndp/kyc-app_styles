'use client'

import { useState } from 'react';
import styles from './DocumentUpload.module.css';

const documentTypes = [
  { value: 'passport', label: 'Passport' },
  { value: 'driverLicense', label: 'Driver\'s License' },
  { value: 'nationalId', label: 'National ID' },
];

export default function DocumentUpload({ formData, updateFormData, onNext, onPrevious }) {
  const [documentType, setDocumentType] = useState(formData.documentType);
  const [documentFile, setDocumentFile] = useState(formData.documentFile);
  const [error, setError] = useState('');

  const handleDocumentTypeChange = (e) => {
    setDocumentType(e.target.value);
    setError('');
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      setDocumentFile(file);
      setError('');
    } else {
      setError('Please upload a valid image file');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!documentType) {
      setError('Please select a document type');
      return;
    }
    if (!documentFile) {
      setError('Please upload a document');
      return;
    }
    updateFormData({ documentType, documentFile });
    onNext();
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.inputGroup}>
        <label htmlFor="documentType" className={styles.label}>
          Document Type
        </label>
        <select
          id="documentType"
          value={documentType}
          onChange={handleDocumentTypeChange}
          className={styles.select}
        >
          <option value="">Select a document type</option>
          {documentTypes.map((type) => (
            <option key={type.value} value={type.value}>
              {type.label}
            </option>
          ))}
        </select>
      </div>
      <div className={styles.inputGroup}>
        <label htmlFor="documentFile" className={styles.label}>
          Upload Document
        </label>
        <div className={styles.fileUpload}>
          <input
            id="documentFile"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className={styles.fileInput}
          />
          <div className={styles.fileUploadLabel}>
            {documentFile ? documentFile.name : 'Choose a file'}
          </div>
        </div>
        {error && <p className={styles.error}>{error}</p>}
      </div>
      {documentFile && (
        <div className={styles.preview}>
          <p className={styles.previewText}>{documentFile.name}</p>
        </div>
      )}
      <div className={styles.buttonGroup}>
        <button type="button" onClick={onPrevious} className={styles.button}>
          Previous
        </button>
        <button type="submit" className={styles.button}>Next</button>
      </div>
    </form>
  );
}