import path from "path";
import fs from "fs/promises";
import parseFrontMatter from "front-matter";
import invariant from "tiny-invariant";
import { marked } from "marked";

export type Post = {
  slug: string;
  title: string;
  html: string;
};
export type PostMarkdownAttributes = {
  title: string;
};
const postsPath = path.join(__dirname, "..", "posts");

const isValidPostAttributes = (
  attributes: any
): attributes is PostMarkdownAttributes => attributes?.title;

export const getPost = async (slug: string) => {
  const filepath = path.join(postsPath, slug + ".md");
  const file = await fs.readFile(filepath);
  const { attributes, body } = parseFrontMatter(file.toString());
  invariant(
    isValidPostAttributes(attributes),
    `Post ${filepath} is missing attributes`
  );
  const html = marked(body);
  return { slug, title: attributes.title, html };
};

export const getPosts = async () => {
  const dir = await fs.readdir(postsPath);
  return Promise.all(
    dir.map(async (filename) => {
      const file = await fs.readFile(path.join(postsPath, filename));

      const { attributes, body } = parseFrontMatter(file.toString());

      invariant(
        isValidPostAttributes(attributes),
        `${filename} has bad meta data!`
      );
      const html = marked(body);

      return {
        slug: filename.replace(/\.md$/, ""),
        title: attributes.title,
        html,
      };
    })
  );
};
