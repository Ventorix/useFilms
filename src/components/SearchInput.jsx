import { useRef } from 'react';
import useKey from '../custom_hooks/useKey';

function SearchInput({ query, setQuery }) {
	const inputEl = useRef(null);

	useKey('enter', () => {
		if (document.activeElement === inputEl.current) return;
		inputEl.current.focus();
		setQuery('');
	});

	return (
		<input
			className='search'
			type='text'
			placeholder='Search movies...'
			value={query}
			onChange={(e) => setQuery(e.target.value)}
			ref={inputEl}
		/>
	);
}

export default SearchInput;
