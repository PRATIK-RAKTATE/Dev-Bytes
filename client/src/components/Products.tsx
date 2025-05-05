import { ArrowRight } from 'lucide-react';
import { Button } from './ui/button';
import { Link } from 'react-router-dom';

interface Course {
  name: string;
  description: string;
  features: string[];
  image?: string;
}

const Courses = () => {
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
  ];

  return (
    <section id="courses" className="section-padding bg-tech-gray">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="section-heading">
            Our <span className="gradient-text">Courses</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Explore our industry-leading curriculum designed to equip you with cutting-edge technical skills.
          </p>
        </div>

        <div className="space-y-8">
          {courses.map((course, index) => (
            <div 
              key={index} 
              className="bg-white rounded-xl shadow-lg overflow-hidden"
            >
              <div className="flex flex-col md:flex-row">
                <div className="w-full md:w-2/5 bg-gradient-to-br from-tech-purple to-tech-indigo p-8 text-white flex items-center justify-center relative">
                  {course.image && (
                    <img 
                      src={course.image}
                      alt={course.name}
                      className="absolute inset-0 w-full h-full object-cover mix-blend-multiply opacity-80"
                    />
                  )}
                  <div className="text-center relative z-10">
                    <div className="bg-black/20 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                      <h3 className="text-3xl font-bold mb-2 drop-shadow-md">{course.name}</h3>
                      <div className="w-16 h-1 bg-gradient-to-r from-tech-purple to-tech-indigo mx-auto my-4 rounded-full" />
                      <p className="text-sm font-light tracking-wider uppercase opacity-90">
                        Course Preview
                      </p>
                    </div>
                  </div>
                </div>
                <div className="w-full md:w-3/5 p-8">
                  <h3 className="text-2xl font-bold mb-4 text-tech-blue">{course.name}</h3>
                  <p className="text-gray-600 mb-6">{course.description}</p>
                  <div className="mb-6">
                    <h4 className="font-semibold mb-2 text-tech-dark-gray">Curriculum Highlights:</h4>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {course.features.map((feature, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-tech-purple rounded-full"></div>
                          <span className="text-gray-700">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <Button className="tech-button flex items-center gap-2">
                    Enroll Now <ArrowRight size={16} />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <Button asChild className="tech-button flex items-center gap-2 mx-auto">
            <Link to="/all-courses">
              See All Courses <ArrowRight size={16} />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Courses;