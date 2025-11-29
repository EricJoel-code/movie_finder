import './App.css'
//import { useRef } from 'react'
import { useMovies } from './hooks/useMovies'
import { Movies } from './components/Movies'
import { useEffect, useState } from 'react'

function App() {
  const { movies: mappedMovies } = useMovies()
  const [query, setQuery] = useState('')
  const [error, setError] = useState(null)

  const handleSubmit = (event) => {
    event.preventDefault()
    console.log({ query })
  }

  const handleChange = (event) => {
    const newQuery = event.target.value
    if (newQuery.startsWith(' ')) return
    setQuery(newQuery)
  }

  useEffect(() => {
    if (query == '') {
      setError('No se puede buscar una pelicula vacia')
      return
    }
    if (query.length < 3) {
      setError('La busqueda debe tener al menos 3 caracteres')
      return
    }
    setError(null)
  }, [query])


  return (
    <div className='page'>

      <header>
        <h1>Buscador de Peliculas</h1>
        <form className='Form' onSubmit={handleSubmit}>
          <input onChange={handleChange} value={query} name='query' placeholder='The Matrix, Saving Private Ryan, Lone Survivor .....' />
          <button type='submit'>Buscar</button>
        </form>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </header>

      <main>
        <Movies movies={mappedMovies} />
      </main>

    </div>
  )
}

export default App
