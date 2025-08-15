import { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

interface DropdownProps {
  label: string;
  placeholder?: string;
  options?: string[];
  required?: boolean;
  className?: string;
  value?: string;
  onChange?: (value: string) => void;
}

export function Dropdown({
  label,
  placeholder = "--Select--",
  options = [],
  required = false,
  className = '',
  value,
  onChange
}: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(value || '');
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSelect = (option: string) => {
    setSelectedValue(option);
    onChange?.(option);
    setIsOpen(false);
  };

  return (
    <div ref={dropdownRef} className={`flex flex-col gap-2 ${className}`}>
      <label className="font-plus-jakarta font-semibold text-[15px] leading-[140%] text-uniiq-neutral-1100">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <div className="relative">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex items-center justify-between px-3 py-3 
                     rounded border border-uniiq-gray-100 bg-uniiq-base-white
                     hover:bg-gray-50 transition-colors text-left"
        >
          <span className={`font-plus-jakarta text-[14px] leading-[18px] ${
            selectedValue ? 'text-uniiq-neutral-1100' : 'text-uniiq-gray-400'
          }`}>
            {selectedValue || placeholder}
          </span>
          <ChevronDown 
            size={24} 
            className={`text-uniiq-neutral-1100 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          />
        </button>
        
        {isOpen && options.length > 0 && (
          <div className="absolute top-full left-0 right-0 z-10 mt-1 
                         bg-white border border-uniiq-gray-100 rounded shadow-lg max-h-60 overflow-y-auto">
            {options.map((option, index) => (
              <button
                key={index}
                type="button"
                onClick={() => handleSelect(option)}
                className="w-full px-3 py-2 text-left font-plus-jakarta text-[14px] 
                         hover:bg-gray-50 transition-colors text-uniiq-neutral-1100"
              >
                {option}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
