import React, { useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Loader2, X } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

interface CloudinaryUploadProps {
  onUploadSuccess: (urls: string[]) => void;
  isSingleUpload?: boolean;
}

const MULTI_MAX_FILE_SIZE = 12 * 1024 * 1024; // 12MB for multiple uploads
const SINGLE_MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB for single upload
const MAX_FILES = 12;

export const CloudinaryUpload: React.FC<CloudinaryUploadProps> = ({ onUploadSuccess, isSingleUpload = false }) => {
  const [files, setFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);
  const { toast } = useToast();
  const preset =   process.env.NEXT_PUBLIC_PRESET
  const cloudName = process.env.NEXT_PUBLIC_CLOUD_NAME

  const MAX_FILE_SIZE = isSingleUpload ? SINGLE_MAX_FILE_SIZE : MULTI_MAX_FILE_SIZE;

  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      const validFiles = newFiles.filter(file => file.size <= MAX_FILE_SIZE);
      
      if (isSingleUpload && validFiles.length > 0) {
        setFiles([validFiles[0]]);
      } else {
        if (validFiles.length + files.length > MAX_FILES) {
          toast({
            title: 'Error',
            description: `You can only upload a maximum of ${MAX_FILES} images.`,
            variant: 'destructive',
          });
          return;
        }
        setFiles(prevFiles => [...prevFiles, ...validFiles]);
      }

      if (validFiles.length !== newFiles.length) {
        toast({
          title: 'Warning',
          description: `Some files were skipped because they exceed the ${isSingleUpload ? '5MB' : '12MB'} size limit.`,
          variant: 'destructive',
        });
      }
    }
  }, [files, toast, isSingleUpload, MAX_FILE_SIZE]);

  const removeFile = useCallback((index: number) => {
    setFiles(prevFiles => prevFiles.filter((_, i) => i !== index));
  }, []);

  const handleUpload = useCallback(async () => {
    if (files.length === 0) {
      toast({
        title: 'Error',
        description: 'Please select a file to upload.',
        variant: 'destructive',
      });
      return;
    }

    setUploading(true);
    const uploadedUrls: string[] = [];

    for (const file of files) {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', preset ? preset:'');

      try {
        const response = await fetch(
          `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
          {
            method: 'POST',
            body: formData,
          }
        );

        const data = await response.json();

        if (data.secure_url) {
          uploadedUrls.push(data.secure_url);
        } else {
          throw new Error('Upload failed');
        }
      } catch (error) {
        toast({
          title: 'Error',
          description: `Failed to upload ${file.name}. Please try again.`,
          variant: 'destructive',
        });
      }
    }

    if (uploadedUrls.length > 0) {
      onUploadSuccess(uploadedUrls);
      toast({
        title: 'Success',
        description: `${uploadedUrls.length} image(s) uploaded successfully!`,
      });
      setFiles([]);
    }

    setUploading(false);
  }, [files, onUploadSuccess, toast]);

  return (
    <div className="flex flex-col space-y-4">
      <Input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        multiple={!isSingleUpload}
        className="file:mr-4 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100"
      />
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {files.map((file, index) => (
          <div key={index} className="relative group">
            <img
              src={URL.createObjectURL(file)}
              alt={file.name}
              className="w-full h-24 object-cover rounded"
            />
            <button
              onClick={() => removeFile(index)}
              className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <X size={16} />
            </button>
          </div>
        ))}
      </div>
      <Button onClick={handleUpload} disabled={files.length === 0 || uploading} className="w-full">
        {uploading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Uploading...
          </>
        ) : (
          `Upload ${files.length} image${files.length !== 1 ? 's' : ''} `
        )}
      </Button>
    </div>
  );
};
