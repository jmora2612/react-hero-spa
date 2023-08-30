import { types } from "../../../auth/types/types";

describe("pruebas en types.js", () => {
  test("debe regresar estos types", () => {
    const types = {
      login: "[Auth] Login",
      logout: "[Auth] Logout",
    };
    expect(types).toEqual(types);
  });
});
