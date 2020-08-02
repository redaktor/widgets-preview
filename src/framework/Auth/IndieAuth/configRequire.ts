if (!!require && !!(<any> require)['config']) {
  (<any> require).config({
    baseUrl: '',
    packages: [
      { name: 'src', location: '_build/src' },
      { name: '@dojo/has', location: 'node_modules/@dojo/has' },
      { name: '@dojo/compose', location: 'node_modules/@dojo/compose' },
      { name: '@dojo/core', location: 'node_modules/@dojo/core' },
      { name: '@dojo/i18n', location: 'node_modules/@dojo/i18n' },
      { name: '@dojo/shim', location: 'node_modules/@dojo/shim' },
      { name: '@dojo/streams', location: 'node_modules/@dojo/streams' },
      { name: 'uri-templates', location: 'node_modules/uri-templates', main: 'uri-templates.min' },
      { name: 'globalize', location: 'node_modules/globalize', main: 'dist/globalize' },
      { name: 'cldrjs', location: 'node_modules/cldrjs' },
      { name: 'cldr', location: 'node_modules/cldrjs/dist/cldr', main: '../cldr' },
      { name: 'cldr-data', location: 'node_modules/cldr-data' }
    ]
  });
}
