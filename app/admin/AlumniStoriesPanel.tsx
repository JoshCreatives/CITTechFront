import React, { useEffect, useState } from "react";

export default function AlumniStoriesPanel({ supabaseClient, loading, setLoading }: any) {
  const [featuredAlumni, setFeaturedAlumni] = useState<any[]>([]);
  const [successStories, setSuccessStories] = useState<any[]>([]);
  const [editId, setEditId] = useState<string | null>(null);
  const [editType, setEditType] = useState<"featured" | "success" | null>(null);
  const [editData, setEditData] = useState<any>({});
  const [isAdding, setIsAdding] = useState<"featured" | "success" | null>(null);

  useEffect(() => {
    fetchFeaturedAlumni();
    fetchSuccessStories();
    // eslint-disable-next-line
  }, []);

  async function fetchFeaturedAlumni() {
    const { data } = await supabaseClient.from("featured_alumni").select("*").order("created_at", { ascending: false });
    setFeaturedAlumni(data || []);
  }

  async function fetchSuccessStories() {
    const { data } = await supabaseClient.from("success_stories").select("*").order("created_at", { ascending: false });
    setSuccessStories(data || []);
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
    setLoading(true);
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
    setLoading(false);
  }

  async function deleteItem(id: string, type: "featured" | "success") {
    if (window.confirm("Are you sure you want to delete this item?")) {
      setLoading(true);
      if (type === "featured") {
        await supabaseClient.from("featured_alumni").delete().eq("id", id);
        fetchFeaturedAlumni();
      } else {
        await supabaseClient.from("success_stories").delete().eq("id", id);
        fetchSuccessStories();
      }
      setLoading(false);
    }
  }

  return (
    <div className="space-y-12">
      {/* Featured Alumni */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-maroon-700 dark:text-white">Featured Alumni</h2>
          <button
            onClick={() => startAdd("featured")}
            className="px-4 py-2 rounded bg-green-700 text-white"
          >
            Add New
          </button>
        </div>
        
        {/* Add New Form for Featured Alumni */}
        {isAdding === "featured" && (
          <div className="bg-gray-800 rounded-lg p-4 mb-6">
            <h3 className="text-lg font-bold mb-3">Add New Featured Alumni</h3>
            <input
              className="w-full mb-2 px-3 py-2 rounded bg-gray-700 text-white"
              value={editData.name}
              onChange={e => setEditData((d: any) => ({ ...d, name: e.target.value }))}
              placeholder="Name"
            />
            <input
              className="w-full mb-2 px-3 py-2 rounded bg-gray-700 text-white"
              value={editData.batch}
              onChange={e => setEditData((d: any) => ({ ...d, batch: e.target.value }))}
              placeholder="Batch"
            />
            <input
              className="w-full mb-2 px-3 py-2 rounded bg-gray-700 text-white"
              value={editData.role}
              onChange={e => setEditData((d: any) => ({ ...d, role: e.target.value }))}
              placeholder="Role"
            />
            <input
              className="w-full mb-2 px-3 py-2 rounded bg-gray-700 text-white"
              value={editData.company}
              onChange={e => setEditData((d: any) => ({ ...d, company: e.target.value }))}
              placeholder="Company"
            />
            <input
              className="w-full mb-2 px-3 py-2 rounded bg-gray-700 text-white"
              value={editData.image_url}
              onChange={e => setEditData((d: any) => ({ ...d, image_url: e.target.value }))}
              placeholder="Image URL"
            />
            <textarea
              className="w-full mb-2 px-3 py-2 rounded bg-gray-700 text-white"
              value={editData.quote || ""}
              onChange={e => setEditData((d: any) => ({ ...d, quote: e.target.value }))}
              placeholder="Quote"
            />
            <textarea
              className="w-full mb-2 px-3 py-2 rounded bg-gray-700 text-white"
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
            />
            <div className="flex gap-2 justify-end">
              <button
                onClick={cancelEdit}
                className="px-3 py-1 rounded bg-gray-700 text-white"
              >
                Cancel
              </button>
              <button
                onClick={saveEdit}
                disabled={loading}
                className="px-3 py-1 rounded bg-red-700 text-white"
              >
                {loading ? "Saving..." : "Save"}
              </button>
            </div>
          </div>
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {featuredAlumni.map((item: any) =>
            editId === item.id && editType === "featured" ? (
              <div key={item.id} className="bg-gray-800 rounded-lg p-4">
                <input
                  className="w-full mb-2 px-3 py-2 rounded bg-gray-700 text-white"
                  value={editData.name}
                  onChange={e => setEditData((d: any) => ({ ...d, name: e.target.value }))}
                  placeholder="Name"
                />
                <input
                  className="w-full mb-2 px-3 py-2 rounded bg-gray-700 text-white"
                  value={editData.batch}
                  onChange={e => setEditData((d: any) => ({ ...d, batch: e.target.value }))}
                  placeholder="Batch"
                />
                <input
                  className="w-full mb-2 px-3 py-2 rounded bg-gray-700 text-white"
                  value={editData.role}
                  onChange={e => setEditData((d: any) => ({ ...d, role: e.target.value }))}
                  placeholder="Role"
                />
                <input
                  className="w-full mb-2 px-3 py-2 rounded bg-gray-700 text-white"
                  value={editData.company}
                  onChange={e => setEditData((d: any) => ({ ...d, company: e.target.value }))}
                  placeholder="Company"
                />
                <input
                  className="w-full mb-2 px-3 py-2 rounded bg-gray-700 text-white"
                  value={editData.image_url}
                  onChange={e => setEditData((d: any) => ({ ...d, image_url: e.target.value }))}
                  placeholder="Image URL"
                />
                <textarea
                  className="w-full mb-2 px-3 py-2 rounded bg-gray-700 text-white"
                  value={editData.quote || ""}
                  onChange={e => setEditData((d: any) => ({ ...d, quote: e.target.value }))}
                  placeholder="Quote"
                />
                <textarea
                  className="w-full mb-2 px-3 py-2 rounded bg-gray-700 text-white"
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
                />
                <div className="flex gap-2 justify-end">
                  <button
                    onClick={cancelEdit}
                    className="px-3 py-1 rounded bg-gray-700 text-white"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={saveEdit}
                    disabled={loading}
                    className="px-3 py-1 rounded bg-red-700 text-white"
                  >
                    {loading ? "Saving..." : "Save"}
                  </button>
                </div>
              </div>
            ) : (
              <div key={item.id} className="bg-gray-800 rounded-lg p-4">
                <div className="flex items-center gap-4 mb-2">
                  <img src={item.image_url} alt={item.name} className="w-16 h-16 object-cover rounded-full" />
                  <div>
                    <div className="font-bold">{item.name}</div>
                    <div className="text-sm text-gray-400">
                      {item.role} at {item.company}
                    </div>
                  </div>
                </div>
                <div className="text-sm text-gray-300 mb-2">{item.quote}</div>
                <div className="text-xs text-gray-400 mb-2">Batch: {item.batch}</div>
                <div className="text-xs text-gray-400 mb-2">
                  Achievements:
                  <ul className="list-disc ml-5">
                    {(item.achievements || []).map((ach: string, idx: number) => (
                      <li key={idx}>{ach}</li>
                    ))}
                  </ul>
                </div>
                <div className="flex gap-2 mt-3">
                  <button
                    onClick={() => startEdit(item, "featured")}
                    className="px-3 py-1 rounded bg-maroon-700 text-white"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteItem(item.id, "featured")}
                    className="px-3 py-1 rounded bg-red-800 text-white"
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
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-maroon-700 dark:text-white">Success Stories</h2>
          <button
            onClick={() => startAdd("success")}
            className="px-4 py-2 rounded bg-green-700 text-white"
          >
            Add New
          </button>
        </div>
        
        {/* Add New Form for Success Stories */}
        {isAdding === "success" && (
          <div className="bg-gray-800 rounded-lg p-4 mb-6">
            <h3 className="text-lg font-bold mb-3">Add New Success Story</h3>
            <input
              className="w-full mb-2 px-3 py-2 rounded bg-gray-700 text-white"
              value={editData.name}
              onChange={e => setEditData((d: any) => ({ ...d, name: e.target.value }))}
              placeholder="Name"
            />
            <input
              className="w-full mb-2 px-3 py-2 rounded bg-gray-700 text-white"
              value={editData.batch}
              onChange={e => setEditData((d: any) => ({ ...d, batch: e.target.value }))}
              placeholder="Batch"
            />
            <input
              className="w-full mb-2 px-3 py-2 rounded bg-gray-700 text-white"
              value={editData.role}
              onChange={e => setEditData((d: any) => ({ ...d, role: e.target.value }))}
              placeholder="Role"
            />
            <input
              className="w-full mb-2 px-3 py-2 rounded bg-gray-700 text-white"
              value={editData.company}
              onChange={e => setEditData((d: any) => ({ ...d, company: e.target.value }))}
              placeholder="Company"
            />
            <input
              className="w-full mb-2 px-3 py-2 rounded bg-gray-700 text-white"
              value={editData.image_url}
              onChange={e => setEditData((d: any) => ({ ...d, image_url: e.target.value }))}
              placeholder="Image URL"
            />
            <input
              className="w-full mb-2 px-3 py-2 rounded bg-gray-700 text-white"
              value={editData.location}
              onChange={e => setEditData((d: any) => ({ ...d, location: e.target.value }))}
              placeholder="Location"
            />
            <input
              className="w-full mb-2 px-3 py-2 rounded bg-gray-700 text-white"
              value={editData.story_url}
              onChange={e => setEditData((d: any) => ({ ...d, story_url: e.target.value }))}
              placeholder="Story URL"
            />
            <div className="flex gap-2 justify-end">
              <button
                onClick={cancelEdit}
                className="px-3 py-1 rounded bg-gray-700 text-white"
              >
                Cancel
              </button>
              <button
                onClick={saveEdit}
                disabled={loading}
                className="px-3 py-1 rounded bg-red-700 text-white"
              >
                {loading ? "Saving..." : "Save"}
              </button>
            </div>
          </div>
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {successStories.map((item: any) =>
            editId === item.id && editType === "success" ? (
              <div key={item.id} className="bg-gray-800 rounded-lg p-4">
                <input
                  className="w-full mb-2 px-3 py-2 rounded bg-gray-700 text-white"
                  value={editData.name}
                  onChange={e => setEditData((d: any) => ({ ...d, name: e.target.value }))}
                  placeholder="Name"
                />
                <input
                  className="w-full mb-2 px-3 py-2 rounded bg-gray-700 text-white"
                  value={editData.batch}
                  onChange={e => setEditData((d: any) => ({ ...d, batch: e.target.value }))}
                  placeholder="Batch"
                />
                <input
                  className="w-full mb-2 px-3 py-2 rounded bg-gray-700 text-white"
                  value={editData.role}
                  onChange={e => setEditData((d: any) => ({ ...d, role: e.target.value }))}
                  placeholder="Role"
                />
                <input
                  className="w-full mb-2 px-3 py-2 rounded bg-gray-700 text-white"
                  value={editData.company}
                  onChange={e => setEditData((d: any) => ({ ...d, company: e.target.value }))}
                  placeholder="Company"
                />
                <input
                  className="w-full mb-2 px-3 py-2 rounded bg-gray-700 text-white"
                  value={editData.image_url}
                  onChange={e => setEditData((d: any) => ({ ...d, image_url: e.target.value }))}
                  placeholder="Image URL"
                />
                <input
                  className="w-full mb-2 px-3 py-2 rounded bg-gray-700 text-white"
                  value={editData.location}
                  onChange={e => setEditData((d: any) => ({ ...d, location: e.target.value }))}
                  placeholder="Location"
                />
                <input
                  className="w-full mb-2 px-3 py-2 rounded bg-gray-700 text-white"
                  value={editData.story_url}
                  onChange={e => setEditData((d: any) => ({ ...d, story_url: e.target.value }))}
                  placeholder="Story URL"
                />
                <div className="flex gap-2 justify-end">
                  <button
                    onClick={cancelEdit}
                    className="px-3 py-1 rounded bg-gray-700 text-white"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={saveEdit}
                    disabled={loading}
                    className="px-3 py-1 rounded bg-red-700 text-white"
                  >
                    {loading ? "Saving..." : "Save"}
                  </button>
                </div>
              </div>
            ) : (
              <div key={item.id} className="bg-gray-800 rounded-lg p-4">
                <div className="flex items-center gap-4 mb-2">
                  <img src={item.image_url} alt={item.name} className="w-16 h-16 object-cover rounded-full" />
                  <div>
                    <div className="font-bold">{item.name}</div>
                    <div className="text-sm text-gray-400">
                      {item.role} at {item.company}
                    </div>
                  </div>
                </div>
                <div className="text-xs text-gray-400 mb-2">Batch: {item.batch}</div>
                <div className="text-xs text-gray-400 mb-2">Location: {item.location}</div>
                <div className="text-xs text-gray-400 mb-2">
                  <a
                    href={item.story_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline text-blue-400"
                  >
                    Read Full Story
                  </a>
                </div>
                <div className="flex gap-2 mt-3">
                  <button
                    onClick={() => startEdit(item, "success")}
                    className="px-3 py-1 rounded bg-maroon-700 text-white"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteItem(item.id, "success")}
                    className="px-3 py-1 rounded bg-red-800 text-white"
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