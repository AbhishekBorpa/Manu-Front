import React from "react";

const OverviewTab = ({
  stats,
  setActiveMenu,
}) => {
  return (
    <>
      {/* TITLE */}
      <div className="mb-3 flex-shrink-0">
        <h1 className="text-[24px] font-bold leading-none">
          Dashboard
        </h1>
        <p className="text-gray-400 mt-1 text-[11px]">
          Welcome back, Admin 👋
        </p>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-4 gap-3 flex-shrink-0">
        {stats.map((item, index) => (
          <div
            key={index}
            className="bg-[#081120] border border-white/10 rounded-xl px-3 py-3 h-[88px]"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-gray-400 text-[10px]">
                  {item.title}
                </p>
                <h2 className="text-[17px] font-bold mt-2">
                  {item.value}
                </h2>
                <p className="text-green-400 mt-2 text-[9px] font-medium">
                  ↑ {item.growth}
                </p>
              </div>
              <div
                className={`w-[36px] h-[36px] rounded-full bg-gradient-to-br ${item.bg} flex items-center justify-center`}
              >
                {item.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* GRAPH + TABLE */}
      <div className="grid grid-cols-3 gap-3 mt-3 flex-1 overflow-hidden">
        {/* GRAPH */}
        <div className="col-span-2 bg-[#081120] border border-white/10 rounded-xl p-4 overflow-hidden">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-[16px] font-semibold">
              Overview
            </h2>
            <button className="bg-[#0b1220] border border-white/10 px-3 h-[30px] rounded-lg text-[10px]">
              This Month
            </button>
          </div>

          <div className="mt-2 relative h-[320px]">
            <div className="absolute inset-0 flex flex-col justify-between opacity-10">
              {[1, 2, 3, 4, 5].map((item) => (
                <div
                  key={item}
                  className="border-t border-white"
                />
              ))}
            </div>

            <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-[8px] text-gray-500">
              <span>100K</span>
              <span>75K</span>
              <span>50K</span>
              <span>25K</span>
              <span>0</span>
            </div>

            <div className="ml-5 h-full">
              <svg
                viewBox="0 0 800 300"
                className="w-full h-full"
              >
                <defs>
                  <linearGradient
                    id="greenGradient"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop
                      offset="0%"
                      stopColor="#00ff88"
                      stopOpacity="0.35"
                    />
                    <stop
                      offset="100%"
                      stopColor="#00ff88"
                      stopOpacity="0"
                    />
                  </linearGradient>
                </defs>

                <path
                  d="
                  M 20 240
                  C 80 180, 120 70, 180 140
                  S 300 180, 360 140
                  S 500 60, 560 120
                  S 680 40, 760 35
                  L 760 300
                  L 20 300 Z
                  "
                  fill="url(#greenGradient)"
                />

                <path
                  d="
                  M 20 240
                  C 80 180, 120 70, 180 140
                  S 300 180, 360 140
                  S 500 60, 560 120
                  S 680 40, 760 35
                  "
                  fill="none"
                  stroke="#00ff88"
                  strokeWidth="4"
                  strokeLinecap="round"
                />

                {[
                  [20, 240],
                  [80, 180],
                  [140, 90],
                  [220, 160],
                  [320, 140],
                  [400, 135],
                  [500, 75],
                  [570, 120],
                  [630, 150],
                  [720, 45],
                  [760, 35],
                ].map((dot, i) => (
                  <circle
                    key={i}
                    cx={dot[0]}
                    cy={dot[1]}
                    r="4"
                    fill="#00ff88"
                  />
                ))}
              </svg>
            </div>

            <div className="ml-5 mt-1 flex justify-between text-[8px] text-gray-500">
              <span>01 May</span>
              <span>05 May</span>
              <span>10 May</span>
              <span>15 May</span>
              <span>20 May</span>
              <span>25 May</span>
              <span>30 May</span>
            </div>
          </div>
        </div>

        {/* RIGHT TABLE */}
        <div className="bg-[#081120] border border-white/10 rounded-xl p-4 overflow-hidden flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-[16px] font-semibold">
              Recent Leads
            </h2>
            <button 
              onClick={() => setActiveMenu("Leads")}
              className="text-green-400 text-[10px] hover:text-green-300 transition-colors"
            >
              View All
            </button>
          </div>

          <div className="overflow-hidden rounded-lg border border-white/10 flex-1">
            <div className="grid grid-cols-3 bg-white/5 h-[38px] items-center px-3 text-[10px] font-semibold text-gray-300">
              <span>ID</span>
              <span>Name</span>
              <span>Status</span>
            </div>

            <div>
              {[
                ["#LD101", "Neha Sharma", "New"],
                ["#LD102", "Rahul Verma", "Active"],
                ["#LD103", "Ankit Singh", "Pending"],
                ["#LD104", "Pooja Yadav", "Active"],
                ["#LD105", "Vikram Joshi", "New"],
              ].map((lead, i) => (
                <div
                  key={i}
                  className="grid grid-cols-3 items-center px-3 h-[58px] border-t border-white/5 text-[10px]"
                >
                  <span className="font-medium text-white">
                    {lead[0]}
                  </span>
                  <span className="text-gray-300">
                    {lead[1]}
                  </span>
                  <span className="text-green-400">
                    {lead[2]}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OverviewTab;
