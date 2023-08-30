import { useLocation, useNavigate } from 'react-router-dom';
import { useForm } from '../../hooks/UseForm';
import {HeroCard, HeroList} from '../components/index'
import queryString from 'query-string';
import { getHeroesByName } from '../helpers';

export const SearchPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  //queryString nos ayuda a procesar los query params en la ruta para extraer los datos 
  const {q = ''} = queryString.parse(location.search);
  const heroes = getHeroesByName(q);  
  const {searchText, onInputChange} =useForm({
    searchText:q
  })

  const alertDanger = <div aria-label='alert-danger' className="alert alert-danger animate__animated animate__fadeIn">Not hero with <b>{q}</b></div>
  const searchHero = <div className="alert alert-primary animate__animated animate__fadeIn">Search hero</div>

  const onSearchSubmit = (event)=>{
    event.preventDefault();
    navigate(`?q=${searchText}`)
    
  }

  return (
    <>
      <h1>SearchPage</h1>
      <hr />

      <div className="row">
        <div className="col-5">
          <h4>Searching</h4>
          <hr />
          <form onSubmit={onSearchSubmit} aria-label="form">
            <input
              type="text"
              placeholder="Search hero"
              className="form-control"
              name="searchText"
              autoComplete="off"
              value={searchText}
              onChange={onInputChange}
            />
            <button className="btn btn-outline-primary mt-2">Search</button>
          </form>
        </div>
        <div className="col-7">
          <h4>Result</h4>
          <hr />

          {(!q && searchHero)}
          {((heroes.length === 0 && q) && alertDanger)}
          { heroes.map((el) => (<HeroCard key={el.id} {...el}/>))}
        </div>
      </div>
    </>
  );
};
