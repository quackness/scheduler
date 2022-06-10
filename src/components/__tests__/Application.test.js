import React from "react";

import { render, cleanup, waitForElement, fireEvent, getByText, prettyDOM, getAllByTestId, getByAltText, getByPlaceholderText, queryByText } from "@testing-library/react";

import Application from "components/Application";

afterEach(cleanup);

describe("Application", () => {
  it("changes the schedule when a new day is selected", async () => {
    const { getByText } = render(<Application />);
    await waitForElement(() => getByText("Monday"));
    fireEvent.click(getByText("Tuesday"));
    expect(getByText("Leopold Silvers")).toBeInTheDocument();
  });

  it("loads data, books an interview and reduces the spots remaining for Monday by 1", async () => {
    const { container, debug } = render(<Application />);
  
    await waitForElement(() => getByText(container, "Archie Cohen"));

    const appointment = getAllByTestId(container, "appointment")[0];

    fireEvent.click(getByAltText(appointment, "Add"));

    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Lydia Miller-Jones" }
    });

    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));

    fireEvent.click(getByText(appointment, "Save"));
    expect(getByText(appointment, "Saving")).toBeInTheDocument();

    await waitForElement(() => getByText(appointment, "Lydia Miller-Jones"));

    const day = getAllByTestId(container, "day").find(day =>
      queryByText(day, "Monday"));
    expect(getByText(day, "no spots remaining")).toBeInTheDocument();
  });

  it("loads data, cancels an interview and increases the spots remaining for Monday by 1", async () => {
     // 1. Render the Application.
     const { container, debug } = render(<Application />);
    

     // 2. Wait until the text "Archie Cohen" is displayed.
     await waitForElement(() => getByText(container, "Archie Cohen"));

       // 3. Click the "Delete/cancel" button on the first empty appointment.
       const appointment = getAllByTestId(container, "appointment").find(
         appointment => queryByText(appointment, "Archie Cohen")
         );

       //console.log("appt", prettyDOM(appointment))
       fireEvent.click(getByAltText(appointment, "Delete"));
       expect(getByText(appointment, "Are you sure you want to delete this interview?")).toBeInTheDocument();

       fireEvent.click(getByText(appointment, "Confirm"));
       expect(getByText(appointment, "Deleting appointment")).toBeInTheDocument();

       console.log(appointment)

       //await waitForElement(() => getByText(appointment, "Deleting appointment"));
       await waitForElement(() => getByAltText(appointment, "Add"));
      //  fireEvent.click(getByText("Monday"));
      //  expect(getByText(appointment, "2 spots remaining")).toBeInTheDocument();

      const day = getAllByTestId(container, "day").find(day =>
      queryByText(day, "Monday"));
      expect(getByText(day, "2 spots remaining")).toBeInTheDocument();

      debug();
  })
});











