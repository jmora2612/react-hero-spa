import { fireEvent, render, screen } from "@testing-library/react"
import { MemoryRouter, useNavigate } from "react-router-dom"
import { SearchPage } from "../../../heroes/pages/SearchPage"


const mockedUserNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useNavigate: () => mockedUserNavigate,
  }));
describe('prueba SearchPage', () => { 
    beforeEach(()=> jest.clearAllMocks())
    test('debe de mostrarse correctamente con valores por def', () => { 
        const {container}= render(
            <MemoryRouter initialEntries={['/search?q=batman']}>
                <SearchPage />
            </MemoryRouter>
        )

        expect(container).toMatchSnapshot()
     })

     test('debe de mostrar a batman y el input con el valor del queryString', () => { 
        render(
            <MemoryRouter initialEntries={['/search?q=batman']}>
                <SearchPage />
            </MemoryRouter>
        )

        const input = screen.getAllByRole('textbox')
        expect(input.value).toBe(batman);
        const img = screen.getAllByRole('img')
        expect(img.src).toContain('assets/heroes/dc-batman.jpg');
        const alertDanger = screen.getByLabelText("alert-danger");
        expect(alertDanger.style.display).tobe('none');
     }) 


     test('debe de mostrar un error si no se encuentra el hero', () => { 
        render(
            <MemoryRouter initialEntries={['/search?q=batman123']}>
                <SearchPage />
            </MemoryRouter>
        )
        const alertDanger = screen.getByLabelText("alert-danger");
        expect(alertDanger.style.display).toBe('');
      })

      test('debe de llamar el navigate a la pantalla nueva', () => { 
        const hero = 'superman';
        render(
            <MemoryRouter initialEntries={['/search']}>
                <SearchPage />
            </MemoryRouter>
        )

        const input = screen.getAllByRole('textbox')
        fireEvent.change(input, {target:{name:'searchText', value:hero}});
        const form = screen.getByRole('form');
        fireEvent.submit(form)
        expect(mockedUserNavigate).toHaveBeenCalledWith(`?q=${hero}`, {"replace": true});

      })
 })