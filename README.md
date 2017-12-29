# react-form-suffixes-select

[![MIT Licence](https://badges.frapsoft.com/os/mit/mit.svg?v=103)](https://opensource.org/licenses/mit-license.php)

A React select component that displays name suffixes (II, Sr, PhD) for react forms and fires a callback when a new one is selected.

## Installation

```sh
yarn add react-form-suffixes-select

- or -

npm install react-form-suffixes-select
```

## Usage

1 . Require react-form-suffixes-select after installation

```js
import SuffixesSelect from "react-form-suffixes-select";
```

2 . Include react-form-suffixes-select component

```js
onSuffixSelect = (event, prefix) => {
    // event {SyntheticEvent<HTMLSelectElement>} - React HTML event
    // prefix {Object} - Object representing the suffix
    // suffix.label {string} - The display label of the selected suffix
    // suffix.code {string} - The two or three letter abbreviation of the suffix (unique to the collection)
}

<SuffixesSelect onChange={this.onSuffixSelect} />
```

## Parameters

| Parameter         | Type       | Description                                                                                                                          |
| :---------------- | :--------- | :----------------------------------------------------------------------------------------------------------------------------------- |
| onChange          | `function` | Callback with the selected suffix. Parameters are the HTML event and an object with the format { label: 'Sr', code: 'SR' }           |
| defaultOptionText | `string`   | The label to display for the default/unselected option. A user selecting this option will not fire the callback. (default: "Suffix") |
| hasDefaultOption  | `boolean`  | Toggle the default option on or off (default: true)                                                                                  |
| style             | `Object`   | Javascript object with camelCased CSS properties rather than a CSS string. Standard React styles                                     |
| className         | `string`   | A CSS class name. The presence of this attribute will override all default styles. So it's all or none                               |

## Build

```js
yarn run build
npm run build
```

## Test

```js
yarn run test
npm run test
```

## Lint

```js
yarn run lint
npm run lint
```

## Flow

```js
yarn run flow
npm run flow
```

## License

MIT
