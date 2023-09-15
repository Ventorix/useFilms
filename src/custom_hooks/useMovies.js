import { useEffect, useState } from 'react';
const KEY = 'd3aa8c7c093e730dd5f18876de8fd3f3';

function useMovies(query, callback) {
	const [movies, setMovies] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState('');

	useEffect(
		function () {
			callback?.();

			const controller = new AbortController();

			async function fetchMovies() {
				try {
					setIsLoading(true);
					setError('');
					const response = await fetch(
						`https://api.themoviedb.org/3/search/movie?query=${query}&api_key=${KEY}`,
						{ signal: controller.signal },
					);
					if (!response.ok) {
						throw new Error('Something went wrong with fetching movies');
					}

					const result = await response.json();

					if (!result.total_results) {
						throw new Error('Movie not found');
					}

					const filtredResults = result.results.filter(
						(movie) => movie.poster_path || (movie.backdrop_path && movie.release_date),
					);

					setMovies(filtredResults);
					setError('');
				} catch (err) {
					if (err.name !== 'AbortError') {
						setError(err.message);
					}
				} finally {
					setIsLoading(false);
				}
			}
			if (query.length < 3) {
				setMovies([]);
				setError('');
				return;
			}
			fetchMovies();

			return function () {
				controller.abort();
			};
		},
		[query],
	);
	return { movies, isLoading, error };
}

export default useMovies;
