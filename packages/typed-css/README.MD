# @sardine/webpack-plugins-typed-css

The `@sardine/webpack-plugins-typed-css` creates a `.d.ts` file with css classes and ids to be imported by TypeScript.

## Getting Started

First, you'll need to install `@sardine/webpack-plugins-typed-css`:

```console
npm install --save-dev @sardine/webpack-plugins-typed-css
```

And then configure your webpack config file:

**webpack.config.js**

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.module\.css$/,
        use: [
          "style-loader",
          {
            loader: "@sardine/webpack-plugins-typed-css",
            options: {
              banner: "Hey, @sardine/webpack-plugins-typed-css created this file for you!"
            }
          },
          {
            loader: "css-loader",
            options: {
              modules: true,
            }
          }
        ],
      }
    ]
  }
};
```

## How does it work?

This loader depends on `css-loader` and the `modules` option to be enabled.

## Options

|          Name           |        Type         | Default | Description                                                        |
| :---------------------: | :-----------------: | :-----: | :----------------------------------------------------------------- |
| **[`banner`](#banner)** | `{Boolean\|String}` | `true`  | Creates a message at the beginning of each generated `.d.ts` file. |

### `banner`

Type: `{Boolean|String}`
Deafault: `true`

Creates a message at the beginning of each generated `.d.ts` file. You can specify your own message by passing your own string.

## License

[MIT](./LICENSE)
