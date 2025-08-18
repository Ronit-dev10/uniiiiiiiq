import { useState, useEffect } from "react";
import {
  ArrowRight,
  ArrowLeft,
  User,
  GraduationCap,
  Target,
  DollarSign,
  ChevronDown,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { FormInput } from "../components/FormInput";
import { Dropdown } from "../components/Dropdown";
import { userService } from "../services/userService";
import { Logo } from "../components/Logo";

interface PreferenceSectionProps {
  id: string;
  title: string;
  icon: React.ReactNode;
  isActive: boolean;
  isCompleted?: boolean;
  onClick: () => void;
  children?: React.ReactNode;
}

function PreferenceSection({
  id,
  title,
  icon,
  isActive,
  isCompleted = false,
  onClick,
  children,
}: PreferenceSectionProps) {
  return (
    <div className="flex flex-col rounded-lg border border-gray-100/50 bg-uniiq-base-white shadow-sm">
      <div
        className="flex items-center gap-2.5 px-7 py-[18px] border-b border-uniiq-gray-100 cursor-pointer"
        onClick={onClick}
      >
        <div
          className={`flex items-center justify-center w-10 h-10 rounded-lg transition-all duration-200 ${
            isActive
              ? "bg-yellow-100 text-uniiq-accent-2"
              : isCompleted
              ? "bg-green-100 text-green-600"
              : "bg-gray-100 text-gray-400"
          }`}
        >
          {icon}
        </div>
        <div className="flex items-center gap-2.5">
          <h3
            className={`font-plus-jakarta font-semibold text-[18px] leading-[120%] ${
              isActive ? "text-uniiq-base-black" : "text-uniiq-gray-400"
            }`}
          >
            {title}
          </h3>
        </div>
        {isCompleted && (
          <div className="w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center ml-auto">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        )}
        {isActive && !isCompleted && (
          <div className="w-1 h-10 bg-uniiq-accent-2 rounded-full ml-auto" />
        )}
      </div>

      {isActive && children && <div className="p-7">{children}</div>}
    </div>
  );
}

export function MyPreferences() {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState("personal");
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    age: "",
    gradeClass: "",
    schoolName: "",
    citizenship: "",
    // Academic Preferences
    boardOfEducation: "",
    subjectsTaken: "",
    gradesSubject: "",
    gradesScore: "",
    awards: "",
    satScore: "",
    satDate: "",
    actScore: "",
    actDate: "",
    apName: "",
    apScore: "",
    apDate: "",
    psatScore: "",
    psatDate: "",
    toeflScore: "",
    toeflDate: "",
    // Goals
    hoursPerWeek: 2.5,
    goalsDefinedYes: false,
    goalsDefinedNo: false,
  });

  const [completedSections, setCompletedSections] = useState({
    personal: false,
    academic: false,
    goals: false,
  });

  // Load user data from session on component mount
  useEffect(() => {
    const session = userService.getCurrentSession();
    if (session) {
      setFormData((prev) => ({
        ...prev,
        fullName: session.name || "",
      }));
    }
  }, []);

  const handleBack = () => {
    navigate("/signup");
  };

  const gradeOptions = [
    "9th Grade",
    "10th Grade",
    "11th Grade",
    "12th Grade",
    "Undergraduate Year 1",
    "Undergraduate Year 2",
    "Undergraduate Year 3",
    "Undergraduate Year 4",
    "Graduate Student",
  ];

  const citizenshipOptions = [
    "United States",
    "Canada",
    "United Kingdom",
    "Australia",
    "Germany",
    "France",
    "Japan",
    "South Korea",
    "India",
    "China",
    "Brazil",
    "Mexico",
    "Other",
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleNext = (currentSection: string) => {
    // Mark current section as completed
    setCompletedSections(prev => ({ ...prev, [currentSection]: true }));

    // Move to next section
    if (currentSection === "personal") {
      setActiveSection("academic");
    } else if (currentSection === "academic") {
      setActiveSection("goals");
    } else if (currentSection === "goals") {
      // Final submission
      console.log("All preferences completed:", formData);
    }
  };

  const handlePrevious = (currentSection: string) => {
    if (currentSection === "goals") {
      setActiveSection("academic");
    } else if (currentSection === "academic") {
      setActiveSection("personal");
    }
  };

  const boardOfEducationOptions = [
    "CBSE",
    "ICSE",
    "State Board",
    "IB",
    "Cambridge",
    "Other",
  ];

  const subjectOptions = [
    "Mathematics",
    "Physics",
    "Chemistry",
    "Biology",
    "English",
    "History",
    "Geography",
    "Computer Science",
    "Economics",
    "Other",
  ];

  const awardsOptions = [
    "National Merit Scholar",
    "Science Olympiad",
    "Math Olympiad",
    "Academic Excellence",
    "Perfect Attendance",
    "Leadership Award",
    "Community Service",
    "Other",
    "None",
  ];

  return (
    <div className="min-h-screen bg-white font-plus-jakarta relative">
      {/* Simple Navigation */}
      <div className="absolute top-6 left-6 z-50">
        <Logo size="sm" />
      </div>

      <div className="absolute top-6 right-6 z-50">
        <button
          onClick={handleBack}
          className="flex items-center gap-2 px-3 py-2 text-uniiq-neutral-700 hover:text-uniiq-neutral-900 transition-all duration-200 hover:bg-white/10 rounded-lg"
        >
          <span className="font-plus-jakarta font-medium text-[14px]">Skip, Back to Sign Up</span>
          <ArrowLeft size={16} />
        </button>
      </div>

      {/* Background decoration - keeping it subtle */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -left-6 top-[913px] w-[1501px] h-[331px]">
          <div className="w-[751px] h-[331px] opacity-20 absolute left-0 top-0 bg-gray-100 rounded-lg" />
          <div className="w-[751px] h-[331px] opacity-20 absolute left-[750px] top-0 bg-gray-100 rounded-lg" />
        </div>
      </div>

      <div className="relative z-10 max-w-[1275px] mx-auto px-6 py-20 animate-in fade-in duration-500">
        <div className="bg-white rounded-xl border border-gray-200/50 shadow-lg overflow-hidden">
          {/* Header */}
          <div className="px-6 py-6 border-b border-uniiq-gray-100 bg-white rounded-t-xl">
            <div className="text-center">
              <h1 className="font-plus-jakarta font-bold text-[28px] leading-[130%] text-uniiq-neutral-900 mb-3">
                My Preferences
              </h1>
              <p className="font-plus-jakarta text-[14px] leading-[134%] text-uniiq-neutral-800">
                Find ways to improve your academics, track your scores and
                access tutoring resources
              </p>
            </div>
          </div>

          {/* Form Content */}
          <div className="px-10 py-8">
            <div className="space-y-4">
              {/* Personal Info Section */}
              <PreferenceSection
                id="personal"
                title="Personal Info"
                icon={<User size={24} />}
                isActive={activeSection === "personal"}
                isCompleted={completedSections.personal}
                onClick={() => setActiveSection("personal")}
              >
                <div className="space-y-6 animate-in slide-in-from-top duration-300">
                  <div className="space-y-6">
                    {/* Name and Age Row */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormInput
                        label="Full Name *"
                        placeholder="John"
                        value={formData.fullName}
                        onChange={(e) =>
                          handleInputChange("fullName", e.target.value)
                        }
                        required
                      />
                      <FormInput
                        label="Age"
                        placeholder="18 years"
                        value={formData.age}
                        onChange={(e) =>
                          handleInputChange("age", e.target.value)
                        }
                      />
                    </div>

                    {/* Grade/Class */}
                    <Dropdown
                      label="Current Grade/Class *"
                      placeholder="--Select--"
                      options={gradeOptions}
                      value={formData.gradeClass}
                      onChange={(value) =>
                        handleInputChange("gradeClass", value)
                      }
                      required
                    />

                    {/* School Name and Citizenship Row */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormInput
                        label="School Name *"
                        placeholder="Doo"
                        value={formData.schoolName}
                        onChange={(e) =>
                          handleInputChange("schoolName", e.target.value)
                        }
                        required
                      />
                      <Dropdown
                        label="Citizenship *"
                        placeholder="Text"
                        options={citizenshipOptions}
                        value={formData.citizenship}
                        onChange={(value) =>
                          handleInputChange("citizenship", value)
                        }
                        required
                      />
                    </div>
                  </div>

                  {/* Next Button */}
                  <div className="flex justify-end">
                    <button
                      onClick={() => handleNext("personal")}
                      className="flex items-center gap-1.5 px-[18px] py-[11px]
                               border border-uniiq-neutral-1100 rounded-md text-uniiq-neutral-1100
                               hover:bg-uniiq-neutral-1100 hover:text-white transition-all duration-200 hover:scale-105"
                    >
                      <span className="font-plus-jakarta font-semibold text-[15px]">
                        Next
                      </span>
                      <ArrowRight size={18} />
                    </button>
                  </div>
                </div>
              </PreferenceSection>

              {/* Academic Preferences Section */}
              <PreferenceSection
                id="academic"
                title="Academic Preferences"
                icon={<GraduationCap size={24} />}
                isActive={activeSection === "academic"}
                isCompleted={completedSections.academic}
                onClick={() => setActiveSection("academic")}
              >
                <div className="space-y-8 animate-in slide-in-from-top duration-300">
                  {/* Board of Education and Subjects */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Dropdown
                      label="Board of Education *"
                      placeholder="--Select--"
                      options={boardOfEducationOptions}
                      value={formData.boardOfEducation}
                      onChange={(value) => handleInputChange("boardOfEducation", value)}
                      required
                    />
                    <Dropdown
                      label="Subjects Taken *"
                      placeholder="--Select--"
                      options={subjectOptions}
                      value={formData.subjectsTaken}
                      onChange={(value) => handleInputChange("subjectsTaken", value)}
                      required
                    />
                  </div>

                  {/* Grades Section */}
                  <div className="space-y-3">
                    <label className="font-plus-jakarta font-semibold text-[15px] text-uniiq-neutral-1100">
                      Grades *
                    </label>
                    <div className="flex items-center gap-2 flex-wrap">
                      <div className="flex-1 min-w-[200px]">
                        <select
                          value={formData.gradesSubject}
                          onChange={(e) => handleInputChange("gradesSubject", e.target.value)}
                          className="w-full px-3 py-3 border border-uniiq-neutral-200 rounded-md font-plus-jakarta text-[14px] text-uniiq-neutral-1100 bg-white focus:outline-none focus:ring-2 focus:ring-uniiq-blue-primary focus:border-transparent"
                        >
                          <option value="">--Select Subject--</option>
                          {subjectOptions.map((subject) => (
                            <option key={subject} value={subject}>
                              {subject}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="flex-1 min-w-[200px]">
                        <input
                          type="text"
                          placeholder="Enter Score"
                          value={formData.gradesScore}
                          onChange={(e) => handleInputChange("gradesScore", e.target.value)}
                          className="w-full px-3 py-3 border border-uniiq-neutral-200 rounded-md font-plus-jakarta text-[14px] text-uniiq-neutral-1100 placeholder:text-uniiq-gray-400 focus:outline-none focus:ring-2 focus:ring-uniiq-blue-primary focus:border-transparent"
                        />
                      </div>
                      <div className="pl-4">
                        <button className="font-plus-jakarta font-semibold text-[14px] text-uniiq-blue-primary underline hover:no-underline transition-all duration-200">
                          Or Upload marksheet
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Awards */}
                  <Dropdown
                    label="Awards *"
                    placeholder="--Select--"
                    options={awardsOptions}
                    value={formData.awards}
                    onChange={(value) => handleInputChange("awards", value)}
                    required
                  />

                  {/* Standardized Tests Section */}
                  <div className="bg-gray-100/40 rounded-lg p-6 space-y-6">
                    <h3 className="font-plus-jakarta font-semibold text-[18px] text-uniiq-base-black">
                      Standardized Tests Taken:
                    </h3>

                    {/* SAT */}
                    <div className="space-y-2">
                      <label className="font-plus-jakarta font-semibold text-[15px] text-uniiq-neutral-1100">
                        SAT *
                      </label>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        <input
                          type="text"
                          placeholder="Enter Score"
                          value={formData.satScore}
                          onChange={(e) => handleInputChange("satScore", e.target.value)}
                          className="px-3 py-3 border border-uniiq-neutral-200 rounded-md font-plus-jakarta text-[14px] text-uniiq-neutral-1100 placeholder:text-uniiq-gray-400 focus:outline-none focus:ring-2 focus:ring-uniiq-blue-primary focus:border-transparent"
                        />
                        <input
                          type="date"
                          placeholder="dd/mm/yyyy"
                          value={formData.satDate}
                          onChange={(e) => handleInputChange("satDate", e.target.value)}
                          className="px-3 py-3 border border-uniiq-neutral-200 rounded-md font-plus-jakarta text-[14px] text-uniiq-neutral-1100 placeholder:text-uniiq-gray-400 focus:outline-none focus:ring-2 focus:ring-uniiq-blue-primary focus:border-transparent"
                        />
                      </div>
                    </div>

                    {/* ACT */}
                    <div className="space-y-2">
                      <label className="font-plus-jakarta font-semibold text-[15px] text-uniiq-neutral-1100">
                        ACT *
                      </label>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        <input
                          type="text"
                          placeholder="Enter Score"
                          value={formData.actScore}
                          onChange={(e) => handleInputChange("actScore", e.target.value)}
                          className="px-3 py-3 border border-uniiq-neutral-200 rounded-md font-plus-jakarta text-[14px] text-uniiq-neutral-1100 placeholder:text-uniiq-gray-400 focus:outline-none focus:ring-2 focus:ring-uniiq-blue-primary focus:border-transparent"
                        />
                        <input
                          type="date"
                          placeholder="dd/mm/yyyy"
                          value={formData.actDate}
                          onChange={(e) => handleInputChange("actDate", e.target.value)}
                          className="px-3 py-3 border border-uniiq-neutral-200 rounded-md font-plus-jakarta text-[14px] text-uniiq-neutral-1100 placeholder:text-uniiq-gray-400 focus:outline-none focus:ring-2 focus:ring-uniiq-blue-primary focus:border-transparent"
                        />
                      </div>
                    </div>

                    {/* AP */}
                    <div className="space-y-2">
                      <label className="font-plus-jakarta font-semibold text-[15px] text-uniiq-neutral-1100">
                        AP *
                      </label>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                        <input
                          type="text"
                          placeholder="Name"
                          value={formData.apName}
                          onChange={(e) => handleInputChange("apName", e.target.value)}
                          className="px-3 py-3 border border-uniiq-neutral-200 rounded-md font-plus-jakarta text-[14px] text-uniiq-neutral-1100 placeholder:text-uniiq-gray-400 focus:outline-none focus:ring-2 focus:ring-uniiq-blue-primary focus:border-transparent"
                        />
                        <input
                          type="text"
                          placeholder="Enter Score"
                          value={formData.apScore}
                          onChange={(e) => handleInputChange("apScore", e.target.value)}
                          className="px-3 py-3 border border-uniiq-neutral-200 rounded-md font-plus-jakarta text-[14px] text-uniiq-neutral-1100 placeholder:text-uniiq-gray-400 focus:outline-none focus:ring-2 focus:ring-uniiq-blue-primary focus:border-transparent"
                        />
                        <input
                          type="date"
                          placeholder="dd/mm/yyyy"
                          value={formData.apDate}
                          onChange={(e) => handleInputChange("apDate", e.target.value)}
                          className="px-3 py-3 border border-uniiq-neutral-200 rounded-md font-plus-jakarta text-[14px] text-uniiq-neutral-1100 placeholder:text-uniiq-gray-400 focus:outline-none focus:ring-2 focus:ring-uniiq-blue-primary focus:border-transparent"
                        />
                      </div>
                    </div>

                    {/* PSAT */}
                    <div className="space-y-2">
                      <label className="font-plus-jakarta font-semibold text-[15px] text-uniiq-neutral-1100">
                        PSAT *
                      </label>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        <input
                          type="text"
                          placeholder="Enter Score"
                          value={formData.psatScore}
                          onChange={(e) => handleInputChange("psatScore", e.target.value)}
                          className="px-3 py-3 border border-uniiq-neutral-200 rounded-md font-plus-jakarta text-[14px] text-uniiq-neutral-1100 placeholder:text-uniiq-gray-400 focus:outline-none focus:ring-2 focus:ring-uniiq-blue-primary focus:border-transparent"
                        />
                        <input
                          type="date"
                          placeholder="dd/mm/yyyy"
                          value={formData.psatDate}
                          onChange={(e) => handleInputChange("psatDate", e.target.value)}
                          className="px-3 py-3 border border-uniiq-neutral-200 rounded-md font-plus-jakarta text-[14px] text-uniiq-neutral-1100 placeholder:text-uniiq-gray-400 focus:outline-none focus:ring-2 focus:ring-uniiq-blue-primary focus:border-transparent"
                        />
                      </div>
                    </div>

                    {/* TOEFL/IELTS */}
                    <div className="space-y-2">
                      <label className="font-plus-jakarta font-semibold text-[15px] text-uniiq-neutral-1100">
                        TOEFL/IELTS *
                      </label>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        <input
                          type="text"
                          placeholder="Enter Score"
                          value={formData.toeflScore}
                          onChange={(e) => handleInputChange("toeflScore", e.target.value)}
                          className="px-3 py-3 border border-uniiq-neutral-200 rounded-md font-plus-jakarta text-[14px] text-uniiq-neutral-1100 placeholder:text-uniiq-gray-400 focus:outline-none focus:ring-2 focus:ring-uniiq-blue-primary focus:border-transparent"
                        />
                        <input
                          type="date"
                          placeholder="dd/mm/yyyy"
                          value={formData.toeflDate}
                          onChange={(e) => handleInputChange("toeflDate", e.target.value)}
                          className="px-3 py-3 border border-uniiq-neutral-200 rounded-md font-plus-jakarta text-[14px] text-uniiq-neutral-1100 placeholder:text-uniiq-gray-400 focus:outline-none focus:ring-2 focus:ring-uniiq-blue-primary focus:border-transparent"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Navigation Buttons */}
                  <div className="flex justify-between">
                    <button
                      onClick={() => handlePrevious("academic")}
                      className="flex items-center gap-1.5 px-[18px] py-[11px]
                               border border-uniiq-neutral-1100 rounded-md text-uniiq-neutral-1100
                               hover:bg-uniiq-neutral-1100 hover:text-white transition-all duration-200 hover:scale-105"
                    >
                      <ArrowLeft size={18} />
                      <span className="font-plus-jakarta font-semibold text-[15px]">
                        Back
                      </span>
                    </button>
                    <button
                      onClick={() => handleNext("academic")}
                      className="flex items-center gap-1.5 px-[18px] py-[11px]
                               border border-uniiq-neutral-1100 rounded-md text-uniiq-neutral-1100
                               hover:bg-uniiq-neutral-1100 hover:text-white transition-all duration-200 hover:scale-105"
                    >
                      <span className="font-plus-jakarta font-semibold text-[15px]">
                        Next
                      </span>
                      <ArrowRight size={18} />
                    </button>
                  </div>
                </div>
              </PreferenceSection>

              {/* Goals Section */}
              <PreferenceSection
                id="goals"
                title="Goals"
                icon={<Target size={24} />}
                isActive={activeSection === "goals"}
                isCompleted={completedSections.goals}
                onClick={() => setActiveSection("goals")}
              >
                <div className="space-y-8 animate-in slide-in-from-top duration-300">
                  {/* Hours Per Week Slider */}
                  <div className="space-y-5">
                    <label className="font-plus-jakarta font-semibold text-[15px] text-uniiq-neutral-1100 block">
                      How many hours per week can you realistically dedicate to new opportunities or prep?
                    </label>

                    <div className="space-y-3">
                      {/* Slider */}
                      <div className="relative">
                        <div className="w-full h-2.5 bg-gray-200/60 rounded-lg border border-gray-200">
                          <div
                            className="h-2.5 bg-uniiq-accent-4-100 rounded-lg transition-all duration-300"
                            style={{ width: `${(formData.hoursPerWeek / 10) * 100}%` }}
                          />
                        </div>
                        <div
                          className="absolute top-0 w-4 h-4 bg-uniiq-accent-4-300 border-2 border-white rounded-full shadow-md cursor-pointer transform -translate-y-1"
                          style={{ left: `${(formData.hoursPerWeek / 10) * 100}%`, transform: `translateX(-50%) translateY(-25%)` }}
                        />
                        <input
                          type="range"
                          min="0"
                          max="10"
                          step="0.5"
                          value={formData.hoursPerWeek}
                          onChange={(e) => handleInputChange("hoursPerWeek", parseFloat(e.target.value))}
                          className="absolute inset-0 w-full h-4 opacity-0 cursor-pointer"
                        />
                      </div>

                      {/* Number Labels */}
                      <div className="flex justify-between text-uniiq-neutral-700 text-sm font-semibold">
                        <span>0</span>
                        <span>1</span>
                        <span>2</span>
                        <span>3</span>
                        <span>4</span>
                        <span>5</span>
                        <span>6</span>
                        <span>7</span>
                        <span>8</span>
                        <span>9</span>
                        <span>10+</span>
                      </div>
                    </div>
                  </div>

                  {/* Goals Defined Question */}
                  <div className="space-y-4">
                    <label className="font-plus-jakarta font-semibold text-[15px] text-uniiq-neutral-1100 block">
                      Are your goals defined?
                    </label>

                    <div className="flex gap-2 max-w-md">
                      <button
                        onClick={() => {
                          handleInputChange("goalsDefinedYes", true);
                          handleInputChange("goalsDefinedNo", false);
                        }}
                        className={`flex-1 px-3 py-3 rounded border text-center font-plus-jakarta font-semibold text-[15px] transition-all duration-200 ${
                          formData.goalsDefinedYes
                            ? "border-uniiq-accent-1-100 text-uniiq-accent-1-300 bg-uniiq-accent-1-100/10"
                            : "border-uniiq-neutral-200 text-uniiq-neutral-700 hover:border-uniiq-accent-1-100"
                        }`}
                      >
                        Yes
                      </button>
                      <button
                        onClick={() => {
                          handleInputChange("goalsDefinedNo", true);
                          handleInputChange("goalsDefinedYes", false);
                        }}
                        className={`flex-1 px-3 py-3 rounded border text-center font-plus-jakarta font-semibold text-[15px] transition-all duration-200 ${
                          formData.goalsDefinedNo
                            ? "border-uniiq-accent-4-300 text-uniiq-accent-4-300 bg-uniiq-accent-4-100/10"
                            : "border-uniiq-neutral-200 text-uniiq-neutral-700 hover:border-uniiq-accent-4-300"
                        }`}
                      >
                        No, Still Exploring
                      </button>
                    </div>
                  </div>

                  {/* Navigation Buttons */}
                  <div className="flex justify-between">
                    <button
                      onClick={() => handlePrevious("goals")}
                      className="flex items-center gap-1.5 px-[18px] py-[11px]
                               border border-uniiq-neutral-1100 rounded-md text-uniiq-neutral-1100
                               hover:bg-uniiq-neutral-1100 hover:text-white transition-all duration-200 hover:scale-105"
                    >
                      <ArrowLeft size={18} />
                      <span className="font-plus-jakarta font-semibold text-[15px]">
                        Back
                      </span>
                    </button>
                    <button
                      onClick={() => handleNext("goals")}
                      className="flex items-center gap-1.5 px-[18px] py-[11px]
                               border border-uniiq-neutral-1100 rounded-md text-uniiq-neutral-1100
                               hover:bg-uniiq-neutral-1100 hover:text-white transition-all duration-200 hover:scale-105"
                    >
                      <span className="font-plus-jakarta font-semibold text-[15px]">
                        Complete
                      </span>
                      <ArrowRight size={18} />
                    </button>
                  </div>
                </div>
              </PreferenceSection>

              {/* Budget Section */}
              <PreferenceSection
                id="budget"
                title="Budget"
                icon={<DollarSign size={24} />}
                isActive={activeSection === "budget"}
                onClick={() => setActiveSection("budget")}
              >
                <div className="text-center py-8 text-uniiq-gray-400">
                  <p>Budget content will be added here</p>
                </div>
              </PreferenceSection>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
