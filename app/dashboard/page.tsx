import Link from 'next/link'
import { ArrowLeft, TrendingUp, Send, PiggyBank, FileText, Shield } from 'lucide-react'

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-[#141414]">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center space-x-4">
            <Link href="/" className="text-gray-600 hover:text-gray-900">
              <ArrowLeft className="w-6 h-6" />
            </Link>
            <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard
            title="Total Sent"
            value="$1,200"
            detail1="+$300"
            detail1Color="text-red-500"
            detail2="+25%"
            icon={Send}
            showTrend={true}
          />
          <StatCard
            title="Savings"
            value="$360"
            detail1="+$90"
            detail1Color="text-red-500"
            detail2="+33%"
            icon={PiggyBank}
            showTrend={true}
          />
          <StatCard
            title="Bills Paid"
            value="$180"
            detail1="3 bills"
            detail2="This month"
            icon={FileText}
          />
          <StatCard
            title="Insurance"
            value="$60"
            detail1="2 policies"
            detail2="Active"
            icon={Shield}
          />
        </div>

        {/* Money Split Visualization */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Current Money Split</h2>
          <div className="space-y-4">
            <SplitBar label="Daily Spending" amount={150} percentage={50} color="bg-blue-500" />
            <SplitBar label="Savings" amount={90} percentage={30} color="bg-green-500" />
            <SplitBar label="Bills" amount={45} percentage={15} color="bg-yellow-500" />
            <SplitBar label="Insurance" amount={15} percentage={5} color="bg-purple-500" />
          </div>
          <div className="mt-6">
            <Link href="/split" className="text-blue-600 hover:text-blue-700 font-semibold">
              Configure Split Settings →
            </Link>
          </div>
        </div>

        {/* Recent Transactions */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Transactions</h2>
          <div className="space-y-4">
            <TransactionItem
              date="2024-01-15"
              description="Remittance to Family"
              amount="$300"
              status="completed"
            />
            <TransactionItem
              date="2024-01-10"
              description="Bill Payment - Electricity"
              amount="$50"
              status="completed"
            />
            <TransactionItem
              date="2024-01-08"
              description="Savings Goal - Education"
              amount="$100"
              status="completed"
            />
          </div>
          <div className="mt-6">
            <Link href="/transactions" className="text-blue-600 hover:text-blue-700 font-semibold">
              View All Transactions →
            </Link>
          </div>
        </div>

        {/* Savings Goals Progress */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Savings Goals</h2>
          <div className="space-y-4">
            <GoalProgress
              name="Education Fund"
              current={360}
              target={1000}
              deadline="2025-12-31"
            />
            <GoalProgress
              name="Medical Emergency"
              current={180}
              target={500}
              deadline="2024-06-30"
            />
          </div>
          <div className="mt-6">
            <Link href="/goals" className="text-blue-600 hover:text-blue-700 font-semibold">
              Manage Goals →
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}

function StatCard({ 
  title, 
  value, 
  detail1, 
  detail1Color = 'text-gray-400', 
  detail2, 
  icon: Icon, 
  showTrend = false 
}: { 
  title: string, 
  value: string, 
  detail1: string, 
  detail1Color?: string, 
  detail2?: string, 
  icon: any, 
  showTrend?: boolean 
}) {
  return (
    <div className="bg-[#141414] rounded-2xl p-5 flex flex-col justify-between min-h-[160px] border border-gray-800/50 shadow-xl">
      <div className="flex justify-between items-start">
        <div className="bg-red-500/10 p-2 rounded-lg">
          <Icon className="w-5 h-5 text-red-500" strokeWidth={2} />
        </div>
        {showTrend && (
          <TrendingUp className="w-4 h-4 text-red-500" />
        )}
      </div>

      <div className="mt-4">
        <p className="text-gray-500 text-sm font-medium">{title}</p>
        <h3 className="text-white text-3xl font-bold mt-1 tracking-tight">{value}</h3>
      </div>

      <div className="flex justify-between items-end mt-3">
        <span className={`text-sm font-bold ${detail1Color}`}>{detail1}</span>
        {detail2 && <span className="text-[11px] text-gray-600 font-medium">{detail2}</span>}
      </div>
    </div>
  )
}

function SplitBar({ label, amount, percentage, color }: { label: string, amount: number, percentage: number, color: string }) {
  return (
    <div>
      <div className="flex justify-between mb-2">
        <span className="text-gray-700 font-medium">{label}</span>
        <span className="text-gray-900 font-semibold">${amount} ({percentage}%)</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-3">
        <div className={`${color} h-3 rounded-full`} style={{ width: `${percentage}%` }}></div>
      </div>
    </div>
  )
}

function TransactionItem({ date, description, amount, status }: { date: string, description: string, amount: string, status: string }) {
  return (
    <div className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
      <div>
        <div className="font-medium text-gray-900">{description}</div>
        <div className="text-sm text-gray-500">{date}</div>
      </div>
      <div className="text-right">
        <div className="font-semibold text-gray-900">{amount}</div>
        <div className="text-sm text-green-600">{status}</div>
      </div>
    </div>
  )
}

function GoalProgress({ name, current, target, deadline }: { name: string, current: number, target: number, deadline: string }) {
  const percentage = Math.min((current / target) * 100, 100)
  
  return (
    <div>
      <div className="flex justify-between mb-2">
        <span className="font-medium text-gray-900">{name}</span>
        <span className="text-gray-600 text-sm">${current} / ${target}</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
        <div className="bg-green-500 h-3 rounded-full" style={{ width: `${percentage}%` }}></div>
      </div>
      <div className="text-sm text-gray-500">Target: {deadline}</div>
    </div>
  )
}

