import { useEffect, useState } from 'react';

interface Post {
  id: number;
  content: string;
  createdAt: string;
  author: {
    name: string;
  };
  likes: { id: number }[];
}

export default function Posts() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');

    fetch('/posts', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(res => {
        if (!res.ok) throw new Error('Error al cargar las publicaciones');
        return res.json();
      })
      .then(data => setPosts(data))
      .catch(err => setError(err.message));
  }, []);

  const handleLike = async (postId: number) => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`/posts/${postId}/like`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!res.ok) throw new Error('Error al dar like');
      const updated = await res.json();
      console.log(updated);

      // Recargar publicaciones
      const refresh = await fetch('/posts', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const newPosts = await refresh.json();
      setPosts(newPosts);
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Feed</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {posts.map(post => (
        <div key={post.id} style={{ marginBottom: '1rem', borderBottom: '1px solid #ccc' }}>
          <p><strong>{post.author.name}</strong> dijo:</p>
          <p>{post.content}</p>
          <p><small>{new Date(post.createdAt).toLocaleString()}</small></p>
          <p>{post.likes.length} likes</p>
          <button onClick={() => handleLike(post.id)}>Dar Like</button>
        </div>
      ))}
    </div>
  );
}
