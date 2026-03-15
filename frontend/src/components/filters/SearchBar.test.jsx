import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SearchBar from "./SearchBar";

describe("SearchBar", () => {
  test("renders search, filter, sort, and date inputs", () => {
    render(
      <SearchBar
        searchTerm=""
        setSearchTerm={jest.fn()}
        showHazardous={false}
        setShowHazardous={jest.fn()}
        sortBy="default"
        setSortBy={jest.fn()}
        startDate=""
        setStartDate={jest.fn()}
        endDate=""
        setEndDate={jest.fn()}
      />
    );

    expect(screen.getByPlaceholderText(/search asteroid by name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/sort asteroids/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/start date/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/end date/i)).toBeInTheDocument();
    expect(screen.getByText(/hazardous only/i)).toBeInTheDocument();
  });

  test("calls setSearchTerm when typing", async () => {
    const user = userEvent.setup();
    const setSearchTerm = jest.fn();

    render(
      <SearchBar
        searchTerm=""
        setSearchTerm={setSearchTerm}
        showHazardous={false}
        setShowHazardous={jest.fn()}
        sortBy="default"
        setSortBy={jest.fn()}
        startDate=""
        setStartDate={jest.fn()}
        endDate=""
        setEndDate={jest.fn()}
      />
    );

    const input = screen.getByPlaceholderText(/search asteroid by name/i);
    await user.type(input, "apollo");

    expect(setSearchTerm).toHaveBeenCalled();
  });
});