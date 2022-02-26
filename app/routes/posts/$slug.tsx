import { LoaderFunction, useLoaderData } from "remix";
import { getPost, Post } from "~/api/posts";
import invariant from "tiny-invariant";

export const loader: LoaderFunction = async ({ params: { slug } }) => {
  invariant(slug, "expected params.slug");

  return getPost(slug);
};

export default () => {
  const { html } = useLoaderData<Post>();
  return <section dangerouslySetInnerHTML={{ __html: html }} />;
};