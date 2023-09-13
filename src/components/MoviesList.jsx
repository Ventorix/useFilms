import Movie from './Movie';

function MoviesList({ movies, onSelectMovie }) {
	return (
		<ul className='list list-movies'>
			{movies?.map((movie) => (
				<Movie onSelectMovie={onSelectMovie} movie={movie} key={movie.id} />
			))}
		</ul>
	);
}

export default MoviesList;
