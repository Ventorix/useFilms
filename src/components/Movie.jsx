function Movie({ movie }) {
	const year = new Date(movie.release_date).getFullYear();
	return (
		<li>
			<img
				src={`https://image.tmdb.org/t/p/w500/${
					movie.poster_path ? movie.poster_path : movie.backdrop_path
				}`}
				alt={`${movie.title} poster`}
			/>
			<h3>{movie.title}</h3>
			<div>
				<p>
					<span>🗓</span>
					<span>{`${year}`}</span>
				</p>
			</div>
		</li>
	);
}

export default Movie;
