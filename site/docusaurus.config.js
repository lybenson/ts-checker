// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github')
const darkCodeTheme = require('prism-react-renderer/themes/dracula')

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Ts-Checker',
  favicon: 'img/favicon-32x32.png',

  url: 'https://ts.lybenson.com',
  baseUrl: '/',

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en']
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          routeBasePath: '/',
          showLastUpdateTime: true,
          sidebarPath: require.resolve('./sidebars.js')
        },
        blog: false,
        theme: {
          customCss: require.resolve('./src/css/custom.css')
        }
      })
    ]
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      image: 'img/docusaurus-social-card.jpg',
      navbar: {
        title: 'Ts-Checker',
        // logo: {
        //   src: 'img/logo.svg'
        // },
        items: [
          {
            href: 'https://github.com/lybenson/ts-checker',
            label: 'GitHub',
            position: 'right'
          }
        ]
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme
      }
    }),
  scripts: [
    {
      defer: true,
      src: 'https://umami.heapup.tech/script.js',
      'data-website-id': '2637f236-b288-410c-b4b5-0551584b4d6f'
    }
  ]
}

module.exports = config
