import React from 'react';

export default function HowItWorks() {
  const steps = [
    {
      number: 1,
      title: "Sign Up",
      description: "Create your account in minutes and set up your hotel profile.",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      )
    },
    {
      number: 2,
      title: "Add Rooms",
      description: "Input your room types, rates, and availability with our guided setup.",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      )
    },
    {
      number: 3,
      title: "Manage Bookings",
      description: "Accept reservations, manage check-ins, and track everything from your dashboard.",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
        </svg>
      )
    }
  ];

  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            How It Works
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Get your hotel management system running in three simple steps.
          </p>
        </div>

        {/* Steps Container */}
        <div className="relative">
          {/* Desktop: Horizontal Layout */}
          <div className="hidden lg:block">
            <div className="flex items-center justify-between relative">
              {/* Connecting Line */}
              <div className="absolute left-0 right-0 h-1 bg-blue-200 top-12 transform -translate-y-1/2 z-0"></div>

              {steps.map((step, index) => (
                <div key={index} className="flex-1 flex flex-col items-center relative z-10">
                  {/* Step Circle */}
                  <div className="w-24 h-24 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mb-6 shadow-lg">
                    {step.number}
                  </div>

                  {/* Step Content */}
                  <div className="text-center max-w-xs">
                    <div className="text-blue-600 mb-3 flex justify-center">
                      {step.icon}
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {step.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Mobile & Tablet: Vertical Layout */}
          <div className="lg:hidden">
            <div className="relative">
              {steps.map((step, index) => (
                <div key={index} className="flex items-start mb-12 last:mb-0">
                  {/* Step Circle */}
                  <div className="flex-shrink-0 w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl font-bold shadow-lg mr-6">
                    {step.number}
                  </div>

                  {/* Step Content */}
                  <div className="flex-1 pt-2">
                    <div className="text-blue-600 mb-3 flex">
                      {step.icon}
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {step.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {step.description}
                    </p>
                  </div>

                  {/* Connecting Line (vertical) */}
                  {index < steps.length - 1 && (
                    <div className="absolute left-8 top-20 w-1 h-12 bg-blue-200"></div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <p className="text-lg text-gray-600 mb-6">
            Ready to get started?
          </p>
          <button
            onClick={() => window.location.href = '/login'}
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg font-semibold rounded-lg shadow-lg transform hover:scale-105 transition-all duration-300 ease-in-out"
          >
            Start Your Free Trial
          </button>
        </div>
      </div>
    </section>
  );
}