"use client";

import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { Clock } from "lucide-react";

const data = [
  {
    name: "Remittances",
    value: 58,
    amount: "$3,240",
    displayPercent: "57.5%",
    color: "#dc2626",
  },
  {
    name: "Savings",
    value: 28,
    amount: "$1,580",
    displayPercent: "28.1%",
    color: "#b91c1c",
  },
  {
    name: "Bills",
    value: 12,
    amount: "$685",
    displayPercent: "12.2%",
    color: "#991b1b",
  },
  {
    name: "Insurance",
    value: 2,
    amount: "$125",
    displayPercent: "2.2%",
    color: "#7f1d1d",
  },
];

const RADIAN = Math.PI / 180;

const renderLabel = ({
  cx,
  cy,
  midAngle,
  outerRadius,
  index,
}: {
  cx?: number;
  cy?: number;
  midAngle?: number;
  outerRadius?: number;
  index?: number;
}) => {
  // Handle case where any required values are undefined
  if (
    cx === undefined ||
    cy === undefined ||
    midAngle === undefined ||
    outerRadius === undefined ||
    index === undefined
  ) {
    return null;
  }

  const radius = outerRadius + 18;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);
  const item = data[index];

  return (
    <text
      x={x}
      y={y}
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
      fill={item.color}
      fontSize={12}
      fontWeight={500}
      className="hidden sm:block"
    >
      {item.name} {item.value}%
    </text>
  );
};

export default function MoneyDistributionWidget() {
  return (
    <section className="rounded-3xl border border-white/10 bg-gradient-to-b from-[#0f0f0f] via-[#0b0b0b] to-[#090909] p-8 text-white shadow-[0_30px_60px_rgba(0,0,0,0.45)] lg:w-[50%] w-full">
      <div className="flex flex-wrap items-start justify-between gap-6">
        <div className="order-1 sm:order-1">
          <div className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-full border border-[#dc2626]/30 bg-[#dc2626]/10 text-[#dc2626]">
              <Clock className="h-5 w-5" />
            </span>
            <h2 className="text-2xl font-semibold">Money Distribution</h2>
          </div>
          <p className="mt-2 text-sm text-white/50">Where your money goes</p>
        </div>
        <div className="order-2 w-full sm:order-2 sm:w-auto sm:text-right">
          <p className="text-sm text-white/50">Total</p>
          <p className="text-3xl font-semibold text-[#dc2626]">$5,630</p>
        </div>
      </div>

      <div className="mt-8 flex flex-col gap-10 items-start">
        <div className="h-[280px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={110}
                innerRadius={0}
                startAngle={90}
                endAngle={-270}
                labelLine={false}
                label={renderLabel}
                stroke="rgba(255,255,255,0.35)"
                strokeWidth={1}
              >
                {data.map((entry) => (
                  <Cell key={entry.name} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="w-[90%] sm:w-full">
          <div className="grid w-full grid-cols-2 gap-x-10 gap-y-4 text-left">
            {data.map((item) => (
              <div key={item.name} className="flex items-start gap-3">
                <span
                  className="mt-2 h-3 w-3 rounded-full"
                  style={{ backgroundColor: item.color }}
                />
                <div>
                  <p className="text-xs text-white/60 font-normal">
                    {item.name}
                  </p>
                  <p className="text-sm font-bold text-white">{item.amount}</p>
                  <p className="text-xs text-white/40 font-normal">
                    {item.displayPercent}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
