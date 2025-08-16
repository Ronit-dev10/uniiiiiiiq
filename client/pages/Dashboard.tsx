import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LogOut, Settings, BookOpen, Target, TrendingUp, Calendar, Menu, X, Home } from 'lucide-react';
import { Logo } from '../components/Logo';
import { userService } from '../services/userService';

export function Dashboard() {
  const navigate = useNavigate();
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [currentUser, setCurrentUser] = useState(userService.getCurrentSession());

  useEffect(() => {
    // Check if user is authenticated
    if (!userService.isAuthenticated()) {
      navigate('/signin');
    }
  }, [navigate]);

  const handleLogout = () => {
    userService.signOut();
    navigate('/signin');
  };

  const dashboardCards = [
    {
      title: 'Academic Progress',
      description: 'Track your academic performance and goals',
      icon: <TrendingUp className="w-8 h-8 text-uniiq-blue-primary" />,
      link: '#',
      color: 'from-blue-50 to-blue-100'
    },
    {
      title: 'Course Planning',
      description: 'Plan your course schedule and requirements',
      icon: <Calendar className="w-8 h-8 text-green-600" />,
      link: '#',
      color: 'from-green-50 to-green-100'
    },
    {
      title: 'Study Resources',
      description: 'Access tutoring and learning materials',
      icon: <BookOpen className="w-8 h-8 text-purple-600" />,
      link: '#',
      color: 'from-purple-50 to-purple-100'
    },
    {
      title: 'College Goals',
      description: 'Discover your path to college success',
      icon: <Target className="w-8 h-8 text-orange-600" />,
      link: '#',
      color: 'from-orange-50 to-orange-100'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 font-plus-jakarta">
      {/* Navigation Header */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Logo size="sm" />

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-6">
              <Link 
                to="/dashboard" 
                className="flex items-center gap-2 px-3 py-2 text-uniiq-blue-primary bg-blue-50 rounded-lg"
              >
                <Home size={18} />
                <span className="font-plus-jakarta font-medium">Dashboard</span>
              </Link>
              <Link 
                to="/preferences" 
                className="flex items-center gap-2 px-3 py-2 text-uniiq-neutral-900 hover:text-uniiq-blue-primary transition-colors"
              >
                <Settings size={18} />
                <span className="font-plus-jakarta font-medium">Preferences</span>
              </Link>
              <Link 
                to="/debug" 
                className="flex items-center gap-2 px-3 py-2 text-uniiq-neutral-900 hover:text-uniiq-blue-primary transition-colors"
              >
                <span className="font-plus-jakarta font-medium">Debug</span>
              </Link>
              <div className="h-6 w-px bg-gray-300" />
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <div className="text-sm font-medium text-uniiq-neutral-900">
                    {currentUser?.name || 'Guest'}
                  </div>
                  <div className="text-xs text-uniiq-neutral-500">
                    {currentUser?.email}
                  </div>
                </div>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 px-3 py-2 text-uniiq-neutral-900 hover:text-red-600 transition-colors"
                >
                  <LogOut size={18} />
                  <span className="font-plus-jakarta font-medium">Sign Out</span>
                </button>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              className="md:hidden p-2 text-uniiq-neutral-900 hover:text-uniiq-blue-primary transition-colors"
            >
              {showMobileMenu ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Menu */}
          {showMobileMenu && (
            <div className="md:hidden border-t border-gray-200 py-4">
              <div className="flex flex-col space-y-3">
                <Link 
                  to="/dashboard" 
                  className="flex items-center gap-2 px-3 py-2 text-uniiq-blue-primary bg-blue-50 rounded-lg"
                  onClick={() => setShowMobileMenu(false)}
                >
                  <Home size={18} />
                  <span className="font-plus-jakarta font-medium">Dashboard</span>
                </Link>
                <Link 
                  to="/preferences" 
                  className="flex items-center gap-2 px-3 py-2 text-uniiq-neutral-900 hover:text-uniiq-blue-primary transition-colors"
                  onClick={() => setShowMobileMenu(false)}
                >
                  <Settings size={18} />
                  <span className="font-plus-jakarta font-medium">Preferences</span>
                </Link>
                <Link 
                  to="/debug" 
                  className="flex items-center gap-2 px-3 py-2 text-uniiq-neutral-900 hover:text-uniiq-blue-primary transition-colors"
                  onClick={() => setShowMobileMenu(false)}
                >
                  <span className="font-plus-jakarta font-medium">Debug</span>
                </Link>
                <div className="border-t border-gray-200 my-2" />
                <div className="px-3 py-2">
                  <div className="text-sm font-medium text-uniiq-neutral-900">
                    {currentUser?.name || 'Guest'}
                  </div>
                  <div className="text-xs text-uniiq-neutral-500">
                    {currentUser?.email}
                  </div>
                </div>
                <button
                  onClick={() => {
                    setShowMobileMenu(false);
                    handleLogout();
                  }}
                  className="flex items-center gap-2 px-3 py-2 text-red-600 hover:text-red-700 transition-colors"
                >
                  <LogOut size={18} />
                  <span className="font-plus-jakarta font-medium">Sign Out</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-uniiq-neutral-900 mb-2">
            Welcome back, {currentUser?.name}!
          </h1>
          <p className="text-uniiq-neutral-600">
            Here's your overview to help you discover your perfect path to college.
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg p-6 border border-gray-200">
            <div className="text-2xl font-bold text-uniiq-neutral-900">0</div>
            <div className="text-sm text-uniiq-neutral-600">Courses Completed</div>
          </div>
          <div className="bg-white rounded-lg p-6 border border-gray-200">
            <div className="text-2xl font-bold text-uniiq-neutral-900">0</div>
            <div className="text-sm text-uniiq-neutral-600">Study Hours</div>
          </div>
          <div className="bg-white rounded-lg p-6 border border-gray-200">
            <div className="text-2xl font-bold text-uniiq-neutral-900">0</div>
            <div className="text-sm text-uniiq-neutral-600">Goals Achieved</div>
          </div>
          <div className="bg-white rounded-lg p-6 border border-gray-200">
            <div className="text-2xl font-bold text-uniiq-neutral-900">0</div>
            <div className="text-sm text-uniiq-neutral-600">College Matches</div>
          </div>
        </div>

        {/* Dashboard Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {dashboardCards.map((card, index) => (
            <div 
              key={index}
              className={`bg-gradient-to-br ${card.color} rounded-xl p-6 border border-gray-200 hover:shadow-md transition-shadow cursor-pointer`}
            >
              <div className="flex items-start gap-4">
                <div className="p-3 bg-white rounded-lg shadow-sm">
                  {card.icon}
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-uniiq-neutral-900 mb-2">
                    {card.title}
                  </h3>
                  <p className="text-uniiq-neutral-600 mb-4">
                    {card.description}
                  </p>
                  <button className="text-uniiq-blue-primary hover:text-uniiq-blue-primary/80 font-medium text-sm">
                    Get Started →
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-uniiq-neutral-900 mb-4">
            Quick Actions
          </h3>
          <div className="flex flex-wrap gap-3">
            <Link 
              to="/preferences"
              className="px-4 py-2 bg-uniiq-blue-primary text-white rounded-lg hover:bg-uniiq-blue-primary/90 transition-colors"
            >
              Complete Profile Setup
            </Link>
            <button className="px-4 py-2 border border-gray-300 text-uniiq-neutral-900 rounded-lg hover:bg-gray-50 transition-colors">
              Take Assessment
            </button>
            <button className="px-4 py-2 border border-gray-300 text-uniiq-neutral-900 rounded-lg hover:bg-gray-50 transition-colors">
              Explore Colleges
            </button>
            <button className="px-4 py-2 border border-gray-300 text-uniiq-neutral-900 rounded-lg hover:bg-gray-50 transition-colors">
              Find Tutors
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
