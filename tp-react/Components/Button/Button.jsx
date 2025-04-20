import Style from './Button.module.css';

const Button = ({ onClick, children, className = '' }) => {
  return (
    <button
      onClick={onClick}
      className={`${Style.button} ${Style[className] || ''}`}
    >
      {children}
    </button>
  );
};

export default Button;
