import React, { useState } from 'react';
import { FileUpload } from '@/components/FileUpload';
import { FileGrid, FileData } from '@/components/FileGrid';
import { FileViewer } from '@/components/FileViewer';
import { useFileManager } from '@/hooks/useFileManager';
import { Button } from '@/components/ui/button';
import { Trash2, FileText } from 'lucide-react';
import { toast } from 'sonner';
const Index = () => {
  const {
    files,
    addFiles,
    removeFile,
    clearFiles
  } = useFileManager();
  const [selectedFile, setSelectedFile] = useState<FileData | null>(null);
  const handleFilesUpload = async (uploadedFiles: File[]) => {
    try {
      await addFiles(uploadedFiles);
      toast.success(`Successfully added ${uploadedFiles.length} file(s)`);
    } catch (error) {
      toast.error('Failed to process some files');
    }
  };
  const handleFileSelect = (file: FileData) => {
    setSelectedFile(file);
  };
  const handleFileRemove = (fileId: string) => {
    removeFile(fileId);
    if (selectedFile?.id === fileId) {
      setSelectedFile(null);
    }
    toast.success('File removed');
  };
  const handleClearAll = () => {
    clearFiles();
    setSelectedFile(null);
    toast.success('All files cleared');
  };
  return <div className="min-h-screen bg-gradient-surface">
      {/* Header */}
      <header className="glass border-b sticky top-0 z-40">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-gradient-primary flex items-center justify-center">
                <FileText className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gradient">BadikuuTech Solutions</h1>
                <p className="text-sm text-foreground-muted">Professional Document Viewer</p>
              </div>
            </div>
            
            {files.length > 0 && <Button variant="outline" onClick={handleClearAll}>
                <Trash2 className="h-4 w-4" />
                Clear All
              </Button>}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8 space-y-8">
        {files.length === 0 ? <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-foreground mb-4">
                Upload Your Documents
              </h2>
              <p className="text-lg text-foreground-muted max-w-2xl mx-auto">
                Drag and drop your files or click to browse. Support for PDFs, Word documents, 
                PowerPoint presentations, text files, and all common image formats.
              </p>
            </div>
            <FileUpload onFilesUpload={handleFilesUpload} />
          </div> : <div className="space-y-6">
            <FileUpload onFilesUpload={handleFilesUpload} className="min-h-[200px]" />
            <FileGrid files={files} onFileSelect={handleFileSelect} onFileRemove={handleFileRemove} selectedFileId={selectedFile?.id} />
          </div>}
      </main>

      {/* File Viewer Modal */}
      {selectedFile && <FileViewer file={selectedFile} onClose={() => setSelectedFile(null)} />}
    </div>;
};
export default Index;