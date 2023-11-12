import React from 'react';
import ToolBar from './index';

export default {
  title: 'ToolBar',
  component: ToolBar
};

export const ToStorybook = () => <ToolBar />;

ToStorybook.story = {
  name: 'Default ToolBar'
};
