import { createContext, useContext, useState } from "react";
import { faker } from "@faker-js/faker";

// 1. create context
const PostContext = createContext();

function createRandomPost() {
  return {
    title: `${faker.hacker.adjective()} ${faker.hacker.noun()}`,
    body: faker.hacker.phrase(),
  };
}

const PostProvider = ({ children }) => {
  const [posts, setPosts] = useState(() =>
    Array.from({ length: 30 }, () => createRandomPost())
  );

  const [searchQuery, setSearchQuery] = useState("");

  const searchedPosts =
    searchQuery.length > 0
      ? posts.filter((post) =>
          `${post.title} ${post.body}`
            .toLowerCase()
            .includes(searchQuery.toLowerCase())
        )
      : posts;

  function handleAddPost(post) {
    setPosts((posts) => [post, ...posts]);
  }

  function handleClearPosts() {
    setPosts([]);
  }

  return (
    <PostContext.Provider
      value={{
        posts: searchedPosts,
        onAddPost: handleAddPost,
        OnClearPosts: handleClearPosts,
        searchQuery: searchQuery,
        setSearchQuery,
      }}
    >
      {children}
    </PostContext.Provider>
  );
};

const usePosts=()=>{
    const context=useContext(PostContext)
    if(context===undefined)throw new Error ("Postcontext was used outside of postprovider")
    return context;
}
export { PostProvider,usePosts };
