import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter, useNavigate } from "react-router-dom";
import { Navbar } from "../../../ui/components/Navbar";
import { AuthContext } from "../../../auth";

////con esto hacemos un mock de react-router-dom, para usar el metodo useNavigate
const mockedUserNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedUserNavigate,
}));
describe("pruebas en Navbar", () => {
  const contextValue = {
    logged: true,
    user: { name: "jessi" },
    logout: jest.fn(),
  };
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("debe de mostrar el nombre del usuario", () => {
    render(
      <MemoryRouter>
        <AuthContext.Provider value={contextValue}>
          <Navbar />
        </AuthContext.Provider>
      </MemoryRouter>
    );
    expect(screen.getByText("jessi")).toBeTruthy();
  });

  test("debe de llamar el logout y navigate cuando se hace click al boton", () => {
    render(
      <MemoryRouter>
        <AuthContext.Provider value={contextValue}>
          <Navbar />
        </AuthContext.Provider>
      </MemoryRouter>
    );
    const nextButton = screen.getByRole("button");
    fireEvent.click(nextButton);
    expect(contextValue.logout).toHaveBeenCalled();
    expect(mockedUserNavigate).toHaveBeenCalledWith("/login", {"replace": true});
  });
});
