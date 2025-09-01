"use client";

import { Suspense } from "react";
import BlogPostView from "./BlogPostView";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <BlogPostView />;
    </Suspense>
  );
}
