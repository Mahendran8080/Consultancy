import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { AlertCircle, Package, Clock, Truck } from 'lucide-react';

interface Product {
  _id: string;
  name: string;
  category: string;
  price: number;
  quantity: number;
  availability: boolean;
  imageUrl: string;
  estimatedDelivery: string;
}

const StocksPage: React.FC = () => {
  useEffect(() => {
    document.title = 'Product Stock - Amman Roofing';
  }, []);

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterAvailability, setFilterAvailability] = useState<boolean | null>(null);
  
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await axios.get('http://localhost:5000/api/products');
        
        // Add estimated delivery based on availability and quantity
        const productsWithDelivery = response.data.map((product: Product) => ({
          ...product,
          estimatedDelivery: product.availability 
            ? product.quantity > 50 
              ? '2-3 business days'
              : product.quantity > 20
                ? '3-5 business days'
                : '5-7 business days'
            : 'Out of stock'
        }));
        
        setProducts(productsWithDelivery);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching products:', err);
        setError('Failed to load product stock information. Please try again later.');
        setLoading(false);
      }
    };
    
    fetchProducts();
  }, []);

  // Filter and search products
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          product.category.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesAvailability = filterAvailability === null || product.availability === filterAvailability;
    
    return matchesSearch && matchesAvailability;
  });

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="bg-primary-700 py-16">
        <div className="container mx-auto px-4 text-center">
          <motion.h1 
            className="text-4xl md:text-5xl font-display font-bold text-white mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Product Stock
          </motion.h1>
          <motion.p 
            className="text-xl text-primary-100 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Check availability and stock levels for our roofing products
          </motion.p>
        </div>
      </section>

      {/* Stocks Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          {/* Search and Filter */}
          <div className="bg-white rounded-lg shadow-soft p-6 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-2">
                <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">
                  Search Products
                </label>
                <input
                  type="text"
                  id="search"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search by name or category..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                />
              </div>
              <div>
                <label htmlFor="availability" className="block text-sm font-medium text-gray-700 mb-1">
                  Availability
                </label>
                <select
                  id="availability"
                  value={filterAvailability === null ? 'all' : filterAvailability ? 'available' : 'unavailable'}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (value === 'all') setFilterAvailability(null);
                    else setFilterAvailability(value === 'available');
                  }}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                >
                  <option value="all">All Products</option>
                  <option value="available">In Stock</option>
                  <option value="unavailable">Out of Stock</option>
                </select>
              </div>
            </div>
          </div>

          {loading && (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
            </div>
          )}

          {error && (
            <div className="text-center py-12">
              <div className="flex justify-center mb-4">
                <AlertCircle size={48} className="text-red-500" />
              </div>
              <p className="text-red-600 mb-4">{error}</p>
              <button 
                onClick={() => window.location.reload()}
                className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
              >
                Try Again
              </button>
            </div>
          )}

          {!loading && !error && filteredProducts.length === 0 && (
            <div className="text-center py-12 bg-white rounded-lg shadow-soft">
              <Package size={48} className="text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">No Products Found</h3>
              <p className="text-gray-600">
                Try adjusting your search or filter to find what you're looking for.
              </p>
            </div>
          )}

          {!loading && !error && filteredProducts.length > 0 && (
            <div className="overflow-x-auto">
              <table className="w-full bg-white shadow-soft rounded-lg overflow-hidden">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Availability</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Est. Delivery</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredProducts.map((product) => (
                    <motion.tr 
                      key={product._id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                      className="hover:bg-gray-50"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="h-10 w-10 flex-shrink-0">
                            <img 
                              src={product.imageUrl} 
                              alt={product.name}
                              className="h-10 w-10 rounded object-cover" 
                            />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{product.name}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">{product.category}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right">
                        <div className="text-sm font-medium text-gray-900">₹{product.price.toFixed(2)}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right">
                        <div className="text-sm text-gray-500">{product.quantity}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          product.availability 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {product.availability ? 'In Stock' : 'Out of Stock'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500 flex items-center">
                          <Clock size={16} className="mr-1" />
                          {product.estimatedDelivery}
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </section>

      {/* Information Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="mb-10 text-center">
              <h2 className="text-3xl font-display font-bold text-gray-900 mb-4">
                Stock Information
              </h2>
              <p className="text-xl text-gray-600">
                Everything you need to know about our product availability
              </p>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-6">
  <div className="flex items-center mb-4">
    <Package size={24} className="text-primary-600 mr-3" />
    <h3 className="text-xl font-bold text-gray-900">Stock Information</h3>
  </div>
  <ul className="space-y-3 text-gray-600">
    <li className="flex items-start">
      <span className="text-primary-600 mr-2">•</span>
      <span>Stock levels are updated daily</span>
    </li>
    <li className="flex items-start">
      <span className="text-primary-600 mr-2">•</span>
      <span>For items marked "Low Stock," we recommend ordering soon</span>
    </li>
    <li className="flex items-start">
      <span className="text-primary-600 mr-2">•</span>
      <span>Out of stock items can be pre-ordered; our team will contact you with estimated arrival times</span>
    </li>
    <li className="flex items-start">
      <span className="text-primary-600 mr-2">•</span>
      <span>For bulk orders, please contact us directly for special arrangements</span>
    </li>
  </ul>
</div>

            
            <div className="mt-10 text-center">
              <p className="text-gray-600 mb-6">
                For the most accurate stock information and special order inquiries, please contact our customer service team.
              </p>
              <a 
                href="/contact" 
                className="inline-block px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg shadow-md transition-colors"
              >
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default StocksPage;