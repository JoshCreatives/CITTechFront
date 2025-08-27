import React, { useEffect, useState } from "react";

export default function BlogPanel({ supabaseClient, loading, setLoading }: any) {
  const [blogs, setBlogs] = useState<any[]>([]);
  const [editId, setEditId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editContent, setEditContent] = useState("");
  const [editExcerpt, setEditExcerpt] = useState("");
  const [editCategory, setEditCategory] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState("");
  const [currentImageUrl, setCurrentImageUrl] = useState(""); // Track current image URL

  useEffect(() => {
    fetchBlogs();
    // eslint-disable-next-line
  }, []);

  async function fetchBlogs() {
    const res = await supabaseClient.from("blogs").select();
    setBlogs(res.data || []);
  }

  function startEdit(post: any) {
    setEditId(post.id);
    setEditTitle(post.title || "");
    setEditContent(post.content || "");
    setEditExcerpt(post.excerpt || "");
    setEditCategory(post.category || "Academic News");
    setImagePreview(post.image_url || "");
    setCurrentImageUrl(post.image_url || ""); // Store the current image URL
    setImageFile(null);
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Check if file is an image
      if (!file.type.startsWith('image/')) {
        alert('Please select an image file');
        return;
      }
      
      // Check file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('Image size should be less than 5MB');
        return;
      }
      
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Function to delete the old image from storage
  async function deleteImage(url: string) {
    try {
      // Extract the file path from the URL
      const urlParts = url.split('/');
      const bucketName = 'blog-images';
      const fileName = urlParts[urlParts.length - 1];
      const filePath = `blog-images/${fileName}`;
      
      // Delete the file from storage
      const { error } = await supabaseClient.storage
        .from(bucketName)
        .remove([filePath]);
        
      if (error) {
        console.error("Error deleting old image:", error);
      } else {
        console.log("Old image deleted successfully");
      }
    } catch (error) {
      console.error("Error in deleteImage function:", error);
    }
  }

  async function uploadImage(file: File): Promise<string> {
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2)}.${fileExt}`;
      const filePath = `blog-images/${fileName}`;

      // Upload the file
      const { error: uploadError } = await supabaseClient.storage
        .from('blog-images')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: true
        });

      if (uploadError) {
        console.error("Upload error:", uploadError);
        throw uploadError;
      }

      // Get public URL
      const { data: { publicUrl } } = supabaseClient.storage
        .from('blog-images')
        .getPublicUrl(filePath);

      return publicUrl;
    } catch (error) {
      console.error("Error uploading image:", error);
      throw error;
    }
  }

  async function saveEdit() {
    if (!editId) return;
    
    if (!editTitle.trim() || !editContent.trim() || !editExcerpt.trim()) {
      alert("Please fill in all required fields");
      return;
    }
    
    setLoading(true);
    
    try {
      let imageUrl = currentImageUrl; // Start with the current image URL

      // Upload new image if selected
      if (imageFile) {
        try {
          // Delete the old image if it exists
          if (currentImageUrl) {
            await deleteImage(currentImageUrl);
          }
          
          // Upload the new image
          imageUrl = await uploadImage(imageFile);
          console.log("Image uploaded successfully:", imageUrl);
        } catch (uploadError) {
          console.error("Image upload failed:", uploadError);
          alert("Image upload failed. The post will be saved without the new image.");
          // Keep the existing image URL if upload fails
        }
      }

      // Prepare update data
      const updateData: any = { 
        title: editTitle, 
        content: editContent,
        excerpt: editExcerpt,
        category: editCategory
      };

      // Only update image_url if we have a new image or want to keep existing
      if (imageUrl) {
        updateData.image_url = imageUrl;
      }

      const { error } = await supabaseClient
        .from("blogs")
        .update(updateData)
        .eq("id", editId);

      if (error) {
        console.error("Supabase update error:", error);
        alert("Error: " + error.message);
        return;
      }
      
      console.log("Blog post updated successfully");
      cancelEdit();
      fetchBlogs(); // Refresh the list
      
    } catch (error) {
      console.error("Error saving blog post:", error);
      alert("Failed to save blog post");
    } finally {
      setLoading(false);
    }
  }

  const cancelEdit = () => {
    setEditId(null);
    setEditTitle("");
    setEditContent("");
    setEditExcerpt("");
    setEditCategory("");
    setImagePreview("");
    setCurrentImageUrl("");
    setImageFile(null);
  };

  const removeImage = () => {
    setImagePreview("");
    setImageFile(null);
    
    // If we're removing an image that was previously saved, we should delete it from storage
    if (currentImageUrl) {
      // We'll delete the old image when saving, so just clear the preview for now
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4">
        {blogs.map((post: any) =>
          editId === post.id ? (
            <div key={post.id} className="bg-gray-800 rounded-lg p-6 border border-gray-700">
              <h3 className="text-lg font-semibold text-white mb-4">Edit Blog Post</h3>
              
              {/* Image Upload Section */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-300 mb-3">Blog Image</label>
                
                {/* Image Preview */}
                {imagePreview && (
                  <div className="mb-4 relative">
                    <img 
                      src={imagePreview} 
                      alt="Preview" 
                      className="w-full h-48 object-cover rounded-lg border border-gray-600"
                    />
                    <button
                      onClick={removeImage}
                      className="absolute top-2 right-2 bg-red-600 text-white p-1 rounded-full hover:bg-red-700 transition-colors"
                      title="Remove image"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                )}
                
                {/* File Input */}
                <div className="flex flex-col space-y-2">
                  <input
                    type="file"
                    id="image-upload"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                  <label
                    htmlFor="image-upload"
                    className="px-4 py-2 bg-gray-700 text-white rounded-lg cursor-pointer hover:bg-gray-600 transition-colors text-center"
                  >
                    {imagePreview ? 'Change Image' : 'Upload Image'}
                  </label>
                  <p className="text-xs text-gray-400">
                    Supported formats: JPG, PNG, GIF. Max size: 5MB
                  </p>
                </div>
              </div>

              {/* Title Input */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-300 mb-2">Title *</label>
                <input
                  className="w-full px-3 py-2 rounded bg-gray-700 text-white border border-gray-600 focus:border-red-500 focus:ring-1 focus:ring-red-500 outline-none transition"
                  value={editTitle}
                  onChange={e => setEditTitle(e.target.value)}
                  placeholder="Post title"
                  required
                />
              </div>

              {/* Category Selection */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-300 mb-2">Category *</label>
                <select
                  value={editCategory}
                  onChange={e => setEditCategory(e.target.value)}
                  className="w-full px-3 py-2 rounded bg-gray-700 text-white border border-gray-600 focus:border-red-500 focus:ring-1 focus:ring-red-500 outline-none transition"
                >
                  <option value="Academic News">Academic News</option>
                  <option value="Student Life">Student Life</option>
                  <option value="Events">Events</option>
                  <option value="Research">Research</option>
                  <option value="Alumni Stories">Alumni Stories</option>
                  <option value="Campus Updates">Campus Updates</option>
                </select>
              </div>

              {/* Excerpt Input */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-300 mb-2">Excerpt *</label>
                <textarea
                  className="w-full px-3 py-2 rounded bg-gray-700 text-white border border-gray-600 focus:border-red-500 focus:ring-1 focus:ring-red-500 outline-none transition"
                  value={editExcerpt}
                  onChange={e => setEditExcerpt(e.target.value)}
                  placeholder="Short description"
                  rows={3}
                  required
                />
              </div>

              {/* Content Textarea */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-300 mb-2">Content *</label>
                <textarea
                  className="w-full min-h-[200px] px-3 py-2 rounded bg-gray-700 text-white border border-gray-600 focus:border-red-500 focus:ring-1 focus:ring-red-500 outline-none transition"
                  value={editContent}
                  onChange={e => setEditContent(e.target.value)}
                  placeholder="Post content"
                  required
                />
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end space-x-3">
                <button
                  onClick={cancelEdit}
                  className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={saveEdit}
                  disabled={loading}
                  className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors disabled:opacity-50"
                >
                  {loading ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </div>
          ) : (
            <div key={post.id} className="bg-gray-800 rounded-lg p-4 overflow-hidden hover:shadow-lg transition-shadow flex flex-col relative">
              
              {/* Blog Image Preview */}
              {post.image_url && (
                <div className="mb-3 h-32 overflow-hidden rounded">
                  <img 
                    src={post.image_url} 
                    alt={post.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              
              {/* Content */}
              <div className="flex-1 flex flex-col">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-base font-semibold text-white line-clamp-2">{post.title}</h3>
                </div>
                
                <div className="mb-2">
                  <span className="inline-block bg-red-600 text-white px-2 py-1 rounded text-xs">
                    {post.category || "Uncategorized"}
                  </span>
                </div>
                
                <div className="flex-1 overflow-y-auto mb-3">
                  <p className="text-gray-300 text-sm whitespace-pre-line line-clamp-3">
                    {post.excerpt || post.content?.substring(0, 150) + '...'}
                  </p>
                </div>
                
                {/* Edit Button */}
                <div>
                  <button
                    onClick={() => startEdit(post)}
                    className="w-full px-3 py-2 rounded bg-red-700 hover:bg-red-600 text-white font-semibold transition text-sm"
                  >
                    Edit
                  </button>
                </div>
              </div>
            </div>
          )
        )}
      </div>

      {/* Empty State */}
      {blogs.length === 0 && (
        <div className="text-center py-12 bg-gray-800 rounded-lg border border-gray-700">
          <p className="text-gray-400">No blog posts found.</p>
        </div>
      )}
    </div>
  );
}