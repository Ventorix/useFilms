import WatchedMovie from './WatchedMovie';

function WatchedList({ watched }) {
	return (
		<ul className='list'>
			{watched.map((movie) => (
				<WatchedMovie movie={movie} key={movie.id} />
			))}
		</ul>
	);
}

export default WatchedList;
