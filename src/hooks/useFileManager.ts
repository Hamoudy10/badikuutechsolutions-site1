import { useState, useCallback } from 'react';
import { FileData } from '@/components/FileGrid';

export const useFileManager = () => {
  const [files, setFiles] = useState<FileData[]>([]);

  const getFileType = (file: File): FileData['type'] => {
    const extension = file.name.split('.').pop()?.toLowerCase();
    
    switch (extension) {
      case 'pdf':
        return 'pdf';
      case 'doc':
        return 'doc';
      case 'docx':
        return 'docx';
      case 'ppt':
        return 'ppt';
      case 'pptx':
        return 'pptx';
      case 'txt':
        return 'txt';
      case 'jpg':
      case 'jpeg':
      case 'png':
      case 'gif':
      case 'bmp':
      case 'webp':
      case 'svg':
        return 'image';
      default:
        return 'unknown';
    }
  };

  const createThumbnail = (file: File): Promise<string | undefined> => {
    return new Promise((resolve) => {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const img = new Image();
          img.onload = () => {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            
            // Set thumbnail size
            const maxSize = 64;
            const ratio = Math.min(maxSize / img.width, maxSize / img.height);
            canvas.width = img.width * ratio;
            canvas.height = img.height * ratio;
            
            ctx?.drawImage(img, 0, 0, canvas.width, canvas.height);
            resolve(canvas.toDataURL());
          };
          img.src = e.target?.result as string;
        };
        reader.readAsDataURL(file);
      } else {
        resolve(undefined);
      }
    });
  };

  const addFiles = useCallback(async (newFiles: File[]) => {
    const fileDataPromises = newFiles.map(async (file) => {
      const type = getFileType(file);
      const thumbnail = await createThumbnail(file);
      
      return {
        id: Math.random().toString(36).substr(2, 9),
        file,
        type,
        thumbnail,
      };
    });

    const fileDataArray = await Promise.all(fileDataPromises);
    setFiles((prev) => [...prev, ...fileDataArray]);
  }, []);

  const removeFile = useCallback((fileId: string) => {
    setFiles((prev) => prev.filter((file) => file.id !== fileId));
  }, []);

  const clearFiles = useCallback(() => {
    setFiles([]);
  }, []);

  return {
    files,
    addFiles,
    removeFile,
    clearFiles,
  };
};