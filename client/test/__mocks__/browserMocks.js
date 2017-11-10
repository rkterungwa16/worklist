//browserMocks.js
const documentMock = (() => ({
  getElementById(value) {
    return {
      value
    };
  }
}))();

Object.defineProperty(window, 'document', {
  value: documentMock
});
