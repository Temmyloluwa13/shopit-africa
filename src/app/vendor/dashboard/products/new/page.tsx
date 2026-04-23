"use client";

import { useState } from 'react';
import styles from './ProductUpload.module.css';

export default function NewProductPage() {
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setImagePreview(url);
    }
  };

  return (
    <div className={styles.uploadContainer}>
      <div className={styles.header}>
        <h2>Add New Product</h2>
        <p>List a new item in your store</p>
      </div>

      <form action="/api/vendor/products" method="POST" className={styles.formGrid}>
        {/* Left Column: Form Details */}
        <div className={styles.formDetails}>
          <div className={styles.card}>
            <h3>Basic Information</h3>
            <div className={styles.inputGroup}>
              <label htmlFor="productName">Product Name</label>
              <input type="text" id="productName" name="productName" placeholder="e.g. Samsung Galaxy S24 Ultra" required />
            </div>
            
            <div className={styles.rowGrid}>
              <div className={styles.inputGroup}>
                <label htmlFor="price">Price (₦)</label>
                <input type="number" id="price" name="price" placeholder="0.00" required />
              </div>
              <div className={styles.inputGroup}>
                <label htmlFor="stock">Stock Quantity</label>
                <input type="number" id="stock" name="stock" placeholder="0" required />
              </div>
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="category">Category</label>
              <select id="category" name="category" required>
                <option value="">Select Category</option>
                <option value="Phones & Tablets">Phones & Tablets</option>
                <option value="Electronics">Electronics</option>
                <option value="Fashion">Fashion</option>
                <option value="Appliances">Appliances</option>
              </select>
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="description">Product Description</label>
              <textarea id="description" name="description" rows={5} placeholder="Describe the key features and specifications..." required></textarea>
            </div>
          </div>
        </div>

        {/* Right Column: Image & Actions */}
        <div className={styles.formSidebar}>
          <div className={styles.card}>
            <h3>Product Image</h3>
            <div className={styles.imageUploadBox}>
              <label htmlFor="imageUpload" className={styles.uploadLabel}>
                {imagePreview ? (
                  <img src={imagePreview} alt="Preview" className={styles.previewImage} />
                ) : (
                  <div className={styles.uploadPlaceholder}>
                    <span className={styles.uploadIcon}>📸</span>
                    <span>Click to upload image</span>
                    <span className={styles.uploadHint}>JPG, PNG (Max 5MB)</span>
                  </div>
                )}
                <input 
                  type="file" 
                  id="imageUpload" 
                  name="image" 
                  accept="image/*" 
                  className={styles.hiddenInput} 
                  onChange={handleImageChange}
                  required 
                />
              </label>
            </div>
          </div>

          <div className={styles.card}>
            <h3>Publishing</h3>
            <div className={styles.actionButtons}>
              <button type="button" className={`btn btn-outline ${styles.draftBtn}`}>Save Draft</button>
              <button type="submit" className={`btn btn-primary ${styles.publishBtn}`}>Publish Product</button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
