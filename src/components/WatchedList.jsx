import WatchedMovie from './WatchedMovie';

function WatchedList({ watched, onDeleteWatched }) {
	return (
		<ul className='list'>
			{watched.map((movie) => (
				<WatchedMovie movie={movie} key={movie.tmdbID} onDeleteWatched={onDeleteWatched} />
			))}
		</ul>
	);
}

export default WatchedList;
