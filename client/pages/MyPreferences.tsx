import { useState, useEffect } from 'react';
import { ArrowRight, User, GraduationCap, Target, DollarSign, LogOut, Home, Menu, X } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { FormInput } from '../components/FormInput';
import { Dropdown } from '../components/Dropdown';
import { userService } from '../services/userService';
import { Logo } from '../components/Logo';

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
  children 
}: PreferenceSectionProps) {
  return (
    <div className="flex flex-col rounded-lg border border-gray-100/50 bg-uniiq-base-white shadow-sm">
      <div 
        className="flex items-center gap-2.5 px-7 py-[18px] border-b border-uniiq-gray-100 cursor-pointer"
        onClick={onClick}
      >
        <div className={`flex items-center justify-center w-10 h-10 rounded-lg ${
          isActive 
            ? 'bg-yellow-100 text-uniiq-accent-2' 
            : 'bg-gray-100 text-gray-400'
        }`}>
          {icon}
        </div>
        <div className="flex items-center gap-2.5">
          <h3 className={`font-plus-jakarta font-semibold text-[18px] leading-[120%] ${
            isActive ? 'text-uniiq-base-black' : 'text-uniiq-gray-400'
          }`}>
            {title}
          </h3>
        </div>
        {isActive && (
          <div className="w-1 h-10 bg-uniiq-accent-2 rounded-full ml-auto" />
        )}
      </div>
      
      {isActive && children && (
        <div className="p-7">
          {children}
        </div>
      )}
    </div>
  );
}

export function MyPreferences() {
  const [activeSection, setActiveSection] = useState('personal');
  const [formData, setFormData] = useState({
    fullName: '',
    age: '',
    gradeClass: '',
    schoolName: '',
    citizenship: ''
  });

  // Load user data from session on component mount
  useEffect(() => {
    const session = userService.getCurrentSession();
    if (session) {
      setFormData(prev => ({
        ...prev,
        fullName: session.name || ''
      }));
    }
  }, []);

  const gradeOptions = [
    '9th Grade', '10th Grade', '11th Grade', '12th Grade',
    'Undergraduate Year 1', 'Undergraduate Year 2',
    'Undergraduate Year 3', 'Undergraduate Year 4',
    'Graduate Student'
  ];

  const citizenshipOptions = [
    'United States', 'Canada', 'United Kingdom', 'Australia',
    'Germany', 'France', 'Japan', 'South Korea', 'India',
    'China', 'Brazil', 'Mexico', 'Other'
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    // Move to next section or submit
    console.log('Next clicked', formData);
  };

  return (
    <div className="min-h-screen bg-white font-plus-jakarta relative">
      {/* Background decoration - keeping it subtle */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -left-6 top-[913px] w-[1501px] h-[331px]">
          <div className="w-[751px] h-[331px] opacity-20 absolute left-0 top-0 bg-gray-100 rounded-lg" />
          <div className="w-[751px] h-[331px] opacity-20 absolute left-[750px] top-0 bg-gray-100 rounded-lg" />
        </div>
      </div>

      <div className="relative z-10 max-w-[1275px] mx-auto px-6 py-12">
        <div className="bg-white rounded-xl border border-gray-200/50 shadow-sm overflow-hidden">
          {/* Header */}
          <div className="px-6 py-6 border-b border-uniiq-gray-100 bg-white rounded-t-xl">
            <div className="text-center">
              <h1 className="font-plus-jakarta font-bold text-[28px] leading-[130%] text-uniiq-neutral-900 mb-3">
                My Preferences
              </h1>
              <p className="font-plus-jakarta text-[14px] leading-[134%] text-uniiq-neutral-800 mb-2">
                Find ways to improve your academics, track your scores and access tutoring resources
              </p>
              {(() => {
                const session = userService.getCurrentSession();
                return session ? (
                  <div className="text-xs text-uniiq-blue-primary">
                    Welcome back, {session.name}! ({session.email})
                  </div>
                ) : null;
              })()}
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
                isActive={activeSection === 'personal'}
                onClick={() => setActiveSection('personal')}
              >
                <div className="space-y-6">
                  <div className="space-y-6">
                    {/* Name and Age Row */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormInput 
                        label="Full Name *"
                        placeholder="John"
                        value={formData.fullName}
                        onChange={(e) => handleInputChange('fullName', e.target.value)}
                        required
                      />
                      <FormInput 
                        label="Age"
                        placeholder="18 years"
                        value={formData.age}
                        onChange={(e) => handleInputChange('age', e.target.value)}
                      />
                    </div>

                    {/* Grade/Class */}
                    <Dropdown
                      label="Current Grade/Class *"
                      placeholder="--Select--"
                      options={gradeOptions}
                      value={formData.gradeClass}
                      onChange={(value) => handleInputChange('gradeClass', value)}
                      required
                    />

                    {/* School Name and Citizenship Row */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormInput 
                        label="School Name *"
                        placeholder="Doo"
                        value={formData.schoolName}
                        onChange={(e) => handleInputChange('schoolName', e.target.value)}
                        required
                      />
                      <Dropdown
                        label="Citizenship *"
                        placeholder="Text"
                        options={citizenshipOptions}
                        value={formData.citizenship}
                        onChange={(value) => handleInputChange('citizenship', value)}
                        required
                      />
                    </div>
                  </div>

                  {/* Next Button */}
                  <div className="flex justify-end">
                    <button
                      onClick={handleNext}
                      className="flex items-center gap-1.5 px-[18px] py-[11px] 
                               border border-uniiq-neutral-1100 rounded-md text-uniiq-neutral-1100
                               hover:bg-uniiq-neutral-1100 hover:text-white transition-colors"
                    >
                      <span className="font-plus-jakarta font-semibold text-[15px]">Next</span>
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
                isActive={activeSection === 'academic'}
                onClick={() => setActiveSection('academic')}
              >
                <div className="text-center py-8 text-uniiq-gray-400">
                  <p>Academic preferences content will be added here</p>
                </div>
              </PreferenceSection>

              {/* Goals Section */}
              <PreferenceSection
                id="goals"
                title="Goals"
                icon={<Target size={24} />}
                isActive={activeSection === 'goals'}
                onClick={() => setActiveSection('goals')}
              >
                <div className="text-center py-8 text-uniiq-gray-400">
                  <p>Goals content will be added here</p>
                </div>
              </PreferenceSection>

              {/* Budget Section */}
              <PreferenceSection
                id="budget"
                title="Budget"
                icon={<DollarSign size={24} />}
                isActive={activeSection === 'budget'}
                onClick={() => setActiveSection('budget')}
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
