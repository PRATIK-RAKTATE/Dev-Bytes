
import { useEffect } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import About from '../components/About';
import Services from '../components/Services';
import Products from '../components/Products';
import Team from '../components/Team';
import Testimonials from '../components/Testimonials';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import ScrollToTop from '../components/ScrollToTop';
import AnimationWrapper from '../components/AnimationWrapper';

const Index = () => {
  useEffect(() => {
    document.title = "Renunciant Technologies - Innovative Tech Solutions";
  }, []);

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <main>
        <Hero />
        
        <AnimationWrapper>
          <About />
        </AnimationWrapper>
        
        <AnimationWrapper delay={150}>
          <Services />
        </AnimationWrapper>
        
        <AnimationWrapper delay={300}>
          <Products />
        </AnimationWrapper>
        
        <AnimationWrapper delay={450}>
          <Team />
        </AnimationWrapper>
        
        <AnimationWrapper delay={600}>
          <Testimonials />
        </AnimationWrapper>
        
        <AnimationWrapper delay={750}>
          <Contact />
        </AnimationWrapper>
      </main>
      
      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default Index;
