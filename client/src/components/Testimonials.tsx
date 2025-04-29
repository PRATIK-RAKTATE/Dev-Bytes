
import { useState } from 'react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';

const Testimonials = () => {
  const testimonials = [
    {
      name: "David Miller",
      position: "CTO at TechCorp",
      company: "TechCorp Inc.",
      content: "Renunciant Technologies delivered an exceptional software solution that perfectly matched our requirements. Their team was professional, responsive, and delivered on time and on budget.",
      rating: 5
    },
    {
      name: "Jennifer Lee",
      position: "Operations Director",
      company: "Global Innovations",
      content: "Working with Renunciant has transformed our business operations. Their cloud migration services were flawless, and we've seen a significant improvement in efficiency and cost savings.",
      rating: 5
    },
    {
      name: "Robert Thompson",
      position: "IT Manager",
      company: "Healthcare Solutions",
      content: "The mobile application developed by Renunciant Technologies has received fantastic feedback from our users. The team's attention to detail and user-centric approach made all the difference.",
      rating: 4
    },
    {
      name: "Emily Carter",
      position: "CEO",
      company: "Digital Marketers Ltd",
      content: "We've worked with many IT consultants in the past, but none have matched the expertise and dedication of the Renunciant team. They're true partners in our success.",
      rating: 5
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <section className="section-padding bg-gradient-to-r from-tech-blue to-tech-dark-gray text-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="section-heading text-white">
            Client <span className="bg-clip-text text-transparent bg-gradient-to-r from-tech-light-blue to-tech-purple">Testimonials</span>
          </h2>
          <p className="max-w-2xl mx-auto text-gray-200">
            Don't take our word for it. Here's what our clients have to say about their experience working with Renunciant Technologies.
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          {/* Testimonial Slider */}
          <div className="overflow-hidden">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {testimonials.map((testimonial, index) => (
                <div key={index} className="w-full flex-shrink-0 px-4">
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 shadow-lg">
                    <div className="flex mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          size={20} 
                          className={i < testimonial.rating ? "text-yellow-300 fill-yellow-300" : "text-gray-400"} 
                        />
                      ))}
                    </div>
                    <p className="text-lg mb-6 italic">"{testimonial.content}"</p>
                    <div>
                      <h4 className="font-bold text-xl">{testimonial.name}</h4>
                      <p className="text-gray-300">{testimonial.position}, {testimonial.company}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Buttons */}
          <button 
            onClick={prevSlide}
            className="absolute top-1/2 -left-4 -translate-y-1/2 bg-white text-tech-blue rounded-full p-2 shadow-lg hover:bg-tech-purple hover:text-white transition-colors duration-300"
            aria-label="Previous testimonial"
          >
            <ChevronLeft size={24} />
          </button>
          <button 
            onClick={nextSlide}
            className="absolute top-1/2 -right-4 -translate-y-1/2 bg-white text-tech-blue rounded-full p-2 shadow-lg hover:bg-tech-purple hover:text-white transition-colors duration-300"
            aria-label="Next testimonial"
          >
            <ChevronRight size={24} />
          </button>

          {/* Dots Indicator */}
          <div className="flex justify-center mt-8 gap-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full ${
                  index === currentIndex ? 'bg-tech-purple' : 'bg-white/40'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              ></button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
