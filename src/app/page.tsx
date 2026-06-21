'use client';

import { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import BottomNav from '@/components/BottomNav';
import ProductCard from '@/components/ProductCard';
import { Product } from '@/lib/db';
import styles from '@/styles/shop.module.css';

import WhyChooseUs from '@/components/WhyChooseUs';
import BusinessStats from '@/components/BusinessStats';
import Testimonials from '@/components/Testimonials';
import FAQAccordion from '@/components/FAQAccordion';
import RequestQuoteForm from '@/components/RequestQuoteForm';
import ContactNewsletter from '@/components/ContactNewsletter';
import Hero from '@/components/Hero';

export default function ShopCatalog() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Unified Search & Filter State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBusiness, setSelectedBusiness] = useState<'all' | 'solar' | 'mushroom'>('all');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [priceRange, setPriceRange] = useState(250);

  // Carousel State
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [
    {
      image: '/solar_carousel.png',
      category: 'Solar Panel Cleaning',
      title: 'Maximize Your Solar Efficiency',
      description: 'Professional-grade telescoping water-fed brushes, eco-friendly soaps, and autonomous robotic cleaning kits to boost energy production by up to 30%.',
      linkText: 'Explore Solar Clean',
      business: 'solar' as const,
    },
    {
      image: '/mushroom_carousel.png',
      category: 'Mushroom Packaging & Farming',
      title: 'Biodegradable Mycelium Packaging',
      description: '100% home-compostable custom-molded protective packaging grown from agriculture-waste and mushroom mycelium. Strong, sustainable, and organic.',
      linkText: 'Explore Mushroom Pack',
      business: 'mushroom' as const,
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  useEffect(() => {
    async function fetchProducts() {
      try {
        setLoading(true);
        // Fetch all products across both businesses
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
    }
    fetchProducts();
  }, []);

  // Filter categories dynamically based on selected business vertical
  const filteredCategoriesProducts = products.filter((p) => 
    selectedBusiness === 'all' || p.businessType === selectedBusiness
  );
  
  const categories = ['All', ...new Set(filteredCategoriesProducts.map((p) => p.category))];

  // If the selected category doesn't exist in the newly filtered business categories, reset it to 'All'
  useEffect(() => {
    if (selectedCategory !== 'All' && !categories.includes(selectedCategory)) {
      setSelectedCategory('All');
    }
  }, [selectedBusiness, selectedCategory, categories]);

  // Apply search and filters
  const filteredProducts = products.filter((product) => {
    const matchesBusiness =
      selectedBusiness === 'all' || product.businessType === selectedBusiness;
      
    const matchesSearch =
      product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase());
      
    const matchesCategory =
      selectedCategory === 'All' || product.category === selectedCategory;
      
    const matchesPrice = product.price <= priceRange;

    return matchesBusiness && matchesSearch && matchesCategory && matchesPrice;
  });

  return (
    <div className={styles.layout}>
      <Navbar />

      <main className={styles.mainContent}>
        
        {/* New Hero Section */}
        <Hero />

        <div className="container" style={{ marginTop: '2rem' }}>
          <div className={styles.shopGrid} id="catalog-grid">
            
            {/* Unified Filter Sidebar */}
            <aside className={styles.filtersSidebar}>
              <div className={styles.filterGroup}>
                <label className={styles.filterTitle}>Search Products</label>
                <input
                  type="text"
                  placeholder="Search products, details..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={styles.searchInput}
                />
              </div>

              <div className={styles.filterGroup}>
                <label className={styles.filterTitle}>Business Sector</label>
                <label className={styles.filterOption}>
                  <input
                    type="radio"
                    name="businessType"
                    checked={selectedBusiness === 'all'}
                    onChange={() => setSelectedBusiness('all')}
                  />
                  All Sectors
                </label>
                <label className={styles.filterOption}>
                  <input
                    type="radio"
                    name="businessType"
                    checked={selectedBusiness === 'solar'}
                    onChange={() => setSelectedBusiness('solar')}
                  />
                  Solar Panel Cleaning
                </label>
                <label className={styles.filterOption}>
                  <input
                    type="radio"
                    name="businessType"
                    checked={selectedBusiness === 'mushroom'}
                    onChange={() => setSelectedBusiness('mushroom')}
                  />
                  Mushroom Packaging
                </label>
              </div>

              <div className={styles.filterGroup}>
                <label className={styles.filterTitle}>Categories ({selectedBusiness === 'all' ? 'All' : selectedBusiness === 'solar' ? 'Solar' : 'Mushroom'})</label>
                {categories.map((cat) => (
                  <label key={cat} className={styles.filterOption}>
                    <input
                      type="radio"
                      name="category"
                      checked={selectedCategory === cat}
                      onChange={() => setSelectedCategory(cat)}
                    />
                    {cat}
                  </label>
                ))}
              </div>

              <div className={styles.filterGroup}>
                <div className={styles.filterTitle} style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>Max Price</span>
                  <span style={{ color: 'var(--primary)', fontWeight: 800 }}>${priceRange}</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="250"
                  value={priceRange}
                  onChange={(e) => setPriceRange(parseInt(e.target.value))}
                  style={{ accentColor: 'var(--primary)', width: '100%', cursor: 'pointer' }}
                />
              </div>
            </aside>

            {/* Catalog Grid */}
            <section className={styles.catalogSection}>
              <div className={styles.catalogControls}>
                <span>Showing {filteredProducts.length} products</span>
                <span style={{ textTransform: 'capitalize' }}>Filter: {selectedBusiness === 'all' ? 'All Businesses' : selectedBusiness === 'solar' ? 'Solar Clean' : 'Mushroom Pack'}</span>
              </div>

              {loading ? (
                <div style={{ textAlign: 'center', padding: '4rem' }}>
                  <div style={{
                    display: 'inline-block',
                    width: '40px',
                    height: '40px',
                    border: '4px solid var(--border)',
                    borderTop: '4px solid var(--primary)',
                    borderRadius: '50%',
                    animation: 'pulseGlow 1.5s infinite linear'
                  }} />
                  <p style={{ marginTop: '1rem', color: 'var(--text-secondary)' }}>Loading catalog items...</p>
                </div>
              ) : filteredProducts.length > 0 ? (
                <div className={styles.productsGrid}>
                  {filteredProducts.map((prod) => (
                    <ProductCard key={prod.id} product={prod} />
                  ))}
                </div>
              ) : (
                <div className={styles.noProducts}>
                  <h3>No Products Found</h3>
                  <p>Try adjusting your search keywords, business sectors, or category selections.</p>
                </div>
              )}
            </section>

          </div>
        </div>



        {/* Enterprise B2B Sections */}
        <WhyChooseUs />
        <BusinessStats />
        <Testimonials />
        <FAQAccordion />
        <RequestQuoteForm />
        <ContactNewsletter />

      </main>

      <BottomNav />
    </div>
  );
}
