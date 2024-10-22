'use client'

import { useState, useRef } from 'react';
import styles from './SelfieUpload.module.css';

export default function SelfieUpload({ formData, updateFormData, onNext, onPrevious }) {
  const [selfieFile, setSelfieFile] = useState(formData.selfieFile);
  const [error, setError] = useState('');
  const [previewUrl, setPreviewUrl] = useState(null);
  const fileInputRef = useRef(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [isCameraActive, setIsCameraActive] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      setSelfieFile(file);
      setError('');
      setPreviewUrl(URL.createObjectURL(file));
    } else {
      setError('Please upload a valid image file');
    }
  };

  const handleCameraCapture = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      videoRef.current.srcObject = stream;
      setIsCameraActive(true);
    } catch (err) {
      console.error('Error accessing camera:', err);
      setError('Unable to access camera. Please try uploading a file instead.');
    }
  };

  const handleCapture = () => {
    const canvas = canvasRef.current;
    const video = videoRef.current;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext('2d').drawImage(video, 0, 0);
    canvas.toBlob((blob) => {
      const file = new File([blob], 'selfie.jpg', { type: 'image/jpeg' });
      setSelfieFile(file);
      setPreviewUrl(URL.createObjectURL(file));
      setIsCameraActive(false);
      videoRef.current.srcObject.getTracks().forEach(track => track.stop());
    }, 'image/jpeg');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selfieFile) {
      setError('Please upload a selfie or take a photo');
      return;
    }
    updateFormData({ selfieFile });
    onNext();
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.inputGroup}>
        <label htmlFor="selfieFile" className={styles.label}>
          Upload Selfie
        </label>
        <div className={styles.fileUpload}>
          <input
            id="selfieFile"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            ref={fileInputRef}
            className={styles.fileInput}
          />
          <div className={styles.fileUploadLabel}>
            {selfieFile ? selfieFile.name : 'Choose a file or take a photo'}
          </div>
        </div>
        <button type="button" onClick={handleCameraCapture} className={styles.cameraButton}>
          Take Photo
        </button>
        {error && <p className={styles.error}>{error}</p>}
      </div>
      {isCameraActive && (
        <div className={styles.cameraContainer}>
          <video ref={videoRef} autoPlay className={styles.cameraPreview} />
          <button type="button" onClick={handleCapture} className={styles.captureButton}>
            Capture
          </button>
        </div>
      )}
      <canvas ref={canvasRef} style={{ display: 'none' }} />
      {previewUrl && (
        <div className={styles.preview}>
          <img src={previewUrl} alt="Selfie preview" className={styles.previewImage} />
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