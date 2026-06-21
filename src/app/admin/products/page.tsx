'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Sidebar from '@/components/Sidebar';
import BottomNav from '@/components/BottomNav';
import { useAuth } from '@/components/AuthProvider';
import { Product } from '@/lib/db';
import styles from '@/styles/admin.module.css';
import compStyles from '@/styles/components.module.css';
import formStyles from '@/styles/shop.module.css';

export default function AdminProducts() {
  const { user, loading: authLoading } = useAuth();
  
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // Form states
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');
  const [category, setCategory] = useState('');
  const [businessType, setBusinessType] = useState<'solar' | 'mushroom'>('solar');
  const [imageUrl, setImageUrl] = useState('/logo.jpg');
  
  // Specs builder state
  const [specs, setSpecs] = useState<{ key: string; value: string }[]>([]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/products');
      if (res.ok) {
        const data = await res.json();
        setProducts(data);
      }
    } catch (err) {
      console.error('Failed to load products:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.role === 'admin') {
      fetchProducts();
    }
  }, [user]);

  // Open modal for editing or adding
  const handleOpenModal = (product: Product | null = null) => {
    if (product) {
      setEditingProduct(product);
      setTitle(product.title);
      setDescription(product.description);
      setPrice(product.price.toString());
      setStock(product.stock.toString());
      setCategory(product.category);
      setBusinessType(product.businessType);
      setImageUrl(product.image);
      
      // Map specs object to array
      const mappedSpecs = Object.entries(product.specs).map(([k, v]) => ({
        key: k,
        value: v,
      }));
      setSpecs(mappedSpecs);
    } else {
      setEditingProduct(null);
      setTitle('');
      setDescription('');
      setPrice('');
      setStock('');
      setCategory('');
      setBusinessType('solar');
      setImageUrl('/logo.jpg');
      setSpecs([]);
    }
    setIsModalOpen(true);
  };

  const handleAddSpecRow = () => {
    setSpecs([...specs, { key: '', value: '' }]);
  };

  const handleRemoveSpecRow = (index: number) => {
    setSpecs(specs.filter((_, i) => i !== index));
  };

  const handleSpecChange = (index: number, field: 'key' | 'value', value: string) => {
    const newSpecs = [...specs];
    newSpecs[index][field] = value;
    setSpecs(newSpecs);
  };

  const handleSaveProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !price || !category) {
      alert('Please fill in all required fields.');
      return;
    }

    // Convert specs array back to object
    const specsObject: Record<string, string> = {};
    specs.forEach((s) => {
      if (s.key.trim() && s.value.trim()) {
        specsObject[s.key.trim()] = s.value.trim();
      }
    });

    const body = {
      title,
      description,
      price: parseFloat(price),
      stock: parseInt(stock) || 0,
      category,
      businessType,
      image: imageUrl,
      specs: specsObject,
    };

    try {
      const url = editingProduct ? `/api/products/${editingProduct.id}` : '/api/products';
      const method = editingProduct ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      if (res.ok) {
        setIsModalOpen(false);
        fetchProducts();
        alert(editingProduct ? 'Product updated!' : 'Product added!');
      } else {
        const errorData = await res.json();
        alert(errorData.error || 'Failed to save product');
      }
    } catch (err) {
      console.error('Save product error:', err);
    }
  };

  const handleDeleteProduct = async (productId: string, title: string) => {
    if (!confirm(`Are you sure you want to delete "${title}"?`)) return;

    try {
      const res = await fetch(`/api/products/${productId}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        fetchProducts();
        alert('Product deleted successfully.');
      } else {
        alert('Failed to delete product.');
      }
    } catch (err) {
      console.error('Delete product error:', err);
    }
  };

  // Auth gate check
  if (authLoading) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
        <div style={{
          display: 'inline-block',
          width: '40px',
          height: '40px',
          border: '4px solid var(--border)',
          borderTop: '4px solid var(--primary)',
          borderRadius: '50%',
          animation: 'pulseGlow 1.5s infinite linear'
        }} />
      </div>
    );
  }

  if (!user || user.role !== 'admin') {
    return (
      <div style={{ textAlign: 'center', padding: '8rem 2rem' }}>
        <h2>Access Denied</h2>
        <p style={{ margin: '1rem 0 2rem 0', color: 'var(--text-secondary)' }}>
          You must be logged in as an administrator to access product management console.
        </p>
        <Link href="/auth/login" className="btn btn-primary">
          Log In as Admin
        </Link>
      </div>
    );
  }

  return (
    <div className={compStyles.adminLayout}>
      <Sidebar />

      <main className={styles.adminContent}>
        <div className={styles.adminTitleRow}>
          <div>
            <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.75rem', fontWeight: 800 }}>Manage Products</h1>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Add, edit, or delete products for both e-commerce portals.</p>
          </div>
          <button onClick={() => handleOpenModal(null)} className="btn btn-primary" style={{ border: 'none', padding: '0.6rem 1.2rem', fontSize: '0.85rem' }}>
            + Add New Product
          </button>
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '4rem' }}>
            <div style={{
              display: 'inline-block',
              width: '30px',
              height: '30px',
              border: '3px solid var(--border)',
              borderTop: '3px solid var(--primary)',
              borderRadius: '50%',
              animation: 'pulseGlow 1.5s infinite linear'
            }} />
          </div>
        ) : (
          <div className={styles.tableContainer}>
            <table className={styles.adminTable}>
              <thead>
                <tr>
                  <th>Product Details</th>
                  <th>Portal</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Stock</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((prod) => (
                  <tr key={prod.id}>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <img src={prod.image} alt={prod.title} style={{ width: '40px', height: '40px', objectFit: 'cover', borderRadius: '4px', background: 'var(--bg-surface-elevated)' }} />
                        <div>
                          <strong style={{ color: 'var(--text-primary)', display: 'block' }}>{prod.title}</strong>
                          <span style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>ID: {prod.id}</span>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span className={`badge ${prod.businessType === 'solar' ? 'badge-solar' : 'badge-mush'}`}>
                        {prod.businessType === 'solar' ? 'Solar Clean' : 'Mushroom'}
                      </span>
                    </td>
                    <td>{prod.category}</td>
                    <td style={{ fontWeight: 700, color: 'var(--primary)' }}>${prod.price.toFixed(2)}</td>
                    <td>
                      {prod.stock > 0 ? (
                        <span style={{ color: 'var(--secondary)', fontWeight: 600 }}>{prod.stock} units</span>
                      ) : (
                        <span style={{ color: 'rgb(239, 68, 68)', fontWeight: 600 }}>Out of Stock</span>
                      )}
                    </td>
                    <td>
                      <div className={styles.actionsCell}>
                        <button onClick={() => handleOpenModal(prod)} className={`${styles.actionBtn} ${styles.editBtn}`} title="Edit Product">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <path d="M12 20h9M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
                          </svg>
                        </button>
                        <button onClick={() => handleDeleteProduct(prod.id, prod.title)} className={`${styles.actionBtn} ${styles.deleteBtn}`} title="Delete Product">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <polyline points="3 6 5 6 21 6" />
                            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Add / Edit Product Modal */}
        {isModalOpen && (
          <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
              <h2 className={styles.modalTitle}>
                {editingProduct ? 'Edit Product Details' : 'Add New Product'}
              </h2>

              <form onSubmit={handleSaveProduct} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <div className={formStyles.formGroup}>
                  <label className={formStyles.formGroupLabel}>Product Title *</label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. MycoMold Trays"
                    className={formStyles.formInput}
                    required
                  />
                </div>

                <div className={formStyles.formGroup}>
                  <label className={formStyles.formGroupLabel}>Description</label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Enter detailed description..."
                    rows={3}
                    className={formStyles.formInput}
                    style={{ resize: 'vertical' }}
                  />
                </div>

                <div className={formStyles.formGrid}>
                  <div className={formStyles.formGroup}>
                    <label className={formStyles.formGroupLabel}>Price ($) *</label>
                    <input
                      type="number"
                      step="0.01"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      placeholder="29.99"
                      className={formStyles.formInput}
                      required
                    />
                  </div>
                  <div className={formStyles.formGroup}>
                    <label className={formStyles.formGroupLabel}>Initial Stock *</label>
                    <input
                      type="number"
                      value={stock}
                      onChange={(e) => setStock(e.target.value)}
                      placeholder="100"
                      className={formStyles.formInput}
                      required
                    />
                  </div>
                </div>

                <div className={formStyles.formGrid}>
                  <div className={formStyles.formGroup}>
                    <label className={formStyles.formGroupLabel}>Category *</label>
                    <input
                      type="text"
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      placeholder="e.g. Cleaning Equipment"
                      className={formStyles.formInput}
                      required
                    />
                  </div>
                  <div className={formStyles.formGroup}>
                    <label className={formStyles.formGroupLabel}>Portal Theme *</label>
                    <select
                      value={businessType}
                      onChange={(e: any) => setBusinessType(e.target.value)}
                      className={styles.selectInput}
                    >
                      <option value="solar">Solar Panel Cleaning</option>
                      <option value="mushroom">Mushroom Packaging</option>
                    </select>
                  </div>
                </div>

                <div className={formStyles.formGroup}>
                  <label className={formStyles.formGroupLabel}>Image URL</label>
                  <input
                    type="text"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    className={formStyles.formInput}
                  />
                </div>

                {/* Specs Builder section */}
                <div className={formStyles.formGroup}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
                    <label className={formStyles.formGroupLabel}>Specifications</label>
                    <button type="button" onClick={handleAddSpecRow} style={{ border: 'none', background: 'transparent', color: 'var(--primary)', fontSize: '0.75rem', fontWeight: 800, cursor: 'pointer' }}>
                      + Add Row
                    </button>
                  </div>

                  <div className={styles.specsBuilder}>
                    {specs.length > 0 ? (
                      specs.map((spec, i) => (
                        <div key={i} className={styles.specRow}>
                          <input
                            type="text"
                            placeholder="Specification (e.g. Volume)"
                            value={spec.key}
                            onChange={(e) => handleSpecChange(i, 'key', e.target.value)}
                            className={formStyles.formInput}
                            style={{ padding: '0.4rem 0.6rem', fontSize: '0.8rem' }}
                          />
                          <input
                            type="text"
                            placeholder="Value (e.g. 5 Liters)"
                            value={spec.value}
                            onChange={(e) => handleSpecChange(i, 'value', e.target.value)}
                            className={formStyles.formInput}
                            style={{ padding: '0.4rem 0.6rem', fontSize: '0.8rem' }}
                          />
                          <button type="button" onClick={() => handleRemoveSpecRow(i)} style={{ border: 'none', background: 'transparent', color: 'rgb(239, 68, 68)', cursor: 'pointer', padding: '0.2rem' }}>
                            &times;
                          </button>
                        </div>
                      ))
                    ) : (
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', textAlign: 'center', display: 'block', padding: '0.5rem 0' }}>No specifications added yet.</span>
                    )}
                  </div>
                </div>

                <div className={styles.modalActions}>
                  <button type="button" onClick={() => setIsModalOpen(false)} className="btn btn-secondary" style={{ padding: '0.5rem 1.2rem', fontSize: '0.85rem' }}>
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary" style={{ padding: '0.5rem 1.5rem', fontSize: '0.85rem', border: 'none' }}>
                    Save Product
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>

      <div style={{ display: 'block', position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 100 }}>
        <BottomNav />
      </div>
    </div>
  );
}
