import { useState, useEffect } from 'react'
import axios from 'axios'
import { Heart, Trash2, Plus } from 'lucide-react'

function App() {
  const [posts, setPosts] = useState([])
  const [newPost, setNewPost] = useState({ content: '', category: '' })
  const [loading, setLoading] = useState(false)

  // Fetch posts from backend
  const fetchPosts = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/posts')
      setPosts(response.data)
    } catch (error) {
      console.error('Error fetching posts:', error)
    }
  }

  useEffect(() => {
    fetchPosts()
  }, [])

  // Create new post
  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!newPost.content.trim() || !newPost.category.trim()) return

    try {
      const response = await axios.post('http://localhost:3001/api/posts', newPost)
      setPosts([response.data, ...posts])
      setNewPost({ content: '', category: '' })
    } catch (error) {
      console.error('Error creating post:', error)
    }
  }

  // Pessimistic like update
  const handleLike = async (postId) => {
    console.log('Liking post with ID:', postId)
    
    try {
      const response = await axios.post(`http://localhost:3001/api/posts/${postId}/like`)
      
      // Update only the specific post with server-returned data
      setPosts(posts.map(post => 
        post.id === postId ? response.data : post
      ))
    } catch (error) {
      console.error('Error liking post:', error)
    }
  }

  // Pessimistic delete
  const handleDelete = async (postId) => {
    console.log('Deleting post with ID:', postId)
    
    try {
      await axios.delete(`http://localhost:3001/api/posts/${postId}`)
      
      // Only remove from local state after successful server response
      setPosts(posts.filter(post => post.id !== postId))
    } catch (error) {
      console.error('Error deleting post:', error)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">MindBridge V2</h1>
        
        {/* Create Post Form */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Share Your Thoughts</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="Category (e.g., Study Tips, Mental Health, Career)"
              value={newPost.category}
              onChange={(e) => setNewPost({ ...newPost, category: e.target.value })}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <textarea
              placeholder="What's on your mind?"
              value={newPost.content}
              onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 h-32 resize-none"
              required
            />
            <button
              type="submit"
              className="flex items-center gap-2 bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition-colors"
            >
              <Plus size={20} />
              Post
            </button>
          </form>
        </div>

        {/* Posts List */}
        <div className="space-y-4">
          {posts.map((post) => (
            <div key={post.id} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <span className="inline-block bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full mb-2">
                    {post.category}
                  </span>
                  <p className="text-gray-800 whitespace-pre-wrap">{post.content}</p>
                </div>
                <button
                  onClick={() => handleDelete(post.id)}
                  className="ml-4 text-red-500 hover:text-red-700 transition-colors"
                  aria-label="Delete post"
                >
                  <Trash2 size={20} />
                </button>
              </div>
              
              <div className="flex items-center gap-4 text-gray-600">
                <button
                  onClick={() => handleLike(post.id)}
                  className="flex items-center gap-2 hover:text-red-500 transition-colors"
                >
                  <Heart size={20} className="fill-current" />
                  <span>{post.likes || 0}</span>
                </button>
                <span className="text-sm">
                  {new Date(post.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>
          ))}
          
          {posts.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              <p>No posts yet. Be the first to share!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default App
