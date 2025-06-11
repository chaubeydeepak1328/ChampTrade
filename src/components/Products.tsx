import React, { useState, useRef, useEffect } from 'react';
import { ChevronRight } from 'lucide-react';

interface Product {
  id: string;
  title: string;
  description: string;
  image: string;
  features: string[];
}

const products: Product[] = [
  {
    id: 'product1',
    title: 'TCC Enterprise Suite',
    description: 'A comprehensive solution for enterprise-level operations and management.',
    image: 'https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
    features: [
      'End-to-end encryption',
      'Real-time collaboration',
      'Advanced workflow automation',
      'Custom reporting and analytics'
    ]
  },
  {
    id: 'product2',
    title: 'TCC Cloud Platform',
    description: 'Scalable cloud infrastructure designed for modern applications and services.',
    image: 'https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
    features: [
      'Global CDN integration',
      'Auto-scaling resources',
      '99.99% uptime guarantee',
      'Pay-as-you-go pricing model'
    ]
  },
  {
    id: 'product3',
    title: 'TCC Security Shield',
    description: 'Comprehensive security solution to protect your digital assets and data.',
    image: 'https://images.pexels.com/photos/1181354/pexels-photo-1181354.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
    features: [
      'Threat intelligence',
      'Vulnerability scanning',
      'Identity and access management',
      '24/7 security monitoring'
    ]
  }
];

const ProductCard: React.FC<{ product: Product; isActive: boolean; onClick: () => void }> = ({ 
  product, 
  isActive, 
  onClick 
}) => {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            cardRef.current?.classList.add('opacity-100', 'translate-y-0');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, []);

  return (
    <div
      id={product.id}
      ref={cardRef}
      className={`relative overflow-hidden rounded-xl transition-all duration-500 cursor-pointer opacity-0 translate-y-8 ${
        isActive 
          ? 'bg-gradient-to-r from-yellow-500 to-amber-400 text-black shadow-xl scale-105 z-10' 
          : 'bg-black/40 backdrop-blur-sm border border-yellow-500/10 text-white hover:bg-black/50'
      }`}
      onClick={onClick}
    >
      <div className="absolute inset-0 opacity-20">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="relative z-10 p-6">
        <h3 className={`text-xl font-bold mb-2`}>
          {product.title}
        </h3>
        <p className={`mb-4 ${isActive ? 'text-black/80' : 'text-neutral-300'}`}>
          {product.description}
        </p>
        <div className={`flex items-center ${isActive ? 'text-black' : 'text-yellow-500'}`}>
          <span className="mr-2">Learn more</span>
          <ChevronRight size={16} />
        </div>
      </div>
    </div>
  );
};

const ProductDetail: React.FC<{ product: Product }> = ({ product }) => {
  const detailRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            detailRef.current?.classList.add('opacity-100', 'translate-y-0');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (detailRef.current) {
      observer.observe(detailRef.current);
    }

    return () => {
      if (detailRef.current) {
        observer.unobserve(detailRef.current);
      }
    };
  }, [product.id]);

  return (
    <div 
      ref={detailRef}
      className="bg-black/40 backdrop-blur-sm border border-yellow-500/10 rounded-xl shadow-xl p-8 opacity-0 translate-y-8 transition-all duration-700"
    >
      <div className="mb-6 h-64 overflow-hidden rounded-lg">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
        />
      </div>
      <h3 className="text-2xl font-bold mb-4 text-white">{product.title}</h3>
      <p className="text-neutral-300 mb-6">{product.description}</p>
      
      <h4 className="font-semibold text-white mb-3">Key Features:</h4>
      <ul className="space-y-2 mb-6">
        {product.features.map((feature, index) => (
          <li key={index} className="flex items-start">
            <span className="text-yellow-500 mr-2">•</span>
            <span className="text-neutral-300">{feature}</span>
          </li>
        ))}
      </ul>
      
      <button className="px-6 py-3 bg-gradient-to-r from-yellow-500 to-amber-400 text-black rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-yellow-500/20">
        Request Demo
      </button>
    </div>
  );
};

const Products: React.FC = () => {
  const [activeProduct, setActiveProduct] = useState<Product>(products[0]);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            sectionRef.current?.classList.add('opacity-100');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section className="py-20 bg-gradient-to-br from-neutral-900 via-black to-neutral-900">
      <div 
        ref={sectionRef}
        className="container mx-auto px-4 md:px-6 transition-opacity duration-1000 opacity-0"
      >
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-yellow-500 to-amber-400">
            Our Solutions
          </h2>
          <p className="text-xl text-neutral-300">
            Discover our suite of products designed to elevate your technology infrastructure.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-1 gap-4">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                isActive={activeProduct.id === product.id}
                onClick={() => setActiveProduct(product)}
              />
            ))}
          </div>
          
          <ProductDetail product={activeProduct} />
        </div>
      </div>
    </section>
  );
};

export default Products;