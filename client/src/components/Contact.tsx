
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';

const Contact = () => {
  return (
    <section id="contact" className="section-padding">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="section-heading">
            Get In <span className="gradient-text">Touch</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Have a question or interested in our services? Reach out to us and our team will get back to you shortly.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div>
            <h3 className="text-2xl font-bold mb-6 text-tech-blue">Send Us a Message</h3>
            <form className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="John Doe"
                    className="w-full"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Your Email</label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="john@example.com"
                    className="w-full"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                <Input
                  id="subject"
                  type="text"
                  placeholder="How can we help you?"
                  className="w-full"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                <Textarea
                  id="message"
                  rows={5}
                  placeholder="Your message here..."
                  className="w-full"
                />
              </div>
              <Button className="tech-button flex items-center gap-2 w-full">
                Send Message <Send size={16} />
              </Button>
            </form>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="text-2xl font-bold mb-6 text-tech-blue">Contact Information</h3>
            <div className="bg-tech-gray p-8 rounded-xl">
              <div className="space-y-8">
                <div className="flex gap-4">
                  <div className="bg-white p-3 rounded-full shadow-md">
                    <Mail className="text-tech-purple" size={24} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-tech-dark-gray">Email Us</h4>
                    <p className="text-gray-600">info@renuncianttech.com</p>
                    <p className="text-gray-600">support@renuncianttech.com</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="bg-white p-3 rounded-full shadow-md">
                    <Phone className="text-tech-purple" size={24} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-tech-dark-gray">Call Us</h4>
                    <p className="text-gray-600">+1 (555) 123-4567</p>
                    <p className="text-gray-600">+1 (555) 765-4321</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="bg-white p-3 rounded-full shadow-md">
                    <MapPin className="text-tech-purple" size={24} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-tech-dark-gray">Visit Us</h4>
                    <p className="text-gray-600">
                      123 Tech Park Avenue, Suite 456<br />
                      Silicon Valley, CA 94043<br />
                      United States
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <h4 className="font-semibold mb-4 text-tech-dark-gray">Business Hours</h4>
                <div className="space-y-2 text-gray-600">
                  <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
                  <p>Saturday: 10:00 AM - 3:00 PM</p>
                  <p>Sunday: Closed</p>
                </div>
              </div>
            </div>

            <div className="mt-8 bg-gradient-to-r from-tech-purple to-tech-indigo p-6 rounded-xl text-white">
              <h4 className="font-bold text-xl mb-2">Ready to transform your business?</h4>
              <p className="mb-4">Schedule a free consultation with our experts today.</p>
              <Button className="bg-white text-tech-purple hover:bg-gray-100">
                Book a Call
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
