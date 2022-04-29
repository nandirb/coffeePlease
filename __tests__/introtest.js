import React from 'react';
import renderer from 'react-test-renderer';
import LoginScreen from '../src/screen/about/LoginScreen';
import Intro from '../src/screen/Intro';

test('renders correctly', () => {
  const tree = renderer.create(<LoginScreen />).toJSON();
  expect(tree).toMatchSnapshot();
});
