import Style from './InputSearch.module.css';
const InputSearch = ({ placeholder }) => {
  return (
    <input
      type="text"
      placeholder={"Buscar peliculas o series.."}
      className={Style.InputSearch}
    />
  );
};

export default InputSearch;
