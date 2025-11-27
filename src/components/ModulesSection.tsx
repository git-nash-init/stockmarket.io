import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  TrendingUp, 
  PieChart, 
  Shield, 
  Target, 
  BookOpen, 
  BarChart3,
  Zap,
  Brain,
  DollarSign
} from 'lucide-react';

const ModulesSection = () => {
  const modules = [
    {
      icon: TrendingUp,
      title: 'Technical Analysis',
      description: 'Master chart patterns, indicators, and price action strategies',
      lessons: 12,
      duration: '8 hours',
      color: 'text-blue-600'
    },
    {
      icon: PieChart,
      title: 'Options Trading',
      description: 'Learn options strategies, Greeks, and risk management',
      lessons: 15,
      duration: '10 hours',
      color: 'text-green-600'
    },
    {
      icon: Shield,
      title: 'Risk Management',
      description: 'Protect your capital with proven risk management techniques',
      lessons: 8,
      duration: '6 hours',
      color: 'text-red-600'
    },
    {
      icon: Target,
      title: 'Market Psychology',
      description: 'Understand trader psychology and market sentiment',
      lessons: 10,
      duration: '7 hours',
      color: 'text-purple-600'
    },
    {
      icon: BarChart3,
      title: 'Fundamental Analysis',
      description: 'Evaluate companies using financial statements and ratios',
      lessons: 14,
      duration: '9 hours',
      color: 'text-orange-600'
    },
    {
      icon: Zap,
      title: 'Day Trading',
      description: 'Short-term trading strategies and intraday techniques',
      lessons: 18,
      duration: '12 hours',
      color: 'text-yellow-600'
    },
    {
      icon: Brain,
      title: 'Trading Psychology',
      description: 'Develop the right mindset for consistent trading',
      lessons: 9,
      duration: '6 hours',
      color: 'text-indigo-600'
    },
    {
      icon: DollarSign,
      title: 'Portfolio Management',
      description: 'Build and manage a diversified investment portfolio',
      lessons: 11,
      duration: '8 hours',
      color: 'text-teal-600'
    }
  ];

  return (
    <section id="modules" className="py-20 bg-gradient-card">
      <div className="container mx-auto px-4 lg:px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Comprehensive Learning <span className="gradient-text">Modules</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Master every aspect of stock market trading through our carefully crafted modules. 
            From basics to advanced strategies, we've got you covered.
          </p>
        </div>

        {/* Modules Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
          {modules.map((module, index) => (
            <Card 
              key={module.title} 
              className="hover-lift bg-gradient-card shadow-card border-0 animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardHeader className="pb-4">
                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-lg bg-background ${module.color} mb-4`}>
                  <module.icon className="h-6 w-6" />
                </div>
                <CardTitle className="text-xl mb-2">{module.title}</CardTitle>
                <CardDescription className="text-sm">
                  {module.description}
                </CardDescription>
              </CardHeader>
              
            </Card>
          ))}
        </div>
        
      </div>
    </section>
  );
};

export default ModulesSection;