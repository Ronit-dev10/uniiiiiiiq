import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Logo } from '../components/Logo';
import { SocialButton } from '../components/SocialButton';
import { FormInput } from '../components/FormInput';
import { useNotification } from '../components/Notification';
import { userService } from '../services/userService';

export function SignIn() {
  const navigate = useNavigate();
  const { showSuccess, showError, NotificationContainer } = useNotification();

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const validateForm = () => {
    if (!formData.email.trim()) {
      showError('Please enter your email');
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      showError('Please enter a valid email address');
      return false;
    }
    if (!formData.password) {
      showError('Please enter your password');
      return false;
    }
    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);

    // Sign in using userService
    const result = userService.signIn(formData.email, formData.password);

    setIsLoading(false);

    if (result.success) {
      showSuccess(result.message);
      setTimeout(() => {
        navigate('/preferences');
      }, 1500);
    } else {
      showError(result.message);
    }
  };

  const handleSocialLogin = (provider: string) => {
    setIsLoading(true);

    // Simulate social login with demo data
    const demoUserInfo = {
      email: `demo.${provider}@example.com`,
      name: `Demo ${provider.charAt(0).toUpperCase() + provider.slice(1)} User`
    };

    const result = userService.socialLogin(
      provider as 'google' | 'facebook' | 'apple',
      demoUserInfo
    );

    setIsLoading(false);

    if (result.success) {
      showSuccess(result.message);
      setTimeout(() => {
        navigate('/preferences');
      }, 1500);
    } else {
      showError(result.message);
    }
  };

  return (
    <div className="min-h-screen bg-white font-plus-jakarta">
      <div className="flex flex-col lg:flex-row max-w-[1440px] mx-auto">
        {/* Left Side - Illustration and Welcome Text */}
        <div className="w-full lg:w-[666px] relative px-6 py-8 lg:px-[13px] lg:py-[26px] order-2 lg:order-1">
          {/* Logo */}
          <div className="mb-8 lg:mb-0">
            <Logo size="md" />
          </div>

          {/* Illustration */}
          <div className="flex justify-center items-center lg:absolute lg:left-[98px] lg:top-[145px] mb-8 lg:mb-0">
            <img 
              src="https://api.builder.io/api/v1/image/assets/TEMP/00104347c0affdc2241623430ad0b20d6127d756?width=988" 
              alt="Student with graduation cap illustration"
              className="w-full max-w-[400px] lg:w-[494px] lg:h-[490px] object-contain"
            />
          </div>

          {/* Welcome Text */}
          <div className="text-center lg:absolute lg:left-[105px] lg:top-[708px] lg:w-[480px]">
            <div className="flex flex-wrap justify-center items-center gap-2 mb-2">
              <span className="font-bold text-2xl lg:text-4xl text-uniiq-neutral-1100">
                Welcome to
              </span>
              <div className="flex items-start">
                <span className="font-bold text-2xl lg:text-4xl text-uniiq-neutral-1100 leading-[1.24] tracking-[-0.02em]">
                  uni
                </span>
                <span 
                  className="font-bold text-2xl lg:text-4xl leading-[1.24] tracking-[-0.02em]"
                  style={{
                    background: 'linear-gradient(140deg, #9FB971 9.66%, #FFD965 42.74%, #C17C74 74.68%, #467896 102.63%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text'
                  }}
                >
                  iq
                </span>
              </div>
            </div>
            <p className="font-normal text-base lg:text-[17px] text-uniiq-neutral-900 leading-[1.34]">
              Let's get you set up to discover your perfect path to college!
            </p>
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="w-full lg:w-[714px] px-6 py-8 lg:px-[34px] lg:py-[30px] order-1 lg:order-2">
          <div className="max-w-[656px] mx-auto border border-uniiq-neutral-200 rounded-[14px] p-6 lg:p-8 bg-white">
            <form onSubmit={handleSubmit} className="space-y-7">
              {/* Header */}
              <div className="space-y-2">
                <h1 className="font-bold text-[28px] text-uniiq-neutral-1200">Sign in</h1>
              </div>

              {/* Divider Line */}
              <div className="flex items-center">
                <div className="w-2 h-2 rounded-full bg-gray-400 mr-1"></div>
                <div className="flex-1 h-px bg-gray-200"></div>
              </div>

              {/* Social Login Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-1.5">
                <SocialButton provider="google" onSocialLogin={handleSocialLogin}>Google</SocialButton>
                <SocialButton provider="facebook" onSocialLogin={handleSocialLogin}>Facebook</SocialButton>
                <SocialButton provider="apple" onSocialLogin={handleSocialLogin}>Apple</SocialButton>
              </div>

              {/* Or divider */}
              <div className="flex items-center gap-4">
                <div className="flex-1 h-px bg-gray-200"></div>
                <span className="font-plus-jakarta text-[12px] text-uniiq-gray-500 tracking-[-0.02em]">
                  or sign in with
                </span>
                <div className="flex-1 h-px bg-gray-200"></div>
              </div>

              {/* Form Fields */}
              <div className="space-y-5">
                {/* Email */}
                <FormInput
                  label="Email Address"
                  type="email"
                  placeholder="johndoe@gmail.com"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  required
                />

                {/* Password with Forgot Link */}
                <div className="space-y-3">
                  <FormInput
                    label="Password"
                    type="password"
                    placeholder="**********"
                    value={formData.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                    required
                  />
                  <div className="text-right">
                    <Link
                      to="/forgot-password"
                      className="font-plus-jakarta text-[11px] text-uniiq-base-black hover:underline"
                    >
                      Forgot Password?
                    </Link>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full flex items-center justify-center gap-1.5 px-4 py-2
                           bg-uniiq-neutral-1100 text-white rounded-md
                           hover:bg-uniiq-neutral-1100/90 disabled:opacity-50 disabled:cursor-not-allowed
                           transition-colors"
                >
                  <span className="font-plus-jakarta font-semibold text-[15px]">
                    {isLoading ? 'Signing In...' : 'Submit'}
                  </span>
                  {!isLoading && <ArrowRight size={18} />}
                </button>
              </div>

              {/* Bottom Divider */}
              <div className="flex items-center">
                <div className="w-2 h-2 rounded-full bg-gray-400 mr-1"></div>
                <div className="flex-1 h-px bg-gray-200"></div>
              </div>

              {/* Sign Up Link */}
              <div className="text-center">
                <span className="font-plus-jakarta text-[14px] text-uniiq-base-black">
                  Don't have an account? 
                </span>
                <Link 
                  to="/signup" 
                  className="font-plus-jakarta font-bold text-[14px] text-uniiq-blue-primary hover:underline ml-1"
                >
                  Sign up
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
