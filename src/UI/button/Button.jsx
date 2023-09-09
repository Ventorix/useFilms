import classes from './Button.module.css';

function Button({ children, ...props }) {
	return (
		<button className={classes.defaultBtn}>{children}</button>
	);
}

export default Button;
