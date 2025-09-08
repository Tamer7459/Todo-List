import './App.css';
import { Route ,Routes,Link } from 'react-router-dom';
import PostList from './PostList';
import PostDetails from './PostDetails';
import { PostsContext } from './contexts/PostContext';

  const postsData = [
  {
    id:1,
    title: "Post 1",
    body: "Content for Post 1"
  },
  {
    id:2,
    title: "Post 2",
    body: "Content for Post 2"
  },
  {
    id:3,
    title: "Post 3",
    body: "Content for Post 3"
  }
  ] 
export default function App() {

  return (
    <PostsContext.Provider value={ postsData }>
      <div className="App">
        <nav>
          <Link style={{ textDecoration: 'none' , padding:'10px' , color:'black' , fontSize:'25px' }} to="/">Home</Link>
          <Link style={{ textDecoration: 'none' , padding:'10px' , color:'black' , fontSize:'25px' }} to="/about">About</Link>
          <Link style={{ textDecoration: 'none' , padding:'10px' , color:'black' , fontSize:'25px' }} to="/contact">Contact</Link>
        <Link style={{ textDecoration: 'none' , padding:'10px' , color:'black' , fontSize:'25px' }} to="/post">Posts</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/post" element={<PostList />} />
        <Route path="/PostDetails/:postId" element={<PostDetails />} />
      </Routes>
    </div>
  </PostsContext.Provider>
  );
}

function Home() {
  return <h2>Home Page</h2>;
}

function About() {
  return <h2>About Page</h2>;
}

function Contact() {
  return <h2>Contact Page</h2>;
}

