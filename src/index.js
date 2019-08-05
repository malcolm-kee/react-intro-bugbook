import React from 'react';
import ReactDOM from 'react-dom';

const postData = [
  {
    id: 1111,
    author: {
      src: 'https://twitter.com/dog_feelings/status/1130660155966730240',
      name: 'Thoughts of Dog 🏳️‍🌈',
    },
    post: {
      text: 'to be perfectly clear. i love you',
      image: null,
    },
  },
  {
    id: 1,
    author: {
      src: 'https://twitter.com/markdalgleish/status/1095424850565378048',
      name: 'Mark Dalgleish',
    },
    post: {
      text:
        "If you're not mocking out Lodash, can you really call it a unit test?",
      image: null,
    },
  },
  {
    id: 2,
    author: {
      src: 'https://twitter.com/iamdevloper/status/1081923027644882944',
      name: 'I Am Devloper',
    },
    post: {
      text:
        'when you visit a site you handed over 6 months ago and the client made some changes themselves',
      image: {
        src: 'https://bugbook.netlify.com/images/picture-after-client.jpg',
        alt: 'Ugly photo',
      },
    },
  },
];

function Feed(props) {
  return (
    <div className="feed">
      {props.posts.map(post => (
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
            <button type="button" className="button">
              Like
            </button>
          </div>
        </article>
      ))}
    </div>
  );
}

ReactDOM.render(<Feed posts={postData} />, document.getElementById('root'));
