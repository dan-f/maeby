// @flow
export type Maybe<T>
  = Just<T>
  | Nothing

export class Just<T> {
  value: T

  constructor (value: T) {
    this.value = value
  }

  bind<U> (transform: (value: T) => Maybe<U>): Maybe<U> {
    return bind(this, transform)
  }
}

export class Nothing {
  bind<T, U> (transform: (value: T) => Maybe<U>): Maybe<U> {
    return bind(this, transform)
  }
}

export function bind<T, U> (instance: Maybe<T>, transform: (value: T) => Maybe<U>): Maybe<U> {
  if (instance instanceof Just) {
    return transform(instance.value)
  }
  return instance
}

export const just = <T>(value: T): Maybe<T> =>
  new Just(value)

export const nothing = <T>(): Maybe<T> =>
  new Nothing()

export const unit = <T>(value: T): Maybe<T> =>
  value == null ? nothing() : just(value)

export const maybe = unit
