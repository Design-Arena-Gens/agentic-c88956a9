'use client';

import { useState } from 'react';
import { BookOpen, ChevronDown, ChevronRight, Search } from 'lucide-react';

interface TheoryNote {
  id: number;
  title: string;
  category: string;
  content: string;
  keyPoints: string[];
}

const sampleNotes: TheoryNote[] = [
  {
    id: 1,
    title: "Introduction to Calculus",
    category: "Mathematics",
    content: "Calculus is a branch of mathematics that studies continuous change. It has two major branches: differential calculus (concerning rates of change and slopes of curves) and integral calculus (concerning accumulation of quantities and areas under curves). These two branches are related to each other by the fundamental theorem of calculus.",
    keyPoints: [
      "Differential calculus deals with derivatives and rates of change",
      "Integral calculus deals with integrals and accumulation",
      "The fundamental theorem connects differentiation and integration",
      "Applications include physics, engineering, economics, and more"
    ]
  },
  {
    id: 2,
    title: "Cell Structure and Function",
    category: "Biology",
    content: "Cells are the basic structural and functional units of all living organisms. There are two main types: prokaryotic cells (without a nucleus) and eukaryotic cells (with a nucleus). Eukaryotic cells contain organelles like mitochondria, endoplasmic reticulum, and Golgi apparatus that perform specific functions.",
    keyPoints: [
      "Prokaryotic cells lack a membrane-bound nucleus",
      "Eukaryotic cells have a nucleus and organelles",
      "Mitochondria are the powerhouse of the cell",
      "Cell membrane controls what enters and exits the cell"
    ]
  },
  {
    id: 3,
    title: "Newton's Laws of Motion",
    category: "Physics",
    content: "Sir Isaac Newton formulated three laws that describe the relationship between forces and motion. The First Law (Inertia) states that objects resist changes in motion. The Second Law (F=ma) relates force, mass, and acceleration. The Third Law states that every action has an equal and opposite reaction.",
    keyPoints: [
      "First Law: Objects maintain their state of motion unless acted upon",
      "Second Law: Force equals mass times acceleration (F=ma)",
      "Third Law: For every action, there is an equal and opposite reaction",
      "These laws form the foundation of classical mechanics"
    ]
  },
  {
    id: 4,
    title: "Chemical Bonding",
    category: "Chemistry",
    content: "Chemical bonds are forces that hold atoms together in molecules and compounds. The three main types are ionic bonds (transfer of electrons), covalent bonds (sharing of electrons), and metallic bonds (delocalized electrons). Bond strength and type determine the properties of substances.",
    keyPoints: [
      "Ionic bonds form between metals and non-metals",
      "Covalent bonds involve sharing of electron pairs",
      "Metallic bonds create a 'sea of electrons'",
      "Bond polarity affects molecular properties"
    ]
  },
  {
    id: 5,
    title: "Data Structures and Algorithms",
    category: "Computer Science",
    content: "Data structures are ways of organizing and storing data for efficient access and modification. Common structures include arrays, linked lists, stacks, queues, trees, and graphs. Algorithms are step-by-step procedures for solving problems. Algorithm efficiency is measured using Big O notation.",
    keyPoints: [
      "Arrays provide constant-time access to elements",
      "Linked lists allow efficient insertion and deletion",
      "Trees enable hierarchical data organization",
      "Big O notation describes algorithm complexity"
    ]
  },
  {
    id: 6,
    title: "World War II Overview",
    category: "History",
    content: "World War II (1939-1945) was a global conflict involving most of the world's nations. It began with Germany's invasion of Poland and ended with the atomic bombings of Japan. The war resulted in significant geopolitical changes, the formation of the United Nations, and the beginning of the Cold War.",
    keyPoints: [
      "Started in 1939 with invasion of Poland",
      "Allied Powers vs Axis Powers",
      "Holocaust and atomic bombs were major events",
      "Led to formation of United Nations"
    ]
  },
  {
    id: 7,
    title: "Economic Systems",
    category: "Economics",
    content: "Economic systems are ways societies organize production, distribution, and consumption of goods and services. Main types include capitalism (private ownership, market forces), socialism (government ownership, planned economy), and mixed economies (combination of both). Each system has advantages and disadvantages.",
    keyPoints: [
      "Capitalism emphasizes private ownership and competition",
      "Socialism focuses on collective ownership and planning",
      "Mixed economies combine elements of both systems",
      "Economic systems affect wealth distribution and innovation"
    ]
  },
  {
    id: 8,
    title: "The Solar System",
    category: "Astronomy",
    content: "The Solar System consists of the Sun and all objects bound to it by gravity, including eight planets, their moons, dwarf planets, asteroids, and comets. The inner planets (Mercury, Venus, Earth, Mars) are rocky, while the outer planets (Jupiter, Saturn, Uranus, Neptune) are gas giants.",
    keyPoints: [
      "Eight planets orbit the Sun",
      "Inner planets are rocky; outer planets are gaseous",
      "Asteroid belt lies between Mars and Jupiter",
      "Solar System formed about 4.6 billion years ago"
    ]
  },
];

