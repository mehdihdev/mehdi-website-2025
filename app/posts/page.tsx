import { Navbar } from '@/components/navbar'
import { PostsClient } from '@/components/posts-client'
import { getPosts, getAllTags } from '@/lib/posts'

export default function PostsPage() {
  const posts = getPosts()
  const allTags = getAllTags(posts)

  return (
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white">
      <Navbar />
      <PostsClient posts={posts} allTags={allTags} />
    </div>
  )
}
