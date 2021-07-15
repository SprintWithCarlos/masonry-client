import './modal.css'
import { InputMolecule } from '../molecules/inputMolecule/InputMolecule'
import {Button} from '../button/Button'
import { useState, useEffect, useContext} from 'react'
import { Context } from '../../context/Context'
const host = process.env.REACT_APP_HOST || 'http://localhost:5001/api/'
export const Modal = () => {
    const {dispatch, error, isLoading, isValidated}= useContext(Context)
    const [labelValidator, setLabelValidator] = useState()
    const [linkValidator, setLinkValidator] = useState()
    useEffect(() => {
        const regex =  /\b(http|https)?(:\/\/)?(\s*)\.(\w{2,4})(.*)/g
       
        if(labelValidator?.length > 3 && regex.test(String(linkValidator?.trim())) ) {
            dispatch({type: "TOGGLE_ISVALIDATED"})
        } 
    }, [dispatch, labelValidator?.length, linkValidator])
   
    const saveImage = async(e)=>{
        e.preventDefault()
        const regex = new RegExp(/image/gi)
        try {
        dispatch({type: "TOGGLE_ISLOADING"})
        const res = await fetch(linkValidator)
        const blob = await res.blob()
        
        if(!regex.test(blob.type)){
            dispatch({type: "SEND_ERROR", payload: {type:"user input", message: "That link is not an image ;-)"} })
            dispatch({type: "TOGGLE_ISVALIDATED"})
            dispatch({type: "TOGGLE_ISLOADING"})
           return
        } else{
            
            // dispatch({type: "TOGGLE_ISLOADING"})
                    const data = new FormData();
                    const fileName = Date.now() + "-masongallery.jpg"
                    data.append("name", fileName)
                    data.append("file", blob)
                    data.append('title', labelValidator)
                    try {
                        const sendPhoto = await fetch(host +'posts/upload', {
                            method: "POST",
                            body: data
                        })
                        if(sendPhoto.ok ){
                            dispatch({type: "TOGGLE_ISLOADING"})
                            window.location.reload()
                            
                        }    
                } catch (err) {
                    dispatch({type: "FETCHING_ERROR", payload: {type: "initial load", message: err }})
                    
                }
                         
                
        }}
        catch (err) {
            dispatch({type: "SEND_ERROR", payload: {type: "api server", message: "err"}})
        }
        dispatch({type: "TOGGLE_MODAL"})

    }
    const validateLabel = (e)=>{
       setLabelValidator(e.target.value)
    }
    const validateLink= (e)=>{
        setLinkValidator(e.target.value)
    }
    const handleClose = async(e) =>{
        e.preventDefault()
        dispatch({type: "RESET"})
        dispatch({type: "TOGGLE_MODAL"})
    }
    const retry = () =>{
        dispatch({type: "RESET"})
         setLinkValidator('')
         setLabelValidator('')
        
    }

    return (<div className="modal">
        <div className="overlay"></div>
        <div className="form">
            <form onSubmit={saveImage}>
                <h2>Add a new photo</h2>
                <InputMolecule label="Label" placeholder="At least three characters for the label" handler={validateLabel} value={labelValidator} />
                <InputMolecule label="Photo URL" placeholder="https://images.unsplash.com/photo-1584395630827-860eee694d7b?ixlib=r..."   handler={validateLink} value={linkValidator}/>
                <div className="buttonMolecule">
                    {error?.type === "user input" && <p className="errorMessage">{error.message} <span className="retry" onClick={retry }>Try Again</span></p>   }
                    <div className="box">
                    <span onClick={handleClose}>Cancel</span>
                    <Button text="submit" type="submit" disabled={!isValidated} isLoading={isLoading} error={error.message} /> 
                    {/* {!disabledState ? <Button text="submit" type="submit" disabled loading={isloading} error={error} /> : <Button text="submit" type="submit"  />} */}
                    </div>
                </div>
            </form>
        </div>
    </div>
    )
}
