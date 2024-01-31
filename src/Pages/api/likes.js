let likes = {};

export default (req, res) => {
  if (req.method === 'GET') {
    res.status(200).json(likes);
  } else if (req.method === 'POST') {
    const { postId } = req.body;
    likes[postId] = (likes[postId] || 0) + 1;
    res.status(201).json({ postId, likes: likes[postId] });
  }
};