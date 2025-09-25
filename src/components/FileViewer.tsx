import React, { useState, useEffect } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { ChevronLeft, ChevronRight, ZoomIn, ZoomOut, Search, X, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { FileData } from './FileGrid';

// Configure PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

interface FileViewerProps {
  file: FileData;
  onClose: () => void;
  className?: string;
}

export const FileViewer: React.FC<FileViewerProps> = ({ file, onClose, className }) => {
  const [numPages, setNumPages] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [scale, setScale] = useState<number>(1);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [fileContent, setFileContent] = useState<string>('');
  const [imageUrl, setImageUrl] = useState<string>('');

  useEffect(() => {
    if (file.type === 'txt') {
      // Read text file
      const reader = new FileReader();
      reader.onload = (e) => {
        setFileContent(e.target?.result as string || '');
      };
      reader.readAsText(file.file);
    } else if (file.type === 'image') {
      // Create object URL for images
      const url = URL.createObjectURL(file.file);
      setImageUrl(url);
      return () => URL.revokeObjectURL(url);
    }
  }, [file]);

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
  };

  const goToPrevPage = () => {
    setPageNumber((prev) => Math.max(1, prev - 1));
  };

  const goToNextPage = () => {
    setPageNumber((prev) => Math.min(numPages, prev + 1));
  };

  const handlePageJump = (page: string) => {
    const pageNum = parseInt(page);
    if (pageNum >= 1 && pageNum <= numPages) {
      setPageNumber(pageNum);
    }
  };

  const zoomIn = () => setScale((prev) => Math.min(3, prev + 0.25));
  const zoomOut = () => setScale((prev) => Math.max(0.5, prev - 0.25));
  const resetZoom = () => setScale(1);

  const renderContent = () => {
    if (file.type === 'pdf') {
      return (
        <div className="flex flex-col items-center space-y-4">
          <Document
            file={file.file}
            onLoadSuccess={onDocumentLoadSuccess}
            className="shadow-lg rounded-lg overflow-hidden"
          >
            <Page
              pageNumber={pageNumber}
              scale={scale}
              className="shadow-md"
            />
          </Document>
        </div>
      );
    }

    if (file.type === 'image') {
      return (
        <div className="flex justify-center">
          <img
            src={imageUrl}
            alt={file.file.name}
            style={{ transform: `scale(${scale})` }}
            className="max-w-full max-h-full object-contain transition-smooth rounded-lg shadow-lg"
          />
        </div>
      );
    }

    if (file.type === 'txt') {
      return (
        <div className="glass rounded-xl p-6 max-w-4xl mx-auto">
          <pre
            className="whitespace-pre-wrap text-foreground font-mono text-sm leading-relaxed"
            style={{ fontSize: `${scale}rem` }}
          >
            {fileContent}
          </pre>
        </div>
      );
    }

    return (
      <div className="glass rounded-xl p-8 text-center">
        <p className="text-foreground-muted text-lg">
          Preview not available for this file type.
        </p>
        <p className="text-foreground-subtle text-sm mt-2">
          File: {file.file.name}
        </p>
      </div>
    );
  };

  return (
    <div className={cn("fixed inset-0 z-50 bg-background/95 backdrop-blur-sm", className)}>
      <div className="h-full flex flex-col">
        {/* Header with controls */}
        <div className="glass border-b p-4">
          <div className="flex items-center justify-between max-w-7xl mx-auto">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" onClick={onClose}>
                <X className="h-5 w-5" />
              </Button>
              <h1 className="text-lg font-semibold text-foreground truncate max-w-md">
                {file.file.name}
              </h1>
            </div>

            <div className="flex items-center gap-2">
              {/* Search (for text files) */}
              {file.type === 'txt' && (
                <div className="flex items-center gap-2">
                  <Search className="h-4 w-4 text-foreground-muted" />
                  <Input
                    placeholder="Search in document..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-48"
                  />
                </div>
              )}

              {/* Zoom controls */}
              <div className="flex items-center gap-1">
                <Button variant="ghost" size="icon-sm" onClick={zoomOut}>
                  <ZoomOut className="h-4 w-4" />
                </Button>
                <span className="text-sm text-foreground-muted px-2 min-w-16 text-center">
                  {Math.round(scale * 100)}%
                </span>
                <Button variant="ghost" size="icon-sm" onClick={zoomIn}>
                  <ZoomIn className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon-sm" onClick={resetZoom}>
                  <RotateCcw className="h-4 w-4" />
                </Button>
              </div>

              {/* Page navigation (for PDFs) */}
              {file.type === 'pdf' && numPages > 0 && (
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="icon-sm"
                    onClick={goToPrevPage}
                    disabled={pageNumber <= 1}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  
                  <div className="flex items-center gap-2">
                    <Input
                      type="number"
                      min={1}
                      max={numPages}
                      value={pageNumber}
                      onChange={(e) => handlePageJump(e.target.value)}
                      className="w-16 text-center"
                    />
                    <span className="text-sm text-foreground-muted">
                      of {numPages}
                    </span>
                  </div>

                  <Button
                    variant="ghost"
                    size="icon-sm"
                    onClick={goToNextPage}
                    disabled={pageNumber >= numPages}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Content area */}
        <div className="flex-1 overflow-auto p-6">
          <div className="max-w-7xl mx-auto">
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
};