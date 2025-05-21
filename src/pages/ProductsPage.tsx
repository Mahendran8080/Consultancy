import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Book as Roof, ShieldCheck, BarChart, ArrowRight } from 'lucide-react';
import asphaltShingles from '../images/asphalt-shingles.png';
import metalRoofing from '../images/MetalRoof.png';
import clayTiles from '../images/ClayRoof.png';
import syntheticSlate from '../images/Synthetic.png';
import solarTiles from '../images/Solar.png';
import cedarShake from '../images/Cedar.png';

interface Product {
  _id: string;
  name: string;
  category: string;
  description: string;
  imageUrl: string;
  features: string[];
}

const ProductsPage: React.FC = () => {
  useEffect(() => {
    document.title = 'Our Products - Amman Roofing';
  }, []);

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const placeholderProducts: Product[] = [
    {
      _id: '1',
      name: 'Asphalt Shingles',
      category: 'shingles',
      description: 'Durable and cost-effective roofing solution for residential homes.',
      imageUrl: asphaltShingles,
      features: [
        'Class A fire rating',
        '25-30 year lifespan',
        'Available in multiple colors',
        'Wind resistance up to 110 mph',
        'Easy installation and repair'
      ]
    },
    {
      _id: '2',
      name: 'Metal Roofing Panels',
      category: 'metal',
      description: 'Long-lasting, energy-efficient solution for modern homes and buildings.',
      imageUrl: metalRoofing,
      features: [
        '50+ year lifespan',
        'Energy efficient',
        'Environmentally friendly',
        'Lightweight yet strong',
        'Snow shedding capability'
      ]
    },
    {
      _id: '3',
      name: 'Clay Roof Tiles',
      category: 'tiles',
      description: 'Classic, elegant roofing option with exceptional longevity and curb appeal.',
      imageUrl: clayTiles,
      features: [
        '100+ year lifespan',
        'Excellent insulation properties',
        'Rot and insect resistant',
        'Low maintenance',
        'Natural aesthetic appeal'
      ]
    },
    {
      _id: '4',
      name: 'Synthetic Slate',
      category: 'slate',
      description: 'Modern alternative to natural slate with reduced weight and cost.',
      imageUrl: syntheticSlate,
      features: [
        'Authentic slate appearance',
        'Lightweight design',
        'UV and impact resistant',
        '50+ year warranty',
        'Environmentally sustainable'
      ]
    },
    {
      _id: '5',
      name: 'Solar Roofing Tiles',
      category: 'solar',
      description: 'Innovative roofing solution that generates clean energy for your home.',
      imageUrl: solarTiles,
      features: [
        'Energy production capability',
        'Seamless integration with existing roof',
        'Durable tempered glass construction',
        '25-year power output warranty',
        'Tax incentive eligible'
      ]
    },
    {
      _id: '6',
      name: 'Cedar Shake Shingles',
      category: 'shingles',
      description: 'Natural wood roofing with distinctive appearance for premium homes.',
      imageUrl: cedarShake,
      features: [
        'Natural insulation properties',
        'Distinctive rustic appearance',
        'Wind resistant design',
        'Treated for fire resistance',
        'Environmentally sustainable'
      ]
    }
  ];

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        await new Promise(resolve => setTimeout(resolve, 1000));
        setProducts(placeholderProducts);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching products:', err);
        setError('Failed to load products. Please try again later.');
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const categories = [
    { id: 'all', name: 'All Products' },
    { id: 'shingles', name: 'Shingles' },
    { id: 'metal', name: 'Metal Roofing' },
    { id: 'tiles', name: 'Tiles' },
    { id: 'slate', name: 'Slate' },
    { id: 'solar', name: 'Solar' }
  ];

  const filteredProducts = selectedCategory === 'all'
    ? products
    : products.filter(product => product.category === selectedCategory);

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="bg-primary-700 py-20">
        <div className="container mx-auto px-4 text-center">
          <motion.h1
            className="text-4xl md:text-5xl font-display font-bold text-white mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Our Roofing Products
          </motion.h1>
          <motion.p
            className="text-xl text-primary-100 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            High-quality materials for every roofing project
          </motion.p>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          {/* Category Filter */}
          <div className="mb-12">
            <div className="flex flex-wrap items-center justify-center gap-4">
              {categories.map(category => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-6 py-2 rounded-full transition-colors ${
                    selectedCategory === category.id
                      ? 'bg-primary-600 text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-100'
                  } shadow-sm`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>

          {loading && (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
            </div>
          )}

          {error && (
            <div className="text-center py-12">
              <p className="text-red-600">{error}</p>
              <button
                onClick={() => window.location.reload()}
                className="mt-4 px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
              >
                Try Again
              </button>
            </div>
          )}

          {!loading && !error && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProducts.map((product, index) => (
                <ProductCard key={product._id} product={product} index={index} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-4">
              Why Choose Our Products?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Superior quality materials backed by industry-leading warranties
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <BenefitCard
              icon={<ShieldCheck size={48} />}
              title="Premium Quality"
              description="All our roofing products are sourced from top manufacturers and undergo rigorous quality testing."
            />
            <BenefitCard
              icon={<Roof size={48} />}
              title="Expert Installation"
              description="Our certified professionals ensure proper installation for maximum performance and longevity."
            />
            <BenefitCard
              icon={<BarChart size={48} />}
              title="Value for Money"
              description="Competitive pricing with outstanding performance, ensuring the best return on your investment."
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary-50">
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-lg shadow-lg p-8 md:p-12 text-center">
            <h2 className="text-3xl font-display font-bold text-gray-900 mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Contact our team today for expert advice on choosing the right roofing products for your project.
            </p>
            <a
              href="/contact"
              className="inline-flex items-center px-8 py-3 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg shadow-md transition-colors"
            >
              Contact Us <ArrowRight size={18} className="ml-2" />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

// ProductCard component
interface ProductCardProps {
  product: Product;
  index: number;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, index }) => (
  <motion.div
    className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-transform hover:-translate-y-2"
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
  >
    <img src={product.imageUrl} alt={product.name} className="w-full h-56 object-cover" />
    <div className="p-6">
      <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
      <p className="text-gray-600 mb-4">{product.description}</p>
      <ul className="text-sm text-gray-500 list-disc pl-5 space-y-1">
        {product.features.map((feature, idx) => (
          <li key={idx}>{feature}</li>
        ))}
      </ul>
    </div>
  </motion.div>
);

// BenefitCard component
interface BenefitCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const BenefitCard: React.FC<BenefitCardProps> = ({ icon, title, description }) => (
  <div className="bg-gray-100 p-6 rounded-lg text-center shadow-sm">
    <div className="text-primary-600 mb-4">{icon}</div>
    <h3 className="text-xl font-semibold text-gray-800 mb-2">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

export default ProductsPage;
