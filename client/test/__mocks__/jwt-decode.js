// const jwtDecode = jest.genMockFromModule('jwt-decode');

const jwtDecode = (token) => {
  const value = {
    username: '',
    email: ''
  };
  return value;
};

export default jwtDecode;
