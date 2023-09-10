import Logo from './Logo';
function Navigation({ children }) {
	return (
		<nav className='nav-bar'>
			<Logo />
			{children}
		</nav>
	);
}

export default Navigation;
