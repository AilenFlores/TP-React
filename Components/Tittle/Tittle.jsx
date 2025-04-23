import Style from './Tittle.module.css';
const Tittle = ({ name }) => {
    return (
        <h1 className={Style.tittle}>
        {name}
        </h1>
    );
}
export default Tittle;