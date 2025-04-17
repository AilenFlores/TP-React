import Style from './Counter.module.css';

const Counter = ({ count }) => {
  return (
    <span className={Style.Counter}>
      Cantidad: {count} películas/series.
    </span>
  );
};

export default Counter;
