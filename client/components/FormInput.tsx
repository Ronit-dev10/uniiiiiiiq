import { ReactNode, useState } from 'react';
import { EyeOff } from 'lucide-react';

interface FormInputProps {
  label: string;
  type?: 'text' | 'email' | 'password' | 'tel';
  placeholder?: string;
  required?: boolean;
  icon?: ReactNode;
  className?: string;
}

export function FormInput({ 
  label, 
  type = 'text', 
  placeholder, 
  required = false, 
  icon,
  className = ''
}: FormInputProps) {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === 'password';
  const inputType = isPassword && showPassword ? 'text' : type;

  return (
    <div className={`flex flex-col gap-2.5 ${className}`}>
      <label className="font-plus-jakarta font-semibold text-[15px] leading-[140%] text-uniiq-neutral-1100">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <div className="relative flex items-center gap-4 px-3 py-[14px]
                      rounded border border-uniiq-neutral-200 bg-white">
        <input
          type={inputType}
          placeholder={placeholder}
          className="flex-1 font-plus-jakarta text-[14px] leading-[140%] tracking-[-0.28px]
                     text-uniiq-neutral-1100 placeholder:text-uniiq-neutral-500
                     outline-none bg-transparent"
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="text-uniiq-gray-400 hover:text-uniiq-neutral-1100 transition-colors"
          >
            <EyeOff size={16} />
          </button>
        )}
        {icon && !isPassword && (
          <div className="text-uniiq-gray-400">
            {icon}
          </div>
        )}
      </div>
    </div>
  );
}

interface PhoneInputProps {
  label: string;
  placeholder?: string;
  countryCode?: string;
  required?: boolean;
  className?: string;
}

export function PhoneInput({ 
  label, 
  placeholder = "(999) 999-9999", 
  countryCode = "+91",
  required = false,
  className = ''
}: PhoneInputProps) {
  return (
    <div className={`flex flex-col gap-2.5 ${className}`}>
      <label className="font-plus-jakarta font-semibold text-[15px] leading-[140%] text-uniiq-neutral-1100">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <div className="flex items-center gap-4 p-2 rounded border border-uniiq-neutral-200 bg-white">
        <div className="flex items-center gap-1 px-[6px] py-[7px] 
                        rounded border border-gray-200/20 bg-uniiq-neutral-1000/[0.03]">
          <span className="font-plus-jakarta font-semibold text-[13px] leading-[18px] text-uniiq-neutral-1000">
            {countryCode}
          </span>
          <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8 11.9511L3 6.92902L3.9292 5.99982L8 10.0706L12.0708 5.99982L13 6.92902L8 11.9511Z" fill="#151314"/>
          </svg>
        </div>
        <input
          type="tel"
          placeholder={placeholder}
          className="flex-1 font-plus-jakarta text-[13px] leading-[18px] 
                     text-uniiq-gray-400 placeholder:text-uniiq-gray-400 
                     outline-none bg-transparent"
        />
      </div>
    </div>
  );
}
