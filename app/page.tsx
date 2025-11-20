'use client';

import { useState } from 'react';
import { BookOpen, Brain, FileText, BarChart3, Clock, Award } from 'lucide-react';
import MCQModule from '@/components/MCQModule';
import FlashcardModule from '@/components/FlashcardModule';
import TheoryModule from '@/components/TheoryModule';
import StatsModule from '@/components/StatsModule';

type Tab = 'home' | 'mcq' | 'flashcards' | 'theory' | 'stats';

export default function Home() {
  const [activeTab, setActiveTab] = useState<Tab>('home');
  const [stats, setStats] = useState({
    mcqCompleted: 0,
    mcqCorrect: 0,
    flashcardsReviewed: 0,
    studyTime: 0,
  });

  const updateStats = (type: 'mcq' | 'flashcard', data: any) => {
    if (type === 'mcq') {
      setStats(prev => ({
        ...prev,
        mcqCompleted: prev.mcqCompleted + 1,
        mcqCorrect: prev.mcqCorrect + (data.correct ? 1 : 0),
      }));
    } else if (type === 'flashcard') {
      setStats(prev => ({
        ...prev,
        flashcardsReviewed: prev.flashcardsReviewed + 1,
      }));
    }
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-2 rounded-lg">
                <BookOpen className="h-8 w-8 text-white" />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Exam Prep Hub
              </h1>
            </div>
            <nav className="hidden md:flex space-x-1">
              <NavButton icon={BookOpen} label="Home" active={activeTab === 'home'} onClick={() => setActiveTab('home')} />
              <NavButton icon={Brain} label="MCQ Practice" active={activeTab === 'mcq'} onClick={() => setActiveTab('mcq')} />
              <NavButton icon={FileText} label="Flashcards" active={activeTab === 'flashcards'} onClick={() => setActiveTab('flashcards')} />
              <NavButton icon={FileText} label="Theory Notes" active={activeTab === 'theory'} onClick={() => setActiveTab('theory')} />
              <NavButton icon={BarChart3} label="Statistics" active={activeTab === 'stats'} onClick={() => setActiveTab('stats')} />
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'home' && (
          <div className="space-y-8">
            {/* Hero Section */}
            <div className="text-center space-y-4 py-12">
              <h2 className="text-5xl font-bold text-gray-900">Master Your Exams</h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Your all-in-one platform for exam preparation with MCQ practice, flashcards, and comprehensive theory notes
              </p>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <StatCard icon={Brain} label="MCQs Completed" value={stats.mcqCompleted} color="blue" />
              <StatCard icon={Award} label="Correct Answers" value={stats.mcqCorrect} color="green" />
              <StatCard icon={FileText} label="Cards Reviewed" value={stats.flashcardsReviewed} color="purple" />
              <StatCard icon={Clock} label="Study Time (min)" value={stats.studyTime} color="indigo" />
            </div>

            {/* Feature Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
              <FeatureCard
                icon={Brain}
                title="MCQ Practice"
                description="Test your knowledge with timed multiple-choice questions. Track your score and improve your speed."
                color="blue"
                onClick={() => setActiveTab('mcq')}
              />
              <FeatureCard
                icon={FileText}
                title="Flashcards"
                description="Review key concepts with interactive flashcards. Perfect for quick revision sessions."
                color="purple"
                onClick={() => setActiveTab('flashcards')}
              />
              <FeatureCard
                icon={BookOpen}
                title="Theory Notes"
                description="Comprehensive study materials organized by topics. Learn concepts in depth."
                color="indigo"
                onClick={() => setActiveTab('theory')}
              />
            </div>
          </div>
        )}

        {activeTab === 'mcq' && <MCQModule onComplete={(data) => updateStats('mcq', data)} />}
        {activeTab === 'flashcards' && <FlashcardModule onReview={() => updateStats('flashcard', {})} />}
        {activeTab === 'theory' && <TheoryModule />}
        {activeTab === 'stats' && <StatsModule stats={stats} />}
      </main>

      {/* Mobile Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2 z-50">
        <div className="flex justify-around">
          <MobileNavButton icon={BookOpen} label="Home" active={activeTab === 'home'} onClick={() => setActiveTab('home')} />
          <MobileNavButton icon={Brain} label="MCQ" active={activeTab === 'mcq'} onClick={() => setActiveTab('mcq')} />
          <MobileNavButton icon={FileText} label="Cards" active={activeTab === 'flashcards'} onClick={() => setActiveTab('flashcards')} />
          <MobileNavButton icon={FileText} label="Notes" active={activeTab === 'theory'} onClick={() => setActiveTab('theory')} />
          <MobileNavButton icon={BarChart3} label="Stats" active={activeTab === 'stats'} onClick={() => setActiveTab('stats')} />
        </div>
      </nav>
    </div>
  );
}

function NavButton({ icon: Icon, label, active, onClick }: any) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
        active
          ? 'bg-blue-600 text-white'
          : 'text-gray-700 hover:bg-gray-100'
      }`}
    >
      <Icon className="h-5 w-5" />
      <span className="font-medium">{label}</span>
    </button>
  );
}

function MobileNavButton({ icon: Icon, label, active, onClick }: any) {
  return (
    <button
      onClick={onClick}
      className={`flex flex-col items-center space-y-1 ${
        active ? 'text-blue-600' : 'text-gray-600'
      }`}
    >
      <Icon className="h-6 w-6" />
      <span className="text-xs">{label}</span>
    </button>
  );
}

function StatCard({ icon: Icon, label, value, color }: any) {
  const colors = {
    blue: 'from-blue-500 to-blue-600',
    green: 'from-green-500 to-green-600',
    purple: 'from-purple-500 to-purple-600',
    indigo: 'from-indigo-500 to-indigo-600',
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 card-hover">
      <div className={`inline-flex p-3 rounded-lg bg-gradient-to-r ${colors[color as keyof typeof colors]} mb-4`}>
        <Icon className="h-6 w-6 text-white" />
      </div>
      <div className="text-3xl font-bold text-gray-900">{value}</div>
      <div className="text-sm text-gray-600 mt-1">{label}</div>
    </div>
  );
}

function FeatureCard({ icon: Icon, title, description, color, onClick }: any) {
  const colors = {
    blue: 'from-blue-500 to-blue-600',
    purple: 'from-purple-500 to-purple-600',
    indigo: 'from-indigo-500 to-indigo-600',
  };

  return (
    <div
      onClick={onClick}
      className="bg-white rounded-xl shadow-lg p-6 card-hover cursor-pointer"
    >
      <div className={`inline-flex p-4 rounded-lg bg-gradient-to-r ${colors[color as keyof typeof colors]} mb-4`}>
        <Icon className="h-8 w-8 text-white" />
      </div>
      <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
      <div className="mt-4 text-blue-600 font-semibold flex items-center">
        Start Learning
        <svg className="ml-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </div>
    </div>
  );
}
