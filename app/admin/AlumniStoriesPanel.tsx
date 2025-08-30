import React, { useEffect, useState } from "react";

export default function AlumniStoriesPanel({ supabaseClient, loading, setLoading }: any) {
  const [featuredAlumni, setFeaturedAlumni] = useState<any[]>([]);
  const [successStories, setSuccessStories] = useState<any[]>([]);
  const [editId, setEditId] = useState<string | null>(null);
  const [editType, setEditType] = useState<"featured" | "success" | null>(null);
  const [editData, setEditData] = useState<any>({});
  const [isAdding, setIsAdding] = useState<"featured" | "success" | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  useEffect(() => {
    fetchFeaturedAlumni();
    fetchSuccessStories();
  }, []);

  async function fetchFeaturedAlumni() {
    const { data } = await supabaseClient.from("featured_alumni").select("*").order("created_at", { ascending: false });
    setFeaturedAlumni(data || []);
  }

  async function fetchSuccessStories() {
    const { data } = await supabaseClient.from("success_stories").select("*").order("created_at", { ascending: false });
    setSuccessStories(data || []);
  }

  async function uploadImage(file: File, type: "featured" | "success") {
    try {
      setUploading(true);
      setUploadProgress(0);
      
      // Generate a unique file name
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `${type}-alumni/${fileName}`;

      // Upload the file to Supabase Storage
      const { error: uploadError } = await supabaseClient.storage
        .from('alumni-images') // Make sure this bucket exists in your Supabase Storage
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false,
          onUploadProgress: (progress) => {
            const percent = (progress.loaded / progress.total) * 100;
            setUploadProgress(percent);
          }
        });

      if (uploadError) {
        console.error('Upload error:', uploadError);
        throw uploadError;
      }

      // Get the public URL for the uploaded file
      const { data: { publicUrl } } = supabaseClient.storage
        .from('alumni-images')
        .getPublicUrl(filePath);

      return publicUrl;
    } catch (error) {
      console.error('Error uploading image:', error);
      alert(`Error uploading image: ${error.message}`);
      return null;
    } finally {
      setUploading(false);
      setUploadProgress(0);
    }
  }

  function startEdit(item: any, type: "featured" | "success") {
    setEditId(item.id);
    setEditType(type);
    setEditData({ ...item });
  }

  function startAdd(type: "featured" | "success") {
    setIsAdding(type);
    setEditType(type);
    setEditData({
      name: "",
      batch: "",
      role: "",
      company: "",
      image_url: "",
      quote: type === "featured" ? "" : undefined,
      achievements: type === "featured" ? [] : undefined,
      location: type === "success" ? "" : undefined,
      story_url: type === "success" ? "" : undefined,
    });
  }

  function cancelEdit() {
    setEditId(null);
    setEditType(null);
    setIsAdding(null);
    setEditData({});
  }

  async function saveEdit() {
    if (!editData.name || !editData.batch || !editData.role || !editData.company) {
      alert("Please fill in all required fields: Name, Batch, Role, and Company");
      return;
    }

    setLoading(true);
    try {
      if (editType === "featured") {
        if (isAdding) {
          await supabaseClient
            .from("featured_alumni")
            .insert({
              name: editData.name,
              batch: editData.batch,
              role: editData.role,
              company: editData.company,
              image_url: editData.image_url,
              quote: editData.quote,
              achievements: Array.isArray(editData.achievements)
                ? editData.achievements
                : (editData.achievements || "").split("\n").filter((a: string) => a.trim() !== ""),
            });
        } else {
          await supabaseClient
            .from("featured_alumni")
            .update({
              name: editData.name,
              batch: editData.batch,
              role: editData.role,
              company: editData.company,
              image_url: editData.image_url,
              quote: editData.quote,
              achievements: Array.isArray(editData.achievements)
                ? editData.achievements
                : (editData.achievements || "").split("\n").filter((a: string) => a.trim() !== ""),
            })
            .eq("id", editId);
        }
        fetchFeaturedAlumni();
      } else if (editType === "success") {
        if (isAdding) {
          await supabaseClient
            .from("success_stories")
            .insert({
              name: editData.name,
              batch: editData.batch,
              role: editData.role,
              company: editData.company,
              image_url: editData.image_url,
              location: editData.location,
              story_url: editData.story_url,
            });
        } else {
          await supabaseClient
            .from("success_stories")
            .update({
              name: editData.name,
              batch: editData.batch,
              role: editData.role,
              company: editData.company,
              image_url: editData.image_url,
              location: editData.location,
              story_url: editData.story_url,
            })
            .eq("id", editId);
        }
        fetchSuccessStories();
      }
      cancelEdit();
    } catch (error) {
      console.error('Error saving data:', error);
      alert('Error saving data. Please check the console for details.');
    } finally {
      setLoading(false);
    }
  }

  async function deleteItem(id: string, type: "featured" | "success") {
    if (window.confirm("Are you sure you want to delete this item?")) {
      setLoading(true);
      try {
        if (type === "featured") {
          await supabaseClient.from("featured_alumni").delete().eq("id", id);
          fetchFeaturedAlumni();
        } else {
          await supabaseClient.from("success_stories").delete().eq("id", id);
          fetchSuccessStories();
        }
      } catch (error) {
        console.error('Error deleting item:', error);
        alert('Error deleting item. Please check the console for details.');
      } finally {
        setLoading(false);
      }
    }
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, type: "featured" | "success") => {
    if (!e.target.files || e.target.files.length === 0) {
      return;
    }
    
    const file = e.target.files[0];
    
    // Validate file type and size
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file');
      return;
    }
    
    if (file.size > 5 * 1024 * 1024) { // 5MB limit
      alert('Please select an image smaller than 5MB');
      return;
    }
    
    const imageUrl = await uploadImage(file, type);
    
    if (imageUrl) {
      setEditData((d: any) => ({ ...d, image_url: imageUrl }));
    }
    
    // Reset the file input
    e.target.value = '';
  };

  return (
    <div className="space-y-12 p-6 bg-gray-100 dark:bg-gray-900 min-h-screen">
      <h1 className="text-3xl font-bold text-maroon-700 dark:text-white mb-8">Alumni Stories Management</h1>
      
      {/* Featured Alumni */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-maroon-700 dark:text-white">Featured Alumni</h2>
          <button
            onClick={() => startAdd("featured")}
            className="px-4 py-2 rounded bg-green-600 hover:bg-green-700 text-white font-medium transition-colors"
          >
            Add New Featured Alumni
          </button>
        </div>
        
        {/* Add New Form for Featured Alumni */}
        {isAdding === "featured" && (
          <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-6 mb-6">
            <h3 className="text-lg font-bold mb-4 text-maroon-700 dark:text-white">Add New Featured Alumni</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <input
                className="w-full px-4 py-2 rounded border border-gray-300 dark:bg-gray-600 dark:text-white"
                value={editData.name}
                onChange={e => setEditData((d: any) => ({ ...d, name: e.target.value }))}
                placeholder="Full Name *"
              />
              <input
                className="w-full px-4 py-2 rounded border border-gray-300 dark:bg-gray-600 dark:text-white"
                value={editData.batch}
                onChange={e => setEditData((d: any) => ({ ...d, batch: e.target.value }))}
                placeholder="Batch/Year *"
              />
              <input
                className="w-full px-4 py-2 rounded border border-gray-300 dark:bg-gray-600 dark:text-white"
                value={editData.role}
                onChange={e => setEditData((d: any) => ({ ...d, role: e.target.value }))}
                placeholder="Job Role *"
              />
              <input
                className="w-full px-4 py-2 rounded border border-gray-300 dark:bg-gray-600 dark:text-white"
                value={editData.company}
                onChange={e => setEditData((d: any) => ({ ...d, company: e.target.value }))}
                placeholder="Company *"
              />
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Profile Image *</label>
              <div className="flex items-center gap-4">
                <label className="flex flex-col items-center px-4 py-2 bg-white dark:bg-gray-600 text-blue-600 rounded-lg border border-blue-600 cursor-pointer hover:bg-blue-50 dark:hover:bg-gray-500">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  <span className="mt-1 text-sm">Select Image</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageUpload(e, "featured")}
                    className="hidden"
                  />
                </label>
                
                {uploading && (
                  <div className="flex-1">
                    <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                      <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${uploadProgress}%` }}></div>
                    </div>
                    <span className="text-xs text-gray-500 dark:text-gray-400">Uploading: {Math.round(uploadProgress)}%</span>
                  </div>
                )}
                
                {editData.image_url && !uploading && (
                  <div className="flex items-center gap-2">
                    <img src={editData.image_url} alt="Preview" className="w-12 h-12 object-cover rounded" />
                    <span className="text-sm text-green-600">Image ready</span>
                  </div>
                )}
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Supported formats: JPG, PNG, WEBP. Max size: 5MB</p>
            </div>
            
            <textarea
              className="w-full mb-4 px-4 py-2 rounded border border-gray-300 dark:bg-gray-600 dark:text-white"
              value={editData.quote || ""}
              onChange={e => setEditData((d: any) => ({ ...d, quote: e.target.value }))}
              placeholder="Inspirational Quote"
              rows={2}
            />
            <textarea
              className="w-full mb-4 px-4 py-2 rounded border border-gray-300 dark:bg-gray-600 dark:text-white"
              value={
                Array.isArray(editData.achievements)
                  ? editData.achievements.join("\n")
                  : (editData.achievements || "")
              }
              onChange={e =>
                setEditData((d: any) => ({
                  ...d,
                  achievements: e.target.value,
                }))
              }
              placeholder="Achievements (one per line)"
              rows={3}
            />
            <div className="flex gap-2 justify-end">
              <button
                onClick={cancelEdit}
                className="px-4 py-2 rounded bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-white font-medium"
              >
                Cancel
              </button>
              <button
                onClick={saveEdit}
                disabled={loading || uploading}
                className="px-4 py-2 rounded bg-maroon-700 hover:bg-maroon-800 text-white font-medium disabled:opacity-50"
              >
                {loading ? "Saving..." : "Save Featured Alumni"}
              </button>
            </div>
          </div>
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredAlumni.map((item: any) =>
            editId === item.id && editType === "featured" ? (
              <div key={item.id} className="bg-gray-100 dark:bg-gray-700 rounded-lg p-4">
                <h4 className="font-bold mb-3 text-maroon-700 dark:text-white">Edit Featured Alumni</h4>
                <div className="grid grid-cols-1 gap-3 mb-3">
                  <input
                    className="w-full px-3 py-2 rounded border border-gray-300 dark:bg-gray-600 dark:text-white"
                    value={editData.name}
                    onChange={e => setEditData((d: any) => ({ ...d, name: e.target.value }))}
                    placeholder="Name"
                  />
                  <input
                    className="w-full px-3 py-2 rounded border border-gray-300 dark:bg-gray-600 dark:text-white"
                    value={editData.batch}
                    onChange={e => setEditData((d: any) => ({ ...d, batch: e.target.value }))}
                    placeholder="Batch"
                  />
                  <input
                    className="w-full px-3 py-2 rounded border border-gray-300 dark:bg-gray-600 dark:text-white"
                    value={editData.role}
                    onChange={e => setEditData((d: any) => ({ ...d, role: e.target.value }))}
                    placeholder="Role"
                  />
                  <input
                    className="w-full px-3 py-2 rounded border border-gray-300 dark:bg-gray-600 dark:text-white"
                    value={editData.company}
                    onChange={e => setEditData((d: any) => ({ ...d, company: e.target.value }))}
                    placeholder="Company"
                  />
                </div>
                
                <div className="mb-3">
                  <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Profile Image</label>
                  <div className="flex items-center gap-3">
                    <label className="flex flex-col items-center px-3 py-1 bg-white dark:bg-gray-600 text-blue-600 rounded-lg border border-blue-600 cursor-pointer hover:bg-blue-50 dark:hover:bg-gray-500 text-sm">
                      <span>Change</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleImageUpload(e, "featured")}
                        className="hidden"
                      />
                    </label>
                    
                    {uploading && (
                      <div className="flex-1">
                        <div className="w-full bg-gray-200 rounded-full h-2 dark:bg-gray-700">
                          <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${uploadProgress}%` }}></div>
                        </div>
                      </div>
                    )}
                    
                    {editData.image_url && !uploading && (
                      <img src={editData.image_url} alt="Preview" className="w-10 h-10 object-cover rounded" />
                    )}
                  </div>
                </div>
                
                <textarea
                  className="w-full mb-3 px-3 py-2 rounded border border-gray-300 dark:bg-gray-600 dark:text-white"
                  value={editData.quote || ""}
                  onChange={e => setEditData((d: any) => ({ ...d, quote: e.target.value }))}
                  placeholder="Quote"
                  rows={2}
                />
                <textarea
                  className="w-full mb-3 px-3 py-2 rounded border border-gray-300 dark:bg-gray-600 dark:text-white"
                  value={
                    Array.isArray(editData.achievements)
                      ? editData.achievements.join("\n")
                      : (editData.achievements || "")
                  }
                  onChange={e =>
                    setEditData((d: any) => ({
                      ...d,
                      achievements: e.target.value,
                    }))
                  }
                  placeholder="Achievements (one per line)"
                  rows={3}
                />
                <div className="flex gap-2 justify-end">
                  <button
                    onClick={cancelEdit}
                    className="px-3 py-1 rounded bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-white text-sm"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={saveEdit}
                    disabled={loading || uploading}
                    className="px-3 py-1 rounded bg-maroon-700 hover:bg-maroon-800 text-white text-sm disabled:opacity-50"
                  >
                    {loading ? "Saving..." : "Save"}
                  </button>
                </div>
              </div>
            ) : (
              <div key={item.id} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 shadow-sm">
                <div className="flex items-center gap-4 mb-3">
                  <img src={item.image_url} alt={item.name} className="w-16 h-16 object-cover rounded-full" />
                  <div>
                    <div className="font-bold text-gray-900 dark:text-white">{item.name}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">
                      {item.role} at {item.company}
                    </div>
                  </div>
                </div>
                <div className="text-sm text-gray-700 dark:text-gray-300 mb-2 italic">"{item.quote}"</div>
                <div className="text-xs text-gray-500 dark:text-gray-400 mb-2">Batch: {item.batch}</div>
                <div className="text-xs text-gray-500 dark:text-gray-400 mb-2">
                  Achievements:
                  <ul className="list-disc ml-5 mt-1">
                    {(item.achievements || []).map((ach: string, idx: number) => (
                      <li key={idx}>{ach}</li>
                    ))}
                  </ul>
                </div>
                <div className="flex gap-2 mt-3">
                  <button
                    onClick={() => startEdit(item, "featured")}
                    className="px-3 py-1 rounded bg-maroon-700 hover:bg-maroon-800 text-white text-sm"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteItem(item.id, "featured")}
                    className="px-3 py-1 rounded bg-red-700 hover:bg-red-800 text-white text-sm"
                  >
                    Delete
                  </button>
                </div>
              </div>
            )
          )}
        </div>
      </div>
      
      {/* Success Stories */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-maroon-700 dark:text-white">Success Stories</h2>
          <button
            onClick={() => startAdd("success")}
            className="px-4 py-2 rounded bg-green-600 hover:bg-green-700 text-white font-medium transition-colors"
          >
            Add New Success Story
          </button>
        </div>
        
        {/* Add New Form for Success Stories */}
        {isAdding === "success" && (
          <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-6 mb-6">
            <h3 className="text-lg font-bold mb-4 text-maroon-700 dark:text-white">Add New Success Story</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <input
                className="w-full px-4 py-2 rounded border border-gray-300 dark:bg-gray-600 dark:text-white"
                value={editData.name}
                onChange={e => setEditData((d: any) => ({ ...d, name: e.target.value }))}
                placeholder="Full Name *"
              />
              <input
                className="w-full px-4 py-2 rounded border border-gray-300 dark:bg-gray-600 dark:text-white"
                value={editData.batch}
                onChange={e => setEditData((d: any) => ({ ...d, batch: e.target.value }))}
                placeholder="Batch/Year *"
              />
              <input
                className="w-full px-4 py-2 rounded border border-gray-300 dark:bg-gray-600 dark:text-white"
                value={editData.role}
                onChange={e => setEditData((d: any) => ({ ...d, role: e.target.value }))}
                placeholder="Job Role *"
              />
              <input
                className="w-full px-4 py-2 rounded border border-gray-300 dark:bg-gray-600 dark:text-white"
                value={editData.company}
                onChange={e => setEditData((d: any) => ({ ...d, company: e.target.value }))}
                placeholder="Company *"
              />
              <input
                className="w-full px-4 py-2 rounded border border-gray-300 dark:bg-gray-600 dark:text-white"
                value={editData.location}
                onChange={e => setEditData((d: any) => ({ ...d, location: e.target.value }))}
                placeholder="Location"
              />
              <input
                className="w-full px-4 py-2 rounded border border-gray-300 dark:bg-gray-600 dark:text-white"
                value={editData.story_url}
                onChange={e => setEditData((d: any) => ({ ...d, story_url: e.target.value }))}
                placeholder="Story URL"
              />
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Profile Image *</label>
              <div className="flex items-center gap-4">
                <label className="flex flex-col items-center px-4 py-2 bg-white dark:bg-gray-600 text-blue-600 rounded-lg border border-blue-600 cursor-pointer hover:bg-blue-50 dark:hover:bg-gray-500">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  <span className="mt-1 text-sm">Select Image</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageUpload(e, "success")}
                    className="hidden"
                  />
                </label>
                
                {uploading && (
                  <div className="flex-1">
                    <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                      <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${uploadProgress}%` }}></div>
                    </div>
                    <span className="text-xs text-gray-500 dark:text-gray-400">Uploading: {Math.round(uploadProgress)}%</span>
                  </div>
                )}
                
                {editData.image_url && !uploading && (
                  <div className="flex items-center gap-2">
                    <img src={editData.image_url} alt="Preview" className="w-12 h-12 object-cover rounded" />
                    <span className="text-sm text-green-600">Image ready</span>
                  </div>
                )}
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Supported formats: JPG, PNG, WEBP. Max size: 5MB</p>
            </div>
            
            <div className="flex gap-2 justify-end">
              <button
                onClick={cancelEdit}
                className="px-4 py-2 rounded bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-white font-medium"
              >
                Cancel
              </button>
              <button
                onClick={saveEdit}
                disabled={loading || uploading}
                className="px-4 py-2 rounded bg-maroon-700 hover:bg-maroon-800 text-white font-medium disabled:opacity-50"
              >
                {loading ? "Saving..." : "Save Success Story"}
              </button>
            </div>
          </div>
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {successStories.map((item: any) =>
            editId === item.id && editType === "success" ? (
              <div key={item.id} className="bg-gray-100 dark:bg-gray-700 rounded-lg p-4">
                <h4 className="font-bold mb-3 text-maroon-700 dark:text-white">Edit Success Story</h4>
                <div className="grid grid-cols-1 gap-3 mb-3">
                  <input
                    className="w-full px-3 py-2 rounded border border-gray-300 dark:bg-gray-600 dark:text-white"
                    value={editData.name}
                    onChange={e => setEditData((d: any) => ({ ...d, name: e.target.value }))}
                    placeholder="Name"
                  />
                  <input
                    className="w-full px-3 py-2 rounded border border-gray-300 dark:bg-gray-600 dark:text-white"
                    value={editData.batch}
                    onChange={e => setEditData((d: any) => ({ ...d, batch: e.target.value }))}
                    placeholder="Batch"
                  />
                  <input
                    className="w-full px-3 py-2 rounded border border-gray-300 dark:bg-gray-600 dark:text-white"
                    value={editData.role}
                    onChange={e => setEditData((d: any) => ({ ...d, role: e.target.value }))}
                    placeholder="Role"
                  />
                  <input
                    className="w-full px-3 py-2 rounded border border-gray-300 dark:bg-gray-600 dark:text-white"
                    value={editData.company}
                    onChange={e => setEditData((d: any) => ({ ...d, company: e.target.value }))}
                    placeholder="Company"
                  />
                  <input
                    className="w-full px-3 py-2 rounded border border-gray-300 dark:bg-gray-600 dark:text-white"
                    value={editData.location}
                    onChange={e => setEditData((d: any) => ({ ...d, location: e.target.value }))}
                    placeholder="Location"
                  />
                  <input
                    className="w-full px-3 py-2 rounded border border-gray-300 dark:bg-gray-600 dark:text-white"
                    value={editData.story_url}
                    onChange={e => setEditData((d: any) => ({ ...d, story_url: e.target.value }))}
                    placeholder="Story URL"
                  />
                </div>
                
                <div className="mb-3">
                  <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Profile Image</label>
                  <div className="flex items-center gap-3">
                    <label className="flex flex-col items-center px-3 py-1 bg-white dark:bg-gray-600 text-blue-600 rounded-lg border border-blue-600 cursor-pointer hover:bg-blue-50 dark:hover:bg-gray-500 text-sm">
                      <span>Change</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleImageUpload(e, "success")}
                        className="hidden"
                      />
                    </label>
                    
                    {uploading && (
                      <div className="flex-1">
                        <div className="w-full bg-gray-200 rounded-full h-2 dark:bg-gray-700">
                          <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${uploadProgress}%` }}></div>
                        </div>
                      </div>
                    )}
                    
                    {editData.image_url && !uploading && (
                      <img src={editData.image_url} alt="Preview" className="w-10 h-10 object-cover rounded" />
                    )}
                  </div>
                </div>
                
                <div className="flex gap-2 justify-end">
                  <button
                    onClick={cancelEdit}
                    className="px-3 py-1 rounded bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-white text-sm"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={saveEdit}
                    disabled={loading || uploading}
                    className="px-3 py-1 rounded bg-maroon-700 hover:bg-maroon-800 text-white text-sm disabled:opacity-50"
                  >
                    {loading ? "Saving..." : "Save"}
                  </button>
                </div>
              </div>
            ) : (
              <div key={item.id} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 shadow-sm">
                <div className="flex items-center gap-4 mb-3">
                  <img src={item.image_url} alt={item.name} className="w-16 h-16 object-cover rounded-full" />
                  <div>
                    <div className="font-bold text-gray-900 dark:text-white">{item.name}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">
                      {item.role} at {item.company}
                    </div>
                  </div>
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400 mb-2">Batch: {item.batch}</div>
                <div className="text-xs text-gray-500 dark:text-gray-400 mb-2">Location: {item.location}</div>
                <div className="text-xs text-gray-500 dark:text-gray-400 mb-3">
                  {item.story_url && (
                    <a
                      href={item.story_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                    >
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                      Read Full Story
                    </a>
                  )}
                </div>
                <div className="flex gap-2 mt-3">
                  <button
                    onClick={() => startEdit(item, "success")}
                    className="px-3 py-1 rounded bg-maroon-700 hover:bg-maroon-800 text-white text-sm"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteItem(item.id, "success")}
                    className="px-3 py-1 rounded bg-red-700 hover:bg-red-800 text-white text-sm"
                  >
                    Delete
                  </button>
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
}