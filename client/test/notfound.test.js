import React from 'react';
import { shallow } from 'enzyme';
import NotFound from '../components/NotFound';


describe('Not Found', () => {
  describe('component:', () => {
    it('should render the right number of divs in the Not Found page (7)', () => {
      const wrapper = shallow(<NotFound />);
      expect(wrapper.find('div').length).toEqual(7);
    });
  });
});
