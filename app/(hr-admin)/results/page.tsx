"use client";

import React, { useState } from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { InfoIcon, Download, ArrowUpDown } from 'lucide-react';
import { Employee, ProficiencyLevel, proficiencyMapping, mockEmployeeData } from '@/app/data/results';

type SortConfig = {
  key: keyof Employee | null;
  direction: 'asc' | 'desc';
};

const HRDashboard = () => {
  const [sortConfig, setSortConfig] = useState<SortConfig>({ key: null, direction: 'asc' });
  const [employees, setEmployees] = useState<Employee[]>(mockEmployeeData);

  const sortData = (key: keyof Employee) => {
    setSortConfig((currentConfig) => {
      const newDirection = 
        currentConfig.key === key && currentConfig.direction === 'asc' ? 'desc' : 'asc';
      
      const sortedEmployees = [...employees].sort((a, b) => {
        if (a[key] < b[key]) return newDirection === 'asc' ? -1 : 1;
        if (a[key] > b[key]) return newDirection === 'asc' ? 1 : -1;
        return 0;
      });

      setEmployees(sortedEmployees);
      return { key, direction: newDirection };
    });
  };

  const exportToCSV = () => {
    const exportData = employees.map(employee => (
      `${employee.name},${employee.role},${employee.proficiency},${proficiencyMapping[employee.proficiency].ielts},${proficiencyMapping[employee.proficiency].cefr},${employee.industryStandard},${Object.keys(proficiencyMapping).indexOf(employee.proficiency) >= Object.keys(proficiencyMapping).indexOf(employee.industryStandard) ? 'Meets Standard' : 'Below Standard'}`
    )).join('\n');

    const headers = 'Name,Role,Proficiency,IELTS Equivalent,CEFR Level,Industry Standard,Status\n';
    const csvContent = `${headers}${exportData}`;
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    
    link.setAttribute('href', url);
    link.setAttribute('download', 'language_proficiency_report.csv');
    link.style.visibility = 'hidden';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const calculateCohortAverage = () => {
    const proficiencyToNumber = (prof: string) => {
      const baseLevel = parseInt(prof[0]);
      const modifier = prof[1];
      let adjustment = 0;
      if (modifier === '+') adjustment = 0.3;
      if (modifier === '-') adjustment = -0.3;
      return baseLevel + adjustment;
    };

    const sum = employees.reduce((acc, emp) => acc + proficiencyToNumber(emp.proficiency), 0);
    const average = sum / employees.length;
    
    const baseLevel = Math.floor(average);
    const decimal = average - baseLevel;
    
    let modifier = '=';
    if (decimal >= 0.3) modifier = '+';
    if (decimal <= -0.3) modifier = '-';
    
    return `${baseLevel}${modifier}`;
  };

  const cohortAverage = calculateCohortAverage();

  const ComparisonTable = () => (
    <div className="overflow-x-auto">
      <Table className="border rounded-lg">
        <TableHeader>
          <TableRow className="bg-blue-50 hover:bg-blue-50">
            <TableHead className="font-bold text-center border-r whitespace-nowrap px-6 py-3">CEF</TableHead>
            <TableHead className="font-bold text-center border-r whitespace-nowrap px-6 py-3">ALTE</TableHead>
            <TableHead className="font-bold text-center border-r whitespace-nowrap px-6 py-3">BULATS</TableHead>
            <TableHead className="font-bold text-center border-r whitespace-nowrap px-6 py-3">IELTS</TableHead>
            <TableHead className="font-bold text-center border-r whitespace-nowrap px-6 py-3">TOEFL</TableHead>
            <TableHead className="font-bold text-center whitespace-nowrap px-6 py-3">TOEIC</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow className="hover:bg-gray-50">
            <TableCell className="font-semibold text-center border-r">C2</TableCell>
            <TableCell className="text-center border-r">Very Advanced</TableCell>
            <TableCell className="text-center border-r whitespace-nowrap">
              5+<br/>5=<br/>5-
            </TableCell>
            <TableCell className="text-center border-r whitespace-nowrap">
              9.0<br/>9.0<br/>8.5
            </TableCell>
            <TableCell className="text-center border-r"></TableCell>
            <TableCell className="text-center"></TableCell>
          </TableRow>
          <TableRow className="hover:bg-gray-50">
            <TableCell className="font-semibold text-center border-r">C1</TableCell>
            <TableCell className="text-center border-r">Advanced</TableCell>
            <TableCell className="text-center border-r whitespace-nowrap">
              4+<br/>4=<br/>4-
            </TableCell>
            <TableCell className="text-center border-r whitespace-nowrap">
              8.0<br/>7.5<br/>7.0
            </TableCell>
            <TableCell className="text-center border-r">110 - 120</TableCell>
            <TableCell className="text-center">490 - 495 (listening)</TableCell>
          </TableRow>
          <TableRow className="hover:bg-gray-50">
            <TableCell className="font-semibold text-center border-r">B2</TableCell>
            <TableCell className="text-center border-r">Upper-Intermediate</TableCell>
            <TableCell className="text-center border-r whitespace-nowrap">
              3+<br/>3=<br/>3-
            </TableCell>
            <TableCell className="text-center border-r whitespace-nowrap">
              6.5<br/>6.0<br/>5.5
            </TableCell>
            <TableCell className="text-center border-r">87 - 109</TableCell>
            <TableCell className="text-center whitespace-nowrap">
              400 - 485 (listening)<br/>
              385 - 495 (reading)
            </TableCell>
          </TableRow>
          <TableRow className="hover:bg-gray-50">
            <TableCell className="font-semibold text-center border-r">B1</TableCell>
            <TableCell className="text-center border-r">Lower-Intermediate</TableCell>
            <TableCell className="text-center border-r whitespace-nowrap">
              2+<br/>2=<br/>2-
            </TableCell>
            <TableCell className="text-center border-r whitespace-nowrap">
              5.0<br/>4.5<br/>4.0
            </TableCell>
            <TableCell className="text-center border-r">57 - 86</TableCell>
            <TableCell className="text-center whitespace-nowrap">
              275 - 395 (listening)<br/>
              275 - 380 (reading)
            </TableCell>
          </TableRow>
          <TableRow className="hover:bg-gray-50">
            <TableCell className="font-semibold text-center border-r">A2</TableCell>
            <TableCell className="text-center border-r">Elementary</TableCell>
            <TableCell className="text-center border-r whitespace-nowrap">
              1+<br/>1=<br/>1-
            </TableCell>
            <TableCell className="text-center border-r"></TableCell>
            <TableCell className="text-center border-r"></TableCell>
            <TableCell className="text-center whitespace-nowrap">
              110 - 270 (listening)<br/>
              115 - 270 (reading)
            </TableCell>
          </TableRow>
          <TableRow className="hover:bg-gray-50">
            <TableCell className="font-semibold text-center border-r">A1</TableCell>
            <TableCell className="text-center border-r">Beginner</TableCell>
            <TableCell className="text-center border-r">0</TableCell>
            <TableCell className="text-center border-r"></TableCell>
            <TableCell className="text-center border-r"></TableCell>
            <TableCell className="text-center whitespace-nowrap">
              60 - 105 (listening)<br/>
              60 - 110 (reading)
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
  
      <div className="mt-4 text-sm text-gray-500">
        <p>CEF = The Council of Europe Framework</p>
        <p>ALTE = The Association of Language Testers in Europe</p>
      </div>
    </div>
  );

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8 bg-gray-50">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Staff Language Proficiency Overview</h1>
          <p className="text-gray-600 mt-2">Language assessment results and industry comparisons</p>
        </div>
        
        <div className="flex items-start gap-4">
          <Card className="w-64 bg-white shadow-md hover:shadow-lg transition-shadow">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium text-gray-700 flex items-center">
                Cohort Average
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <InfoIcon className="h-4 w-4 ml-2 text-gray-400" />
                    </TooltipTrigger>
                    <TooltipContent 
                      className="p-4 bg-white border border-gray-200 shadow-lg rounded-lg max-w-sm"
                      sideOffset={5}
                    >
                      <div className="bg-white">
                        <p className="text-gray-700">Average proficiency level across all staff members</p>
                        <div className="mt-2 space-y-1">
                          <p className="text-sm">
                            <span className="font-semibold text-gray-700">IELTS:</span>
                            <span className="text-gray-600"> {proficiencyMapping[cohortAverage].ielts}</span>
                          </p>
                          <p className="text-sm">
                            <span className="font-semibold text-gray-700">CEFR:</span>
                            <span className="text-gray-600"> {proficiencyMapping[cohortAverage].cefr}</span>
                          </p>
                        </div>
                      </div>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-blue-600">{cohortAverage}</div>
              <p className="text-sm text-gray-600 mt-1">
                {proficiencyMapping[cohortAverage].description}
              </p>
            </CardContent>
          </Card>
          
          <Button
            onClick={exportToCSV}
            className="bg-green-600 hover:bg-green-700 text-white"
          >
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      <Card className="bg-white shadow-md hover:shadow-lg transition-shadow">
        <CardHeader>
          <CardTitle>Staff Proficiency Comparison</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50 hover:bg-gray-50">
                  {[
                    { key: 'name', label: 'Name' },
                    { key: 'role', label: 'Role' },
                    { key: 'proficiency', label: 'Current Level' },
                    { key: 'industryStandard', label: 'Required Level' }
                  ].map((column) => (
                    <TableHead 
                      key={column.key}
                      className="font-semibold"
                      onClick={() => sortData(column.key as keyof Employee)}
                      style={{ cursor: 'pointer' }}
                    >
                      <div className="flex items-center">
                        {column.label}
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                      </div>
                    </TableHead>
                  ))}
                  <TableHead className="font-semibold">Equivalencies</TableHead>
                  <TableHead className="font-semibold">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {employees.map((employee) => (
                  <TableRow key={employee.id} className="hover:bg-gray-50">
                    <TableCell className="font-medium">{employee.name}</TableCell>
                    <TableCell>{employee.role}</TableCell>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <TableCell 
                            className={
                              Object.keys(proficiencyMapping).indexOf(employee.proficiency) >=
                              Object.keys(proficiencyMapping).indexOf(employee.industryStandard)
                                ? 'text-green-600 font-medium'
                                : 'text-red-600 font-medium'
                            }
                          >
                            {employee.proficiency}
                          </TableCell>
                        </TooltipTrigger>
                        <TooltipContent 
                          className="max-w-sm p-4 bg-white border border-gray-200 shadow-lg rounded-lg" 
                          sideOffset={5}
                        >
                          <div className="bg-white">
                            <h4 className="font-bold mb-2 text-gray-900">Level Details</h4>
                            <div className="space-y-2">
                              {Object.entries(proficiencyMapping[employee.proficiency].details).map(([key, value]) => (
                                <p key={key} className="text-sm">
                                  <span className="font-semibold capitalize text-gray-700">{key}:</span>
                                  <span className="text-gray-600"> {value}</span>
                                </p>
                              ))}
                            </div>
                          </div>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                    <TableCell>{employee.industryStandard}</TableCell>
                    <TableCell>
                      IELTS: {proficiencyMapping[employee.proficiency].ielts}<br />
                      CEFR: {proficiencyMapping[employee.proficiency].cefr}
                    </TableCell>
                    <TableCell>
                      <span 
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          Object.keys(proficiencyMapping).indexOf(employee.proficiency) >= 
                          Object.keys(proficiencyMapping).indexOf(employee.industryStandard)
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {Object.keys(proficiencyMapping).indexOf(employee.proficiency) >= 
                         Object.keys(proficiencyMapping).indexOf(employee.industryStandard)
                          ? 'Meets Standard'
                          : 'Below Standard'}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-white shadow-md hover:shadow-lg transition-shadow">
        <CardHeader>
          <CardTitle>International English Test Score Equivalencies</CardTitle>
        </CardHeader>
        <CardContent>
          <ComparisonTable />
        </CardContent>
      </Card>
    </div>
  );
};

export default HRDashboard;