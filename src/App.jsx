import { useEffect, useState } from 'react';
import Navigation from './components/Navigation';
import Main from './components/Main';
import Results from './components/Results';
import SearchInput from './components/SearchInput';
import Box from './components/Box';
import MoviesList from './components/MoviesList';
import Summary from './components/Summary';
import WatchedList from './components/WatchedList';
import Loader from './components/Loader';
import ErrorMessage from './components/ErrorMessage';
import MovieDetails from './components/MovieDetails';

const tempWatchedData = [
	{
		imdbID: 'tt1375666',
		Title: 'Inception',
		Year: '2010',
		Poster:
			'https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg',
		runtime: 148,
		imdbRating: 8.8,
		userRating: 10,
	},
	{
		imdbID: 'tt0088763',
		Title: 'Back to the Future',
		Year: '1985',
		Poster:
			'https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg',
		runtime: 116,
		imdbRating: 8.5,
		userRating: 9,
	},
];

async function fetchMovies(setMovies, setIsLoading, setError, query) {
	const KEY = 'd3aa8c7c093e730dd5f18876de8fd3f3';
	const url = `https://api.themoviedb.org/3/search/movie?query=${query}&api_key=${KEY}`;
	try {
		setIsLoading(true);
		setError('');
		const response = await fetch(url);
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
	} catch (err) {
		console.error(err);
		setError(err.message);
	} finally {
		setIsLoading(false);
	}
}

export default function App() {
	const [movies, setMovies] = useState([]);
	const [watched, setWatched] = useState(tempWatchedData);
	const [query, setQuery] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState('');
	const [selectedId, setSelectedId] = useState(null);

	function handleSelectMovie(id) {
		setSelectedId(id);
	}

	useEffect(
		function () {
			if (query.length < 3) {
				setMovies([]);
				setError('');
				return;
			}

			fetchMovies(setMovies, setIsLoading, setError, query);
		},
		[query],
	);
	return (
		<>
			<Navigation>
				<SearchInput query={query} setQuery={setQuery} />
				<Results movies={movies} />
			</Navigation>

			<Main>
				<Box>
					{isLoading && <Loader />}
					{!isLoading && !error && <MoviesList movies={movies} onSelectMovie={handleSelectMovie} />}
					{error && <ErrorMessage message={error} />}
				</Box>

				<Box>
					{selectedId ? (
						<MovieDetails selectedId={selectedId} />
					) : (
						<>
							<Summary watched={watched} />
							<WatchedList watched={watched} />
						</>
					)}
				</Box>
			</Main>
		</>
	);
}
