import { screen } from "@testing-library/react";
import { MemoryRouter, Route, Router } from "react-router-dom";
import { AuthContext } from "../../auth";
import { AppRouter } from "../../router/AppRouter";

describe("pruebas en authRouter", () => {
  test("debe mostrar el login si no esta autenticado", () => {
    const contextValue = {
      logged: false,
    };

    screen(
      <MemoryRouter initialEntries={['/search']}>
        <AuthContext.Provider value={contextValue}>
            <AppRouter/>
        </AuthContext.Provider>
      </MemoryRouter>
    );
      expect(screen.getAllByText('Login')).toBe(2)

  });

  test("debe mostrar el componente de marvel si esta auth", () => {
    const contextValue = {
      logged: true,
      user: {
        id: 123,
        user:'Jessi Mora'
      }
    };

    screen(
      <MemoryRouter initialEntries={['/marvel']}>
        <AuthContext.Provider value={contextValue}>
            <AppRouter/>
        </AuthContext.Provider>
      </MemoryRouter>
    );
      expect(screen.getAllByText('Marvel')).toBeGreaterThanOrEqual(1)

  });
});
