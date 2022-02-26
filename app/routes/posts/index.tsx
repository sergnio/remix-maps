import { Link, useLoaderData } from "remix";
import getPosts, { Post } from "~/api/getPosts";

export const loader = async (): Promise<Post[]> => getPosts();

export default function Posts() {
  const posts = useLoaderData<Post[]>();
  console.log({ posts });

  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}>
      <h1>Posts page</h1>
      <Link to="/">Home</Link>
      <ul>
        {posts.map(({ slug, title }) => (
          <li key={slug}>
            <Link to={slug}>{title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
