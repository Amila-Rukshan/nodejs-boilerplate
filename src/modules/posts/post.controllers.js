import Post from "./post.model";

export async function createPost(req, res) {
  try {
    console.log(req.user)
    const post = await Post.createPost(req.body, req.user._id);
    return res.status(201).json(post);
  } catch (error) {
    return res.status(400).json(error);
  }
}
