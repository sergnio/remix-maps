import { redirect, Form } from "remix";
import type { ActionFunction } from "remix";
import { createPost } from "~/api/post";
import invariant from "tiny-invariant";

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();

  const title = formData.get("title");
  invariant(title, "Title is empty!");
  invariant(typeof title === "string", "Markdown is not a string!");

  const slug = title.replace(/ /g, "-").toLowerCase();

  const markdown = formData.get("markdown");
  invariant(markdown, "Markdown is empty!");
  invariant(typeof markdown === "string", "Markdown is not a string!");

  await createPost({ title, slug, markdown });

  return redirect("/admin");
};

export default function NewPost() {
  return (
    <Form method="post">
      <p>
        <label>
          Post Title: <input required type="text" name="title" />
        </label>
      </p>
      <p>
        <label htmlFor="markdown">Markdown:</label>
        <br />
        <textarea required id="markdown" rows={20} name="markdown" />
      </p>
      <p>
        <button type="submit">Create Post</button>
      </p>
    </Form>
  );
}
