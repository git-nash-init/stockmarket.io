import { Users, BookOpen, TrendingUp, Award, Target, Clock } from 'lucide-react';

const StatsSection = () => {
  const stats = [
    {
      icon: Users,
      value: '2000+',
      label: 'Students Taught',
      description: 'Across India and globally'
    },
    {
      icon: BookOpen,
      value: '10+',
      label: 'Learning Modules',
      description: 'Comprehensive curriculum'
    },
    {
      icon: TrendingUp,
      value: 'Learn and earn',
      label: 'Make Your First Profit',
      description: 'Learn to trade with confidence'
    },
    {
      icon: Award,
      value: 'Free Certification',
      label: 'After Course Completion',
      description: 'Confirm your skills with our certification'
    },
    {
      icon: Target,
      value: '₹0',
      label: 'Free Courses',
      description: 'Learn without any financial commitment'
    },
    {
      icon: Clock,
      value: '24/7',
      label: 'Support',
      description: 'Community assistance'
    }
  ];

  return (
    <section className="py-20 bg-gradient-hero">
      <div className="container mx-auto px-4 lg:px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Trusted by <span className="gradient-text">Millions</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Join India's largest community of stock market learners and traders. 
            Our proven track record speaks for itself.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {stats.map((stat, index) => (
            <div 
              key={stat.label}
              className="text-center group hover-lift animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-primary rounded-full mb-6 group-hover:shadow-glow transition-all duration-300">
                <stat.icon className="h-8 w-8 text-primary-foreground" />
              </div>
              <div className="text-4xl md:text-5xl font-bold text-primary mb-2">
                {stat.value}
              </div>
              <div className="text-xl font-semibold text-foreground mb-2">
                {stat.label}
              </div>
              <div className="text-muted-foreground">
                {stat.description}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;