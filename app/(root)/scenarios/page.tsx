"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import DashboardLayout from '@/components/layouts/DashboardLayout';
import { Button } from '@/components/ui/button';
import { BookOpen, Lock, Trophy, ChevronRight, AlertCircle, Trash2 } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Card, CardContent } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';

const PerformancePage = () => {
  const router = useRouter();
  const [scenarioToDelete, setScenarioToDelete] = useState<number | null>(null);
  
  // Sample scenarios
  const [scenarios, setScenarios] = useState([
    { 
      id: 1, 
      title: 'Scenario 1', 
      locked: false,
      completed: true,
      score: 85
    },
    { 
      id: 2, 
      title: 'Scenario 2', 
      locked: true,
      completed: false,
      score: null
    },
    { 
      id: 3, 
      title: 'Scenario 3', 
      locked: true,
      completed: false,
      score: null
    },
    { 
      id: 4, 
      title: 'Scenario 4', 
      locked: true,
      completed: false,
      score: null
    },
  ]);

  const averageScore = 78;
  const benchmarkScore = 80;
  const remainingScenarios = scenarios.filter(s => !s.completed).length;

  const handleStart = (scenarioTitle: string, locked: boolean) => {
    if (locked) return;
    const slug = scenarioTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    router.push(`/learning-path-lesson-details/${slug}`);
  };

  const handleAddScenario = () => {
    const newId = scenarios.length + 1;
    setScenarios((prev) => [
      ...prev,
      { 
        id: newId, 
        title: `Scenario ${newId}`, 
        locked: true,
        completed: false,
        score: null
      }
    ]);
  };

  const handleDeleteScenario = (id: number) => {
    setScenarioToDelete(id);
  };

  const confirmDelete = () => {
    if (scenarioToDelete === null) return;

    // Prevent deletion if only 3 scenarios remain
    if (scenarios.length <= 3) {
      alert("You must keep at least 3 scenarios.");
      setScenarioToDelete(null);
      return;
    }

    setScenarios((prev) => {
      const filtered = prev.filter(scenario => scenario.id !== scenarioToDelete);
      // Reorder the remaining scenarios
      return filtered.map((scenario, index) => ({
        ...scenario,
        id: index + 1,
        title: `Scenario ${index + 1}`
      }));
    });

    setScenarioToDelete(null);
  };

  return (
    <DashboardLayout>
      <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 py-8 space-y-8">

        {/* Header + Score Card */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 tracking-tight">
              Business Communication
            </h1>
            <p className="mt-2 text-gray-600">
              Master professional communication in various business contexts
            </p>
          </div>
          
          <Card className="bg-blue-50 border-blue-100">
            <CardContent className="flex items-center gap-3 p-4">
              <Trophy className="h-5 w-5 text-blue-600" />
              <div>
                <p className="text-sm font-medium text-blue-900">
                  {remainingScenarios} scenarios remaining
                </p>
                <p className="text-xs text-blue-700">
                  Complete to unlock certificate
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Alert about requirements */}
        <Alert className="bg-amber-50 border-amber-200">
          <AlertCircle className="h-4 w-4 text-amber-600" />
          <AlertDescription className="text-amber-700">
            Complete a minimum of 3 lessons with an average grade above 80% to pass
          </AlertDescription>
        </Alert>

        {/* Performance overview */}
        <div className="bg-white rounded-xl shadow-sm p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-gray-800">Performance Overview</h2>
              <p className="text-sm text-gray-600 mt-1">Track your progress towards completion</p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-gray-900">{averageScore}%</div>
              <p className="text-sm text-gray-600">Current Score</p>
            </div>
          </div>

          <div className="space-y-2">
            <div className="relative h-4 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="absolute left-0 top-0 h-full bg-gradient-to-r from-blue-500 to-blue-600 transition-all duration-500 ease-out"
                style={{ width: `${averageScore}%` }}
              />
              <div
                className="absolute top-0 h-full w-0.5 bg-gray-900 transition-all duration-300"
                style={{ left: `${benchmarkScore}%` }}
              >
                <span className="absolute left-2 top-6 text-xs font-medium text-gray-700 whitespace-nowrap">
                  {benchmarkScore}% Benchmark
                </span>
              </div>
            </div>
            
            {averageScore < benchmarkScore && (
              <p className="text-sm text-amber-600">
                You need {(benchmarkScore - averageScore).toFixed(1)}% more to reach the benchmark
              </p>
            )}
          </div>
        </div>

        {/* Practice Scenarios */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-semibold text-gray-800">Practice Scenarios</h2>
              <p className="text-sm text-gray-600 mt-1">
                Complete scenarios to improve your skills
              </p>
            </div>
            <Button
              onClick={handleAddScenario}
              className="bg-gray-50 text-gray-700 hover:bg-gray-100 transition-all duration-200"
            >
              Add Scenario
            </Button>
          </div>
          
          <div className="space-y-4">
            {scenarios.map((scenario) => (
              <div
                key={scenario.id}
                className="group relative flex flex-col sm:flex-row sm:items-center justify-between border rounded-xl p-4 transition-all duration-200 hover:border-blue-200 hover:shadow-md bg-white"
              >
                {/* Left side: Icon + Title */}
                <div className="flex items-center gap-4">
                  <div
                    className={`p-3 rounded-lg 
                      ${
                        scenario.locked
                          ? 'bg-gray-100'
                          : scenario.completed
                          ? 'bg-green-50'
                          : 'bg-blue-50'
                      }
                    `}
                  >
                    {scenario.locked ? (
                      <Lock className="h-5 w-5 text-gray-500" />
                    ) : scenario.completed ? (
                      <Trophy className="h-5 w-5 text-green-600" />
                    ) : (
                      <BookOpen className="h-5 w-5 text-blue-600" />
                    )}
                  </div>
                  
                  <div>
                    <div className="flex items-center gap-3">
                      <h3 className="text-lg font-semibold text-gray-800">
                        {scenario.title}
                      </h3>
                      {scenario.score !== null && (
                        <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-50 text-green-700">
                          {scenario.score}%
                        </span>
                      )}
                    </div>
                    
                    {scenario.locked && (
                      <span className="text-sm text-gray-500 flex items-center gap-1">
                        <Lock className="h-3 w-3" />
                        Complete previous scenario to unlock
                      </span>
                    )}
                  </div>
                </div>

                {/* Right side: Start/Review + Delete buttons */}
                <div className="mt-4 sm:mt-0 flex items-center gap-2">
                  {scenario.completed ? (
                    // Completed scenario => "Review" button
                    <Button
                      variant="outline"
                      className="w-full sm:w-auto border-green-200 text-green-700 hover:bg-green-50"
                      onClick={() => handleStart(scenario.title, false)}
                    >
                      Review
                    </Button>
                  ) : (
                    // Not completed => "Start" button (disabled if locked)
                    <Button
                      className={`
                        w-full sm:w-auto
                        ${scenario.locked
                          ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                          : 'bg-blue-600 hover:bg-blue-700 text-white'
                        }
                        transition-all duration-200
                      `}
                      onClick={() => handleStart(scenario.title, scenario.locked)}
                      disabled={scenario.locked}
                    >
                      Start
                      <ChevronRight className="h-4 w-4 ml-1" />
                    </Button>
                  )}

                  {/* Delete button (now always enabled, even for locked scenarios) */}
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDeleteScenario(scenario.id)}
                    className="text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-full p-2"
                  >
                    <Trash2 className="h-4 w-4" />
                    <span className="sr-only">Delete scenario</span>
                  </Button>
                </div>

                {/* Hover effect overlay */}
                <div className="absolute inset-0 rounded-xl transition-opacity duration-200 pointer-events-none">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 to-blue-500/5 opacity-0 group-hover:opacity-100 rounded-xl" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Delete Confirmation Dialog */}
        <AlertDialog
          open={scenarioToDelete !== null}
          onOpenChange={() => setScenarioToDelete(null)}
        >
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle className="flex items-center gap-2">
                <Trash2 className="h-5 w-5 text-red-600" />
                Confirm Deletion
              </AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to remove this scenario? This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel className="border-gray-200">
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction
                onClick={confirmDelete}
                className="bg-red-600 text-white hover:bg-red-700"
              >
                Delete Scenario
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </DashboardLayout>
  );
};

export default PerformancePage;
