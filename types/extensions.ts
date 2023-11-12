/* eslint-disable @typescript-eslint/no-unused-vars */

interface String {
  capitalize(): string
  title(): string
}

String.prototype.capitalize = function () {
  return this.replace(/(^\w{1})|([\s\-\.\(]+\w{1})/g, (letter) => letter.toUpperCase())
}

String.prototype.title = function () {
  return this && this.length ? this[0].toUpperCase() + this.slice(1).toLowerCase() : ''
}
