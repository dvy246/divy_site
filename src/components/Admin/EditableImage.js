import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Camera, Upload, Link, Image } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import toast from 'react-hot-toast';
const EditableImage = ({ src, alt, onSave, className = '' }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [imageUrl, setImageUrl] = useState(src);
    const [isUploading, setIsUploading] = useState(false);
    const [uploadMethod, setUploadMethod] = useState('file');
    const [dragActive, setDragActive] = useState(false);
    const fileInputRef = useRef(null);
    const { isAdmin } = useAuth();
    if (!isAdmin) {
        return _jsx("img", { src: src, alt: alt, className: className });
    }
    const validateFile = (file) => {
        // Check file type
        if (!file.type.startsWith('image/')) {
            toast.error('Please select an image file (JPG, PNG, GIF, WebP)');
            return false;
        }
        // Check file size (max 10MB)
        if (file.size > 10 * 1024 * 1024) {
            toast.error('Image size should be less than 10MB');
            return false;
        }
        return true;
    };
    const processFile = async (file) => {
        if (!validateFile(file))
            return;
        setIsUploading(true);
        try {
            // Create a promise to handle the FileReader
            const base64String = await new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.onload = (e) => {
                    const result = e.target?.result;
                    resolve(result);
                };
                reader.onerror = () => reject(new Error('Failed to read file'));
                reader.readAsDataURL(file);
            });
            setImageUrl(base64String);
            onSave(base64String);
            setIsEditing(false);
            toast.success('✅ Image uploaded successfully!');
        }
        catch (error) {
            console.error('Upload error:', error);
            toast.error('❌ Failed to upload image. Please try again.');
        }
        finally {
            setIsUploading(false);
        }
    };
    const handleFileUpload = async (event) => {
        const file = event.target.files?.[0];
        if (!file)
            return;
        await processFile(file);
    };
    const handleDrag = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        }
        else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };
    const handleDrop = async (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            await processFile(e.dataTransfer.files[0]);
        }
    };
    const handleUrlSave = () => {
        if (!imageUrl.trim()) {
            toast.error('Please enter a valid image URL');
            return;
        }
        // Basic URL validation
        try {
            new URL(imageUrl);
        }
        catch {
            toast.error('Please enter a valid URL');
            return;
        }
        onSave(imageUrl);
        setIsEditing(false);
        toast.success('✅ Image updated successfully!');
    };
    const handleCancel = () => {
        setImageUrl(src);
        setIsEditing(false);
        setUploadMethod('file');
        setDragActive(false);
    };
    if (isEditing) {
        return (_jsx("div", { className: "relative", children: _jsx("div", { className: "border-2 border-dashed border-gold-300 rounded-2xl p-6 bg-gradient-to-br from-gold-50 to-white shadow-lg", children: _jsxs("div", { className: "space-y-6", children: [_jsxs("div", { className: "text-center", children: [_jsx("div", { className: "w-16 h-16 bg-gold-100 rounded-full flex items-center justify-center mx-auto mb-3", children: _jsx(Image, { className: "w-8 h-8 text-gold-600" }) }), _jsx("h3", { className: "text-lg font-semibold text-navy-900", children: "Update Your Photo" }), _jsx("p", { className: "text-sm text-navy-600", children: "Upload from your device or use a URL" })] }), _jsxs("div", { className: "flex space-x-2 bg-white rounded-lg p-1 border border-navy-200", children: [_jsxs("button", { onClick: () => setUploadMethod('file'), className: `flex-1 px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${uploadMethod === 'file'
                                        ? 'bg-gold-500 text-white shadow-md'
                                        : 'text-navy-700 hover:bg-navy-50'}`, children: [_jsx(Upload, { className: "w-4 h-4 inline mr-2" }), "Upload File"] }), _jsxs("button", { onClick: () => setUploadMethod('url'), className: `flex-1 px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${uploadMethod === 'url'
                                        ? 'bg-gold-500 text-white shadow-md'
                                        : 'text-navy-700 hover:bg-navy-50'}`, children: [_jsx(Link, { className: "w-4 h-4 inline mr-2" }), "Use URL"] })] }), uploadMethod === 'file' ? (_jsxs("div", { className: "text-center", children: [_jsx("input", { ref: fileInputRef, type: "file", accept: "image/*", onChange: handleFileUpload, className: "hidden" }), _jsxs("div", { className: `border-2 border-dashed rounded-xl p-8 transition-all duration-200 cursor-pointer ${dragActive
                                        ? 'border-gold-500 bg-gold-50'
                                        : 'border-navy-300 hover:border-gold-400 hover:bg-gold-25'}`, onDragEnter: handleDrag, onDragLeave: handleDrag, onDragOver: handleDrag, onDrop: handleDrop, onClick: () => fileInputRef.current?.click(), children: [_jsx(Upload, { className: `w-12 h-12 mx-auto mb-4 ${dragActive ? 'text-gold-600' : 'text-navy-400'}` }), _jsx("p", { className: "text-navy-700 font-medium mb-2", children: dragActive ? 'Drop your image here!' : 'Click to upload or drag and drop' }), _jsx("p", { className: "text-sm text-navy-500 mb-4", children: "JPG, PNG, GIF, WebP up to 10MB" }), _jsx("button", { disabled: isUploading, className: "bg-gold-500 text-white px-6 py-3 rounded-lg hover:bg-gold-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium", children: isUploading ? (_jsxs("div", { className: "flex items-center space-x-2", children: [_jsx("div", { className: "w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" }), _jsx("span", { children: "Uploading..." })] })) : ('Choose Your Photo') })] })] })) : (_jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-navy-700 mb-2", children: "Image URL" }), _jsx("input", { type: "url", value: imageUrl, onChange: (e) => setImageUrl(e.target.value), className: "w-full px-4 py-3 border border-navy-200 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent transition-all duration-200", placeholder: "https://example.com/your-photo.jpg" }), _jsx("p", { className: "text-xs text-navy-500 mt-2", children: "\uD83D\uDCA1 Tip: Use a direct link to an image file for best results" })] })), imageUrl && imageUrl !== src && (_jsxs("div", { className: "mt-4", children: [_jsx("p", { className: "text-sm font-medium text-navy-700 mb-3", children: "Preview:" }), _jsxs("div", { className: "relative", children: [_jsx("img", { src: imageUrl, alt: "Preview", className: "w-full h-40 object-cover rounded-lg border-2 border-navy-200 shadow-sm", onError: () => toast.error('❌ Invalid image URL') }), _jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-lg" })] })] })), _jsxs("div", { className: "flex space-x-3 pt-4 border-t border-navy-100", children: [_jsx("button", { onClick: uploadMethod === 'url' ? handleUrlSave : () => { }, disabled: uploadMethod === 'file' || isUploading || !imageUrl, className: "flex-1 bg-green-500 text-white py-3 rounded-lg hover:bg-green-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium", children: "\u2705 Save Photo" }), _jsx("button", { onClick: handleCancel, disabled: isUploading, className: "flex-1 bg-red-500 text-white py-3 rounded-lg hover:bg-red-600 transition-colors disabled:opacity-50 font-medium", children: "\u274C Cancel" })] })] }) }) }));
    }
    return (_jsxs("div", { className: "relative group", children: [_jsx("img", { src: src, alt: alt, className: className }), _jsx(motion.button, { onClick: () => setIsEditing(true), whileHover: { scale: 1.1 }, whileTap: { scale: 0.9 }, className: "absolute top-4 right-4 bg-gold-500 text-white p-3 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-gold-600 shadow-lg", title: "\uD83D\uDCF8 Change Photo", children: _jsx(Camera, { className: "w-5 h-5" }) })] }));
};
export default EditableImage;
