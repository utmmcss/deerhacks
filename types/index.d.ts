declare module 'aos'
declare module '@pmndrs/assets/hdri/city.exr' {
  const url: string
  export default url
}

declare interface String {
  title(): string
}

String.prototype.title = function () {
  return this[0].toUpperCase() + this.slice(1).toLowerCase()
}
