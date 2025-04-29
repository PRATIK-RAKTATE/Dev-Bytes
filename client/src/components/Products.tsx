
import { ArrowRight } from 'lucide-react';
import { Button } from './ui/button';

const Products = () => {
  const products = [
    {
      name: "TechFlow",
      description: "An enterprise workflow management system that streamlines business processes and improves operational efficiency.",
      features: ["Process Automation", "Task Management", "Analytics Dashboard", "Team Collaboration"]
    },
    {
      name: "SecureGuard",
      description: "A comprehensive security solution that protects your digital assets and ensures regulatory compliance.",
      features: ["Threat Detection", "Data Encryption", "Access Control", "Compliance Management"]
    },
    {
      name: "CloudSync",
      description: "A cloud-based data synchronization platform that ensures your information is always up-to-date across all devices.",
      features: ["Real-time Sync", "Cross-platform Support", "Offline Access", "Version Control"]
    }
  ];

  return (
    <section id="products" className="section-padding bg-tech-gray">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="section-heading">
            Our <span className="gradient-text">Products</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover our suite of innovative products designed to address specific business challenges and drive digital transformation.
          </p>
        </div>

        <div className="space-y-12">
          {products.map((product, index) => (
            <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="flex flex-col md:flex-row">
                <div className="w-full md:w-2/5 bg-gradient-to-br from-tech-purple to-tech-indigo p-8 text-white flex items-center justify-center">
                  <div className="text-center">
                    <h3 className="text-3xl font-bold mb-2">{product.name}</h3>
                    <div className="w-16 h-1 bg-white mx-auto my-4"></div>
                    <p className="italic">Product Image</p>
                  </div>
                </div>
                <div className="w-full md:w-3/5 p-8">
                  <h3 className="text-2xl font-bold mb-4 text-tech-blue">{product.name}</h3>
                  <p className="text-gray-600 mb-6">{product.description}</p>
                  <div className="mb-6">
                    <h4 className="font-semibold mb-2 text-tech-dark-gray">Key Features:</h4>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {product.features.map((feature, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-tech-purple rounded-full"></div>
                          <span className="text-gray-700">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <Button className="tech-button flex items-center gap-2">
                    Learn More <ArrowRight size={16} />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Products;
