import './inputMolecule.css'
export const InputMolecule = ({label, placeholder, type, handler}) => {
    return (
        <div className="inputMolecule">
            <label htmlFor="label">{label}</label>
            <input type="text" id="label" placeholder={placeholder} minLength="3" onChange={handler}/>    
        </div>    
    )
}
