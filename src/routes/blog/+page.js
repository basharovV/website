import { dev } from "$app/environment";

const getAllPosts = () => {
  try {
    const posts = import.meta.glob("/src/posts/*.md", { eager: true });
    return Object.entries(posts)
      .map(([filepath, post]) => {
        console.log('metapost', post.metadata);
        return {
          title: post.metadata.title,
          slug: post.metadata.slug,
          tags: post.metadata.tags,
          published: post.metadata.published,
          date: post.metadata.date,
          // Add html if needed
        };
      })
      .sort((a, b) => a.date.localeCompare(b.date))
      .filter((post) => dev ? true : post.published);
  } catch (e) {
    console.log('err', e);
    return [];
  }
};

export async function load() {
  const posts = getAllPosts();
  console.log('posts', posts);

  // if (dev) {
  //   const wipPosts = getAllPosts(true);
  //   if (wipPosts.length) posts.unshift(...wipPosts);
  // }
  return {
    body: posts,
  };
}
