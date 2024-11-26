"use client";

// ExamDashboard.tsx
import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Play, Pause, Building2, UserCircle, Check, X } from 'lucide-react';
import * as Dialog from '@radix-ui/react-dialog';
import { Button } from '@/components/ui/button';

// Mock data structure
const mockData = {
  companies: [
    {
      id: 1,
      name: "TechCorp Solutions",
      users: [
        {
          id: 101,
          name: "Sarah Chen",
          jobRole: "Senior Software Engineer",
          sections: {
            section1: {
              questions: [
                "Describe your approach to code architecture.",
                "How do you handle technical debt?"
              ],
              audioUrls: ["/audio1-1.mp3", "/audio1-2.mp3"]
            },
            section2: {
              questions: [
                "Explain your team collaboration process.",
                "How do you mentor junior developers?"
              ],
              audioUrls: ["/audio2-1.mp3", "/audio2-2.mp3"]
            },
            section3: {
              questions: [
                "Describe a challenging project you led.",
                "How do you stay updated with technology trends?"
              ],
              audioUrls: ["/audio3-1.mp3", "/audio3-2.mp3"]
            }
          }
        },
        {
          id: 102,
          name: "James Wilson",
          jobRole: "Product Manager",
          sections: {
            section1: {
              questions: [
                "How do you prioritize feature requests?",
                "Describe your product planning process."
              ],
              audioUrls: ["/audio1-1.mp3", "/audio1-2.mp3"]
            },
            section2: {
              questions: [
                "How do you gather user feedback?",
                "Explain your approach to A/B testing."
              ],
              audioUrls: ["/audio2-1.mp3", "/audio2-2.mp3"]
            },
            section3: {
              questions: [
                "Describe a failed product launch and lessons learned.",
                "How do you manage stakeholder expectations?"
              ],
              audioUrls: ["/audio3-1.mp3", "/audio3-2.mp3"]
            }
          }
        }
      ]
    },
    {
      id: 2,
      name: "MediCare Innovations",
      users: [
        {
          id: 201,
          name: "Emily Roberts",
          jobRole: "Clinical Research Manager",
          sections: {
            section1: {
              questions: [
                "How do you ensure compliance in clinical trials?",
                "Describe your data collection methodology."
              ],
              audioUrls: ["/audio1-1.mp3", "/audio1-2.mp3"]
            },
            section2: {
              questions: [
                "How do you manage research team coordination?",
                "Explain your protocol development process."
              ],
              audioUrls: ["/audio2-1.mp3", "/audio2-2.mp3"]
            },
            section3: {
              questions: [
                "Describe a challenging research project.",
                "How do you handle adverse events?"
              ],
              audioUrls: ["/audio3-1.mp3", "/audio3-2.mp3"]
            }
          }
        }
      ]
    }
  ]
};

