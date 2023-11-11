/* eslint-disable @typescript-eslint/no-unused-vars */

interface String {
  title(): string
}

String.prototype.title = function () {
  return this && this.length ? this[0].toUpperCase() + this.slice(1).toLowerCase() : ''
}
