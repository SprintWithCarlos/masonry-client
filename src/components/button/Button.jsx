import { Bouncing } from '../atoms/bouncing-three-dots-animation/Bouncing'
import './button.css'

export const Button = ({text, type, disabled, isLoading, error }) => {
    console.log({text, type, disabled, isLoading, error })
    return (<>
  {
      error ?  ( <button className={`btn error disabled`}  >Error</button>)
 : disabled ? ( <button className={`btn ${type}  disabled `}  >{text}</button>)
:  isLoading ? (<span className="buttonContainer">
  <span className="animationWrapper">
  <Bouncing dimensions={{size:5, height: 20, width: 20}} color={'white'} backgroundColor={'transparent'} />
  </span>
<button className={`btn loading`}  >Loading</button>
</span>) 



: (<button className={`btn ${type} `}  >{text}</button>)

}
   
   
   
   
     
        
     
    
    
  </>
       
  )
}
