import { Button } from '../../components/ui/button';

const projects = [
  {
    id: 1,
    title: 'Generative AI for Creative Design',
    description: 'Investigating how generative adversarial networks can assist human designers in the creative process.',
    image: 'https://images.unsplash.com/photo-1761740533449-b8d4385e60b0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcnRpZmljaWFsJTIwaW50ZWxsaWdlbmNlJTIwbmV1cmFsJTIwbmV0d29yayUyMHZpc3VhbGl6YXRpb258ZW58MXx8fHwxNzY1NDM0MDc0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  },
  {
    id: 2,
    title: 'Robotic Manipulation in Unstructured Environments',
    description: 'Developing reinforcement learning algorithms for robots to handle novel objects in cluttered spaces.',
    image: 'https://images.unsplash.com/photo-1569852440795-70ab3e775ddf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyb2JvdGljcyUyMGFybSUyMGxhYm9yYXRvcnklMjByZXNlYXJjaHxlbnwxfHx8fDE3NjU0NDQ0ODJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  },
  {
    id: 3,
    title: 'Graph Neural Networks for Drug Discovery',
    description: 'Applying graph-based deep learning to predict molecular properties and accelerate drug development.',
    image: 'https://images.unsplash.com/photo-1765206720351-1db6275637ca?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXRhJTIwc2NpZW5jZSUyMHZpc3VhbGl6YXRpb24lMjBncmFwaHxlbnwxfHx8fDE3NjU0NDQ0ODJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  },
  {
    id: 4,
    title: 'Ethical AI: Bias Detection and Mitigation',
    description: 'Creating frameworks and tools to identify and reduce bias in machine learning models deployed in society.',
    image: 'https://images.unsplash.com/photo-1644088379091-d574269d422f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhYnN0cmFjdCUyMHRlY2hub2xvZ3klMjBuZXR3b3JrJTIwY29ubmVjdGlvbnxlbnwxfHx8fDE3NjU0NDM4NjB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  }
];

export const ResearchPage = () => {
  return (
    <div className="min-h-screen pt-20 bg-[#F9F5F0]">
       {/* Header */}
       <div className="py-12 px-4 sm:px-6 lg:px-8 border-b border-[#344F1F]/10">
        <div className="max-w-[1440px] mx-auto">
          <h1 className="text-4xl sm:text-5xl font-bold text-[#344F1F]">Research Projects</h1>
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <div key={project.id} className="group flex flex-col h-full bg-[#F9F5F0] border border-[#344F1F]/20 hover:border-[#344F1F] transition-colors duration-300">
              {/* Image */}
              <div className="aspect-[16/9] overflow-hidden">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Content */}
              <div className="p-8 flex flex-col flex-grow">
                <h3 className="text-xl font-bold text-[#344F1F] mb-4 group-hover:text-[#F4991A] transition-colors">
                  {project.title}
                </h3>
                <p className="text-[#344F1F]/80 mb-8 leading-relaxed flex-grow">
                  {project.description}
                </p>
                <div className="mt-auto">
                  <Button 
                    variant="outline" 
                    className="w-full border-[#F4991A] text-[#F4991A] hover:bg-[#F4991A] hover:text-white rounded-none transition-colors"
                  >
                    Read Paper
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
