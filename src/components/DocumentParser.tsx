import React, { useState, useEffect } from 'react';
import { FileText, Loader2, AlertCircle } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import mammoth from 'mammoth';

interface DocumentParserProps {
  file: File;
  scale: number;
  isMobile: boolean;
  onError: (error: string) => void;
}

export const DocumentParser: React.FC<DocumentParserProps> = ({ 
  file, 
  scale, 
  isMobile, 
  onError 
}) => {
  const [content, setContent] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [pages, setPages] = useState<string[]>([]);

  useEffect(() => {
    parseDocument();
  }, [file]);

  const parseDocument = async () => {
    setIsLoading(true);
    
    try {
      const reader = new FileReader();
      
      reader.onload = async (e) => {
        const arrayBuffer = e.target?.result as ArrayBuffer;
        
        if (!arrayBuffer) {
          onError('Failed to read file');
          setIsLoading(false);
          return;
        }

        try {
          // For demonstration, we'll extract basic text content
          // In a real implementation, you'd use libraries like mammoth.js for DOCX
          // or a server-side solution for complex parsing
          
          let extractedText = '';
          
          if (file.name.endsWith('.docx')) {
            // Basic DOCX parsing attempt
            extractedText = await parseDocx(arrayBuffer);
          } else if (file.name.endsWith('.doc')) {
            // Basic DOC parsing attempt  
            extractedText = await parseDoc(arrayBuffer);
          } else if (file.name.endsWith('.pptx')) {
            // Basic PPTX parsing attempt
            extractedText = await parsePptx(arrayBuffer);
          } else if (file.name.endsWith('.ppt')) {
            // Basic PPT parsing attempt
            extractedText = await parsePpt(arrayBuffer);
          }
          
          setContent(extractedText);
          
          // Split content into pages (approximate)
          const pageBreaks = extractedText.split(/\n\s*\n\s*\n/);
          setPages(pageBreaks.length > 1 ? pageBreaks : [extractedText]);
          
        } catch (error) {
          console.error('Parsing error:', error);
          onError('Document format not fully supported. Please convert to PDF for best viewing experience.');
        }
        
        setIsLoading(false);
      };
      
      reader.onerror = () => {
        onError('Failed to read file');
        setIsLoading(false);
      };
      
      reader.readAsArrayBuffer(file);
      
    } catch (error) {
      console.error('Document parsing error:', error);
      onError('Failed to parse document');
      setIsLoading(false);
    }
  };

  const parseDocx = async (buffer: ArrayBuffer): Promise<string> => {
    try {
      // Use mammoth.js for proper DOCX parsing
      const result = await mammoth.extractRawText({ arrayBuffer: buffer });
      
      if (result.value && result.value.trim()) {
        return result.value.trim();
      }
      
      return 'Document appears to be empty or content could not be extracted.';
    } catch (error) {
      console.error('DOCX parsing error:', error);
      return 'Document content could not be extracted. The file may be corrupted or use an unsupported format.';
    }
  };

  const parseDoc = async (buffer: ArrayBuffer): Promise<string> => {
    // DOC files are complex binary format, mammoth doesn't support them
    return 'Legacy DOC format is not supported. Please convert to DOCX or PDF format.\n\nTo convert:\n1. Open the file in Microsoft Word\n2. Save As → Word Document (*.docx)\n3. Upload the new file for full content viewing.';
  };

  const parsePptx = async (buffer: ArrayBuffer): Promise<string> => {
    try {
      // Basic PPTX text extraction using ZIP parsing
      const text = new TextDecoder().decode(buffer);
      
      // Extract text from slides (improved regex)
      const textMatches = text.match(/<a:t[^>]*>([^<]*)<\/a:t>/g) || [];
      const titleMatches = text.match(/<a:t[^>]*>([^<]*)<\/a:t>/g) || [];
      
      if (textMatches.length > 0) {
        const extractedText = textMatches
          .map(match => match.replace(/<[^>]*>/g, '').trim())
          .filter(text => text.length > 0)
          .join('\n\n');
          
        return extractedText || 'Presentation content could not be extracted properly.';
      }
      
      return 'PowerPoint presentation format detected, but text extraction is limited. For full content viewing, please export to PDF format.';
    } catch (error) {
      console.error('PPTX parsing error:', error);
      return 'Presentation content could not be extracted. Please convert to PDF for better compatibility.';
    }
  };

  const parsePpt = async (buffer: ArrayBuffer): Promise<string> => {
    // PPT files are complex binary format
    return 'Legacy PPT format is not supported. Please convert to PPTX or PDF format.\n\nTo convert:\n1. Open the file in Microsoft PowerPoint\n2. Save As → PowerPoint Presentation (*.pptx)\n3. Upload the new file for full content viewing.';
  };

  const baseFontSize = isMobile ? 0.875 : 1;
  const fontSize = baseFontSize * scale;

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-12 space-y-4">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p className="text-foreground-muted">Parsing document...</p>
        <p className="text-foreground-subtle text-sm text-center">
          This may take a moment for large files
        </p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-none">
      <div 
        className="glass rounded-xl p-4 md:p-6 mx-auto transition-all duration-300"
        style={{ 
          maxWidth: isMobile ? '100%' : '90%',
          margin: '0 auto'
        }}
      >
        <div className="flex items-center gap-2 mb-4 pb-4 border-b border-border">
          <FileText className="h-5 w-5 text-primary" />
          <span className="font-medium text-foreground">
            {file.name.split('.').pop()?.toUpperCase()} Document
          </span>
          <span className="text-foreground-muted text-sm">
            ({pages.length} {pages.length === 1 ? 'section' : 'sections'})
          </span>
        </div>
        
        <ScrollArea className="h-[70vh]">
          <div
            className="prose prose-slate dark:prose-invert max-w-none text-foreground leading-relaxed"
            style={{ 
              fontSize: `${fontSize}rem`,
              lineHeight: isMobile ? '1.4' : '1.6'
            }}
          >
            {content ? (
              <div className="space-y-6">
                {pages.map((pageContent, index) => (
                  <div key={index} className="page-content">
                    {pages.length > 1 && (
                      <div className="text-foreground-muted text-sm mb-2 font-medium">
                        Section {index + 1}
                      </div>
                    )}
                    <div className="whitespace-pre-wrap">
                      {pageContent.trim()}
                    </div>
                    {index < pages.length - 1 && (
                      <hr className="my-6 border-border" />
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex items-center gap-2 text-foreground-muted">
                <AlertCircle className="h-5 w-5" />
                <span>No content could be extracted from this document.</span>
              </div>
            )}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};