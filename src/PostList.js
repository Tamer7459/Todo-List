import { Link } from "react-router-dom";
import { useContext } from "react";
import { PostsContext } from "./contexts/PostContext";


export default function PostList() {
  const posts  = useContext(PostsContext);
  let PostList = posts.map((post) => {
    return ( 
      <Link style={{textDecoration: 'none', color: 'black'}} key={post.id} to={`/PostDetails/${post.id}`}>
        <div >
          <h1>{post.title}</h1>
        </div>
      </Link>

    )
  })
  return (
      <div>
        {PostList}
      </div>
  );
}




