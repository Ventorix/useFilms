import Logo from './Logo';
import Results from './Results';
import SearchInput from './SearchInput';
import { useState } from 'react';

function Navigation() {
	const [query, setQuery] = useState('');

	return (
		<nav className='nav-bar'>
			<Logo />
			<SearchInput value={query} onChange={(e) => setQuery(e.target.value)} />
			<Results />
		</nav>
	);
}

export default Navigation;
