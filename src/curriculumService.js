import { curriculum as defaultCurriculum } from './curriculum.js';
import { supabase } from './supabaseClient.js';

const STORAGE_KEY = 'cp-custom-curriculum';
const UPDATED_KEY = 'cp-custom-curriculum-updated';

export function loadLocalCurriculum() {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) return defaultCurriculum;
    const parsed = JSON.parse(data);
    return parsed.map(w => ({
      ...w,
      week: Number(w.week)
    }));
  } catch {
    return defaultCurriculum;
  }
}

export function saveLocalCurriculum(data) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    localStorage.setItem(UPDATED_KEY, Date.now().toString());
  } catch (e) {
    console.error('Failed to save curriculum locally:', e);
  }
}

export function resetLocalCurriculum() {
  try {
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(UPDATED_KEY);
  } catch (e) {
    console.error('Failed to reset curriculum locally:', e);
  }
}

/**
 * Fetch remote customized curriculum from Supabase
 * Returns { data: Array, updated: Number } or null if not found
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
        const parsed = JSON.parse(data.content);
        // Handle migration from old raw array format to wrapper object format
        let rawData;
        let updatedTime;
        if (Array.isArray(parsed)) {
          rawData = parsed;
          updatedTime = 0;
        } else {
          rawData = parsed.data || defaultCurriculum;
          updatedTime = parsed.updated || 0;
        }
        const sanitized = rawData.map(w => ({
          ...w,
          week: Number(w.week)
        }));
        return { 
          data: sanitized, 
          updated: updatedTime 
        };
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
 * Save remote customized curriculum wrapper to Supabase
 */
export async function syncRemoteCurriculum(curriculumData) {
  if (!supabase) return;
  try {
    const updatedStr = localStorage.getItem(UPDATED_KEY) || Date.now().toString();
    const payload = {
      data: curriculumData,
      updated: parseInt(updatedStr, 10)
    };
    await supabase
      .from('notes')
      .upsert({ week_number: 999, content: JSON.stringify(payload) });
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

const VERSIONS_KEY = 'cp-custom-versions';
const VERSIONS_UPDATED_KEY = 'cp-custom-versions-updated';

export function loadLocalVersions() {
  try {
    const data = localStorage.getItem(VERSIONS_KEY);
    if (!data) return [];
    const parsed = JSON.parse(data);
    return parsed.map(v => ({
      ...v,
      curriculumSnapshot: (v.curriculumSnapshot || []).map(w => ({
        ...w,
        week: Number(w.week)
      }))
    }));
  } catch {
    return [];
  }
}

export function saveLocalVersions(versions) {
  try {
    localStorage.setItem(VERSIONS_KEY, JSON.stringify(versions));
    localStorage.setItem(VERSIONS_UPDATED_KEY, Date.now().toString());
  } catch (e) {
    console.error('Failed to save custom versions locally:', e);
  }
}

export async function fetchRemoteVersions() {
  if (!supabase) return null;
  try {
    const { data, error } = await supabase
      .from('notes')
      .select('content')
      .eq('week_number', 998)
      .single();
    
    if (data && !error && data.content) {
      try {
        const parsed = JSON.parse(data.content);
        let rawData;
        let updatedTime;
        if (Array.isArray(parsed)) {
          rawData = parsed;
          updatedTime = 0;
        } else {
          rawData = parsed.data || [];
          updatedTime = parsed.updated || 0;
        }
        const sanitized = rawData.map(v => ({
          ...v,
          curriculumSnapshot: (v.curriculumSnapshot || []).map(w => ({
            ...w,
            week: Number(w.week)
          }))
        }));
        return { 
          data: sanitized, 
          updated: updatedTime 
        };
      } catch (err) {
        console.error('Failed to parse remote custom versions content:', err);
      }
    }
  } catch (e) {
    console.error('Failed to fetch remote custom versions:', e);
  }
  return null;
}

export async function syncRemoteVersions(versions) {
  if (!supabase) return;
  try {
    const updatedStr = localStorage.getItem(VERSIONS_UPDATED_KEY) || Date.now().toString();
    const payload = {
      data: versions,
      updated: parseInt(updatedStr, 10)
    };
    await supabase
      .from('notes')
      .upsert({ week_number: 998, content: JSON.stringify(payload) });
  } catch (e) {
    console.error('Failed to sync custom versions to cloud:', e);
  }
}


