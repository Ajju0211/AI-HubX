import React from 'react';
import { Check, X, Star, Zap } from 'lucide-react';

const SubscriptionPlans = () => {
  const plans = [
    {
      id: 'basic',
      name: 'Basic Plan',
      price: '$10',
      period: '/month',
      icon: Star,
      features: [
        '1 AI Model Access',
        '5GB Storage',
        'Basic Support',
        'Community Forums',
        'Standard API Access',
        'Basic Documentation'
      ],
      limitations: [
        'No Priority Queue',
        'Limited Model Versions',
        'No Custom Integration'
      ],
      description: 'Ideal for individuals looking to explore AI models.',
      isPopular: false
    },
    {
      id: 'premium',
      name: 'Premium Plan',
      price: '$50',
      period: '/month',
      icon: Zap,
      features: [
        'Unlimited AI Models Access',
        '50GB Storage',
        '24/7 Priority Support',
        'API Key Management',
        'Advanced Analytics',
        'Custom Integration Support',
        'Priority Queue Access',
        'Latest Model Versions'
      ],
      limitations: [],
      description: 'Best for professionals and enterprise-level needs.',
      isPopular: true
    }
  ];

  return (
    <div className="min-h-full bg-black text-white">
      <div className="w-full max-w-[90rem]   mx-auto px-4 sm:px-6 py-8 sm:py-12">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold mb-4">Choose Your Plan</h1>
          <p className="text-gray-400 max-w-xl mx-auto text-sm sm:text-base px-4">
            Access state-of-the-art AI models with our flexible pricing plans
          </p>
        </div>

        {/* Plans Container */}
        <div className="max-w-md sm:max-w-2xl lg:max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
            {plans.map((plan) => {
              const PlanIcon = plan.icon;
              return (
                <div
                  key={plan.id}
                  className={`relative border ${
                    plan.isPopular ? 'border-white' : 'border-gray-800'
                  } rounded-xl p-5 sm:p-6 lg:p-8 transition-transform duration-300 hover:transform hover:scale-[1.02]`}
                >
                  {plan.isPopular && (
                    <div className="absolute -top-3 sm:-top-4 left-1/2 transform -translate-x-1/2">
                      <span className="bg-white text-black px-3 py-1 rounded-full text-xs sm:text-sm font-semibold">
                        Most Popular
                      </span>
                    </div>
                  )}
                  
                  <div className="flex items-center justify-between mb-4 sm:mb-6">
                    <div className="flex items-center">
                      <PlanIcon className="w-5 h-5 sm:w-6 sm:h-6 mr-2" />
                      <h3 className="text-lg sm:text-xl font-bold">{plan.name}</h3>
                    </div>
                    <div className="text-right">
                      <span className="text-xl sm:text-2xl font-bold">{plan.price}</span>
                      <span className="text-gray-400 text-sm">{plan.period}</span>
                    </div>
                  </div>

                  <p className="text-gray-400 text-sm sm:text-base mb-6">
                    {plan.description}
                  </p>

                  <ul className="space-y-3 mb-6">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <Check className="w-5 h-5 mr-2 text-green-500 flex-shrink-0 mt-0.5" />
                        <span className="text-sm sm:text-base">{feature}</span>
                      </li>
                    ))}
                    {plan.limitations.map((limitation, index) => (
                      <li key={`limit-${index}`} className="flex items-start text-gray-500">
                        <X className="w-5 h-5 mr-2 text-red-500 flex-shrink-0 mt-0.5" />
                        <span className="text-sm sm:text-base">{limitation}</span>
                      </li>
                    ))}
                  </ul>

                  <button
                    className={`w-full py-3 rounded-lg font-semibold text-sm sm:text-base transition-colors duration-300 ${
                      plan.isPopular
                        ? 'bg-white text-black hover:bg-gray-200'
                        : 'bg-gray-900 hover:bg-gray-800'
                    }`}
                  >
                    Get Started
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionPlans;