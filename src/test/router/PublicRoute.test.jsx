import { AuthContext } from "../../auth";
import { render, screen } from "@testing-library/react";
import { PublicRoute } from "../../router/PublicRoute";
import { MemoryRouter, Route, Routes } from "react-router-dom";

describe("pruebas en PublicRoute.jsx", () => {
  test("si no esta autenticado debe mostrar el children", () => {
    const contextValue = {
      logged: false,
    };
    render(
      <AuthContext.Provider value={contextValue}>
        <PublicRoute>
          <h1>Login</h1>
        </PublicRoute>
      </AuthContext.Provider>
    );

    expect(screen.getByText("Login")).toBeTruthy();
  });

  test("debe de navegar si esta auth", () => {
    const contextValue = {
      logged: true,
      user: {
        id: 123,
        name: "Jessi mora",
      },
    };
    render(
      <AuthContext.Provider value={contextValue}>
        <MemoryRouter initialEntries={["/search"]}>
          <Routes>
            <Route
              path="login"
              element={
                <PublicRoute>
                  <h1>Login</h1>
                </PublicRoute>
              }
            />

            <Route path="search" element={<h1>Search</h1>} />
          </Routes>


        </MemoryRouter>
      </AuthContext.Provider>
    );

    expect(screen.getByText("Search")).toBeTruthy();
  });
});
