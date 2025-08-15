import { ReactNode } from 'react';

interface SocialButtonProps {
  provider: 'google' | 'facebook' | 'apple';
  children: ReactNode;
  onClick?: () => void;
  onSocialLogin?: (provider: string) => void;
}

export function SocialButton({ provider, children, onClick }: SocialButtonProps) {
  const getIcon = () => {
    switch (provider) {
      case 'google':
        return (
          <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M16.3872 9.49058C16.3955 9.00907 16.3457 8.52755 16.2406 8.05988H9.66541V10.6584H13.5258C13.3792 11.5799 12.8617 12.399 12.0951 12.9304L12.0813 13.0162L14.1595 14.6267L14.3034 14.6406C15.6235 13.4202 16.3872 11.6242 16.3872 9.49058Z" fill="#4285F4"/>
            <path d="M9.66542 16.337C11.5555 16.337 13.1439 15.7143 14.3035 14.6406L12.0951 12.9276C11.3784 13.4091 10.5288 13.6526 9.66818 13.6277C7.85282 13.6167 6.24777 12.4433 5.68323 10.7165L5.60021 10.7248L3.43893 12.3963L3.41125 12.4738C4.59567 14.8454 7.01708 16.3397 9.66542 16.337Z" fill="#34A853"/>
            <path d="M5.68045 10.7193C5.52825 10.2737 5.44799 9.80607 5.44799 9.33285C5.45076 8.86241 5.52825 8.39473 5.67492 7.94642L5.67215 7.8551L3.48319 6.15596L3.41124 6.18917C2.415 8.16781 2.415 10.4979 3.41124 12.4765L5.68045 10.7193Z" fill="#FBBC05"/>
            <path d="M9.6654 5.04071C10.6699 5.02411 11.6385 5.3977 12.3718 6.084L14.3477 4.15517C13.0803 2.96522 11.4005 2.3149 9.66263 2.33427C7.0143 2.33427 4.59288 3.82586 3.4057 6.19469L5.66937 7.95194C6.23944 6.22513 7.84726 5.05178 9.6654 5.04071Z" fill="#EB4335"/>
          </svg>
        );
      case 'facebook':
        return (
          <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M11.5475 4.65895H12.911V2.43245C12.6757 2.40211 11.8667 2.33385 10.9245 2.33385C8.95867 2.33385 7.61199 3.49319 7.61199 5.62399V7.58501H5.44263V10.0741H7.61199V16.337H10.2717V10.0746H12.3534L12.6838 7.58559H10.2711V5.8708C10.2717 5.15139 10.4783 4.65895 11.5475 4.65895Z" fill="#387FFF"/>
          </svg>
        );
      case 'apple':
        return (
          <svg width="20" height="19" viewBox="0 0 20 19" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M13.9273 15.7766C13.1649 16.5156 12.3325 16.3989 11.5313 16.0488C10.6834 15.691 9.90544 15.6754 9.01084 16.0488C7.89064 16.5311 7.29942 16.3911 6.63042 15.7766C2.83418 11.8636 3.39428 5.90479 7.70394 5.68697C8.75413 5.74143 9.48537 6.26263 10.0999 6.30931C11.0179 6.12261 11.8969 5.58584 12.8771 5.65586C14.0517 5.74921 14.9386 6.21596 15.522 7.05611C13.0949 8.51081 13.6706 11.708 15.8954 12.6027C15.452 13.7695 14.8763 14.9286 13.9195 15.7843L13.9273 15.7766ZM10.0221 5.6403C9.90544 3.90554 11.3135 2.47418 12.9315 2.33415C13.1571 4.34118 11.1112 5.83478 10.0221 5.6403Z" fill="#0A0A0B"/>
          </svg>
        );
    }
  };

  return (
    <button
      onClick={onClick}
      className="flex flex-col items-center justify-center gap-2.5 flex-1 px-4 py-[9px] 
                 rounded-[6px] border border-uniiq-gray-100 bg-uniiq-base-white 
                 hover:bg-gray-50 transition-colors"
    >
      <div className="flex items-center gap-[9px]">
        {getIcon()}
        <span className="font-plus-jakarta font-bold text-[13px] leading-[140%] text-uniiq-base-black">
          {children}
        </span>
      </div>
    </button>
  );
}
