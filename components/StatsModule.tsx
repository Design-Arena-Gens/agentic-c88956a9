'use client';

import { BarChart3, TrendingUp, Award, Target, Clock, CheckCircle } from 'lucide-react';

interface Stats {
  mcqCompleted: number;
  mcqCorrect: number;
  flashcardsReviewed: number;
  studyTime: number;
}

export default function StatsModule({ stats }: { stats: Stats }) {
  const accuracy = stats.mcqCompleted > 0
    ? Math.round((stats.mcqCorrect / stats.mcqCompleted) * 100)
    : 0;

  const weeklyGoal = 50;
  const totalActivity = stats.mcqCompleted + stats.flashcardsReviewed;
  const goalProgress = Math.min(Math.round((totalActivity / weeklyGoal) * 100), 100);

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl shadow-xl p-6">
        <div className="flex items-center space-x-3 mb-2">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-3 rounded-lg">
            <BarChart3 className="h-6 w-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Your Statistics</h2>
            <p className="text-gray-600 text-sm">Track your learning progress</p>
          </div>
        </div>
      </div>

      {/* Main Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          icon={CheckCircle}
          label="MCQs Completed"
          value={stats.mcqCompleted}
          subValue={`${stats.mcqCorrect} correct`}
          color="blue"
          trend="+12%"
        />
        <StatCard
          icon={Award}
          label="Accuracy Rate"
          value={`${accuracy}%`}
          subValue="Keep it up!"
          color="green"
          trend="+5%"
        />
        <StatCard
          icon={Target}
          label="Flashcards Reviewed"
          value={stats.flashcardsReviewed}
          subValue="This week"
          color="purple"
          trend="+8%"
        />
        <StatCard
          icon={Clock}
          label="Study Time"
          value={`${stats.studyTime}m`}
          subValue="Total minutes"
          color="indigo"
          trend="+15%"
        />
      </div>

      {/* Weekly Goal Progress */}
      <div className="bg-white rounded-2xl shadow-xl p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-xl font-bold text-gray-900">Weekly Goal</h3>
            <p className="text-gray-600 text-sm">Complete 50 activities this week</p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              {goalProgress}%
            </div>
            <p className="text-sm text-gray-600">{totalActivity} / {weeklyGoal}</p>
          </div>
        </div>

        <div className="relative w-full bg-gray-200 rounded-full h-4 overflow-hidden">
          <div
            className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full transition-all duration-500"
            style={{ width: `${goalProgress}%` }}
          >
            <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
          </div>
        </div>
      </div>

      {/* Performance Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* MCQ Performance */}
        <div className="bg-white rounded-2xl shadow-xl p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
            <div className="w-1 h-6 bg-gradient-to-b from-blue-600 to-indigo-600 rounded-full mr-3"></div>
            MCQ Performance
          </h3>

          <div className="space-y-4">
            <PerformanceBar
              label="Questions Attempted"
              value={stats.mcqCompleted}
              max={20}
              color="blue"
            />
            <PerformanceBar
              label="Correct Answers"
              value={stats.mcqCorrect}
              max={20}
              color="green"
            />
            <PerformanceBar
              label="Incorrect Answers"
              value={stats.mcqCompleted - stats.mcqCorrect}
              max={20}
              color="red"
            />
          </div>

          {stats.mcqCompleted > 0 && (
            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-900">
                <strong>Tip:</strong> {accuracy >= 70
                  ? "Great job! You're mastering the material."
                  : "Keep practicing to improve your accuracy."}
              </p>
            </div>
          )}
        </div>

        {/* Study Insights */}
        <div className="bg-white rounded-2xl shadow-xl p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
            <div className="w-1 h-6 bg-gradient-to-b from-purple-600 to-indigo-600 rounded-full mr-3"></div>
            Study Insights
          </h3>

          <div className="space-y-4">
            <InsightCard
              icon={TrendingUp}
              title="Most Active Feature"
              value={stats.mcqCompleted > stats.flashcardsReviewed ? "MCQ Practice" : "Flashcards"}
              color="blue"
            />
            <InsightCard
              icon={Award}
              title="Achievement Level"
              value={totalActivity > 30 ? "Advanced" : totalActivity > 15 ? "Intermediate" : "Beginner"}
              color="purple"
            />
            <InsightCard
              icon={Target}
              title="Recommended Focus"
              value={accuracy < 70 ? "More Practice Needed" : "Explore New Topics"}
              color="indigo"
            />
          </div>

          <div className="mt-6 p-4 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg text-white">
            <p className="text-sm">
              <strong>Daily Streak:</strong> Keep learning every day to maintain your momentum!
            </p>
          </div>
        </div>
      </div>

      {/* Achievements */}
      <div className="bg-white rounded-2xl shadow-xl p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-6">Achievements</h3>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <AchievementBadge
            icon="🎯"
            title="First Steps"
            description="Complete 1 MCQ"
            unlocked={stats.mcqCompleted >= 1}
          />
          <AchievementBadge
            icon="⭐"
            title="Quick Learner"
            description="Complete 10 MCQs"
            unlocked={stats.mcqCompleted >= 10}
          />
          <AchievementBadge
            icon="🏆"
            title="Card Master"
            description="Review 10 flashcards"
            unlocked={stats.flashcardsReviewed >= 10}
          />
          <AchievementBadge
            icon="🎓"
            title="Dedicated Student"
            description="30 minutes study time"
            unlocked={stats.studyTime >= 30}
          />
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon: Icon, label, value, subValue, color, trend }: any) {
  const colors = {
    blue: 'from-blue-500 to-blue-600',
    green: 'from-green-500 to-green-600',
    purple: 'from-purple-500 to-purple-600',
    indigo: 'from-indigo-500 to-indigo-600',
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className={`inline-flex p-3 rounded-lg bg-gradient-to-r ${colors[color as keyof typeof colors]} mb-4`}>
        <Icon className="h-6 w-6 text-white" />
      </div>
      <div className="text-3xl font-bold text-gray-900 mb-1">{value}</div>
      <div className="text-sm text-gray-600 mb-2">{label}</div>
      <div className="flex items-center justify-between">
        <span className="text-xs text-gray-500">{subValue}</span>
        <span className="text-xs text-green-600 font-semibold">{trend}</span>
      </div>
    </div>
  );
}

