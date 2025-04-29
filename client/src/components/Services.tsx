
import { Code, Database, Cloud, Smartphone, Server, BarChart3 } from 'lucide-react';

const Services = () => {
  const services = [
    {
      icon: <Code size={36} className="text-tech-purple" />,
      title: "Custom Software Development",
      description: "Bespoke software solutions tailored to your specific business requirements and challenges."
    },
    {
      icon: <Database size={36} className="text-tech-purple" />,
      title: "Database Management",
      description: "Comprehensive database solutions including design, implementation, migration and optimization."
    },
    {
      icon: <Cloud size={36} className="text-tech-purple" />,
      title: "Cloud Computing",
      description: "Harness the power of cloud with our deployment, migration and management services."
    },
    {
      icon: <Smartphone size={36} className="text-tech-purple" />,
      title: "Mobile App Development",
      description: "Create powerful, feature-rich applications for iOS and Android platforms."
    },
    {
      icon: <Server size={36} className="text-tech-purple" />,
      title: "IT Infrastructure",
      description: "End-to-end IT infrastructure setup, maintenance and support services."
    },
    {
      icon: <BarChart3 size={36} className="text-tech-purple" />,
      title: "Data Analytics & AI",
      description: "Transform your data into actionable insights with our advanced analytics solutions."
    }
  ];

  return (
    <section id="services" className="section-padding">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="section-heading">
            Our <span className="gradient-text">Services</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We offer a comprehensive range of technology services designed to help your business grow, innovate, and stay competitive in today's digital landscape.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div 
              key={index} 
              className="service-card group"
            >
              <div className="mb-4">{service.icon}</div>
              <h3 className="text-xl font-bold mb-2 text-tech-blue group-hover:text-tech-purple transition-colors duration-300">
                {service.title}
              </h3>
              <p className="text-gray-600">{service.description}</p>
            </div>
          ))}
        </div>

        {/* Process */}
        <div className="mt-24">
          <h3 className="text-2xl font-bold text-center mb-12">Our Development Process</h3>
          
          <div className="relative">
            {/* Process timeline line */}
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-tech-purple to-tech-indigo transform -translate-x-1/2"></div>
            
            <div className="space-y-12 relative">
              {[
                {
                  number: "01", 
                  title: "Discovery & Analysis", 
                  description: "We start by understanding your business needs and requirements through detailed consultation."
                },
                {
                  number: "02", 
                  title: "Planning & Design", 
                  description: "Our team creates a comprehensive plan and designs a solution architecture to meet your objectives."
                },
                {
                  number: "03", 
                  title: "Development", 
                  description: "We develop your solution using agile methodologies ensuring quality and efficiency."
                },
                {
                  number: "04", 
                  title: "Testing & Deployment", 
                  description: "Rigorous testing ensures your solution works flawlessly before deployment."
                },
                {
                  number: "05", 
                  title: "Support & Maintenance", 
                  description: "We provide ongoing support and maintenance to keep your solution running optimally."
                }
              ].map((step, index) => (
                <div key={index} className={`flex flex-col md:flex-row gap-8 items-center ${index % 2 === 1 ? 'md:flex-row-reverse' : ''}`}>
                  <div className="w-full md:w-1/2">
                    <div className="p-6 bg-white rounded-lg shadow-lg">
                      <h4 className="text-xl font-bold mb-2 flex items-center gap-3">
                        <span className="bg-gradient-to-r from-tech-purple to-tech-indigo text-white w-8 h-8 rounded-full flex items-center justify-center text-sm">
                          {step.number}
                        </span>
                        {step.title}
                      </h4>
                      <p className="text-gray-600">{step.description}</p>
                    </div>
                  </div>
                  
                  {/* Timeline circle for desktop */}
                  <div className="hidden md:flex items-center justify-center w-8 h-8 bg-white rounded-full border-4 border-tech-purple z-10">
                    <div className="w-2 h-2 bg-tech-purple rounded-full"></div>
                  </div>
                  
                  <div className="w-full md:w-1/2"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
