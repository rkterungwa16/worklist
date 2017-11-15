// browserMocks.js document.getElementById().checked
// const documentMock = (() => ({
//   getElementById(value) {
//     return {
//       value,
//       checked: true
//     };
//   }
// }))();

// Object.defineProperty(window, 'document', {
//   value: documentMock
// });

export const document = {
  getElementById(value) {
    return {
      checked: true
    }
  }
}
