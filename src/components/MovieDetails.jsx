import { useEffect, useState } from 'react';
import StarRating from './StarRating';
import Loader from './Loader';
import useKey from '../custom_hooks/useKey';

function MovieDetails({ selectedId, onCloseMovie, onAddWatched }) {
	const [movieDetails, setMovieDetails] = useState({});
	const [isLoading, setIsLoading] = useState(false);
	const [userRating, setUserRating] = useState(0);

	const KEY = 'd3aa8c7c093e730dd5f18876de8fd3f3';
	const url = `https://api.themoviedb.org/3/movie/${selectedId}?api_key=${KEY}`;

	const {
		id,
		title,
		release_date: date,
		poster_path: poster,
		backdrop_path: sparePoster,
		vote_average: avgRating,
		overview,
		runtime,
		genres,
	} = movieDetails;

	const genresStr = genres?.map((movie) => movie.name).join(', ');
	const rating = (+avgRating).toFixed(1);

	function handleAdd() {
		const newWatchedMovie = {
			id: selectedId,
			title,
			date,
			poster,
			sparePoster,
			avgRating: Number(avgRating).toFixed(2),
			userRating,
			runtime: Number(runtime),
		};
		onAddWatched(newWatchedMovie);
		onCloseMovie();
	}

	useKey('escape', onCloseMovie);

	useEffect(
		function () {
			async function getMovieDetails() {
				try {
					setIsLoading(true);
					const res = await fetch(url);
					const data = await res.json();
					console.log(data);
					setMovieDetails(data);
				} catch (err) {
					console.error(err);
				} finally {
					setIsLoading(false);
				}
			}
			getMovieDetails();
		},
		[url],
	);
	return (
		<div className='details'>
			{isLoading ? (
				<Loader />
			) : (
				<>
					<header>
						<button className='btn-back' onClick={onCloseMovie}>
							&larr;
						</button>
						<img
							src={`https://image.tmdb.org/t/p/w500/${poster ? poster : sparePoster}`}
							alt={`Poster of ${title} movie`}
						/>
						<div className='details-overview'>
							<h2>{title}</h2>
							<p>
								{date} &bull; {runtime} min
							</p>
							<p>{genresStr}</p>
							<p
								style={
									rating > 7
										? { color: 'green' }
										: rating > 5
										? { color: 'yellow' }
										: { color: 'red' }
								}>
								<span>⭐</span>
								{rating} IMDB rating
							</p>
						</div>
					</header>

					<section>
						<div className='rating'>
							<StarRating size={24} onSetRating={setUserRating} />
							<button className='btn-add' onClick={handleAdd}>
								Add to list
							</button>
						</div>

						<p>
							<em>{overview}</em>
						</p>
					</section>
				</>
			)}
		</div>
	);
}

export default MovieDetails;
