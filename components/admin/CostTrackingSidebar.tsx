import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { 
  DollarSign, 
  Server, 
  Users, 
  TrendingUp,
  ChevronDown,
  ChevronUp,
  ArrowUpRight,
  Cpu
} from 'lucide-react';

const CostTrackingSidebar = () => {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  const costData = {
    totalCosts: 12584.50,
    previousMonthCosts: 11250.75,
    variableCosts: {
      apiCosts: 4250.25,
      storageUsage: 1575.50,
      computeResources: 2150.75
    },
    fixedCosts: {
      serverInfrastructure: 2500.00,
      licenses: 850.00,
      security: 750.00
    },
    perUserMetrics: {
      averageCost: 12.50,
      activeUsers: 450,
      costTrend: -0.8
    },
    monthlyTrend: [
      { month: 'Jun', cost: 9500 },
      { month: 'Jul', cost: 10200 },
      { month: 'Aug', cost: 11250 },
      { month: 'Sep', cost: 10800 },
      { month: 'Oct', cost: 11900 },
      { month: 'Nov', cost: 12584 }
    ]
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(value);
  };

  const calculateGrowth = (current: number, previous: number) => {
    const growth = ((current - previous) / previous) * 100;
    return growth.toFixed(1);
  };

  const renderCostSection = (
    title: string, 
    icon: React.ReactNode, 
    costs: Record<string, number>, 
    sectionKey: string
  ) => {
    const isExpanded = expandedSection === sectionKey;
    const totalCost = Object.values(costs).reduce((sum, cost) => sum + cost, 0);

    return (
      <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
        <div 
          className="flex items-center justify-between cursor-pointer"
          onClick={() => setExpandedSection(isExpanded ? null : sectionKey)}
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center">
              {icon}
            </div>
            <div>
              <p className="font-medium text-gray-900">{title}</p>
              <p className="text-lg font-semibold text-blue-600">
                {formatCurrency(totalCost)}
              </p>
            </div>
          </div>
          {isExpanded ? (
            <ChevronUp className="w-5 h-5 text-gray-400" />
          ) : (
            <ChevronDown className="w-5 h-5 text-gray-400" />
          )}
        </div>

        <div className={`mt-4 space-y-3 transition-all duration-300 ${
          isExpanded ? 'block' : 'hidden'
        }`}>
          {Object.entries(costs).map(([key, value]) => (
            <div key={key} className="flex items-center justify-between p-2 rounded-lg bg-gray-50">
              <span className="text-sm text-gray-600">
                {key.split(/(?=[A-Z])/).join(' ')}
              </span>
              <span className="font-medium text-gray-900">
                {formatCurrency(value)}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Total Cost Overview Card */}
      <Card className="p-6 bg-white shadow-sm border border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <DollarSign className="w-5 h-5 text-green-600" />
            <h4 className="font-semibold text-gray-900">Cost Overview</h4>
          </div>
          <span className="text-sm text-blue-600 font-medium flex items-center gap-1 cursor-pointer hover:text-blue-700 transition-colors">
            Full Report
            <ArrowUpRight className="w-4 h-4" />
          </span>
        </div>

        <div className="mb-6">
          <div className="flex items-end justify-between">
            <div>
              <p className="text-sm text-gray-500 mb-1">Total Costs</p>
              <p className="text-3xl font-bold text-gray-900">
                {formatCurrency(costData.totalCosts)}
              </p>
            </div>
            <div className={`text-sm font-medium px-2 py-1 rounded-full ${
              Number(calculateGrowth(costData.totalCosts, costData.previousMonthCosts)) > 0
                ? 'bg-red-100 text-red-600'
                : 'bg-green-100 text-green-600'
            }`}>
              {calculateGrowth(costData.totalCosts, costData.previousMonthCosts)}%
            </div>
          </div>

          <div className="h-40 mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={costData.monthlyTrend}>
                <XAxis 
                  dataKey="month" 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: '#6B7280' }}
                />
                <YAxis 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: '#6B7280' }}
                  tickFormatter={(value) => `$${value}`}
                />
                <Tooltip 
                  formatter={(value) => [`$${value}`, 'Cost']}
                  contentStyle={{
                    backgroundColor: 'white',
                    border: '1px solid #E5E7EB',
                    borderRadius: '8px',
                    padding: '8px'
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="cost" 
                  stroke="#2563EB"
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </Card>

      {/* Variable Costs */}
      {renderCostSection(
        'Variable Costs',
        <Cpu className="w-5 h-5 text-blue-600" />,
        costData.variableCosts,
        'variable'
      )}

      {/* Fixed Costs */}
      {renderCostSection(
        'Fixed Costs',
        <Server className="w-5 h-5 text-blue-600" />,
        costData.fixedCosts,
        'fixed'
      )}

      {/* Per User Metrics */}
      <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center">
              <Users className="w-5 h-5 text-blue-600" />
            </div>
            <p className="font-medium text-gray-900">Per User Metrics</p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
            <span className="text-sm text-gray-600">Average Cost per User</span>
            <span className="font-medium text-gray-900">
              {formatCurrency(costData.perUserMetrics.averageCost)}
            </span>
          </div>

          <div className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
            <span className="text-sm text-gray-600">Active Users</span>
            <span className="font-medium text-gray-900">
              {costData.perUserMetrics.activeUsers}
            </span>
          </div>

          <div className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
            <span className="text-sm text-gray-600">Cost Trend</span>
            <span className={`font-medium flex items-center gap-1 ${
              costData.perUserMetrics.costTrend < 0 
                ? 'text-green-600' 
                : 'text-red-600'
            }`}>
              <TrendingUp className="w-4 h-4" />
              {Math.abs(costData.perUserMetrics.costTrend)}%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CostTrackingSidebar;