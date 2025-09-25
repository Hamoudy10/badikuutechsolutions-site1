import React from 'react';
import { FileText, Image, FileSpreadsheet, Presentation, File, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export interface FileData {
  id: string;
  file: File;
  type: 'pdf' | 'doc' | 'docx' | 'ppt' | 'pptx' | 'txt' | 'image' | 'unknown';
  thumbnail?: string;
}

interface FileGridProps {
  files: FileData[];
  onFileSelect: (file: FileData) => void;
  onFileRemove: (fileId: string) => void;
  selectedFileId?: string;
  className?: string;
}

const getFileIcon = (type: FileData['type']) => {
  switch (type) {
    case 'pdf':
      return <FileText className="h-8 w-8 text-destructive" />;
    case 'doc':
    case 'docx':
      return <FileText className="h-8 w-8 text-primary" />;
    case 'ppt':
    case 'pptx':
      return <Presentation className="h-8 w-8 text-accent" />;
    case 'txt':
      return <FileText className="h-8 w-8 text-foreground-muted" />;
    case 'image':
      return <Image className="h-8 w-8 text-success" />;
    default:
      return <File className="h-8 w-8 text-foreground-subtle" />;
  }
};

const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

export const FileGrid: React.FC<FileGridProps> = ({
  files,
  onFileSelect,
  onFileRemove,
  selectedFileId,
  className
}) => {
  if (files.length === 0) {
    return null;
  }

  return (
    <div className={cn("space-y-4", className)}>
      <h2 className="text-2xl font-bold text-foreground">
        Your Files ({files.length})
      </h2>
      
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {files.map((fileData) => (
          <div
            key={fileData.id}
            className={cn(
              "group relative glass rounded-xl p-4 cursor-pointer transition-smooth hover:shadow-lg hover:scale-105",
              selectedFileId === fileData.id && "ring-2 ring-primary shadow-glow"
            )}
            onClick={() => onFileSelect(fileData)}
          >
            {/* Remove button */}
            <Button
              variant="ghost"
              size="icon-sm"
              className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-smooth bg-destructive/10 hover:bg-destructive hover:text-destructive-foreground"
              onClick={(e) => {
                e.stopPropagation();
                onFileRemove(fileData.id);
              }}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
            
            <div className="flex flex-col items-center gap-3">
              {/* File thumbnail or icon */}
              <div className="relative">
                {fileData.thumbnail ? (
                  <img
                    src={fileData.thumbnail}
                    alt={fileData.file.name}
                    className="h-16 w-16 object-cover rounded-lg shadow-md"
                  />
                ) : (
                  <div className="h-16 w-16 rounded-lg bg-surface flex items-center justify-center">
                    {getFileIcon(fileData.type)}
                  </div>
                )}
              </div>
              
              {/* File info */}
              <div className="text-center space-y-1 min-h-0">
                <h3 className="font-medium text-sm text-foreground truncate w-full" title={fileData.file.name}>
                  {fileData.file.name}
                </h3>
                <p className="text-xs text-foreground-muted">
                  {formatFileSize(fileData.file.size)}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};