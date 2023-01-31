Proof for moving [MaterializeCSS](https://github.com/materializecss/materialize) code to Typescript.

The proof includes tabs and carousel components.

## Build instructions

```bash
git clone https://github.com/danice/materializecss-typescript-proof
cd materializecss-typescript-proof
npm install
npm run build
```
This will bundle ts files to a 'materialize-css.js', that can be loaded from and html with

```
 <script src="dist/materialize-css.js"></script>  
```

The result can be browsed at  index.html .

## Development notes
The global.ts is used as the entry point of the library.
It includes the export

```
module.exports = {
  Tabs,
  Carousel
}
```

The webpack.config.js is configured to use 'M' as the library name.
```
  output: {
    filename: 'materialize-css.js',
    path: path.resolve(__dirname, 'dist'),
    libraryTarget: 'var',
    library: 'M'    
  }
```
This way components can be initialized as before like:
```
 M.Tabs.init(el, {});
```

