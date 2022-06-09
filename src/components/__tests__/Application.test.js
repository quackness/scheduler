import React from "react";

import { render, cleanup, waitForElement, fireEvent, getByText, prettyDOM, getAllByTestId, getByAltText, getByPlaceholderText } from "@testing-library/react";

import Application from "components/Application";

afterEach(cleanup);

// xit("defaults to Monday and changes the schedule when a new day is selected", () => {
//   const { getByText } = render(<Application />);

//   return waitForElement(() => getByText('Monday'));
// });

//promise
// it("defaults to Monday and changes the schedule when a new day is selected", () => {
//   const { getByText } = render(<Application />);

//   return waitForElement(() => getByText("Monday")).then(() => {
//     fireEvent.click(getByText("Tuesday"));

//     expect(getByText("Leopold Silvers")).toBeInTheDocument();
//   });
// });

describe("Application", () => {
it("changes the schedule when a new day is selected", async () => {
  const { getByText } = render(<Application />);
  await waitForElement(() => getByText("Monday"));
  fireEvent.click(getByText("Tuesday"));
  expect(getByText("Leopold Silvers")).toBeInTheDocument();
  });

  //ByLabelText, ByPlaceholderText, ByText, ByDisplayValue, ByAltText, ByTitle and ByRole
  it("loads data, books an interview and reduces the spots remaining for Monday by 1", async () => {
    const { container } = render (<Application />);
    //console.log("container>>>", container)

    await waitForElement(() => getByText(container, "Archie Cohen"));
    console.log("prettyDOM container", prettyDOM(container));

    const appointment = getAllByTestId(container, "appointment")[0];
    console.log("prettyDOM appointment", prettyDOM(appointment));

    fireEvent.click(getByAltText(appointment, "Add"));

    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: {value: "Lydia Miller-Jones"}
    });

    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));
    
    fireEvent.click(getByText(appointment, "Save"));

    console.log(prettyDOM(appointment));



  });

});



// tests: Render the Application. done
// Wait until the text "Archie Cohen" is displayed.domne 
// Click the "Add" button on the first empty appointment. done
// Enter the name "Lydia Miller-Jones" into the input with the placeholder "Enter Student Name".done
// Click the first interviewer in the list.done
// Click the "Save" button on that same appointment.done
// Check that the element with the text "Saving" is displayed.
// Wait until the element with the text "Lydia Miller-Jones" is displayed.
// Check that the DayListItem with the text "Monday" also has the text "no spots remaining".
