import { useState, useRef, useMemo } from 'react'
import { searchMovies } from '../services/movies'

export function useMovies({ search, sort }) {
    const [movies, setMovies] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const previousSearch = useRef(search)

    // Utilizar el useMemo para memorizar la funcion getMovies, esto solo si se tiene un problema de rendiminento para optimizar las renderizaciones.
    // Existe otra forma de optimizar el rendimiento usando useCallback, que basicamnete hace lo mismo que useMemo pero para funciones.

    const getMovies = useMemo(() => {
        return async ({ search }) => {
            if (search == previousSearch.current) return
            try {
                setLoading(true)
                setError(null)
                previousSearch.current = search
                const newMovies = await searchMovies({ search })
                setMovies(newMovies)
            } catch (error) {
                setError(error.message)
            } finally {
                setLoading(false)
            }
        }
    }, [])


    // Esta es la version sin useMemo que funconaria igual pero sin optimizacion de rendimiento.

    // const getSortedMovies = () => {
    //     console.log('getSortedMovies');
    //     const sortedMovies = sort
    //         ? [...movies].sort((a, b) => a.title.localeCompare(b.title))
    //         : movies

    //     return sortedMovies
    // }


    // Usando useMemo para memorizar el resultado de movies ordenadas.
    const sortedMovies = useMemo(() => {
        return sort
            ? [...movies].sort((a, b) => a.title.localeCompare(b.title))
            : movies
    }, [sort, movies])
    return { movies: sortedMovies, getMovies, loading, error }
}