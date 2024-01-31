let posts = [];

export default (req, res) => {
  if (req.method === 'GET') {
    res.status(200).json(posts);
  } else if (req.method === 'POST') {
    const { image, description } = req.body;
    const newPost = {
      id: Date.now().toString(),
      image,
      description,
      likes: 0,
      comments: [],
    };
    posts.push(newPost);
    res.status(201).json(newPost);
  }
};