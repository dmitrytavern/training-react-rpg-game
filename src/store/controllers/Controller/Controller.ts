function Controller(provides: any[]) {
  return function <T extends { new (...args: any[]): {} }>(constructor: T) {
    constructor.prototype.provides = provides
    return constructor
  }
}

export default Controller
