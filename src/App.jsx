import './App.css'
//import { useRef } from 'react'
import { useMovies } from './hooks/useMovies'
import { Movies } from './components/Movies'
import { useEffect, useState, useRef, useMemo } from 'react'
import debounce from 'just-debounce-it'

function useSearch() {
  const [search, updateSearch] = useState('')
  const [error, setError] = useState(null)
  const isFirstInput = useRef(true)

  useEffect(() => {
    if (isFirstInput.current) {
      isFirstInput.current = search == ''
      return
    }
    if (search == '') {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setError('No se puede buscar una pelicula vacia')
      return
    }
    if (search.length < 3) {
      setError('La busqueda debe tener al menos 3 caracteres')
      return
    }
    setError(null)
  }, [search])
  return { search, updateSearch, error }
}

function App() {
  const [sort, setSort] = useState(false)

  const { search, updateSearch, error } = useSearch()
  const { movies, loading, getMovies } = useMovies({ search, sort })

  const debouncedGetMovies = useMemo(() => {
    // La función DEBOUNCE se llama solo la primera vez o si [getMovies] cambia.
    return debounce(search => {
      getMovies({ search });
    }, 300);
  }, [getMovies]); // Dependencia clave

  // **IMPORTANTE**: Limpieza
  useEffect(() => {
    return () => {
      // Usa el método .cancel() de lodash para limpiar el timer al desmontar.
      debouncedGetMovies.cancel();
    };
  }, [debouncedGetMovies]);

  const handleSubmit = (event) => {
    event.preventDefault()
    getMovies({ search })
  }

  const handleSort = () => {
    setSort(!sort)
  }


  const handleChange = (event) => {
    const newSearch = event.target.value
    updateSearch(newSearch)
    debouncedGetMovies(newSearch)
  }


  return (
    <div className='page'>

      <header>
        <h1>Buscador de Peliculas</h1>
        <form className='Form' onSubmit={handleSubmit}>
          <input style={{ border: error ? '1px solid red' : '1px solid blue' }} onChange={handleChange} value={search} name='query' placeholder='The Matrix, Saving Private Ryan, Lone Survivor .....' />
          <input type='checkbox' onChange={handleSort} checked={sort} /> Ordenar por titulo
          <button type='submit'>Buscar</button>
        </form>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </header>

      <main>
        {loading ? <p>Loading...</p> : <Movies movies={movies} />}

      </main>

    </div>
  )
}

export default App
