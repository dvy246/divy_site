import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import toast from 'react-hot-toast';
export const useContent = (name) => {
    const [content, setContent] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        fetchContent();
    }, [name]);
    const fetchContent = async () => {
        try {
            setIsLoading(true);
            setError(null);
            const { data, error: fetchError } = await supabase
                .from('sections')
                .select('content')
                .eq('name', name)
                .single();
            if (fetchError) {
                if (fetchError.code === 'PGRST116') {
                    // No rows found, set default content
                    setContent('');
                }
                else {
                    console.error('Supabase fetch error:', fetchError);
                    setContent(''); // Fallback to empty content
                }
            }
            else {
                setContent(data.content || '');
            }
        }
        catch (err) {
            console.error('Error fetching content:', err);
            setError(err.message);
            setContent(''); // Fallback to empty content
        }
        finally {
            setIsLoading(false);
        }
    };
    const saveContent = async (newContent) => {
        try {
            setError(null);
            // Optimistically update local state
            setContent(newContent);
            // Use upsert to insert or update
            const { data, error: upsertError } = await supabase
                .from('sections')
                .upsert({
                name,
                content: newContent,
                updated_at: new Date().toISOString()
            }, {
                onConflict: 'name'
            })
                .select();
            if (upsertError) {
                console.error('Supabase upsert error:', upsertError);
                throw upsertError;
            }
            console.log('Content saved successfully:', data);
            toast.success('Content saved successfully!');
        }
        catch (err) {
            console.error('Error saving content:', err);
            setError(err.message);
            toast.error(`Failed to save content: ${err.message}`);
            // Revert optimistic update on error
            await fetchContent();
        }
    };
    return {
        content,
        saveContent,
        isLoading,
        error
    };
};
// Hook for managing multiple content sections
export const useContentSections = (sectionNames) => {
    const [content, setContent] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        fetchAllContent();
    }, [sectionNames]);
    const fetchAllContent = async () => {
        try {
            setIsLoading(true);
            setError(null);
            const { data, error: fetchError } = await supabase
                .from('sections')
                .select('name, content')
                .in('name', sectionNames);
            if (fetchError) {
                console.error('Supabase fetch error:', fetchError);
                // Set empty content as fallback
                const fallbackContent = {};
                sectionNames.forEach(name => {
                    fallbackContent[name] = '';
                });
                setContent(fallbackContent);
            }
            else {
                const contentMap = {};
                sectionNames.forEach(name => {
                    const found = data?.find(item => item.name === name);
                    contentMap[name] = found?.content || '';
                });
                setContent(contentMap);
            }
        }
        catch (err) {
            console.error('Error fetching content sections:', err);
            setError(err.message);
            // Set empty content as fallback
            const fallbackContent = {};
            sectionNames.forEach(name => {
                fallbackContent[name] = '';
            });
            setContent(fallbackContent);
        }
        finally {
            setIsLoading(false);
        }
    };
    const saveContent = async (name, newContent) => {
        try {
            setError(null);
            // Optimistically update local state
            setContent(prev => ({
                ...prev,
                [name]: newContent
            }));
            // Use upsert to insert or update
            const { data, error: upsertError } = await supabase
                .from('sections')
                .upsert({
                name,
                content: newContent,
                updated_at: new Date().toISOString()
            }, {
                onConflict: 'name'
            })
                .select();
            if (upsertError) {
                console.error('Supabase upsert error:', upsertError);
                throw upsertError;
            }
            console.log('Content saved successfully:', data);
            toast.success('Content saved successfully!');
        }
        catch (err) {
            console.error('Error saving content:', err);
            setError(err.message);
            toast.error(`Failed to save content: ${err.message}`);
            // Revert optimistic update on error
            await fetchAllContent();
        }
    };
    return {
        content,
        saveContent,
        isLoading,
        error
    };
};
