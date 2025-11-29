import './App.css'
import { useMovies } from './hooks/useMovies'
import { Movies } from './components/Movies'

function App() {
  const { movies: mappedMovies } = useMovies()

  return (
    <div className='page'>

      <header>
        <h1>Buscador de Peliculas</h1>
        <form action="" className='Form'>
          <input placeholder='The Matrix, Saving Private Ryan, Lone Survivor .....' />
          <button type='submit'>Buscar</button>
        </form>
      </header>

      <main>
        <Movies movies={mappedMovies} />
      </main>

    </div>
  )
}

export default App
