import Movie from './Movie';

function MoviesList({ movies }) {
	return (
		<ul className='list'>
			{movies?.map((movie) => (
				<Movie movie={movie} key={movie.id} />
			))}
		</ul>
	);
}

export default MoviesList;