function PerformanceBar({ label, value, max, color }: any) {
  const percentage = Math.min((value / max) * 100, 100);
  const colors = {
    blue: 'bg-blue-600',
    green: 'bg-green-600',
    red: 'bg-red-600',
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium text-gray-700">{label}</span>
        <span className="text-sm font-bold text-gray-900">{value}</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div
          className={`${colors[color as keyof typeof colors]} h-2 rounded-full transition-all duration-500`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}

function InsightCard({ icon: Icon, title, value, color }: any) {
  const colors = {
    blue: 'text-blue-600 bg-blue-50',
    purple: 'text-purple-600 bg-purple-50',
    indigo: 'text-indigo-600 bg-indigo-50',
  };

  return (
    <div className={`${colors[color as keyof typeof colors]} rounded-lg p-4 flex items-center space-x-3`}>
      <Icon className={`h-8 w-8 ${colors[color as keyof typeof colors].split(' ')[0]}`} />
      <div>
        <div className="text-xs font-medium text-gray-600">{title}</div>
        <div className="text-lg font-bold text-gray-900">{value}</div>
      </div>
    </div>
  );
}

function AchievementBadge({ icon, title, description, unlocked }: any) {
  return (
    <div className={`rounded-xl p-4 text-center transition-all ${
      unlocked
        ? 'bg-gradient-to-br from-yellow-50 to-orange-50 border-2 border-yellow-400'
        : 'bg-gray-100 opacity-50'
    }`}>
      <div className="text-4xl mb-2">{icon}</div>
      <div className="text-sm font-bold text-gray-900 mb-1">{title}</div>
      <div className="text-xs text-gray-600">{description}</div>
      {unlocked && (
        <div className="mt-2">
          <span className="inline-block bg-yellow-400 text-yellow-900 text-xs font-semibold px-2 py-1 rounded">
            Unlocked!
          </span>
        </div>
      )}
    </div>
  );
}
