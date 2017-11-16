import React from 'react';
import { findRenderedComponentWithType, renderIntoDocument } from 'react-dom/test-utils';


const createTestComponent = (TestComponent, props) => {
  return findRenderedComponentWithType(
    renderIntoDocument(<TestComponent {...props} />),
    TestComponent
  );
};

export default createTestComponent;
