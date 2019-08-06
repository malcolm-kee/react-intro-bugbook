import axios from 'axios';
import React from 'react';

export function LikeButton(props) {
  return (
    <button
      onClick={props.onClick}
      type="button"
      className={props.isLiked ? 'button button-liked' : 'button'}
    >
      Like
    </button>
  );
}

function LikeAllButton(props) {
  return (
    <div className="card ads-card">
      <div className="card-small-title">Exclusive Features for You!</div>
      <button
        onClick={props.onClick}
        id="like-all-btn"
        className="btn"
        type="button"
      >
        Like All Posts
      </button>
    </div>
  );
}

function Post(props) {
  const post = props.data;
  return (
    <article className="card post" key={post.id}>
      <div className="card-title">
        <a href={post.author.src}>{post.author.name}</a>
        <button className="focus-btn" type="button">
          ...
        </button>
      </div>
      <div className="card-content">{post.post.text}</div>
      {post.post.image && (
        <div className="card-image-container">
          <img
            className="card-image"
            src={post.post.image.src}
            alt={post.post.image.alt}
          />
        </div>
      )}
      <div className="card-actions">
        <LikeButton isLiked={props.liked} onClick={props.onLikeClick} />
      </div>
    </article>
  );
}

function Feed(props) {
  const likedIds = props.likedIds;
  return (
    <div className="feed">
      {props.posts.map(post => (
        <Post
          liked={likedIds.includes(post.id)}
          onLikeClick={() => props.toggleLike(post.id)}
          data={post}
          key={post.id}
        />
      ))}
    </div>
  );
}

function usePostData(page, limit) {
  const [postData, setPostData] = React.useState([]);
  React.useEffect(() => {
    axios
      .get(
        `https://bugbook-server.herokuapp.com/posts?_page=${page}&_limit=${limit}`
      )
      .then(res => setPostData(posts => posts.concat(res.data)));
  }, [page, limit]);

  return postData;
}

export function HomePage() {
  const [likedIds, setLikeIds] = React.useState([]);
  const [page, setPage] = React.useState(1);
  const postData = usePostData(page, 5);

  function toggleLike(id) {
    if (likedIds.includes(id)) {
      setLikeIds(likedIds.filter(i => i !== id));
    } else {
      setLikeIds(likedIds.concat(id));
    }
  }

  const data = {};

  return (
    <div>
      <Feed likedIds={likedIds} toggleLike={toggleLike} posts={postData} />
      <button
        className="load-more-btn"
        onClick={() => {
          setPage(page + 1);
        }}
      >
        More Posts
      </button>
      <LikeAllButton
        onClick={() => setLikeIds(postData.map(post => post.id))}
      />
      <div>{data}</div>
    </div>
  );
}
