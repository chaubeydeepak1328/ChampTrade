import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';

interface Testimonial {
  id: number;
  content: string;
  author: string;
  position: string;
  company: string;
  image: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    content: "TCC20's innovative solutions have transformed our entire workflow. Their tools are intuitive, powerful, and have dramatically improved our efficiency.",
    author: "Sarah Johnson",
    position: "CTO",
    company: "Innovate Tech",
    image: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
  },
  {
    id: 2,
    content: "Implementing TCC20's platform was the best business decision we made last year. The ROI has been impressive and the support team is exceptional.",
    author: "Michael Chen",
    position: "Director of Operations",
    company: "Global Solutions",
    image: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
  },
  {
    id: 3,
    content: "After struggling with multiple vendors, TCC20 provided the comprehensive solution we needed. Secure, scalable, and remarkably easy to use.",
    author: "Jennifer Rivera",
    position: "VP of Technology",
    company: "Enterprise Corp",
    image: "https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
  }
];

const Testimonials: React.FC = () => {
  const [current, setCurrent] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  
  const next = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrent((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
    setTimeout(() => setIsAnimating(false), 500);
  };
  
  const prev = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrent((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
    setTimeout(() => setIsAnimating(false), 500);
  };

  useEffect(() => {
    const timer = setInterval(next, 8000);
    return () => clearInterval(timer);
  }, []);

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
    <section className="py-20 bg-gradient-to-br from-black via-neutral-900 to-black overflow-hidden">
      <div 
        ref={sectionRef}
        className="container mx-auto px-4 md:px-6 transition-opacity duration-1000 opacity-0"
      >
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-yellow-500 to-amber-400">
            What Our Clients Say
          </h2>
          <p className="text-xl text-neutral-300">
            Success stories from organizations that have transformed with our solutions.
          </p>
        </div>
        
        <div className="relative max-w-5xl mx-auto">
          <div className="absolute top-0 left-0 -translate-x-8 -translate-y-8">
            <Quote className="w-16 h-16 text-yellow-500/30" />
          </div>
          
          <div className="relative overflow-hidden p-16">
            {testimonials.map((testimonial, index) => (
              <div
                key={testimonial.id}
                className={`transition-all duration-500 absolute inset-0 flex flex-col md:flex-row items-center gap-8 p-8 ${
                  index === current 
                    ? 'opacity-100 translate-x-0 z-10' 
                    : index < current 
                      ? 'opacity-0 -translate-x-full z-0' 
                      : 'opacity-0 translate-x-full z-0'
                }`}
              >
                <div className="flex-shrink-0 w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-yellow-500 overflow-hidden shadow-xl">
                  <img
                    src={testimonial.image}
                    alt={testimonial.author}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div className="flex-1">
                  <p className="text-neutral-100 text-lg md:text-xl italic mb-6 leading-relaxed">
                    "{testimonial.content}"
                  </p>
                  <div className="flex flex-col">
                    <span className="font-bold text-yellow-500">{testimonial.author}</span>
                    <span className="text-neutral-400">
                      {testimonial.position}, {testimonial.company}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="flex justify-center mt-8 space-x-4">
            <button
              onClick={prev}
              className="p-2 rounded-full bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20 transition-colors duration-300"
              disabled={isAnimating}
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <div className="flex space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    if (isAnimating) return;
                    setIsAnimating(true);
                    setCurrent(index);
                    setTimeout(() => setIsAnimating(false), 500);
                  }}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === current ? 'bg-yellow-500 scale-125' : 'bg-yellow-500/30'
                  }`}
                />
              ))}
            </div>
            <button
              onClick={next}
              className="p-2 rounded-full bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20 transition-colors duration-300"
              disabled={isAnimating}
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;