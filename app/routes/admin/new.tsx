import { redirect, Form, useActionData, useTransition } from "remix";
import type { ActionFunction } from "remix";
import { createPost } from "~/api/post";
import invariant from "tiny-invariant";

type PostError = {
  title?: boolean;
  slug?: boolean;
  markdown?: boolean;
};

export const action: ActionFunction = async ({ request }) => {
  await new Promise((res) => setTimeout(res, 1000));
  const formData = await request.formData();

  const title = formData.get("title");
  invariant(typeof title === "string", "Markdown is not a string!");

  const slug = title.replace(/ /g, "-").toLowerCase();

  const markdown = formData.get("markdown");
  invariant(typeof markdown === "string", "Markdown is not a string!");

  const errors: PostError = {};
  if (!title) errors.title = true;
  if (!markdown) errors.markdown = true;

  if (Object.keys(errors).length) {
    return errors;
  }

  await createPost({ title, slug, markdown });

  return redirect(`/posts/${slug}`);
};

export default function NewPost() {
  const errors = useActionData();
  const { submission } = useTransition();

  return (
    <Form method="post">
      <p>
        <label>
          Post Title: {errors?.title && <em>Title is required</em>}{" "}
          <input type="text" name="title" />
        </label>
      </p>
      <p>
        <label htmlFor="markdown">Markdown: </label>
        {errors?.markdown && <em>Markdown is required</em>}
        <br />
        <textarea id="markdown" rows={20} name="markdown" />
      </p>
      <p>
        <button type="submit" disabled={Boolean(submission)}>
          {submission ? "Creating..." : "Create Post"}
        </button>
      </p>
    </Form>
  );
}
