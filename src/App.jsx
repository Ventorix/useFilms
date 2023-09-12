import { useEffect, useState } from 'react';
import Navigation from './components/Navigation';
import Main from './components/Main';
import Results from './components/Results';
import SearchInput from './components/SearchInput';
import Box from './components/Box';
import MoviesList from './components/MoviesList';
import Summary from './components/Summary';
import WatchedList from './components/WatchedList';

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

const query = 'Interstellar';
const KEY = 'd3aa8c7c093e730dd5f18876de8fd3f3';
const url = `https://api.themoviedb.org/3/search/movie?query=${query}&api_key=${KEY}`;

async function fetchMovies(setMovies) {
	try {
		const response = await fetch(url);
		const result = await response.json();
		console.log('Before filter:', result.results);
		const filtredResults = result.results.filter(
			(movie) => movie.poster_path || (movie.backdrop_path && movie.release_date),
		);
		console.log('After filter:', filtredResults);
		setMovies(filtredResults);
	} catch (error) {
		console.error(error);
	}
}

export default function App() {
	const [movies, setMovies] = useState([]);
	const [watched, setWatched] = useState(tempWatchedData);

	useEffect(function () {
		fetchMovies(setMovies);
	}, []);
	return (
		<>
			<Navigation>
				<SearchInput />
				<Results movies={movies} />
			</Navigation>

			<Main>
				<Box>
					<MoviesList movies={movies} />
				</Box>

				<Box>
					<Summary watched={watched} />
					<WatchedList watched={watched} />
				</Box>
			</Main>
		</>
	);
}
