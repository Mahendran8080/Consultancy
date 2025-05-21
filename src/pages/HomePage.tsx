import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowDownCircle, Award, PenTool as Tool, Clock, Home, Building, Wrench, FileCheck, DropletIcon } from 'lucide-react';
import VideoCarousel from '../components/VideoCarousel';
import backgroundImage from "../images/BACKGROUND.jpg";


const HomePage: React.FC = () => {
  useEffect(() => {
    document.title = 'Amman  - Professional Roofing Services';
  }, []);

  return (
    <div className="overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center">
        <div className="absolute inset-0 bg-black/40 z-10"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${backgroundImage})`,
            backgroundAttachment: 'fixed',
          }}
        ></div>
        <div className="container mx-auto px-4 relative z-20">
          <div className="max-w-3xl">
            <motion.h1 
              className="text-4xl sm:text-5xl md:text-6xl font-display font-bold text-white mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              Protect Your Home With Expert Roofing Solutions
            </motion.h1>
            <motion.p 
              className="text-xl text-gray-100 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Amman  Roofing provides high-quality roofing services for residential and commercial properties with unmatched quality and customer satisfaction.
            </motion.p>
            <motion.div 
              className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <a 
                href="#services" 
                className="inline-block px-8 py-4 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg shadow-lg transition-colors text-center"
              >
                Our Services
              </a>
              <a 
                href="/contact" 
                className="inline-block px-8 py-4 bg-white hover:bg-gray-100 text-primary-800 font-medium rounded-lg shadow-lg transition-colors text-center"
              >
                Get a Free Quote
              </a>
            </motion.div>
          </div>
        </div>
        <a 
          href="#about" 
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20 text-white animate-bounce"
        >
          <ArrowDownCircle size={36} />
        </a>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <motion.div 
              className="lg:w-1/2"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-6">
                Trusted Roofing Experts <span className="text-primary-600">Since 2022</span>
              </h2>
              <p className="text-lg text-gray-700 mb-6">
                At Amman  Roofing, we've built our reputation on a foundation of quality workmanship and exceptional customer service. With over 3 years of experience, we're committed to providing the highest standard of roofing solutions.
              </p>
              <p className="text-lg text-gray-700 mb-8">
                Our team of certified professionals stands ready to handle all your roofing needs, from minor repairs to complete replacements, ensuring your home stays protected for years to come.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center">
                  <Award className="text-primary-600 mr-3" size={24} />
                  <span className="text-gray-800 font-medium">Quality Materials</span>
                </div>
                <div className="flex items-center">
                  <Tool className="text-primary-600 mr-3" size={24} />
                  <span className="text-gray-800 font-medium">Expert Installation</span>
                </div>
                <div className="flex items-center">
                  <Clock className="text-primary-600 mr-3" size={24} />
                  <span className="text-gray-800 font-medium">On-Time Service</span>
                </div>
                <div className="flex items-center">
                  <DropletIcon className="text-primary-600 mr-3" size={24} />
                  <span className="text-gray-800 font-medium">Waterproof Solutions</span>
                </div>
              </div>
            </motion.div>
            <motion.div 
              className="lg:w-1/2"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="relative">
                <img 
                  src="https://images.pexels.com/photos/1216544/pexels-photo-1216544.jpeg" 
                  alt="Professional roofers working" 
                  className="rounded-lg shadow-xl w-full h-auto"
                />
                {/* <div className="absolute -bottom-10 -left-10 bg-white p-6 rounded-lg shadow-lg">
                  <div className="flex items-start">
                    <div className="text-primary-600 mr-4">
                      <svg className="w-12 h-12" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-lg font-bold text-gray-900 mb-1">4.9 out of 5 stars</p>
                      <p className="text-gray-600">Based on 500+ reviews</p>
                    </div>
                  </div>
                </div> */}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <motion.h2
              className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              Our Roofing Services
            </motion.h2>
            <motion.p
              className="text-xl text-gray-600 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Comprehensive roofing solutions tailored to meet your specific needs
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <ServiceCard 
              icon={<Home size={40} />}
              title="Residential Roofing"
              description="Complete roofing solutions for homeowners, including installation, replacement, and repair services using premium materials."
              delay={0}
            />
            <ServiceCard 
              icon={<Building size={40} />}
              title="Commercial Roofing"
              description="Specialized roofing services for businesses and commercial properties, ensuring minimal disruption and maximum durability."
              delay={0.2}
            />
            <ServiceCard 
              icon={<Wrench size={40} />}
              title="Roof Repairs"
              description="Quick and reliable roof repair services to address leaks, damage, and wear, extending the life of your existing roof."
              delay={0.4}
            />
            <ServiceCard 
              icon={<FileCheck size={40} />}
              title="Roof Inspections"
              description="Thorough roof inspections to identify potential issues before they become major problems, with detailed reports and recommendations."
              delay={0.6}
            />
            <ServiceCard 
              icon={<DropletIcon size={40} />}
              title="Gutter Installation"
              description="Professional gutter installation and repair services to protect your home from water damage and maintain proper drainage."
              delay={0.8}
            />
            <ServiceCard 
              icon={<Tool size={40} />}
              title="Roof Maintenance"
              description="Regular maintenance services to keep your roof in optimal condition, prevent damage, and extend its lifespan."
              delay={1.0}
            />
          </div>
        </div>
      </section>

      {/* Video Carousel Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <motion.h2
              className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              Our Projects
            </motion.h2>
            <motion.p
              className="text-xl text-gray-600 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Take a look at some of our recent work and see the quality we deliver
            </motion.p>
          </div>
          
          <VideoCarousel />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary-700">
        <div className="container mx-auto px-4 text-center">
          <motion.h2
            className="text-3xl md:text-4xl font-display font-bold text-white mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Ready to Start Your Roofing Project?
          </motion.h2>
          <motion.p
            className="text-xl text-primary-100 mb-8 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Contact us today for a free consultation and estimate on your roofing needs
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <a 
              href="/contact" 
              className="inline-block px-8 py-4 bg-white hover:bg-gray-100 text-primary-700 font-medium rounded-lg shadow-lg transition-colors"
            >
              Get a Free Quote
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay: number;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ icon, title, description, delay }) => (
  <motion.div 
    className="bg-white rounded-lg shadow-soft p-8 transition-transform hover:translate-y-[-8px]"
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay }}
  >
    <div className="text-primary-600 mb-4">{icon}</div>
    <h3 className="text-xl font-bold text-gray-900 mb-3">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </motion.div>
);

export default HomePage;