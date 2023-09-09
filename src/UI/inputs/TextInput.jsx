import classes from './TextInput.module.css';
function TextInput(props) {
	return <input className={classes.defaultInput} {...props}></input>;
}

export default TextInput;
