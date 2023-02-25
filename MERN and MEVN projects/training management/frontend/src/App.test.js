import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import App from './App';
import store from './store';

describe("App.js", () => {
  test('renders project creator name', () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );
    expect(screen.getByText(/Fazle Rabbi Faiyaz/i)).toBeInTheDocument();
  });

  it('renders JCIT Training h1', async () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );
    const headingElement = await screen.findByText(/JCIT Academy/);
    expect(headingElement).toContainHTML('h1');
  });

  it('Check if login is in button', () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );
    const elem = screen.queryByText(/Login/i);
    expect(elem).toContainHTML('button');
  });
  it('Email in label', () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );
    const elem = screen.getByText(/Email/i);
    expect(elem).toContainHTML('label');
  });
  it('renders sign in', () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );
    const elem = screen.getByText(/Sign in/i);
    expect(elem).toBeInTheDocument();
  });
  it('renders forgot password link', () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );
    const elem = screen.getByText('Forgot password?');
    expect(elem).toContainHTML('a');
  });
});