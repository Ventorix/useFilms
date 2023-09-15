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

export default function App() {
	const [watched, setWatched] = useState([]);
	const [query, setQuery] = useState('');
	const [selectedId, setSelectedId] = useState(13851);
	const { movies, isLoading, error } = useMovies(query, handleCloseMovie);

	function handleSelectMovie(id) {
		setSelectedId((selectedId) => (id === selectedId ? null : id));
	}

	function handleCloseMovie() {
		setSelectedId(null);
	}

	function handleAddWatched(movie) {
		setWatched((watched) => [...watched, movie]);
	}

	function handleDeleteWatched(deleteID) {
		setWatched((watched) => watched.filter((movie) => movie.tmdbID !== deleteID));
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
						<MovieDetails
							onCloseMovie={handleCloseMovie}
							onAddWatched={handleAddWatched}
							selectedId={selectedId}
							watched={watched}
						/>
					) : (
						<>
							<Summary watched={watched} />
							<WatchedList onDeleteWatched={handleDeleteWatched} watched={watched} />
						</>
					)}
				</Box>
			</Main>
		</>
	);
}
