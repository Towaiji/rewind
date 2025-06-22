import 'react-native-url-polyfill/auto';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ibzrzpueqewzlcucuvvl.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlienJ6cHVlcWV3emxjdWN1dnZsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA2MTU3OTAsImV4cCI6MjA2NjE5MTc5MH0.JHTMi0rt7KcZIZW5zXd33tuhb4K2iqVelh1Aw6YxnfQ'

export const supabase = createClient(supabaseUrl, supabaseAnonKey);