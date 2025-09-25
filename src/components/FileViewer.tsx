import React, { useState, useEffect } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { ChevronLeft, ChevronRight, ZoomIn, ZoomOut, Search, X, RotateCcw, FileText, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import { FileData } from './FileGrid';
import { DocumentParser } from './DocumentParser';

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
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  // Detect mobile device and set initial scale
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      // Set initial scale based on device
      if (mobile) {
        setScale(0.75); // Smaller initial scale for mobile
      } else {
        setScale(1);
      }
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (file.type === 'txt') {
      // Read text file
      const reader = new FileReader();
      reader.onload = (e) => {
        setFileContent(e.target?.result as string || '');
      };
      reader.onerror = () => {
        setError('Failed to read text file');
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

  // Fine-tuned zoom controls with different increments
  const getZoomIncrement = () => {
    if (scale < 0.5) return 0.1;
    if (scale < 1) return 0.15;
    if (scale < 2) return 0.25;
    return 0.5;
  };

  const zoomIn = () => {
    const increment = getZoomIncrement();
    setScale((prev) => Math.min(5, prev + increment));
  };

  const zoomOut = () => {
    const increment = getZoomIncrement();
    setScale((prev) => Math.max(0.25, prev - increment));
  };

  const resetZoom = () => {
    setScale(isMobile ? 0.75 : 1);
  };

  const fitToWidth = () => {
    const containerWidth = window.innerWidth - (isMobile ? 32 : 96); // Account for padding
    const contentWidth = isMobile ? 350 : 600; // Approximate content width
    const optimalScale = Math.min(2, containerWidth / contentWidth);
    setScale(Math.max(0.25, optimalScale));
  };

  const renderContent = () => {
    if (error) {
      return (
        <div className="glass rounded-xl p-8 text-center">
          <p className="text-destructive text-lg mb-2">Error loading document</p>
          <p className="text-foreground-muted text-sm">{error}</p>
        </div>
      );
    }

    if (file.type === 'pdf') {
      return (
        <div className="flex flex-col items-center space-y-4">
          <div className="w-full flex justify-center overflow-auto">
            <Document
              file={file.file}
              onLoadSuccess={onDocumentLoadSuccess}
              onLoadError={() => setError('Failed to load PDF')}
              className="shadow-lg rounded-lg overflow-hidden"
              loading={
                <div className="flex items-center justify-center py-8">
                  <Loader2 className="h-6 w-6 animate-spin text-primary" />
                </div>
              }
            >
              <Page
                pageNumber={pageNumber}
                scale={scale}
                className="shadow-md max-w-full"
                renderTextLayer={false}
                renderAnnotationLayer={false}
                loading={
                  <div className="flex items-center justify-center h-96 bg-surface rounded-lg">
                    <Loader2 className="h-6 w-6 animate-spin text-primary" />
                  </div>
                }
              />
            </Document>
          </div>
        </div>
      );
    }

    if (file.type === 'image') {
      return (
        <div className="flex justify-center overflow-auto">
          <div 
            className="transition-all duration-300 ease-out"
            style={{ transform: `scale(${scale})`, transformOrigin: 'center top' }}
          >
            <img
              src={imageUrl}
              alt={file.file.name}
              className="max-w-none h-auto rounded-lg shadow-lg"
              style={{
                maxWidth: isMobile ? '100vw' : '90vw',
                maxHeight: isMobile ? '80vh' : '85vh'
              }}
              onError={() => setError('Failed to load image')}
            />
          </div>
        </div>
      );
    }

    if (file.type === 'txt') {
      const baseFontSize = isMobile ? 0.875 : 1; // 14px on mobile, 16px on desktop
      const fontSize = baseFontSize * scale;
      
      return (
        <div className="w-full max-w-none">
          <div 
            className="glass rounded-xl p-4 md:p-6 mx-auto transition-all duration-300"
            style={{ 
              maxWidth: isMobile ? '100%' : '90%',
              margin: '0 auto'
            }}
          >
            <ScrollArea className="h-[70vh]">
              <pre
                className="whitespace-pre-wrap text-foreground font-mono leading-relaxed"
                style={{ 
                  fontSize: `${fontSize}rem`,
                  lineHeight: isMobile ? '1.4' : '1.6'
                }}
              >
                {fileContent}
              </pre>
            </ScrollArea>
          </div>
        </div>
      );
    }

    if (file.type === 'doc' || file.type === 'docx' || file.type === 'ppt' || file.type === 'pptx') {
      return (
        <DocumentParser 
          file={file.file}
          scale={scale}
          isMobile={isMobile}
          onError={setError}
        />
      );
    }

    return (
      <div className="glass rounded-xl p-8 text-center">
        <FileText className="h-12 w-12 text-foreground-muted mx-auto mb-4" />
        <p className="text-foreground-muted text-lg mb-2">
          Preview not available for this file type.
        </p>
        <p className="text-foreground-subtle text-sm">
          File: {file.file.name}
        </p>
      </div>
    );
  };

  return (
    <div className={cn("fixed inset-0 z-50 bg-background/95 backdrop-blur-sm", className)}>
      <div className="h-full flex flex-col">
        {/* Header with controls */}
        <div className="glass border-b p-3 md:p-4">
          <div className="flex items-center justify-between max-w-7xl mx-auto">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" onClick={onClose}>
                <X className="h-5 w-5" />
              </Button>
              <h1 className="text-lg font-semibold text-foreground truncate max-w-md">
                {file.file.name}
              </h1>
            </div>

            <div className="flex items-center gap-1 md:gap-2 flex-wrap">
              {/* Search (for text files and parsed documents) */}
              {(file.type === 'txt' || file.type === 'doc' || file.type === 'docx' || file.type === 'ppt' || file.type === 'pptx') && !isMobile && (
                <div className="flex items-center gap-2">
                  <Search className="h-4 w-4 text-foreground-muted" />
                  <Input
                    placeholder="Search in document..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-40 md:w-48"
                  />
                </div>
              )}

              {/* Zoom controls */}
              <div className="flex items-center gap-1">
                <Button variant="ghost" size="icon-sm" onClick={zoomOut} title="Zoom Out">
                  <ZoomOut className="h-4 w-4" />
                </Button>
                <span 
                  className="text-sm text-foreground-muted px-2 min-w-16 text-center cursor-pointer hover:text-foreground transition-colors"
                  onClick={resetZoom}
                  title="Reset Zoom"
                >
                  {Math.round(scale * 100)}%
                </span>
                <Button variant="ghost" size="icon-sm" onClick={zoomIn} title="Zoom In">
                  <ZoomIn className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon-sm" onClick={fitToWidth} title="Fit to Width">
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
        <div className="flex-1 overflow-auto p-3 md:p-6">
          <div className={cn(
            "mx-auto transition-all duration-300",
            file.type === 'txt' ? "max-w-none" : "max-w-7xl"
          )}>
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
};