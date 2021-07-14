import './modal.css'
import { InputMolecule } from '../molecules/inputMolecule/InputMolecule'
import {Button} from '../button/Button'
import { useState, useEffect} from 'react'

export const Modal = ({handleClick}) => {
    const [isloading, setIsLoading] = useState(false)
    const [error, setError] = useState()
    const [labelValidator, setLabelValidator] = useState()
    const [linkValidator, setLinkValidator] = useState()
    const [disabledState, setDisabledState] = useState(false)
    useEffect(() => {
        const regex =  /\b(http|https)?(:\/\/)?(\s*)\.(\w{2,4})(.*)/g
       
        if(labelValidator?.length > 3 && regex.test(String(linkValidator?.trim())) ) {
            setDisabledState(true)
        } else{
            setDisabledState(false)
        }
    }, [labelValidator?.length, linkValidator?.length, linkValidator])
   
    const saveImage = async(e)=>{
        e.preventDefault()
        const regex = new RegExp(/image/gi)
        try {
        const res = await fetch(linkValidator)
        const blob = await res.blob()
        
        if(!regex.test(blob.type)){
            setError("That link is not an image ;-)")
            setDisabledState(false)
        } else{
                setIsLoading(true) 
                const data = new FormData();
                const fileName = Date.now() + "-masongallery.jpg"
                data.append("name", fileName)
                data.append("file", blob)
                data.append('title', labelValidator)
                try {
                    const sendPhoto = await fetch('http://localhost:5001/api/posts/upload', {
                        method: "POST",
                        body: data
                    })
                    sendPhoto.ok && setIsLoading(false) 
                    
                } catch (err) {
                    
                    setError(err)
                }
        }}
        catch (err) {
            setError(err)
        }
        // handleClick(e)

    }
    const validateLabel = (e)=>{
       setLabelValidator(e.target.value)
    }
    const validateLink= (e)=>{
        setLinkValidator(e.target.value)
    }
    const handleClose = async(e) =>{
        e.preventDefault()
        setDisabledState(false)
        handleClick(e)
    }
    const retry = () =>{
         setDisabledState(false)
         setError(undefined)
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
                    {error && <p className="errorMessage">{error} <span className="retry" onClick={retry }>Try Again</span></p>   }
                    <div className="box">
                    <span onClick={handleClose}>Cancel</span>
                    {!disabledState ? <Button text="submit" type="submit" disabled loading={isloading} error={error} /> : <Button text="submit" type="submit"  />}
                    </div>
                </div>
            </form>
        </div>
    </div>
    )
}
