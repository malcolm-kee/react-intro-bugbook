import React from 'react';
import { Spinner } from './spinner';

/**
 *
 * @param {Object} props
 * @param {'loading' | 'idle' | 'error'} props.status
 */
export const DataContainer = ({ children, status }) => {
  return (
    <div>
      {status === 'loading' && <Spinner />}
      {status === 'error' && <span>Sorry, something goes wrong</span>}
      {children}
    </div>
  );
};
