import { Upload } from "lucide-react";

interface FileUploadProps {
  label: string;
  acceptedTypes?: string;
  maxSize?: string;
  className?: string;
}

export function FileUpload({
  label,
  acceptedTypes = "PNG, JPEG",
  maxSize = "max 5mb",
  className = "",
}: FileUploadProps) {
  return (
    <div className={`flex flex-col gap-2.5 ${className}`}>
      <label className="font-plus-jakarta font-semibold text-[15px] leading-[140%] text-uniiq-neutral-1100">
        {label}
      </label>
      <div
        className="relative flex flex-col items-center justify-center gap-5 px-4 py-[18px]
                      rounded-xl border border-dashed border-uniiq-neutral-200 bg-white
                      hover:bg-gray-50 cursor-pointer transition-colors"
      >
        <div className="flex flex-col items-center gap-3 pointer-events-none">
          <div className="flex flex-col items-center gap-0.5">
            <Upload size={26} className="text-black" />
            <div className="flex flex-col items-center gap-0.5">
              <div className="flex items-center justify-center gap-2.5">
                <span className="font-plus-jakarta font-semibold text-[16px] leading-[27px] tracking-[-0.16px] text-uniiq-neutral-1100">
                  Click to upload
                </span>
              </div>
              <div className="flex items-center justify-center gap-2.5">
                <span className="font-plus-jakarta font-medium text-[12px] leading-[20px] tracking-[0.12px] text-uniiq-gray-400/75">
                  {acceptedTypes} ({maxSize})
                </span>
              </div>
            </div>
          </div>
        </div>
        <input
          type="file"
          accept=".png,.jpg,.jpeg"
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
        />
      </div>
    </div>
  );
}
