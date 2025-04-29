
const Team = () => {
  const team = [
    {
      name: "John Smith",
      position: "CEO & Founder",
      bio: "With over 15 years of experience in the tech industry, John leads our company vision and strategy."
    },
    {
      name: "Sarah Johnson",
      position: "CTO",
      bio: "Sarah brings expertise in emerging technologies and ensures our technical excellence."
    },
    {
      name: "Michael Chen",
      position: "Head of Development",
      bio: "Michael oversees all software development projects and maintains our high code quality."
    },
    {
      name: "Emma Wilson",
      position: "Product Manager",
      bio: "Emma translates client needs into product requirements and ensures successful delivery."
    }
  ];

  return (
    <section id="team" className="section-padding">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="section-heading">
            Our <span className="gradient-text">Leadership Team</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Meet the talented professionals who drive our vision, innovation, and commitment to excellence.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {team.map((member, index) => (
            <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden group">
              <div className="h-60 bg-gradient-to-br from-tech-blue to-tech-dark-gray flex items-center justify-center">
                <div className="text-white font-medium">Member Photo</div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-1 text-tech-blue group-hover:text-tech-purple transition-colors duration-300">
                  {member.name}
                </h3>
                <p className="text-tech-purple font-medium text-sm mb-3">{member.position}</p>
                <p className="text-gray-600 text-sm">{member.bio}</p>
                <div className="flex gap-3 mt-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="w-8 h-8 rounded-full bg-tech-gray flex items-center justify-center">
                      <div className="w-4 h-4 bg-gray-400 rounded-full"></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Expertise */}
        <div className="mt-20">
          <h3 className="text-2xl font-bold text-center mb-12">Our Expertise</h3>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <h4 className="text-xl font-bold mb-4 text-tech-blue">Technical Skills</h4>
              <div className="space-y-4">
                {[
                  { skill: "Web Development", level: 95 },
                  { skill: "Mobile Development", level: 90 },
                  { skill: "Cloud Services", level: 85 },
                  { skill: "Data Analytics", level: 80 },
                  { skill: "Cybersecurity", level: 85 }
                ].map((item, index) => (
                  <div key={index}>
                    <div className="flex justify-between mb-1">
                      <span className="text-gray-700">{item.skill}</span>
                      <span className="text-tech-purple font-medium">{item.level}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-tech-purple to-tech-indigo h-2 rounded-full" 
                        style={{ width: `${item.level}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <h4 className="text-xl font-bold mb-4 text-tech-blue">Industries Served</h4>
              <div className="grid grid-cols-2 gap-4">
                {[
                  "Healthcare",
                  "Finance",
                  "Education",
                  "E-commerce",
                  "Manufacturing",
                  "Logistics",
                  "Real Estate",
                  "Insurance"
                ].map((industry, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-tech-purple rounded-full"></div>
                    <span className="text-gray-700">{industry}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Team;
