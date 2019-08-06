import React from 'react';
import cx from 'classnames';

export const CardTitle = props => <div className="card-title" {...props} />;

export const CardContents = props => (
  <div className="card-content" {...props} />
);

export const CardActions = props => <div className="card-actions" {...props} />;

export const Card = ({ className, title, children, ...props }) => {
  return (
    <article className={cx('card', className)} {...props}>
      {title && <CardTitle>{title}</CardTitle>}
      <CardContents>{children}</CardContents>
    </article>
  );
};
