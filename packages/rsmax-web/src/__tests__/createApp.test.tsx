import React from 'react';
import renderer from 'react-test-renderer';
import createApp from '../createApp';

const App: React.FC<{ children?: React.ReactNode }> = ({ children }) => <>{children}</>;
const createPage = (text: string) => () => <div>{text}</div>;

describe('createApp', () => {
  it('renders app correctly', () => {
    const app = renderer.create(
      createApp(
        {
          async: false,
          appComponent: App,
          appConfig: {
            pages: ['pages/foo'],
          },
          pageComponents: [() => createPage('foo'), () => createPage('bar')],
          pages: [
            {
              route: 'pages/foo',
              config: {},
            },
            {
              route: 'pages/bar',
              config: {},
            },
          ],
        },
      )
    );
    expect(app.toJSON()).toMatchSnapshot();
  });

  describe('defaultTitle', () => {
    it('sets document title based on app config', () => {
      renderer.create(
        createApp(
          {
            async: false,
            appComponent: App,
            appConfig: {
              pages: ['pages/index'],
              window: {
                defaultTitle: 'rsmax',
              },
            },
            pageComponents: [() => createPage('index')],
            pages: [
              {
                route: 'pages/index',
                config: {},
              },
            ],
          },
        )
      );
      expect(document.title).toBe('rsmax');
    });

    it('sets document title based on page config', () => {
      renderer.create(
        createApp(
          {
            async: false,
            appComponent: App,
            appConfig: {
              pages: ['pages/index'],
              window: {
                defaultTitle: 'rsmax',
              },
            },
            pageComponents: [() => createPage('index')],
            pages: [
              {
                route: 'pages/index',
                config: {
                  defaultTitle: 'index',
                },
              },
            ],
          },
        )
      );
      expect(document.title).toBe('rsmax');
    });

    describe('tabBar', () => {
      it('renders tabBar correctly', () => {
        const app = renderer.create(
          createApp(
            {
              async: false,
              appComponent: App,
              appConfig: {
                pages: ['pages/foo'],
                tabBar: {
                  textColor: 'red',
                  selectedColor: 'blue',
                  backgroundColor: 'white',
                  items: [
                    {
                      title: 'foo',
                      url: 'pages/foo',
                      image: '/assets/foo.png',
                    },
                    {
                      title: 'bar',
                      url: 'pages/bar',
                      image: '/assets/bar.png',
                    },
                  ],
                },
              },
              pageComponents: [() => createPage('foo'), () => createPage('bar')],
              pages: [
                {
                  route: 'pages/foo',
                  config: {},
                },
                {
                  route: 'pages/bar',
                  config: {},
                },
              ],
            }
          )
        );
        expect(app.toJSON()).toMatchSnapshot();
      });
    });

    describe('pullRefresh', () => {
      it('renders pullRefresh', () => {
        const app = renderer.create(
          createApp(
            {
              async: false,
              appComponent: App,
              appConfig: {
                pages: ['pages/index'],
              },
              pageComponents: [() => createPage('index')],
              pages: [
                {
                  route: 'pages/index',
                  config: {
                    pullRefresh: true,
                  },
                },
              ],
            }
          )
        );
        expect(app.toJSON()).toMatchSnapshot();
      });
    });
  });
});
