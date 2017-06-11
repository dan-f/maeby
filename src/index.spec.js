import { Just, Nothing, bind, just, nothing, maybe, unit } from './'

const timesThree = x => just(x * 3)
const overFour = x => just(x / 4)

describe('just', () => {
  it('returns an instance of Just with a value', () => {
    const jst = just(4)
    expect(jst instanceof Just).toBe(true)
    expect(jst.value).toBe(4)
  })
})

describe('nothing', () => {
  it('returns an instance of Nothing', () => {
    expect(nothing() instanceof Nothing).toBe(true)
  })
})

describe('maybe', () => {
  it('transforms null to Nothing', () => {
    expect(maybe(null) instanceof Nothing).toBe(true)
  })

  it('transforms undefined to Nothing', () => {
    expect(maybe(undefined) instanceof Nothing).toBe(true)
  })

  it('transforms other falsy values to Just', () => {
    let mb = maybe('')
    expect(mb instanceof Just).toBe(true)
    expect(mb.value).toBe('')
    mb = maybe(0)
    expect(mb instanceof Just).toBe(true)
    expect(mb.value).toBe(0)
    mb = maybe(false)
    expect(mb instanceof Just).toBe(true)
    expect(mb.value).toBe(false)
    mb = maybe(NaN)
    expect(mb instanceof Just).toBe(true)
    expect(mb.value).toEqual(NaN)
  })
})

describe('OOP interface', () => {
  test('Just has a .bind() method', () => {
    expect(
      just(10).bind(timesThree)
    ).toEqual(
      bind(just(10), timesThree)
    )
  })

  test('Nothing has a .bind() method', () => {
    expect(
      nothing().bind(timesThree)
    ).toEqual(
      bind(nothing(), timesThree)
    )
  })
})

describe('monadic laws', () => {
  test('bind(unit(x), f) ≡ f(x)', () => {
    const f = timesThree
    expect(
      bind(unit(10), f)
    ).toEqual(
      timesThree(10)
    )
  })

  test('bind(m, unit) ≡ m', () => {
    expect(
      bind(just(10), unit)
    ).toEqual(
      just(10)
    )
    expect(
      bind(nothing(), unit)
    ).toEqual(
      nothing()
    )
  })

  test('bind(bind(m, f), g) ≡ bind(m, x ⇒ bind(f(x), g))', () => {
    const f = timesThree
    const g = overFour
    expect(
      bind(bind(just(10), f), g)
    ).toEqual(
      bind(just(10), x => bind(f(x), g))
    )
    expect(
      bind(bind(nothing(), f), g)
    ).toEqual(
      bind(nothing(), x => bind(f(x), g))
    )
  })
})
