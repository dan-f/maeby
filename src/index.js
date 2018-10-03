// @flow
export type Maybe<T>
  = Just<T>
  | Nothing

export class Just<T> {
  value: T

  constructor (value: T) {
    this.value = value
  }

  bind<U> (transform: (value: T) => (Maybe<U> | U)): Maybe<U> {
    return bind(this, transform)
  }

  unwrap (): ?T {
    return unwrap(this)
  }
}

export class Nothing {
  bind<T, U> (transform: (value: T) => (Maybe<U> | U)): Maybe<U> {
    return bind(this, transform)
  }

  unwrap (): any {
    return unwrap(this)
  }
}

export function bind<T, U> (instance: Maybe<T>, transform: (value: T) => (Maybe<U> | U)): Maybe<U> {
  if (instance instanceof Just) {
    const transformed = transform(instance.value)
    if (transformed instanceof Just || transformed instanceof Nothing) {
      return transformed
    }
    return maybe(transformed)
  }
  return instance
}

export const just = <T>(value: T): Maybe<T> =>
  new Just(value)

export const nothing = <T>(): Maybe<T> =>
  new Nothing()

export const unit = <T>(value: T): Maybe<T> =>
  value == null ? nothing() : just(value)

export const unwrap = <T>(m: Maybe<T>): ?T =>
  m instanceof Just ? m.value : null

export const maybe = unit
