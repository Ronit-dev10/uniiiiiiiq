import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  User,
  Brain,
  MessageCircle,
  Calendar,
  Search,
  FileText,
  Users,
  Target,
  Settings,
  Plus,
  ChevronRight,
  Clock,
  MapPin,
  Star,
  DollarSign,
} from "lucide-react";
import { userService } from "../services/userService";

export function Dashboard() {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(
    userService.getCurrentSession(),
  );
  const [activeSection, setActiveSection] = useState("student-profile");

  useEffect(() => {
    // Check if user is authenticated
    if (!userService.isAuthenticated()) {
      navigate("/signin");
    }
  }, [navigate]);

  const sidebarItems = [
    {
      id: "student-profile",
      label: "Student Profile",
      icon: <User size={20} />,
      active: true,
    },
    {
      id: "smartadmit",
      label: "SmartAdmit",
      icon: <Brain size={20} />,
      active: false,
    },
    {
      id: "chat",
      label: "Chat",
      icon: <MessageCircle size={20} />,
      active: false,
    },
    {
      id: "profile-planner",
      label: "Profile Planner",
      icon: <User size={20} />,
      active: false,
    },
    {
      id: "university-finder",
      label: "University Finder",
      icon: <Search size={20} />,
      active: false,
    },
    {
      id: "essay-builder",
      label: "Essay Builder",
      icon: <FileText size={20} />,
      active: false,
    },
    {
      id: "counsellor-centre",
      label: "Counsellor Centre",
      icon: <Users size={20} />,
      active: false,
    },
    {
      id: "app-tracker",
      label: "App Tracker",
      icon: <Target size={20} />,
      active: false,
    },
    {
      id: "my-preferences",
      label: "My Preferences",
      icon: <Settings size={20} />,
      active: false,
    },
  ];

  const progressSteps = [
    { step: 1, title: "Identify Your Goals", completed: true },
    { step: 2, title: "Assess Your Chances", completed: false },
    { step: 3, title: "Build a Strong Profile", completed: false },
    { step: 4, title: "Shortlist the Right Universities", completed: false },
    { step: 5, title: "Craft Your Essays and Applications", completed: false },
    { step: 6, title: "Keep Track of your Applications", completed: false },
  ];

  const calendarEvents = [
    {
      time: "9:30 AM",
      title: "Debate Club",
      type: "club",
    },
    {
      time: "12:00 PM",
      title: "Meeting with [counsellor name]",
      type: "meeting",
    },
  ];

  const recentActivities = [
    {
      title: "Submitted mock essay",
      time: "2h ago",
    },
    {
      title: "Submitted Pace Application #",
      time: "5h ago",
    },
    {
      title: "Set appointment with [counsellor name here] for April 7, 2021",
      time: "4h ago",
    },
    {
      title: "Added a new grade",
      time: "6d ago",
    },
  ];

  const journeyStats = [
    {
      number: 1,
      label: "Extracurriculars",
      color: "bg-green-100 text-green-600",
    },
    {
      number: 3,
      label: "Summer Courses",
      color: "bg-yellow-100 text-yellow-600",
    },
    {
      number: 4,
      label: "Academics",
      color: "bg-blue-100 text-blue-600",
    },
    {
      number: 0,
      label: "Research & Work Experiences",
      color: "bg-purple-100 text-purple-600",
    },
    {
      number: 2,
      label: "Academic Competitions",
      color: "bg-green-100 text-green-600",
    },
    {
      number: 5,
      label: "Universities Shortlisted",
      color: "bg-yellow-100 text-yellow-600",
    },
  ];

  const bestFitColleges = [
    {
      name: "Brown University",
      location: "Providence, Rhode Island",
      match: "Competitive",
      description:
        "Brown University is a private Ivy League institution with approximately 10,000 students.",
      smartAdmitScore: "65%",
      gpa: "3.9",
      sat: "1600",
      act: "34",
      tuition: "$65,000",
      avgAid: "$45,000",
      logo: "🎓",
    },
    {
      name: "Princeton University",
      location: "Princeton, New Jersey",
      match: "Competitive",
      description:
        "Princeton University is a private Ivy League institution with approximately 5,700 students.",
      smartAdmitScore: "65%",
      gpa: "3.9",
      sat: "1600",
      act: "34",
      tuition: "$65,000",
      avgAid: "$45,000",
      logo: "🎓",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex font-plus-jakarta">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
        {/* Logo */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">U</span>
            </div>
            <span className="text-xl font-bold text-gray-900">uniiq</span>
          </div>
        </div>

        {/* Dashboards Section */}
        <div className="px-6 py-4">
          <div className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-3">
            DASHBOARDS
          </div>
          <div className="space-y-1">
            {sidebarItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveSection(item.id);
                  if (item.id === "my-preferences") {
                    navigate("/preferences");
                  }
                }}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-colors ${
                  item.id === "student-profile"
                    ? "bg-gray-100 text-gray-900"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                }`}
              >
                {item.icon}
                <span className="text-sm font-medium">{item.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Applications Section */}
        <div className="px-6 py-4">
          <div className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-3">
            APPLICATIONS
          </div>
          <div className="space-y-1">
            <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors">
              <Calendar size={20} />
              <span className="text-sm font-medium">Profile Planner</span>
              <ChevronRight size={16} className="ml-auto" />
            </button>
            <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors">
              <Search size={20} />
              <span className="text-sm font-medium">University Finder</span>
              <ChevronRight size={16} className="ml-auto" />
            </button>
            <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors">
              <FileText size={20} />
              <span className="text-sm font-medium">Essay Builder</span>
              <ChevronRight size={16} className="ml-auto" />
            </button>
            <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors">
              <Users size={20} />
              <span className="text-sm font-medium">Counsellor Centre</span>
            </button>
            <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors">
              <Target size={20} />
              <span className="text-sm font-medium">App Tracker</span>
            </button>
            <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors">
              <Settings size={20} />
              <span className="text-sm font-medium">My Preferences</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Student Profile
              </h1>
              <p className="text-gray-600 mt-1">
                Find ways to improve your academics, track your scores and
                access tutoring resources
              </p>
            </div>
            <div className="flex items-center gap-4">
              <button className="p-2 hover:bg-gray-100 rounded-lg">
                <Search size={20} className="text-gray-500" />
              </button>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
                <span className="text-sm font-medium text-gray-700">
                  Scarlet
                </span>
                <ChevronRight size={16} className="text-gray-400" />
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="p-6">
          {/* Welcome Section */}
          <div className="bg-gradient-to-r from-gray-900 to-gray-700 rounded-xl p-6 mb-6 text-white relative overflow-hidden">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold mb-2">
                  Hi Scarlet, Welcome!
                </h2>
                <p className="text-gray-300 mb-6">
                  You're making great progress! Lorem ipsum dolor sit amet
                  consectetur.
                </p>

                {/* Progress Steps */}
                <div className="mb-6">
                  <p className="text-sm text-gray-300 mb-4">
                    HERE ARE SOME SUGGESTED NEXT STEPS TO HELP YOU REACH YOUR
                    GOALS:
                  </p>
                  <div className="flex items-center gap-4 overflow-x-auto">
                    {progressSteps.map((step, index) => (
                      <div
                        key={step.step}
                        className="flex items-center gap-4 min-w-max"
                      >
                        <div className="flex flex-col items-center">
                          <div
                            className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold ${
                              step.completed
                                ? "bg-white text-gray-900"
                                : "bg-gray-600 text-white"
                            }`}
                          >
                            {step.step}
                          </div>
                          <p className="text-xs text-center mt-2 max-w-20">
                            {step.title}
                          </p>
                        </div>
                        {index < progressSteps.length - 1 && (
                          <div className="w-8 h-px bg-gray-600 mt-[-20px]"></div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="absolute right-6 top-6">
                <div className="w-32 h-32 bg-white/10 rounded-full flex items-center justify-center">
                  <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center">
                    <User size={32} className="text-white" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column */}
            <div className="lg:col-span-2 space-y-6">
              {/* Calendar Section */}
              <div className="bg-white rounded-xl p-6 border border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-gray-900">
                    Student Calendar
                  </h3>
                  <span className="text-sm text-gray-500">Today</span>
                </div>
                <p className="text-sm text-gray-600 mb-4">
                  Lorem ipsum dolor sit amet consectetur.
                </p>

                {/* Calendar Grid */}
                <div className="grid grid-cols-7 gap-1 mb-4">
                  <div className="text-center text-xs font-medium text-gray-500 py-2">
                    Sun
                  </div>
                  <div className="text-center text-xs font-medium text-gray-500 py-2">
                    Mon
                  </div>
                  <div className="text-center text-xs font-medium text-gray-500 py-2">
                    Tue
                  </div>
                  <div className="text-center text-xs font-medium text-gray-500 py-2">
                    Wed
                  </div>
                  <div className="text-center text-xs font-medium text-gray-500 py-2">
                    Thu
                  </div>
                  <div className="text-center text-xs font-medium text-gray-500 py-2">
                    Fri
                  </div>
                  <div className="text-center text-xs font-medium text-gray-500 py-2">
                    Sat
                  </div>

                  {[...Array(31)].map((_, i) => (
                    <div
                      key={i}
                      className={`aspect-square flex items-center justify-center text-sm hover:bg-gray-100 rounded cursor-pointer ${
                        i + 1 === 15
                          ? "bg-gray-900 text-white"
                          : "text-gray-700"
                      }`}
                    >
                      {i + 1}
                    </div>
                  ))}
                </div>

                <div className="text-center text-xs text-gray-500 mb-4">
                  Thursday - 15 May, 2025
                </div>

                {/* Calendar Events */}
                <div className="space-y-3">
                  {calendarEvents.map((event, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <span className="text-xs text-gray-500 min-w-16">
                        {event.time}
                      </span>
                      <div className="flex-1 bg-gray-50 rounded-lg p-3">
                        <p className="text-sm font-medium text-gray-900">
                          {event.title}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <button className="w-full mt-4 py-3 border border-dashed border-gray-300 text-gray-500 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center gap-2">
                  <Plus size={16} />
                  Add new
                </button>
              </div>

              {/* Journey Snapshot */}
              <div className="bg-white rounded-xl p-6 border border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-gray-900">
                    Your Journey Snapshot
                  </h3>
                  <button className="text-sm text-blue-600 hover:text-blue-700">
                    View all
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {journeyStats.map((stat, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div
                        className={`w-12 h-12 rounded-lg ${stat.color} flex items-center justify-center`}
                      >
                        <span className="text-2xl font-bold">
                          {stat.number}
                        </span>
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">
                          {stat.label}
                        </p>
                        <ChevronRight size={16} className="text-gray-400" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              {/* Recent Activities */}
              <div className="bg-white rounded-xl p-6 border border-gray-200">
                <h3 className="text-lg font-bold text-gray-900 mb-4">
                  Recent Activities
                </h3>

                <div className="space-y-4">
                  {recentActivities.map((activity, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">
                          {activity.title}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          {activity.time}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <button className="w-full mt-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors">
                  Need Guidance? Book a Session
                </button>
              </div>
            </div>
          </div>

          {/* Best Fit Colleges */}
          <div className="bg-white rounded-xl p-6 border border-gray-200 mt-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-gray-900">
                Best Fit Colleges
              </h3>
              <button className="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors">
                Shortlist Your Dream University
              </button>
            </div>
            <p className="text-sm text-gray-600 mb-6">
              Lorem ipsum dolor sit amet consectetur.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {bestFitColleges.map((college, index) => (
                <div
                  key={index}
                  className="border border-gray-200 rounded-xl p-6"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-start gap-3">
                      <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                        <span className="text-2xl">{college.logo}</span>
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900">
                          {college.name}
                        </h4>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="px-2 py-1 bg-gray-100 text-xs font-medium rounded">
                            {college.match}
                          </span>
                        </div>
                        <div className="flex items-center gap-1 mt-1">
                          <MapPin size={12} className="text-gray-400" />
                          <span className="text-xs text-gray-500">
                            {college.location}
                          </span>
                        </div>
                      </div>
                    </div>
                    <button className="p-1 hover:bg-gray-100 rounded">
                      <Star size={16} className="text-gray-400" />
                    </button>
                  </div>

                  <p className="text-sm text-gray-600 mb-4">
                    {college.description}
                  </p>

                  <div className="grid grid-cols-2 gap-4 text-xs">
                    <div>
                      <span className="text-gray-500">SmartAdmit Score: </span>
                      <span className="font-medium">
                        {college.smartAdmitScore}
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-500">Avg Aid: </span>
                      <span className="font-medium">${college.avgAid}</span>
                    </div>
                    <div>
                      <span className="text-gray-500">GPA: </span>
                      <span className="font-medium">{college.gpa}</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Tuition: </span>
                      <span className="font-medium">${college.tuition}</span>
                    </div>
                    <div>
                      <span className="text-gray-500">SAT: </span>
                      <span className="font-medium">{college.sat}</span>
                    </div>
                    <div>
                      <span className="text-gray-500">ACT: </span>
                      <span className="font-medium">{college.act}</span>
                    </div>
                  </div>

                  <div className="flex gap-2 mt-4">
                    <button className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                      View
                    </button>
                    <button className="flex-1 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors">
                      Apply Now
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
