function WatchedMovie({ movie, onDeleteWatched }) {
	return (
		<li>
			<img
				src={`https://image.tmdb.org/t/p/w500/${movie.poster ? movie.poster : movie.sparePoster}`}
				alt={`${movie.title} poster`}
			/>
			<h3>{movie.title}</h3>
			<div>
				<p>
					<span>⭐️</span>
					<span>{movie.avgRating}</span>
				</p>
				<p>
					<span>🌟</span>
					<span>{movie.userRating}</span>
				</p>
				<p>
					<span>⏳</span>
					<span>{movie.runtime} min</span>
				</p>
				<button className='btn-delete' onClick={() => onDeleteWatched(movie.tmdbID)}>
					❌
				</button>
			</div>
		</li>
	);
}

export default WatchedMovie;
