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
import useMovies from './custom_hooks/useMovies';

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

export default function App() {
	const [watched, setWatched] = useState(tempWatchedData);
	const [query, setQuery] = useState('');
	const [selectedId, setSelectedId] = useState(13851);
	const { movies, isLoading, error } = useMovies(query, handleCloseMovie);

	function handleSelectMovie(id) {
		setSelectedId((selectedId) => (id === selectedId ? null : id));
	}

	function handleCloseMovie() {
		setSelectedId(null);
	}

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
						<MovieDetails onCloseMovie={handleCloseMovie} selectedId={selectedId} />
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
