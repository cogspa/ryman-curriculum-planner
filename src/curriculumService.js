import { curriculum as defaultCurriculum } from './curriculum.js';
import { supabase } from './supabaseClient.js';

const STORAGE_KEY = 'cp-custom-curriculum';

export function loadLocalCurriculum() {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : defaultCurriculum;
  } catch {
    return defaultCurriculum;
  }
}

export function saveLocalCurriculum(data) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (e) {
    console.error('Failed to save curriculum locally:', e);
  }
}

export function resetLocalCurriculum() {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (e) {
    console.error('Failed to reset curriculum locally:', e);
  }
}

/**
 * Fetch remote customized curriculum from Supabase
 * Using a special week_number (999) in the notes table to avoid schema changes.
 */
export async function fetchRemoteCurriculum() {
  if (!supabase) return null;
  try {
    const { data, error } = await supabase
      .from('notes')
      .select('content')
      .eq('week_number', 999)
      .single();
    
    if (data && !error && data.content) {
      try {
        return JSON.parse(data.content);
      } catch (err) {
        console.error('Failed to parse remote curriculum content:', err);
      }
    }
  } catch (e) {
    console.error('Failed to fetch remote curriculum:', e);
  }
  return null;
}

/**
 * Save remote customized curriculum to Supabase
 */
export async function syncRemoteCurriculum(curriculumData) {
  if (!supabase) return;
  try {
    await supabase
      .from('notes')
      .upsert({ week_number: 999, content: JSON.stringify(curriculumData) });
  } catch (e) {
    console.error('Failed to sync curriculum to cloud:', e);
  }
}

/**
 * Delete remote customized curriculum from Supabase (restoring default)
 */
export async function clearRemoteCurriculum() {
  if (!supabase) return;
  try {
    await supabase
      .from('notes')
      .delete()
      .eq('week_number', 999);
  } catch (e) {
    console.error('Failed to clear remote curriculum:', e);
  }
}