const ExamDashboard = () => {
  const [expandedCompany, setExpandedCompany] = useState<number | null>(null);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [scores, setScores] = useState<{[key: number]: {[key: string]: number}}>({});
  const [savedUsers, setSavedUsers] = useState<Set<number>>(new Set());
  const [audioStates, setAudioStates] = useState<{[key: string]: boolean}>({});
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleScoreChange = (userId: number, category: string, value: number) => {
    setScores(prev => ({
      ...prev,
      [userId]: {
        ...(prev[userId] || {}),
        [category]: value
      }
    }));
  };

  const handleAudioToggle = (audioUrl: string) => {
    setAudioStates(prev => ({
      ...prev,
      [audioUrl]: !prev[audioUrl]
    }));
  };

  const handleSaveUser = (userId: number) => {
    const userScores = scores[userId];
    const categories = [
      'Overall Proficiency',
      'Industry Standard for Role',
      'Range of Language Resources',
      'Accuracy',
      'Discourse Management',
      'Pronunciation',
      'Interactive Communication'
    ];
    
    const isComplete = categories.every(category => 
      userScores && userScores[category] !== undefined
    );

    if (isComplete) {
      setSavedUsers(prev => new Set(prev).add(userId));
      setIsModalOpen(false);
    } else {
      alert('Please complete all evaluation criteria before saving.');
    }
  };

  const isAllUsersScored = () => {
    const totalUsers = mockData.companies.reduce(
      (sum, company) => sum + company.users.length, 
      0
    );
    return savedUsers.size === totalUsers;
  };

  const handleFinalSubmit = () => {
    console.log('Submitting all evaluations:', scores);
    // API call to submit all results
  };

  const EvaluationModal = () => (
    <Dialog.Root open={isModalOpen} onOpenChange={setIsModalOpen}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50 z-50" />
        <Dialog.Content className="fixed left-[50%] top-[50%] z-50 translate-x-[-50%] translate-y-[-50%] bg-white rounded-xl shadow-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <Dialog.Title className="text-xl font-semibold">
                Evaluate {selectedUser?.name}
              </Dialog.Title>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsModalOpen(false)}
                className="rounded-full hover:bg-gray-100"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>

            {selectedUser && (
              <div className="space-y-6">
                {/* Sections */}
                {Object.entries(selectedUser.sections).map(([sectionKey, section]: [string, any], idx) => (
                  <div key={sectionKey} className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900">
                      Section {idx + 1}
                    </h3>
                    
                    {section.questions.map((question: string, qIdx: number) => (
                      <div key={qIdx} className="pl-4 border-l-2 border-blue-200 space-y-2">
                        <p className="text-gray-700">{question}</p>
                        <button
                          onClick={() => handleAudioToggle(section.audioUrls[qIdx])}
                          className="flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-colors duration-200"
                        >
                          {audioStates[section.audioUrls[qIdx]] ? (
                            <Pause className="h-4 w-4" />
                          ) : (
                            <Play className="h-4 w-4" />
                          )}
                          <span className="text-sm">
                            {audioStates[section.audioUrls[qIdx]] ? 'Pause Recording' : 'Play Recording'}
                          </span>
                        </button>
                      </div>
                    ))}
                  </div>
                ))}

                {/* Scoring Section */}
                <div className="bg-gray-50 p-6 rounded-xl space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900">Evaluation Criteria</h3>
                  
                  {[
                    'Overall Proficiency',
                    'Industry Standard for Role',
                    'Range of Language Resources',
                    'Accuracy',
                    'Discourse Management',
                    'Pronunciation',
                    'Interactive Communication'
                  ].map((category) => (
                    <div key={category} className="grid grid-cols-2 gap-4 items-center">
                      <label className="text-sm text-gray-700">{category}</label>
                      <select
                        className="form-select rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500 bg-white"
                        value={scores[selectedUser.id]?.[category] || ''}
                        onChange={(e) => handleScoreChange(selectedUser.id, category, Number(e.target.value))}
                      >
                        <option value="">Select score</option>
                        {[0, 1, 2, 3, 4, 5].map((score) => (
                          <option key={score} value={score}>{score}+</option>
                        ))}
                      </select>
                    </div>
                  ))}

                  <button
                    onClick={() => handleSaveUser(selectedUser.id)}
                    className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200"
                  >
                    Save Evaluation
                  </button>
                </div>
              </div>
            )}
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Exam Marking Dashboard</h1>
      
      {/* Companies List */}
      <div className="space-y-4">
        {mockData.companies.map(company => (
          <div 
            key={company.id} 
            className="border rounded-lg shadow-sm overflow-hidden bg-white"
          >
            {/* Company Header */}
            <div
              className="p-4 cursor-pointer hover:bg-gray-50 transition-colors duration-200 flex items-center justify-between"
              onClick={() => setExpandedCompany(expandedCompany === company.id ? null : company.id)}
            >
              <div className="flex items-center gap-3">
                <Building2 className="h-5 w-5 text-blue-600" />
                <h2 className="text-lg font-semibold text-gray-900">{company.name}</h2>
              </div>
              {expandedCompany === company.id ? (
                <ChevronUp className="h-5 w-5 text-gray-400" />
              ) : (
                <ChevronDown className="h-5 w-5 text-gray-400" />
              )}
            </div>

            {/* Users List */}
            {expandedCompany === company.id && (
              <div className="border-t border-gray-200">
                {company.users.map(user => (
                  <div
                    key={user.id}
                    className={`p-4 border-b last:border-b-0 cursor-pointer transition-all duration-200 ${
                      savedUsers.has(user.id) 
                        ? 'bg-green-50 hover:bg-green-100' 
                        : 'hover:bg-gray-50'
                    }`}
                    onClick={() => {
                      setSelectedUser(user);
                      setIsModalOpen(true);
                    }}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <UserCircle className="h-5 w-5 text-gray-400" />
                        <div>
                          <h3 className="font-medium text-gray-900">{user.name}</h3>
                          <p className="text-sm text-gray-600">{user.jobRole}</p>
                        </div>
                      </div>
                      {savedUsers.has(user.id) ? (
                        <Check className="h-5 w-5 text-green-600" />
                      ) : (
                        <ChevronDown className="h-5 w-5 text-gray-400" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Evaluation Modal */}
      <EvaluationModal />

      {/* Submit All Button */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t">
        <div className="max-w-4xl mx-auto">
          <button
            onClick={handleFinalSubmit}
            disabled={!isAllUsersScored()}
            className={`w-full py-3 px-4 rounded-lg font-semibold transition-colors duration-200 ${
              isAllUsersScored()
                ? 'bg-blue-600 hover:bg-blue-700 text-white'
                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
            }`}
          >
            Submit All Evaluations
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExamDashboard;