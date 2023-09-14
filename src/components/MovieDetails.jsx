import { useEffect, useState } from 'react';
import StarRating from './StarRating';
import Loader from './Loader';

function MovieDetails({ selectedId, onCloseMovie }) {
	const [movieDetails, setMovieDetails] = useState({});
	const [isLoading, setIsLoading] = useState(false);

	const KEY = 'd3aa8c7c093e730dd5f18876de8fd3f3';
	const url = `https://api.themoviedb.org/3/movie/${selectedId}?api_key=${KEY}`;

	const genres = movieDetails.genres?.map((movie) => movie.name).join(', ');
	const rating = (+movieDetails.vote_average).toFixed(1);

	useEffect(
		function () {
			function callback(e) {
				if (e.code === 'Escape') {
					onCloseMovie();
				}
			}
			document.addEventListener('keydown', callback);

			return function () {
				document.removeEventListener('keydown', callback);
			};
		},
		[onCloseMovie],
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
							src={`https://image.tmdb.org/t/p/w500/${
								movieDetails.poster_path ? movieDetails.poster_path : movieDetails.backdrop_path
							}`}
							alt={`Poster of ${movieDetails.title} movie`}
						/>
						<div className='details-overview'>
							<h2>{movieDetails.title}</h2>
							<p>
								{movieDetails.release_date} &bull; {movieDetails.runtime}
							</p>
							<p>{genres}</p>
							<p>
								<span>⭐</span>
								{rating} IMDB rating
							</p>
						</div>
					</header>

					<section>
						<div className='rating'>
							<StarRating size={24} />
						</div>

						<p>
							<em>{movieDetails.overview}</em>
						</p>
					</section>
					{selectedId}
				</>
			)}
		</div>
	);
}

export default MovieDetails;
