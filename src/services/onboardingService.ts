import { supabase } from '../lib/supabase';
import type { Child, Preferences } from '../lib/supabase';

export class OnboardingService {
  // Save children data
  static async saveChildren(parentId: string, childrenData: Array<{
    first_name: string;
    last_name: string;
    dob?: string;
    grade: string;
    board: string;
    subjects: string[];
  }>): Promise<{ children: Child[] | null; error: any }> {
    try {
      const childrenToInsert = childrenData.map(child => ({
        parent_id: parentId,
        ...child
      }));

      const { data, error } = await supabase
        .from('children')
        .insert(childrenToInsert)
        .select();

      if (error) throw error;
      return { children: data, error: null };
    } catch (error) {
      console.error('Save children error:', error);
      return { children: null, error };
    }
  }

  // Get children by parent ID
  static async getChildrenByParentId(parentId: string): Promise<{ children: Child[] | null; error: any }> {
    try {
      const { data, error } = await supabase
        .from('children')
        .select('*')
        .eq('parent_id', parentId)
        .order('created_at', { ascending: true });

      if (error) throw error;
      return { children: data, error: null };
    } catch (error) {
      console.error('Get children error:', error);
      return { children: null, error };
    }
  }

  // Save preferences
  static async savePreferences(parentId: string, preferences: {
    language_preference: string;
    notifications_on: boolean;
    whatsapp_on: boolean;
  }): Promise<{ preferences: Preferences | null; error: any }> {
    try {
      // Use upsert to handle both insert and update
      const { data, error } = await supabase
        .from('preferences')
        .upsert([{
          parent_id: parentId,
          ...preferences
        }])
        .select()
        .single();

      if (error) throw error;
      return { preferences: data, error: null };
    } catch (error) {
      console.error('Save preferences error:', error);
      return { preferences: null, error };
    }
  }

  // Get preferences by parent ID
  static async getPreferencesByParentId(parentId: string): Promise<{ preferences: Preferences | null; error: any }> {
    try {
      const { data, error } = await supabase
        .from('preferences')
        .select('*')
        .eq('parent_id', parentId)
        .single();

      if (error && error.code !== 'PGRST116') {
        throw error;
      }

      return { preferences: data, error: null };
    } catch (error) {
      console.error('Get preferences error:', error);
      return { preferences: null, error };
    }
  }

  // Update child
  static async updateChild(childId: string, updates: Partial<Child>): Promise<{ child: Child | null; error: any }> {
    try {
      const { data, error } = await supabase
        .from('children')
        .update(updates)
        .eq('id', childId)
        .select()
        .single();

      if (error) throw error;
      return { child: data, error: null };
    } catch (error) {
      console.error('Update child error:', error);
      return { child: null, error };
    }
  }

  // Delete child
  static async deleteChild(childId: string): Promise<{ error: any }> {
    try {
      const { error } = await supabase
        .from('children')
        .delete()
        .eq('id', childId);

      if (error) throw error;
      return { error: null };
    } catch (error) {
      console.error('Delete child error:', error);
      return { error };
    }
  }
}