export default function TheoryModule() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [expandedNote, setExpandedNote] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['All', ...Array.from(new Set(sampleNotes.map(note => note.category)))];

  const filteredNotes = sampleNotes.filter(note => {
    const matchesCategory = selectedCategory === 'All' || note.category === selectedCategory;
    const matchesSearch = note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         note.content.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const toggleNote = (id: number) => {
    setExpandedNote(expandedNote === id ? null : id);
  };

  return (
    <div className="max-w-5xl mx-auto">
      {/* Header */}
      <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-3 rounded-lg">
              <BookOpen className="h-6 w-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Theory Notes</h2>
              <p className="text-gray-600 text-sm">Comprehensive study materials</p>
            </div>
          </div>
        </div>

        {/* Search */}
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search notes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                selectedCategory === category
                  ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Notes List */}
      <div className="space-y-4">
        {filteredNotes.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-xl p-12 text-center">
            <BookOpen className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No notes found</h3>
            <p className="text-gray-600">Try adjusting your search or filter criteria</p>
          </div>
        ) : (
          filteredNotes.map((note) => {
            const isExpanded = expandedNote === note.id;

            return (
              <div
                key={note.id}
                className="bg-white rounded-2xl shadow-lg overflow-hidden transition-all hover:shadow-xl"
              >
                <div
                  onClick={() => toggleNote(note.id)}
                  className="p-6 cursor-pointer flex items-center justify-between"
                >
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <span className="inline-block bg-indigo-100 text-indigo-800 text-xs font-semibold px-3 py-1 rounded-full">
                        {note.category}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">{note.title}</h3>
                    {!isExpanded && (
                      <p className="text-gray-600 mt-2 line-clamp-2">{note.content}</p>
                    )}
                  </div>
                  <div className="ml-4">
                    {isExpanded ? (
                      <ChevronDown className="h-6 w-6 text-gray-400" />
                    ) : (
                      <ChevronRight className="h-6 w-6 text-gray-400" />
                    )}
                  </div>
                </div>

                {isExpanded && (
                  <div className="px-6 pb-6 border-t border-gray-100 pt-4">
                    <div className="prose max-w-none">
                      <p className="text-gray-700 leading-relaxed mb-6">{note.content}</p>

                      <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-lg p-6">
                        <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                          <div className="w-1 h-6 bg-gradient-to-b from-indigo-600 to-purple-600 rounded-full mr-3"></div>
                          Key Points
                        </h4>
                        <ul className="space-y-3">
                          {note.keyPoints.map((point, index) => (
                            <li key={index} className="flex items-start">
                              <div className="flex-shrink-0 h-6 w-6 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 flex items-center justify-center text-white text-xs font-bold mr-3 mt-0.5">
                                {index + 1}
                              </div>
                              <span className="text-gray-700">{point}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* Footer Tips */}
      <div className="mt-8 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-6 text-white">
        <h3 className="font-semibold mb-3 text-lg">Study Tips for Theory Notes:</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div className="flex items-start space-x-2">
            <div className="flex-shrink-0 w-2 h-2 bg-white rounded-full mt-1.5"></div>
            <p>Read through each section carefully and take your own notes</p>
          </div>
          <div className="flex items-start space-x-2">
            <div className="flex-shrink-0 w-2 h-2 bg-white rounded-full mt-1.5"></div>
            <p>Focus on understanding key concepts before memorizing details</p>
          </div>
          <div className="flex items-start space-x-2">
            <div className="flex-shrink-0 w-2 h-2 bg-white rounded-full mt-1.5"></div>
            <p>Use flashcards to reinforce important terms and definitions</p>
          </div>
          <div className="flex items-start space-x-2">
            <div className="flex-shrink-0 w-2 h-2 bg-white rounded-full mt-1.5"></div>
            <p>Test yourself with MCQs after studying each topic</p>
          </div>
        </div>
      </div>
    </div>
  );
}
