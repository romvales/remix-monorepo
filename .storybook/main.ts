import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  stories: [
    '../web/**/*.stories.@(ts|tsx)',
    '../shared/**/*.stories.@(ts|tsx)',
    '../stories/**/*.stories.@(ts|tsx|js|jsx)',
  ],
  
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-onboarding',
    '@storybook/addon-interactions'
  ],

  framework: {
    'name': '@storybook/react-vite',
    'options': {}
  },

}

export default config