import mintlifyPrettierConfig from '@mintlify/prettier-config/config.js';

/**
 * @type {import("prettier").Config}
 */
const config = {
  ...mintlifyPrettierConfig,
  proseWrap: 'preserve',
  htmlWhitespaceSensitivity: 'css',
  singleAttributePerLine: true,
};

export default config;
