import { createClient } from '@supabase/supabase-js';
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error('Missing Supabase environment variables');
}
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
        persistSession: false
    }
});
// Test connection function
export const testSupabaseConnection = async () => {
    try {
        const { data, error } = await supabase
            .from('sections')
            .select('count', { count: 'exact', head: true });
        if (error) {
            console.error('Supabase connection test failed:', error);
            return false;
        }
        console.log('Supabase connection successful, sections count:', data);
        return true;
    }
    catch (err) {
        console.error('Supabase connection error:', err);
        return false;
    }
};
