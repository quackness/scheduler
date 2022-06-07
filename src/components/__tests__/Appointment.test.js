import React from 'react';
import { render } from '@testing-library/react';
import Appointment from 'components/Appointment';

//add test
describe("Appointment", () => {
  it("renders without crashing", () => {
    render(<Appointment />);
  });
});
