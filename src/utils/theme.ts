import { createClient, type SupabaseClient } from '@supabase/supabase-js';

interface UserPreferences {
  id: string;
  user_id: string | null;
  session_id: string | null;
  theme: string;
  created_at: string;
  updated_at: string;
}

interface Database {
  public: {
    Tables: {
      user_preferences: {
        Row: UserPreferences;
        Insert: Partial<UserPreferences>;
        Update: Partial<UserPreferences>;
      };
    };
  };
}

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

let supabase: SupabaseClient<Database> | null = null;

if (supabaseUrl && supabaseAnonKey) {
  supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);
}

export type Theme = 'light' | 'dark';

function generateSessionId(): string {
  const stored = localStorage.getItem('sessionId');
  if (stored) return stored;

  const newId = `session_${Date.now()}_${Math.random().toString(36).substring(2, 11)}`;
  localStorage.setItem('sessionId', newId);
  return newId;
}

export async function saveThemePreference(theme: Theme): Promise<void> {
  localStorage.setItem('theme', theme);

  if (!supabase) return;

  try {
    const { data: { user } } = await supabase.auth.getUser();

    if (user) {
      const { error } = await supabase
        .from('user_preferences')
        .upsert(
          { user_id: user.id, theme, session_id: null } as any,
          { onConflict: 'user_id' }
        );

      if (error) {
        console.warn('Failed to save theme preference to Supabase:', error);
      }
    } else {
      const sessionId = generateSessionId();
      const { error } = await supabase
        .from('user_preferences')
        .upsert(
          { session_id: sessionId, theme, user_id: null } as any,
          { onConflict: 'session_id' }
        );

      if (error) {
        console.warn('Failed to save theme preference to Supabase:', error);
      }
    }
  } catch (error) {
    console.warn('Error saving theme preference:', error);
  }
}

export async function loadThemePreference(): Promise<Theme | null> {
  const localTheme = localStorage.getItem('theme') as Theme | null;

  if (!supabase) {
    return localTheme;
  }

  try {
    const { data: { user } } = await supabase.auth.getUser();

    if (user) {
      const { data, error } = await supabase
        .from('user_preferences')
        .select('theme')
        .eq('user_id', user.id)
        .maybeSingle();

      if (!error && data && 'theme' in data) {
        const theme = (data as any).theme as Theme;
        localStorage.setItem('theme', theme);
        return theme;
      }
    } else {
      const sessionId = localStorage.getItem('sessionId');
      if (sessionId) {
        const { data, error } = await supabase
          .from('user_preferences')
          .select('theme')
          .eq('session_id', sessionId)
          .maybeSingle();

        if (!error && data && 'theme' in data) {
          const theme = (data as any).theme as Theme;
          localStorage.setItem('theme', theme);
          return theme;
        }
      }
    }
  } catch (error) {
    console.warn('Error loading theme preference:', error);
  }

  return localTheme;
}

export function getSystemTheme(): Theme {
  if (window.matchMedia('(prefers-color-scheme: light)').matches) {
    return 'light';
  }
  return 'dark';
}

export function applyTheme(theme: Theme): void {
  document.body.setAttribute('data-theme', theme);
}
