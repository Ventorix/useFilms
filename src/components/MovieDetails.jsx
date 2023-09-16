import { useEffect, useState } from 'react';
import StarRating from './StarRating';
import Loader from './Loader';
import useKey from '../custom_hooks/useKey';

function MovieDetails({ watched, selectedId, onCloseMovie, onAddWatched }) {
	const [movieDetails, setMovieDetails] = useState({});
	const [isLoading, setIsLoading] = useState(false);
	const [userRating, setUserRating] = useState(0);

	const isWatched = watched.map((movie) => movie.tmdbID).includes(selectedId);
	const watchedUserRating = watched.find((movie) => movie.tmdbID === selectedId)?.userRating;

	const KEY = 'd3aa8c7c093e730dd5f18876de8fd3f3';
	const url = `https://api.themoviedb.org/3/movie/${selectedId}?api_key=${KEY}`;

	const {
		title,
		release_date: date,
		poster_path: poster,
		backdrop_path: sparePoster,
		vote_average: avgRating,
		overview,
		runtime,
		genres,
		production_countries: countries,
	} = movieDetails;

	const genresStr = genres?.map((movie) => movie.name).join(', ');
	const rating = (+avgRating).toFixed(1);
	const year = new Date(date).getFullYear();
	const country = countries?.[0]?.iso_3166_1;

	function handleAdd() {
		const newWatchedMovie = {
			tmdbID: selectedId,
			title,
			year,
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
			if (!title) return;
			document.title = `Movie | ${title}`;

			return () => (document.title = 'useFilms');
		},
		[title],
	);

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
								{year} &bull; {runtime} min
							</p>
							<p>
								{country} &bull; {genresStr}
							</p>
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
							{!isWatched ? (
								<>
									<StarRating size={24} onSetRating={setUserRating} />
									{userRating > 0 && (
										<button className='btn-add' onClick={handleAdd}>
											Add to list
										</button>
									)}
								</>
							) : (
								<p>
									You rated this movie by{' '}
									<span style={{ color: 'gold', fontSize: '16px' }}>{watchedUserRating}</span>
									<span>⭐</span>
								</p>
							)}
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
