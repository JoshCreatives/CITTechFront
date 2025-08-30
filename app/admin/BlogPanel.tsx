import React, { useEffect, useState, useCallback } from "react";

export default function BlogPanel({ supabaseClient, loading, setLoading }: any) {
  const [blogs, setBlogs] = useState<any[]>([]);
  const [editId, setEditId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editContent, setEditContent] = useState("");
  const [editExcerpt, setEditExcerpt] = useState("");
  const [editCategory, setEditCategory] = useState("Academic News");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState("");
  const [currentImageUrl, setCurrentImageUrl] = useState("");
  const [bucketInitialized, setBucketInitialized] = useState(false);

  const fetchBlogs = useCallback(async () => {
    try {
      const { data, error } = await supabaseClient.from("blogs").select();
      if (error) {
        console.error("Error fetching blogs:", error);
        return;
      }
      setBlogs(data || []);
    } catch (error) {
      console.error("Unexpected error fetching blogs:", error);
    }
  }, [supabaseClient]);

  // Initialize bucket on component mount
  useEffect(() => {
    initializeBucket();
    fetchBlogs();
  }, [fetchBlogs]);

  // Function to initialize the bucket
  const initializeBucket = async () => {
    try {
      // Check if bucket exists
      const { data: buckets, error: bucketError } = await supabaseClient.storage
        .listBuckets();
      
      if (bucketError) {
        console.error("Error checking buckets:", bucketError);
        return;
      }
      
      const blogImagesBucket = buckets?.find(b => b.name === 'images');
      
      if (!blogImagesBucket) {
        console.log("Images bucket doesn't exist, creating it...");
        // Create the bucket if it doesn't exist
        const { error: createError } = await supabaseClient.storage
          .createBucket('images', { public: true });
        
        if (createError) {
          console.error("Error creating bucket:", createError);
          alert("Please create an 'images' bucket in Supabase Storage first");
          return;
        }
      }
      
      setBucketInitialized(true);
    } catch (error) {
      console.error("Error initializing bucket:", error);
    }
  };

  function startEdit(post: any) {
    setEditId(post.id);
    setEditTitle(post.title || "");
    setEditContent(post.content || "");
    setEditExcerpt(post.excerpt || "");
    setEditCategory(post.category || "Academic News");
    setImagePreview(post.image_url || "");
    setCurrentImageUrl(post.image_url || "");
    setImageFile(null);
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        alert('Please select an image file');
        return;
      }
      
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

  // Simplified deleteImage function
  async function deleteImage(url: string) {
    try {
      // Extract the file path from the URL more reliably
      const urlParts = url.split('/');
      const bucketIndex = urlParts.indexOf('images');
      
      if (bucketIndex === -1) {
        throw new Error("URL does not contain images bucket reference");
      }
      
      // Get everything after the bucket name
      const filePath = urlParts.slice(bucketIndex + 1).join('/');
      
      console.log("Attempting to delete:", filePath);
      
      // Delete the file from storage
      const { error } = await supabaseClient.storage
        .from('images')
        .remove([filePath]);
        
      if (error) {
        console.error("Error deleting old image:", error);
        throw error;
      }
      
      console.log("Old image deleted successfully");
      return true;
    } catch (error) {
      console.error("Error in deleteImage function:", error);
      throw error;
    }
  }

  async function uploadImage(file: File): Promise<string> {
    try {
      if (!bucketInitialized) {
        throw new Error("Storage bucket is not initialized yet");
      }
      
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2)}.${fileExt}`;
      const filePath = fileName;

      // Upload the file
      const { error: uploadError } = await supabaseClient.storage
        .from('images')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: true // Allow overwriting if file exists
        });

      if (uploadError) {
        console.error("Upload error:", uploadError);
        throw uploadError;
      }

      // Get public URL
      const { data: { publicUrl } } = supabaseClient.storage
        .from('images')
        .getPublicUrl(filePath);

      console.log("Image uploaded successfully. Public URL:", publicUrl);
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
      let imageUrl = currentImageUrl;

      // Handle image changes only if bucket is initialized
      if (imageFile && bucketInitialized) {
        try {
          console.log("Starting image upload process...");
          
          // Upload the new image first
          imageUrl = await uploadImage(imageFile);
          console.log("New image uploaded successfully:", imageUrl);
          
          // Only delete the old image after successful upload and if it's different
          if (currentImageUrl && currentImageUrl !== imageUrl) {
            console.log("Deleting old image:", currentImageUrl);
            await deleteImage(currentImageUrl);
          }
        } catch (uploadError) {
          console.error("Image process failed:", uploadError);
          alert(`Image upload failed: ${uploadError.message}. The post will be saved with the existing image.`);
          // Keep the existing image URL if upload fails
          imageUrl = currentImageUrl;
        }
      } else if (!imagePreview && currentImageUrl && bucketInitialized) {
        // If user removed the image preview and there was a previous image
        try {
          await deleteImage(currentImageUrl);
          imageUrl = "";
        } catch (deleteError) {
          console.error("Failed to delete old image:", deleteError);
          alert("Failed to delete old image, but post will be updated without image.");
          imageUrl = "";
        }
      }

      // Prepare update data
      const updateData: any = { 
        title: editTitle, 
        content: editContent,
        excerpt: editExcerpt,
        category: editCategory,
        updated_at: new Date().toISOString()
      };

      // Only add image_url if we're not in the process of handling images
      // or if bucket is not initialized
      if (!bucketInitialized && currentImageUrl) {
        updateData.image_url = currentImageUrl;
      } else if (imageUrl !== undefined) {
        updateData.image_url = imageUrl;
      }

      console.log("Updating blog post with data:", updateData);
      
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
    setEditCategory("Academic News");
    setImagePreview("");
    setCurrentImageUrl("");
    setImageFile(null);
  };

  const removeImage = () => {
    setImagePreview("");
    setImageFile(null);
  };

  return (
    <div className="space-y-6">
      {!bucketInitialized && (
        <div className="bg-yellow-900 text-yellow-200 p-4 rounded-lg">
          <p className="font-semibold">Storage Not Ready</p>
          <p>Please make sure you have created an "images" bucket in your Supabase Storage.</p>
          <button 
            onClick={initializeBucket}
            className="mt-2 px-4 py-2 bg-yellow-700 hover:bg-yellow-600 text-white rounded-lg transition-colors"
          >
            Retry Initialization
          </button>
        </div>
      )}
      
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
                    disabled={!bucketInitialized}
                  />
                  <label
                    htmlFor="image-upload"
                    className={`px-4 py-2 text-white rounded-lg cursor-pointer transition-colors text-center ${
                      bucketInitialized 
                        ? 'bg-gray-700 hover:bg-gray-600' 
                        : 'bg-gray-800 cursor-not-allowed opacity-50'
                    }`}
                  >
                    {imagePreview ? 'Change Image' : 'Upload Image'}
                  </label>
                  <p className="text-xs text-gray-400">
                    Supported formats: JPG, PNG, GIF. Max size: 5MB
                    {!bucketInitialized && " (Storage not ready)"}
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