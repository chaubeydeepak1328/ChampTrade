import React from 'react';
import { Check } from 'lucide-react';

const StepIndicator = ({ currentStep, totalSteps, stepLabels }) => {
    return (
        <div className="mb-8 w-full">
            <div className="flex flex-wrap sm:flex-nowrap items-center justify-center sm:justify-between gap-y-6">
                {stepLabels.map((label, index) => {
                    const stepNumber = index + 1;
                    const isCompleted = stepNumber < currentStep;
                    const isCurrent = stepNumber === currentStep;

                    return (
                        <div key={stepNumber} className="flex items-center">
                            <div className="flex flex-col items-center text-center min-w-[60px]">
                                <div
                                    className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm transition-all ${isCompleted
                                            ? 'bg-yellow-500 text-black'
                                            : isCurrent
                                                ? 'bg-yellow-500 text-black'
                                                : 'bg-gray-700 text-gray-400'
                                        }`}
                                >
                                    {isCompleted ? <Check size={16} /> : stepNumber}
                                </div>
                                <span
                                    className={`mt-2 text-xs font-medium ${isCompleted || isCurrent
                                            ? 'text-yellow-500'
                                            : 'text-gray-400'
                                        }`}
                                >
                                    {label}
                                </span>
                            </div>

                            {/* Connector line (hidden on last step and small screens) */}
                            {index < totalSteps - 1 && (
                                <div
                                    className={`hidden sm:block w-16 h-0.5 mx-4 transition-colors ${isCompleted ? 'bg-yellow-500' : 'bg-gray-700'
                                        }`}
                                />
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default StepIndicator;
