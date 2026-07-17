import { BlogGridSkeleton } from "@/components/LoadingSkeletons"

export default function BlogLoading() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="h-10 w-80 bg-muted rounded animate-pulse mb-8 mx-auto" />
      <BlogGridSkeleton />
    </div>
  )
}
