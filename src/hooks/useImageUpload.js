import { useState } from 'react';
import { supabase } from '../lib/supabase';
import toast from 'react-hot-toast';
export const useImageUpload = () => {
    const [isUploading, setIsUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
    const validateFile = (file) => {
        // Check file type
        const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
        if (!allowedTypes.includes(file.type)) {
            toast.error('Please select a valid image file (JPG, PNG, GIF, WebP)');
            return false;
        }
        // Check file size (max 10MB)
        if (file.size > 10 * 1024 * 1024) {
            toast.error('Image size should be less than 10MB');
            return false;
        }
        return true;
    };
    const uploadImage = async (file, folder = 'uploads') => {
        if (!validateFile(file)) {
            return null;
        }
        setIsUploading(true);
        setUploadProgress(0);
        try {
            // Generate unique filename
            const fileExt = file.name.split('.').pop();
            const fileName = `${folder}/${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
            // Upload to Supabase Storage
            const { data, error } = await supabase.storage
                .from('images')
                .upload(fileName, file, {
                cacheControl: '3600',
                upsert: false
            });
            if (error) {
                console.error('Upload error:', error);
                throw error;
            }
            // Get public URL
            const { data: urlData } = supabase.storage
                .from('images')
                .getPublicUrl(fileName);
            const result = {
                url: urlData.publicUrl,
                path: fileName
            };
            setUploadProgress(100);
            toast.success('Image uploaded successfully!');
            return result;
        }
        catch (error) {
            console.error('Upload failed:', error);
            toast.error(`Upload failed: ${error.message}`);
            return null;
        }
        finally {
            setIsUploading(false);
            setUploadProgress(0);
        }
    };
    const deleteImage = async (path) => {
        try {
            const { error } = await supabase.storage
                .from('images')
                .remove([path]);
            if (error) {
                console.error('Delete error:', error);
                throw error;
            }
            toast.success('Image deleted successfully!');
            return true;
        }
        catch (error) {
            console.error('Delete failed:', error);
            toast.error(`Delete failed: ${error.message}`);
            return false;
        }
    };
    return {
        uploadImage,
        deleteImage,
        isUploading,
        uploadProgress
    };
};