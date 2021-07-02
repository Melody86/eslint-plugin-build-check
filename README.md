# eslint-plugin-build-check

eslint rules for pre-build check. Including hardcoded domain, chinese name images...

## Installation

You'll first need to install [ESLint](http://eslint.org):

```
$ npm i eslint --save-dev
```

Next, install `eslint-plugin-build-check`:

```
$ npm install eslint-plugin-build-check --save-dev
```


## Usage

Add `build-check` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

```json
{
    "plugins": [
        "build-check"
    ]
}
```


Then configure the rules you want to use under the rules section.

```json
{
    "rules": {
        "build-check/rule-name": 2
    }
}
```

## Supported Rules

* Fill in provided rules here





