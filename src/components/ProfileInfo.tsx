import React, { useState, useEffect, useRef } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';

interface ProfileInfoProps {
  onProfileUpdate?: () => void;
}

const ProfileInfo: React.FC<ProfileInfoProps> = ({ onProfileUpdate }) => {
  const { user } = useAuth();
  interface Profile {
    id: string;
    full_name?: string;
    role?: string;
    phone?: string;
    address?: string;
    avatar_url?: string;
    created_at?: string;
    updated_at?: string;
    [key: string]: any;
  }

  const [profile, setProfile] = useState<Profile | null>(null);
  const [editing, setEditing] = useState(false);
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [profilePic, setProfilePic] = useState<string>('');
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (user) fetchProfile();
    // eslint-disable-next-line
  }, [user]);

  const fetchProfile = async () => {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single();
    if (data) {
      setProfile(data);
      setFullName(data.full_name || '');
      setPhone(data.phone || '');
      setAddress(data.address || '');
      setProfilePic(data.avatar_url || '');
    }
  };

  const handleEdit = () => setEditing(true);
  const handleCancel = () => {
    setEditing(false);
    setFullName(profile?.full_name || '');
    setPhone(profile?.phone || '');
    setAddress(profile?.address || '');
    setProfilePic(profile?.avatar_url || '');
  };

  const handleSave = async () => {
    setUploading(true);
    const updates: any = {
      full_name: fullName,
      phone,
      address,
      updated_at: new Date().toISOString(),
    };
    if (profilePic) updates.avatar_url = profilePic;
    const { error } = await supabase
      .from('profiles')
      .update(updates)
      .eq('id', user.id);
    setUploading(false);
    setEditing(false);
    if (!error) {
      fetchProfile();
      onProfileUpdate && onProfileUpdate();
    }
  };

  const handleProfilePicChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const fileExt = file.name.split('.').pop();
    const filePath = `avatars/${user.id}.${fileExt}`;
    const { error: uploadError } = await supabase.storage.from('avatars').upload(filePath, file, { upsert: true });
    if (!uploadError) {
      const { data } = supabase.storage.from('avatars').getPublicUrl(filePath);
      setProfilePic(data.publicUrl);
    }
    setUploading(false);
  };

  const handleRemoveAvatar = async () => {
    if (!profilePic) return;
    setUploading(true);
    // Try to extract the file path from the public URL
    const urlParts = profilePic.split('/');
    const fileName = urlParts[urlParts.length - 1];
    const filePath = `avatars/${fileName}`;
    await supabase.storage.from('avatars').remove([filePath]);
    // Clear avatar_url in profile
    await supabase.from('profiles').update({ avatar_url: '', updated_at: new Date().toISOString() }).eq('id', user.id);
    setProfilePic('');
    setUploading(false);
    fetchProfile();
  };

  if (!profile) return null;

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6 mb-8 flex flex-col md:flex-row items-center gap-6">
      <div className="relative w-28 h-28 rounded-full overflow-hidden border-2 border-blue-200 bg-gray-100 flex-shrink-0">
        <img
          src={profilePic || '/placeholder.svg'}
          alt="Profile"
          className="w-full h-full object-cover"
        />
        {editing && (
          <>
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              className="hidden"
              onChange={handleProfilePicChange}
            />
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-2">
              <Button
                size="sm"
                className="bg-blue-500 text-white px-3 py-1 rounded"
                onClick={() => fileInputRef.current?.click()}
                disabled={uploading}
              >
                Change
              </Button>
              {profilePic && (
                <Button
                  size="sm"
                  variant="destructive"
                  className="px-3 py-1 rounded"
                  onClick={handleRemoveAvatar}
                  disabled={uploading}
                >
                  Remove
                </Button>
              )}
            </div>
          </>
        )}
      </div>
      <div className="flex-1 min-w-0">
        {editing ? (
          <>
            <input
              type="text"
              className="border rounded px-3 py-2 w-full mb-2"
              value={fullName}
              onChange={e => setFullName(e.target.value)}
              disabled={uploading}
              placeholder="Full Name"
            />
            <input
              type="text"
              className="border rounded px-3 py-2 w-full mb-2"
              value={phone}
              onChange={e => setPhone(e.target.value)}
              disabled={uploading}
              placeholder="Phone Number"
            />
            <input
              type="text"
              className="border rounded px-3 py-2 w-full mb-2"
              value={address}
              onChange={e => setAddress(e.target.value)}
              disabled={uploading}
              placeholder="Address"
            />
            <div className="flex gap-2">
              <Button onClick={handleSave} disabled={uploading} className="bg-blue-600 text-white">Save</Button>
              <Button variant="outline" onClick={handleCancel} disabled={uploading}>Cancel</Button>
            </div>
          </>
        ) : (
          <>
            <h2 className="text-xl font-bold text-gray-900 mb-1">{profile.full_name || 'No Name'}</h2>
            <p className="text-gray-600 mb-2">{user.email}</p>
            <div className="flex gap-2 items-center mb-2">
              <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs font-medium">{profile.role || 'buyer'}</span>
            </div>
            {profile.phone && (
              <p className="text-gray-700 mb-1"><span className="font-medium">Phone:</span> {profile.phone}</p>
            )}
            {profile.address && (
              <p className="text-gray-700 mb-1"><span className="font-medium">Address:</span> {profile.address}</p>
            )}
            <Button size="sm" onClick={handleEdit} className="bg-blue-500 text-white">Edit Profile</Button>
          </>
        )}
      </div>
    </div>
  );
};

export default ProfileInfo;
