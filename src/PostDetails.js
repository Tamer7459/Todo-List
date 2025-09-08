import { useParams } from "react-router-dom";
import { useContext } from "react";
import { PostsContext } from "./contexts/PostContext";

export default function PostDetails() {
    const  posts  = useContext(PostsContext);
    const { postId } = useParams();
    console.log(postId)
    const post = posts.find((p) => {
        return p.id === parseInt(postId);
    });

    if (!post) {
        return <h2>Post not found</h2>; 
    }

    return (
        <div>
            <h1>post Details Page </h1>
            <h1>{post.title}</h1> 
            <p>{post.body}</p>
        </div>
    );
}














