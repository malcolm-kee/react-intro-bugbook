import { cleanup, render } from '@testing-library/react';
import React from 'react';
import { DataContainer } from './data-container';

afterEach(() => {
  cleanup();
});

test('<DataContainer /> loading', () => {
  const { container } = render(
    <DataContainer status="loading">asdf;alsdfh</DataContainer>
  );

  const spinner = container.querySelector('.spinner');
  expect(spinner).not.toBeNull();
});

test('<DataContainer /> idle', () => {
  const { container, getByText } = render(
    <DataContainer status="idle">asdf;alsdfh</DataContainer>
  );

  const spinner = container.querySelector('.spinner');
  expect(getByText('asdf;alsdfh')).not.toBeNull();
  expect(spinner).toBeNull();
});
