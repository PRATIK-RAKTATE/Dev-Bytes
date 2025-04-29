
import { ArrowRight } from 'lucide-react';
import { Button } from './ui/button';

const Hero = () => {
  return (
    <section id="home" className="relative pt-20 pb-12 md:pt-32 md:pb-20 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <div className="absolute top-20 right-10 w-72 h-72 bg-tech-purple/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-10 w-60 h-60 bg-tech-indigo/10 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row items-center">
          {/* Hero Content */}
          <div className="w-full md:w-1/2 mb-10 md:mb-0 md:pr-10">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4">
              Innovative <span className="gradient-text">Tech Solutions</span> for Tomorrow's World
            </h1>
            <p className="text-lg text-gray-600 mb-8 max-w-lg">
              We specialize in cutting-edge technology services and products that help businesses transform their digital presence and operational efficiency.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button className="tech-button text-base flex items-center gap-2">
                Explore Services <ArrowRight size={18} />
              </Button>
              <Button variant="outline" className="border-tech-purple text-tech-purple hover:bg-tech-purple/5 text-base">
                Learn More
              </Button>
            </div>

            {/* Clients */}
            <div className="mt-12">
              <p className="text-sm text-gray-500 mb-4">TRUSTED BY INDUSTRY LEADERS</p>
              <div className="flex flex-wrap gap-8 items-center opacity-70">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="h-8 bg-gray-300 rounded w-24"></div>
                ))}
              </div>
            </div>
          </div>

          {/* Hero Image */}
          <div className="w-full md:w-1/2">
            <div className="relative bg-gradient-to-br from-tech-purple/20 to-tech-indigo/20 rounded-2xl p-4 shadow-xl">
              <div className="aspect-[4/3] bg-gradient-to-r from-tech-purple to-tech-indigo rounded-lg overflow-hidden flex items-center justify-center">
                <div className="text-white text-lg font-semibold">Hero Image</div>
              </div>
              <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-gradient-to-br from-tech-purple to-tech-indigo rounded-full opacity-60 blur-lg"></div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
          {[
            { value: "10+", label: "Years Experience" },
            { value: "250+", label: "Projects Completed" },
            { value: "50+", label: "Tech Experts" },
            { value: "100%", label: "Client Satisfaction" }
          ].map((stat, index) => (
            <div key={index} className="bg-white rounded-lg p-4 shadow-lg text-center">
              <div className="text-3xl font-bold gradient-text mb-1">{stat.value}</div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
