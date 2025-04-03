const _charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

export function createRandomString(len: number) {
  return new Array(len).fill(null).map(() => _charset[Math.floor(Math.random() * _charset.length)]).join('')
}
