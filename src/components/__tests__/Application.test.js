/*
  We are rendering `<Application />` down below, so we need React.createElement
*/
import React from "react";

/*
  We import our helper functions from the react-testing-library (to enable us do our queries)
  The render function allows us to render Components
*/
import {
  getByText,
  render,
  waitForElement,
  waitForElementToBeRemoved,
  fireEvent,
  prettyDOM,
  getAllByTestId,
  getByAltText,
  getByPlaceholderText,
  queryByText,
} from "@testing-library/react";

/*
  We import the component that we are testing
*/
import Application from "components/Application";

/*
  A test that renders a React Component
*/
xit("renders without crashing", () => {
  render(<Application />);
});

describe("Application", () => {
  it("defaults to Monday and changes the schedule when a new day is selected", () => {
    const { getByText } = render(<Application />);

    return waitForElement(() => getByText("Monday")).then(() => {
      fireEvent.click(getByText("Tuesday"));
      expect(getByText("Leopold Silvers")).toBeInTheDocument();
    });
  });

  // making an async call using async/await.
  it("loads data, books an interview and reduces the spots remaining for the first day by 1", async () => {
    // const { getyByText } = render(<Application />);
    const { container, debug } = render(<Application />);

    // Async code, waiting for the container to load before searching for the name.
    await waitForElement(() => getByText(container, "Archie Cohen"));
    // console.log(prettyDOM(container));

    // gets all appointments in the container. id added to component.
    const appointments = getAllByTestId(container, "appointment");
    // console.log(prettyDOM(appointments));

    // gets the first item in the container
    // const appointment = getAllByTestId(container, "appointment")[0];
    const appointment = appointments[0];
    // console.log(prettyDOM(appointment));

    fireEvent.click(getByAltText(appointment, "Add"));

    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Lydia Miller-Jones" },
    });

    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));

    fireEvent.click(getByText(appointment, "Save"));
    // debug(appointment);
    expect(getByText(appointment, "Saving")).toBeInTheDocument();

    // checking to see that the name appears after saving.
    await waitForElementToBeRemoved(() => getByText(appointment, "Saving"));
    expect(getByText(appointment, "Lydia Miller-Jones")).toBeInTheDocument();

    // alternate implementation of lines 76 & 77 - await waitForElement(() => getByText(appointment, "Lydia Miller-Jones"));

    // finding the specific day node that contains the text "Monday" - Id added to daylist item component - data-testid="day"

    const day = getAllByTestId(container, "day").find((day) =>
      queryByText(day, "Monday")
    );
    // console.log(prettyDOM(day));

    // check to see that the day with text "Monday" also has text "no spots remaining"
    expect(getByText(day, "no spots remaining")).toBeInTheDocument();
  });
});
