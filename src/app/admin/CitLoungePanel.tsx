import React, { useEffect, useState } from "react";

export default function CitLoungePanel({ supabaseClient, loading, setLoading }: any) {
  const [citLounge, setCitLounge] = useState<any[]>([]);
  const [editId, setEditId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editContent, setEditContent] = useState("");

  useEffect(() => {
    fetchCitLounge();
    // eslint-disable-next-line
  }, []);

  async function fetchCitLounge() {
    const res = await supabaseClient.from("cit_lounge").select();
    setCitLounge(res.data || []);
  }

  function startEdit(item: any) {
    setEditId(item.id);
    setEditTitle(item.title);
    setEditContent(item.content || "");
  }

  async function saveEdit() {
    setLoading(true);
    await supabaseClient
      .from("cit_lounge")
      .update({ title: editTitle, content: editContent })
      .eq("id", editId);
    setEditId(null);
    setEditTitle("");
    setEditContent("");
    setLoading(false);
    fetchCitLounge();
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {citLounge.map((item: any) =>
        editId === item.id ? (
          <div key={item.id} className="bg-gray-800 rounded-lg p-4 aspect-[4/3] flex flex-col relative">
            <button
              onClick={() => setEditId(null)}
              className="absolute top-2 right-2 px-3 py-1 rounded bg-gray-700 hover:bg-gray-600 text-white transition text-sm"
            >
              Cancel
            </button>
            <input
              className="w-full mb-3 px-3 py-2 rounded bg-gray-700 text-white border border-gray-600 focus:border-red-500 focus:ring-1 focus:ring-red-500 outline-none transition text-sm"
              value={editTitle}
              onChange={e => setEditTitle(e.target.value)}
              placeholder="Title"
            />
            <textarea
              className="w-full flex-1 mb-3 px-3 py-2 rounded bg-gray-700 text-white border border-gray-600 focus:border-red-500 focus:ring-1 focus:ring-red-500 outline-none transition text-sm"
              value={editContent}
              onChange={e => setEditContent(e.target.value)}
              placeholder="Content"
            />
            <div className="flex justify-end space-x-2">
              <button
                onClick={saveEdit}
                disabled={loading}
                className="px-3 py-1 rounded bg-red-700 hover:bg-red-600 text-white transition text-sm"
              >
                {loading ? "Saving..." : "Save"}
              </button>
            </div>
          </div>
        ) : (
          <div key={item.id} className="bg-gray-800 rounded-lg p-4 aspect-[4/3] flex flex-col justify-between relative">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-base font-semibold text-white line-clamp-2">{item.title}</h3>
              <button
                onClick={() => startEdit(item)}
                className="px-3 py-1 rounded bg-maroon-700 hover:bg-maroon-800 text-white font-semibold transition text-sm border border-maroon-900 z-10"
                style={{ visibility: "visible" }}
              >
                Edit
              </button>
            </div>
            <div className="flex-1 overflow-hidden">
              <p className="text-gray-300 text-sm line-clamp-4 whitespace-pre-line">
                {item.content}
              </p>
            </div>
          </div>
        )
      )}
    </div>
  );
}
