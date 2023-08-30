import { AuthContext } from "../../auth";
import { render, screen } from "@testing-library/react";
import { PublicRoute } from "../../router/PublicRoute";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { PrivateRoute } from "../../router/PrivateRoute";

describe("pruebas en PublicRoute.jsx", () => {
  test("si no esta autenticado debe mostrar el children", () => {

    //con esto validamos que se guarde los datos en el localStorage
    Storage.prototype.setItem = jest.fn();

    const contextValue = {
      logged: true,
      user: {
        id: 123,
        name: "Jessi mora",
      },
    };
    ///este error: Error: useLocation() may be used only in the context of a <Router> component.
    ///se soluciona usando MemoryRouter
    render(
      <AuthContext.Provider value={contextValue}>
        <MemoryRouter initialEntries={["/search"]}>
          <PrivateRoute>
            <h1>Search</h1>
          </PrivateRoute>
        </MemoryRouter>
      </AuthContext.Provider>
    );

    expect(screen.getByText("Search")).toBeTruthy();
    //con esto validamos que el localStorage haya sido llamado
    expect(localStorage.setItem).toHaveBeenCalled();
  });
});
