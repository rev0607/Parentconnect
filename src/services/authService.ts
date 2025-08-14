import { supabase } from '../lib/supabase';
import type { Parent } from '../lib/supabase';

export class AuthService {
  // Sign out
  static async signOut() {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      return { error: null };
    } catch (error) {
      console.error('Sign out error:', error);
      return { error };
    }
  }

  // Get current session
  static async getCurrentSession() {
    try {
      const { data: { session }, error } = await supabase.auth.getSession();
      if (error) throw error;
      return { session, error: null };
    } catch (error) {
      console.error('Get session error:', error);
      return { session: null, error };
    }
  }

  // Get current user
  static async getCurrentUser() {
    try {
      const { data: { user }, error } = await supabase.auth.getUser();
      if (error) throw error;
      return { user, error: null };
    } catch (error) {
      console.error('Get user error:', error);
      return { user: null, error };
    }
  }

  // Create or update parent profile
  static async createOrUpdateParent(userData: {
    google_id: string;
    first_name: string;
    last_name: string;
    email: string;
    phone?: string;
  }): Promise<{ parent: Parent | null; error: any }> {
    try {
      console.log('Creating/updating parent with data:', userData);
      
      // First, try to find existing parent
      const { data: existingParent, error: findError } = await supabase
        .from('parents')
        .select('*')
        .or(`google_id.eq.${userData.google_id},email.eq.${userData.email}`)
        .single();

      if (findError && findError.code !== 'PGRST116') {
        console.error('Find parent error:', findError);
        throw findError;
      }

      if (existingParent) {
        console.log('Updating existing parent:', existingParent.id);
        // Update existing parent
        const { data, error } = await supabase
          .from('parents')
          .update({
            google_id: userData.google_id, // Ensure google_id is set
            first_name: userData.first_name,
            last_name: userData.last_name,
            email: userData.email,
            phone: userData.phone,
          })
          .eq('id', existingParent.id)
          .select()
          .single();

        if (error) throw error;
        console.log('Parent updated successfully:', data);
        return { parent: data, error: null };
      } else {
        console.log('Creating new parent');
        // Create new parent
        const { data, error } = await supabase
          .from('parents')
          .insert([userData])
          .select()
          .single();

        if (error) throw error;
        console.log('Parent created successfully:', data);
        return { parent: data, error: null };
      }
    } catch (error) {
      console.error('Create/update parent error:', error);
      return { parent: null, error };
    }
  }

  // Get parent by Google ID
  static async getParentByGoogleId(googleId: string): Promise<{ parent: Parent | null; error: any }> {
    try {
      const { data, error } = await supabase
        .from('parents')
        .select('*')
        .eq('google_id', googleId)
        .single();

      if (error && error.code !== 'PGRST116') {
        throw error;
      }

      return { parent: data, error: null };
    } catch (error) {
      console.error('Get parent error:', error);
      return { parent: null, error };
    }
  }

  // Get children by parent ID
  static async getChildrenByParentId(parentId: string): Promise<{ children: any[] | null; error: any }> {
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

  // Log activity
  static async logActivity(parentId: string, onboardingStep?: string) {
    try {
      const { error } = await supabase
        .from('activity_log')
        .insert([{
          parent_id: parentId,
          onboarding_step: onboardingStep,
          last_login: new Date().toISOString()
        }]);

      if (error) throw error;
      return { error: null };
    } catch (error) {
      console.error('Log activity error:', error);
      return { error };
    }
  }
}