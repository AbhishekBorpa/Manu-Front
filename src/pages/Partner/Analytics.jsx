import React, { useState } from 'react';
import { FaChartBar, FaCalendarAlt, FaArrowUp, FaChevronDown, FaArrowDown, FaTimesCircle } from 'react-icons/fa';

const Analytics = () => {
  const [dateRange, setDateRange] = useState('Last 30 Days');
  const [showDateRange, setShowDateRange] = useState(false);
  const [showConversionDetails, setShowConversionDetails] = useState(false);

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Business Analytics</h1>
          <p className="text-slate-500 text-sm">Deep dive into your manufacturing performance metrics.</p>
        </div>
        <div className="flex items-center gap-3 relative">
          <button 
            onClick={() => setShowDateRange(!showDateRange)}
            className="bg-white border border-slate-200 px-4 py-2 rounded-xl text-sm font-bold text-slate-600 flex items-center gap-2"
          >
            <FaCalendarAlt className="text-slate-400" /> {dateRange} <FaChevronDown className="text-[10px]" />
          </button>
          
          {showDateRange && (
            <div className="absolute top-12 right-0 w-48 bg-white rounded-2xl shadow-xl border border-slate-100 z-50 p-2 animate-in fade-in slide-in-from-top-2">
              {['Today', 'Last 7 Days', 'Last 30 Days', 'Last 90 Days', 'All Time'].map((range) => (
                <button
                  key={range}
                  onClick={() => {setDateRange(range); setShowDateRange(false);}}
                  className={`w-full text-left px-4 py-2 rounded-lg text-sm font-bold transition-all ${
                    dateRange === range ? 'bg-green-50 text-[#14532D]' : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  {range}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Main Charts Placeholder Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Performance Chart */}
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 min-h-[400px] flex flex-col">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="font-bold text-slate-800">Revenue Growth</h3>
              <p className="text-xs text-slate-400">Total earnings over time</p>
            </div>
            <div className="text-right">
              <p className="text-xl font-extrabold text-slate-800">₹14.2L</p>
              <p className="text-[10px] text-green-500 font-bold flex items-center justify-end">
                <FaArrowUp className="mr-0.5" /> +18.4%
              </p>
            </div>
          </div>
          
          <div className="flex-grow flex items-end justify-between gap-2 px-2">
            {[40, 60, 45, 90, 65, 80, 100, 75, 95, 110, 85, 120].map((h, i) => (
              <div key={i} className="group relative flex-1">
                <div 
                  style={{ height: `${h}px` }} 
                  className="bg-green-100 group-hover:bg-green-500 transition-all rounded-t-lg"
                ></div>
                <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-[10px] py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  ₹{(h/10).toFixed(1)}L
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-4 text-[10px] text-slate-400 font-bold uppercase tracking-widest px-1">
            <span>Jan</span><span>Mar</span><span>May</span><span>Jul</span><span>Sep</span><span>Dec</span>
          </div>
        </div>

        {/* Lead Source Chart */}
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 flex flex-col">
          <h3 className="font-bold text-slate-800 mb-2">Lead Distribution</h3>
          <p className="text-xs text-slate-400 mb-8">Performance by lead category</p>
          
          <div className="space-y-6 flex-grow">
            {[
              { label: 'Organic Search', val: 65, color: 'bg-blue-500' },
              { label: 'Direct Referrals', val: 25, color: 'bg-purple-500' },
              { label: 'Featured Listings', val: 45, color: 'bg-green-500' },
              { label: 'Social Media', val: 15, color: 'bg-orange-500' },
            ].map((source) => (
              <div key={source.label}>
                <div className="flex justify-between text-xs font-bold text-slate-700 mb-2">
                  <span>{source.label}</span>
                  <span>{source.val}%</span>
                </div>
                <div className="h-2 w-full bg-slate-50 rounded-full overflow-hidden">
                  <div style={{ width: `${source.val}%` }} className={`h-full ${source.color} rounded-full`}></div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-8 p-4 bg-slate-50 rounded-2xl flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-green-100 text-green-600 rounded-lg flex items-center justify-center">
                <FaChartBar className="text-sm" />
              </div>
              <p className="text-xs font-bold text-slate-600">Overall conversion rate is up by 4% this month.</p>
            </div>
            <button 
              onClick={() => setShowConversionDetails(true)}
              className="text-[10px] font-extrabold text-blue-600 uppercase tracking-wider"
            >
              Details
            </button>
          </div>
        </div>

      </div>

      {/* Mini Stats Table */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: 'Avg. Response Time', val: '2.4 hrs', trend: '-15%', positive: true },
          { label: 'Lead Quality Score', val: '8.8 / 10', trend: '+5%', positive: true },
          { label: 'Churn Rate', val: '1.2%', trend: '+0.4%', positive: false },
        ].map((stat) => (
          <div key={stat.label} className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
            <p className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-2">{stat.label}</p>
            <div className="flex items-end gap-3">
              <h4 className="text-2xl font-extrabold text-slate-800 leading-none">{stat.val}</h4>
              <span className={`text-xs font-bold flex items-center mb-0.5 ${stat.positive ? 'text-green-500' : 'text-red-500'}`}>
                {stat.positive ? <FaArrowUp className="mr-1" /> : <FaArrowDown className="mr-1" />}
                {stat.trend}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Conversion Details Modal */}
      {showConversionDetails && (
        <div className="fixed inset-0 z-[2000] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-[32px] w-full max-w-lg shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300">
            <div className="bg-[#14532D] p-6 text-white flex items-center justify-between">
              <h3 className="text-xl font-bold">Conversion Analysis</h3>
              <button onClick={() => setShowConversionDetails(false)}><FaTimesCircle className="text-xl" /></button>
            </div>
            <div className="p-8 space-y-6">
              <div className="space-y-4">
                {[
                  { label: 'Lead to Inquiry', rate: '85%', color: 'bg-blue-500' },
                  { label: 'Inquiry to Negotiation', rate: '42%', color: 'bg-orange-500' },
                  { label: 'Negotiation to Closed', rate: '18%', color: 'bg-green-500' },
                ].map((item, i) => (
                  <div key={i} className="space-y-2">
                    <div className="flex justify-between text-sm font-bold text-slate-800">
                      <span>{item.label}</span>
                      <span>{item.rate}</span>
                    </div>
                    <div className="h-2 w-full bg-slate-50 rounded-full overflow-hidden">
                      <div style={{ width: item.rate }} className={`h-full ${item.color} rounded-full`}></div>
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-xs text-slate-500 leading-relaxed italic">
                * Based on data from {dateRange}. Conversions are tracked from initial lead assignment to final payment receipt.
              </p>
              <button onClick={() => setShowConversionDetails(false)} className="w-full py-3 bg-[#14532D] text-white rounded-xl font-bold">Close Analysis</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Analytics;
