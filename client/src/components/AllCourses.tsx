import { ArrowRight } from 'lucide-react';
import { Button } from './ui/button';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

interface Course {
  name: string;
  description: string;
  features: string[];
  image?: string;
}

const AllCourses = () => {
  const courses: Course[] = [
    {
      name: "Advanced Python",
      description: "Master Python programming with advanced concepts, data structures, and real-world applications.",
      features: ["OOP Concepts", "Decorators & Generators", "Async Programming", "Data Analysis"],
      image: "/images/python.jpg"
    },
    {
      name: "Full-Stack Development",
      description: "Complete course covering modern web development with React, Node.js, and databases.",
      features: ["React Framework", "REST APIs", "MongoDB", "Authentication"],
      image: "/images/fullStackDev.jpg"
    },
    {
      name: "Data Science",
      description: "Comprehensive data science course covering statistics, ML, and data visualization.",
      features: ["Python Pandas", "Machine Learning", "Data Visualization", "Big Data Basics"],
      image: "/images/dataScience.jpg"
    },
    {
      name: "Mobile Development",
      description: "Build cross-platform mobile applications using Flutter and React Native.",
      features: ["Dart Programming", "State Management", "Native Features", "App Publishing"],
      image: "/images/appDev.avif"
    },
    {
      name: "DevOps Engineering",
      description: "Learn CI/CD pipelines, infrastructure as code, and cloud deployment strategies.",
      features: ["Docker/Kubernetes", "AWS/GCP", "Terraform", "Monitoring & Logging"],
      image: "/images/devops.png"
    },
    {
      name: "UX/UI Design",
      description: "Master user-centered design principles and modern prototyping tools.",
      features: ["Figma/Sketch", "User Research", "Interaction Design", "Design Systems"],
      image: "/images/UiUx.jpg"
    }
  ];

  return (
    <section className="bg-tech-gray">
      <Navbar />
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 pt-8">
          <h2 className="section-heading">
            All <span className="gradient-text">Courses</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Explore our complete catalog of technical courses and advance your career.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-12">
          {courses.map((course, index) => (
            <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <div className="bg-gradient-to-br from-tech-purple to-tech-indigo p-8 text-white text-center relative h-48 group">
                {course.image && (
                  <img 
                    src={course.image} 
                    alt={course.name}
                    className="w-full h-full object-cover absolute inset-0 mix-blend-multiply opacity-80 transition-transform duration-300 group-hover:scale-105"
                  />
                )}
                <div className="relative z-10 h-full flex flex-col items-center justify-center">
                  <div className="bg-black/20 backdrop-blur-sm rounded-xl p-4 border border-white/10 transform transition-all group-hover:scale-105">
                    <h3 className="text-2xl font-bold mb-2 drop-shadow-md">{course.name}</h3>
                    <div className="w-16 h-1 bg-gradient-to-r from-tech-purple to-tech-indigo mx-auto my-4 rounded-full" />
                    <p className="text-sm font-light tracking-wider uppercase opacity-90">
                      Course Preview
                    </p>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <p className="text-gray-600 mb-4">{course.description}</p>
                <div className="mb-4">
                  <h4 className="font-semibold mb-2 text-tech-dark-gray">Curriculum Highlights:</h4>
                  <ul className="space-y-2">
                    {course.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-tech-purple rounded-full"></div>
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <Button className="tech-button w-full flex items-center gap-2 hover:gap-3 transition-all">
                  Enroll Now <ArrowRight size={16} />
                </Button>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-10 pb-12">
          <Button asChild className="tech-button flex items-center gap-2 mx-auto hover:gap-3 transition-all">
            <Link to="/">
              Back to Home <ArrowRight size={26} />
            </Link>
          </Button>
        </div>
      </div>
      <Footer />
    </section>
  );
};

export default AllCourses;