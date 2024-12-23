import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider2 } from '@/components/ui/slider2';
import { generateChangeRequestPDF } from '@/app/utils/pdfGenerator';

interface ChangeRequestFormData {
  title: string;
  description: string;
  reason: string;
  priority: string;
  importance: string;
  milestone: string[];
  deliverableImpact: string;
  // REMOVED noResponseImpact
  tasksAffected: string[];
  costEvaluation: string;       // "API Cost", "Developer Cost", or "Other"
  costEvaluationOther: string;  // Additional text if "Other" is selected
  deadlineImpact: number;
  alternatives: string;
  finalComments: string;
}

const initialFormState: ChangeRequestFormData = {
  title: '',
  description: '',
  reason: '',
  priority: '',
  importance: '',
  milestone: [],
  deliverableImpact: '',
  // REMOVED noResponseImpact
  tasksAffected: [],
  costEvaluation: '',
  costEvaluationOther: '',
  deadlineImpact: 1,
  alternatives: '',
  finalComments: ''
};

const ChangeRequestForm = () => {
  const [formData, setFormData] = useState<ChangeRequestFormData>(initialFormState);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Milestones including '1', '2', '3', '4'
  const milestoneOptions = ['1', '2', '3', '4'];
  const priorityOptions = ['High', 'Medium', 'Low'];
  const importanceOptions = ['Critical', 'Important', 'Nice to Have'];

  // The tasks in the order you requested
  const taskOptions = [
    {
      id: 'onboardingGeneral',
      name: 'Onboarding - General Information',
      date: 'Dec 1 - Dec 3, 2024',
      duration: '3 days'
    },
    {
      id: 'onboardingPersonal',
      name: 'Onboarding - Personalisation',
      date: 'Dec 4 - Dec 8, 2024',
      duration: '5 days'
    },
    {
      id: 'landing',
      name: 'Landing Page Development',
      date: 'Dec 9 - Dec 13, 2024',
      duration: '5 days'
    },
    {
      id: 'dashboard',
      name: 'User Dashboard Development',
      date: 'Dec 20 - Dec 26, 2024',
      duration: '~1 week'
    },
    {
      id: 'learning25',
      name: '25% Learning Path Implementation',
      date: 'Dec 27 - Jan 2, 2025',
      duration: '~1 week'
    },
    {
      id: 'learning75',
      name: 'Remaining 75% Learning Path Completion',
      date: 'Jan 3 - Jan 9, 2025',
      duration: '~1 week'
    },
    {
      id: 'hrAdmin',
      name: 'HR & Admin Dashboards Development',
      date: 'Jan 10 - Jan 23, 2025',
      duration: '~2 weeks'
    },
    {
      id: 'testing',
      name: 'Final Testing & Contingency',
      date: 'Jan 24 - Feb 1, 2025',
      duration: '~1 week'
    }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsSubmitting(true);
      await generateChangeRequestPDF(formData, taskOptions);
      console.log('PDF generated successfully');
    } catch (error) {
      console.error('Error generating PDF:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleReset = () => {
    setFormData(initialFormState);
  };

  const handleSliderChange = (value: number[]) => {
    setFormData(prev => ({ ...prev, deadlineImpact: value[0] }));
  };

  const handleTaskToggle = (taskId: string) => {
    setFormData(prev => {
      const isSelected = prev.tasksAffected.includes(taskId);
      return {
        ...prev,
        tasksAffected: isSelected
          ? prev.tasksAffected.filter(id => id !== taskId)
          : [...prev.tasksAffected, taskId]
      };
    });
  };

  const handleMilestoneToggle = (mile: string) => {
    setFormData(prev => {
      const isSelected = prev.milestone.includes(mile);
      return {
        ...prev,
        milestone: isSelected
          ? prev.milestone.filter(m => m !== mile)
          : [...prev.milestone, mile]
      };
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <Card className="w-full shadow-lg">
        <CardHeader className="bg-blue-600 text-white rounded-t-lg">
          <CardTitle className="text-2xl font-bold">Change Request Form</CardTitle>
        </CardHeader>

        <CardContent className="p-6">
          <form onSubmit={handleSubmit} className="space-y-8">
            
            {/* ===== CHANGE DESCRIPTION SECTION ===== */}
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-gray-900 border-b pb-2">
                Change Description
              </h3>

              {/* 1. Change Title */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Changes Title
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg 
                             focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter the title of your change request"
                />
              </div>

              {/* 2. Description of Change */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description of Change
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg 
                             focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  rows={4}
                />
              </div>

              {/* 3. Reason for Change */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Reason for Change
                </label>
                <textarea
                  name="reason"
                  value={formData.reason}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg 
                             focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  rows={3}
                />
              </div>

              {/* 4. Priority (Development Urgency) */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Priority (Development Urgency)
                  <span className="text-sm text-gray-500 ml-2">
                    How urgent is it to develop this change?
                  </span>
                </label>
                <div className="flex gap-6">
                  {priorityOptions.map((option) => (
                    <label key={option} className="flex items-center">
                      <input
                        type="radio"
                        name="priority"
                        value={option}
                        checked={formData.priority === option}
                        onChange={handleChange}
                        className="sr-only"
                      />
                      <div
                        className={`px-4 py-2 rounded-lg cursor-pointer transition-all ${
                          formData.priority === option
                            ? 'bg-blue-600 text-white font-bold underline'
                            : 'bg-gray-100 hover:bg-gray-200'
                        }`}
                      >
                        {option}
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* 5. Importance */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Importance
                  <span className="text-sm text-gray-500 ml-2">
                    How important is this change for the project?
                  </span>
                </label>
                <div className="flex gap-6">
                  {importanceOptions.map((option) => (
                    <label key={option} className="flex items-center">
                      <input
                        type="radio"
                        name="importance"
                        value={option}
                        checked={formData.importance === option}
                        onChange={handleChange}
                        className="sr-only"
                      />
                      <div
                        className={`px-4 py-2 rounded-lg cursor-pointer transition-all ${
                          formData.importance === option
                            ? 'bg-blue-600 text-white font-bold underline'
                            : 'bg-gray-100 hover:bg-gray-200'
                        }`}
                      >
                        {option}
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* 6. Milestone Needed */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Milestone Needed
                </label>
                <div className="flex gap-6">
                  {milestoneOptions.map((option) => {
                    const isSelected = formData.milestone.includes(option);
                    return (
                      <label key={option} className="flex items-center">
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => handleMilestoneToggle(option)}
                          className="sr-only"
                        />
                        <div
                          className={`px-4 py-2 rounded-lg cursor-pointer transition-all ${
                            isSelected
                              ? 'bg-blue-600 text-white font-bold'
                              : 'bg-gray-100 hover:bg-gray-200'
                          }`}
                        >
                          Milestone {option}
                        </div>
                      </label>
                    );
                  })}
                </div>
              </div>
            </div>
            {/* ===== END OF FIRST SECTION ===== */}

            {/* ===== REMAINING SECTION ===== */}
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-gray-900 border-b pb-2">
                Change Impact
              </h3>

              {/* Impact on Deliverables */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Impact on Deliverables
                </label>
                <textarea
                  name="deliverableImpact"
                  value={formData.deliverableImpact}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg 
                             focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  rows={3}
                />
              </div>

              {/* REMOVED: Impact of Not Responding to Change (and Reason Why) */}

              {/* Tasks/Scope Affected */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-4">
                  Tasks/Scope Affected
                </label>
                <div className="grid gap-4">
                  {taskOptions.map((task) => {
                    const isSelected = formData.tasksAffected.includes(task.id);
                    return (
                      <label
                        key={task.id}
                        className={`relative flex items-center p-4 rounded-lg border cursor-pointer transition-all ${
                          isSelected
                            ? 'border-blue-600 bg-blue-50'
                            : 'border-gray-200 hover:border-blue-400'
                        }`}
                      >
                        <input
                          type="checkbox"
                          name="tasksAffected"
                          value={task.id}
                          checked={isSelected}
                          onChange={() => handleTaskToggle(task.id)}
                          className="sr-only"
                        />
                        <div className="flex flex-col md:flex-row md:items-center w-full">
                          <div className="flex-1">
                            <h4 className="font-medium text-gray-900">{task.name}</h4>
                            <p className="text-sm text-gray-500">{task.date}</p>
                          </div>
                          <div className="mt-2 md:mt-0 md:ml-4">
                            <span className="inline-block px-3 py-1 text-sm font-medium text-gray-600 bg-gray-100 rounded-full">
                              {task.duration}
                            </span>
                          </div>
                        </div>
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* Cost Evaluation (API Cost, Developer Cost, or Other) */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Cost Evaluation
                </label>
                <div className="flex gap-6">
                  {['API Cost', 'Developer Cost', 'Other'].map((option) => (
                    <label key={option} className="flex items-center">
                      <input
                        type="radio"
                        name="costEvaluation"
                        value={option}
                        checked={formData.costEvaluation === option}
                        onChange={handleChange}
                        className="sr-only"
                      />
                      <div
                        className={`px-4 py-2 rounded-lg cursor-pointer transition-all ${
                          formData.costEvaluation === option
                            ? 'bg-blue-600 text-white font-bold underline'
                            : 'bg-gray-100 hover:bg-gray-200'
                        }`}
                      >
                        {option}
                      </div>
                    </label>
                  ))}
                </div>

                {formData.costEvaluation === 'Other' && (
                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Please specify other cost details
                    </label>
                    <textarea
                      name="costEvaluationOther"
                      value={formData.costEvaluationOther}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg 
                                 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      rows={3}
                    />
                  </div>
                )}
              </div>

              {/* Impact on Deadline */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-4">
                  Impact on Deadline
                  <span className="text-sm text-gray-500 ml-2">
                    How many days will this change add to the timeline?
                  </span>
                </label>
                <div className="space-y-4">
                  <div className="w-full px-4">
                    <Slider2
                      value={[formData.deadlineImpact]}
                      onValueChange={handleSliderChange}
                      min={1}
                      max={14}
                      step={1}
                      className="w-full"
                    />
                  </div>
                  <div className="flex justify-between text-sm text-gray-600 px-4">
                    <span>1 day</span>
                    <span className="font-medium text-blue-600">
                      {formData.deadlineImpact}{' '}
                      {formData.deadlineImpact === 1 ? 'day' : 'days'}
                    </span>
                    <span>14 days</span>
                  </div>
                </div>
              </div>

              {/* Alternatives */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Alternatives and Recommendations
                </label>
                <textarea
                  name="alternatives"
                  value={formData.alternatives}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg 
                             focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  rows={4}
                />
              </div>

              {/* Final Comments */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Final Comments
                </label>
                <textarea
                  name="finalComments"
                  value={formData.finalComments}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg 
                             focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  rows={3}
                />
              </div>
            </div>

            {/* Form Actions */}
            <div className="flex justify-end space-x-4 pt-6 border-t">
              <Button
                type="button"
                variant="outline"
                className="px-6 py-2 text-gray-700 hover:bg-gray-100"
                onClick={handleReset}
                disabled={isSubmitting}
              >
                Reset Form
              </Button>
              <Button
                type="submit"
                className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Generating PDF...</span>
                  </div>
                ) : (
                  'Submit Change Request'
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ChangeRequestForm;
