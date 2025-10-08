import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, FileText, Image, FileSpreadsheet } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FileUploadProps {
  onFilesUpload: (files: File[]) => void;
  className?: string;
}

const ACCEPTED_TYPES = {
  'application/pdf': ['.pdf'],
  'application/msword': ['.doc'],
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
  'application/vnd.ms-powerpoint': ['.ppt'],
  'application/vnd.openxmlformats-officedocument.presentationml.presentation': ['.pptx'],
  'text/plain': ['.txt'],
  'image/*': ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.webp', '.svg'],
};

export const FileUpload: React.FC<FileUploadProps> = ({ onFilesUpload, className }) => {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    onFilesUpload(acceptedFiles);
  }, [onFilesUpload]);

  const { getRootProps, getInputProps, isDragActive, isDragAccept, isDragReject } = useDropzone({
    onDrop,
    accept: ACCEPTED_TYPES,
    multiple: true,
  });

  const getIcon = () => {
    if (isDragActive) {
      return <Upload className="h-12 w-12 text-primary" />;
    }
    return <FileText className="h-12 w-12 text-foreground-muted" />;
  };

  const getStatusText = () => {
    if (isDragAccept) {
      return "Drop files here to view them";
    }
    if (isDragReject) {
      return "Some files are not supported";
    }
    if (isDragActive) {
      return "Drop your files here...";
    }
    return "Drag & drop files here, or click to browse";
  };

  return (
    <div
      {...getRootProps()}
      className={cn(
        "relative group cursor-pointer rounded-2xl border-2 border-dashed transition-smooth",
        "min-h-[400px] flex flex-col items-center justify-center gap-6 p-12",
        isDragActive && "border-primary bg-primary/5 scale-105",
        isDragAccept && "border-success bg-success/5",
        isDragReject && "border-destructive bg-destructive/5",
        !isDragActive && "border-border hover:border-primary/50 hover:bg-surface/50",
        className
      )}
    >
      <input {...getInputProps()} />
      
      {/* Animated background effect */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-surface opacity-0 group-hover:opacity-100 transition-smooth" />
      
      <div className="relative z-10 flex flex-col items-center gap-6">
        <div className="transition-bounce">
          {getIcon()}
        </div>
        
        <div className="text-center space-y-2">
          <h3 className="text-xl font-semibold text-foreground">
            {getStatusText()}
          </h3>
          <p className="text-foreground-muted max-w-md">
            Supported formats: PDF, DOC, DOCX, PPT, PPTX, TXT, Images
          </p>
        </div>
        
        <div className="flex gap-4 text-foreground-subtle">
          <div className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            <span className="text-sm">Documents</span>
          </div>
          <div className="flex items-center gap-2">
            <Image className="h-5 w-5" />
            <span className="text-sm">Images</span>
          </div>
          <div className="flex items-center gap-2">
            <FileSpreadsheet className="h-5 w-5" />
            <span className="text-sm">Presentations</span>
          </div>
        </div>
      </div>
    </div>
  );
};