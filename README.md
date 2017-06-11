# maeby
the maybe monad - *in JS* - with some adornments

## about

This is mostly just a fun project to learn more about monads.  The exposed interface tries to stick closely to a textbook monad interface, but adds a bit of convenience to accommodate the syntax and semantics of JS.

## installation

```sh
$ npm add maeby
# or
$ yarn add maeby
```

## example

```js
import { maybe, just, nothing } from 'maeby'

const flakyCaps = name =>
  Math.random() > 0.5 ? name.toUpperCase() : null

maybe(flakyCaps('hey'))
  .bind(curtGreeting => `${curtGreeting}! how's it goin?`)
  // ^ equivalent to:
  // .bind(curtGreeting => just(`${curtGreeting}! how's it goin?`))
  .js()
  // ^ convert back to the plain unwrapped JS value
```

##  api

### `maybe (value: T): Maybe<T>`

### `just (value: T): Maybe<T>`

### `nothing (): Maybe<T>`

### `bind<T, U> (instance: Maybe<T>, transform: (value: T) => (Maybe<U> | U)): Maybe<U>`

### `js <T> (m: Maybe<T>): ?T`
