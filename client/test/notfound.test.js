import React from 'react';
import configureStore from 'redux-mock-store';
// import sinon from 'sinon';
import thunk from 'redux-thunk';
import { shallow, mount } from 'enzyme';
import createTestComponent from './utils/createTestComponent';
import NotFound from '../components/NotFound';

const initialProfileState = {
  success: false
};
const middlewares = [thunk];
const mockStore = configureStore(middlewares);


describe('Not Found', () => {
  const store = mockStore(initialProfileState);
  describe('component:', () => {
    it('should render the right number of divs in the Not Found page (7)', () => {
      const wrapper = shallow(<NotFound />);
      expect(wrapper.find('div').length).toEqual(7);
    });
  });
});
