import React from 'react';
import { render } from '@testing-library/react';
import Appointment from 'components/Appointment';

//add test
it("renders without crashing", () => {
  render(<Appointment />);
});
