import './App.css'
//import { useRef } from 'react'
import { useMovies } from './hooks/useMovies'
import { Movies } from './components/Movies'
import { useEffect, useState, useRef } from 'react'

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
  const { search, updateSearch, error } = useSearch()
  const { movies, loading, getMovies } = useMovies({ search })

  const handleSubmit = (event) => {
    event.preventDefault()
    getMovies()
  }

  const handleChange = (event) => {
    updateSearch(event.target.value)
  }

  return (
    <div className='page'>

      <header>
        <h1>Buscador de Peliculas</h1>
        <form className='Form' onSubmit={handleSubmit}>
          <input style={{ border: error ? '1px solid red' : '1px solid blue' }} onChange={handleChange} value={search} name='query' placeholder='The Matrix, Saving Private Ryan, Lone Survivor .....' />
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
