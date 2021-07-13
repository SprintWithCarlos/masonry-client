import './button.css'

export const Button = ({text, type, disabled }) => {
    return (<>
    {disabled  ? 
    ( <button className={`btn ${type} disabled`} disabled >{text}</button>)
    :
    ( <button className={`btn ${type}`}  >{text}</button>)
    }
    
    
    </>
       
    )
}
