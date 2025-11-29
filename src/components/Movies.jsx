// el mapeo de peliculas y el mensaje de no se encontraron peliculas se han movido a un nuevo componente Movies.jsx, porque considero que es mejor tener un componente separado para manejar la logica de renderizado de peliculas y mensajes relacionados, asi el componente App.jsx queda mas limpio y enfocado en la estructura general de la aplicacion, y es una buena practica de organizacion de componentes en React, obivamente si se considera en una prueba tecnica separarlo si se tiene el tiempo suficiente para hacerlo.

function ListOfMovies({ movies }) {
    return (
        <ul>
            {
                movies.map(movie => (
                    <li key={movie.id}>
                        <h3>{movie.title}</h3>
                        <p>{movie.year}</p>
                        <img src={movie.poster} alt={movie.title} />
                    </li>
                ))
            }
        </ul>
    )
}

function NoMoviesResults() {
    return (
        <p>No se encontraron peliculas</p>
    )
}

export function Movies({ movies }) {
    const hasMovies = movies?.length > 0

    return (
        hasMovies
            ? <ListOfMovies movies={movies} />
            : <NoMoviesResults />
    )
}