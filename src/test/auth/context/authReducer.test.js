import { authReducer } from "../../../auth/context/authReducer";
import { types } from "../../../auth/types/types";

describe("probar authReducer", () => {
  const logged = false;
  const initialState = {
    logged: true,
    user: {
      id: 123,
      name: "Jessi",
    },
  };
  test("debe retornar el estado por defecto", () => {
    const newState = authReducer(logged, {});
    expect(newState).toBe(logged);
  });

  test("debe de llamar login autenticar y establecer el user", () => {
    const action = {
      type: types.login,
      payload: {
        id: 123,
        name: "Jessi",
      },
    };

    const newState = authReducer(initialState, action);
    expect(newState).toEqual(initialState);
  });

  test("debe de llamar logout autenticar y establecer el user", () => {
    const action = {
      type: types.logout,
    };

    const initialState = {
      logged: false,
    };

    const newState = authReducer(initialState, action);
    expect(newState).toEqual(initialState);
  });
});
