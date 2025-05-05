import { CheckCircle } from 'lucide-react';

const About = () => {
  return (
    <section id="about" className="section-padding bg-tech-gray">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="section-heading">
            About <span className="gradient-text">Renunciant Technologies</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We're a forward-thinking technology company focused on delivering innovative solutions to complex business challenges.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-10 items-center">
          {/* About Image */}
          <div className="w-full lg:w-1/2">
            <div className="relative">
              <div className="rounded-xl overflow-hidden shadow-xl">
                <div className="aspect-[4/3] bg-gradient-to-br from-tech-blue to-tech-dark-gray rounded-lg overflow-hidden">
                  <img 
                    src="/images/aboutuspic.png" 
                    alt="About Us" 
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
              </div>
              <div className="absolute -z-10 -bottom-6 -right-6 w-3/4 h-3/4 bg-tech-purple opacity-10 rounded-xl"></div>
            </div>
          </div>

          {/* About Content */}
          <div className="w-full lg:w-1/2">
            <h3 className="section-subheading text-tech-blue">
              Driving Digital Transformation Since 2010
            </h3>
            <p className="text-gray-600 mb-6">
              Renunciant Technologies is a premier technology solutions provider dedicated to helping businesses navigate the digital landscape. With expertise spanning software development, IT consulting, and digital strategy, we empower organizations to harness the full potential of technology.
            </p>
            <p className="text-gray-600 mb-8">
              Our team of skilled professionals combines technical knowledge with industry insights to deliver tailored solutions that drive growth, efficiency, and innovation.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                "Custom Software Solutions",
                "IT Infrastructure Management",
                "Cloud Computing Services",
                "Digital Strategy Consulting",
                "Enterprise Mobility Solutions",
                "Data Analytics & AI"
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                  <CheckCircle size={20} className="text-tech-purple flex-shrink-0" />
                  <span className="text-gray-700">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Vision & Mission */}
        <div className="grid md:grid-cols-2 gap-8 mt-20">
          <div className="bg-white p-8 rounded-xl shadow-lg">
            <h3 className="text-xl font-bold mb-4 text-tech-blue">Our Vision</h3>
            <p className="text-gray-600">
              To be the leading technology partner that empowers businesses to thrive in the digital era through innovative, sustainable, and transformative solutions.
            </p>
          </div>
          <div className="bg-white p-8 rounded-xl shadow-lg">
            <h3 className="text-xl font-bold mb-4 text-tech-blue">Our Mission</h3>
            <p className="text-gray-600">
              To deliver exceptional technology services that solve real-world business challenges, drive digital transformation, and create lasting value for our clients and their stakeholders.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;