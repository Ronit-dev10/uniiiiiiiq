import { ReactNode } from 'react';

interface CheckboxProps {
  children: ReactNode;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  className?: string;
}

export function Checkbox({ children, checked = false, onChange, className = '' }: CheckboxProps) {
  return (
    <label className={`flex items-center gap-2 cursor-pointer ${className}`}>
      <div className="flex items-center p-0.5">
        <div className="relative">
          <input
            type="checkbox"
            checked={checked}
            onChange={(e) => onChange?.(e.target.checked)}
            className="sr-only"
          />
          <div className={`w-[18px] h-[18px] rounded border border-uniiq-gray-400 
                          ${checked ? 'bg-uniiq-blue-primary border-uniiq-blue-primary' : 'bg-white'} 
                          transition-colors`}>
            {checked && (
              <svg 
                width="12" 
                height="9" 
                viewBox="0 0 12 9" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
              >
                <path 
                  d="M1 4.5L4.5 8L11 1.5" 
                  stroke="white" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                />
              </svg>
            )}
          </div>
        </div>
      </div>
      <div className="flex-1 font-plus-jakarta text-[12px] leading-[152%] text-uniiq-neutral-1100">
        {children}
      </div>
    </label>
  );
}
