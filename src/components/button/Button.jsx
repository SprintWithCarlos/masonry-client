import './button.css'

export const Button = ({text, type, disabled, isloading, error }) => {
    return (<>
    {!disabled  ? 
    ( <button className={`btn ${type}`}  >{text}</button>): 
  
     
  
     error
     ?   
    
     ( <button className={`btn error disabled`}  >Error</button>):
    
    ( <button className={`btn ${type} disabled  `} disabled >{text}</button>)
    }
    
    
    </>
       
    )
}
