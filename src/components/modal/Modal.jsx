import './modal.css'
import { InputMolecule } from '../molecules/inputMolecule/InputMolecule'
import {Button} from '../button/Button'
import { useState, useEffect, useRef } from 'react'

export const Modal = ({handleClick}) => {
    const [message, setMessage] = useState()
    const [labelValidator, setLabelValidator] = useState()
    const [linkValidator, setLinkValidator] = useState()
    const [disabledState, setDisabledState] = useState(false)
    // const linkInputRef = useRef()
    useEffect(() => {
        const regex =  /\b(http|https)?(:\/\/)?(\s*)\.(\w{2,4})(.*)/g
       
        if(labelValidator?.length > 3 && regex.test(String(linkValidator?.trim())) ) {
            setDisabledState(true)
        } else{
            setDisabledState(false)
        }
    }, [labelValidator?.length, linkValidator?.length, linkValidator])
    const saveImage = e=>{
        e.preventDefault()
        handleClick(e)
        // const checkIsURL = regex.test(String(linkValidator.trim()));
        // !checkIsURL && setMessage("This is not a link. Try again")

    }
    const validateLabel = (e)=>{
       setLabelValidator(e.target.value)
    }
    const validateLink= (e)=>{
        setLinkValidator(e.target.value)
    }
    const handleClose = e =>{
        e.preventDefault()
        setDisabledState(false)
        handleClick(e)

    }

    return (<div className="modal">
        <div className="overlay"></div>
        <div className="form">
            <form onSubmit={saveImage}>
                <h2>Add a new photo</h2>
                <InputMolecule label="Label" placeholder="At least three characters for the label" handler={validateLabel}/>
                <InputMolecule label="Photo URL" placeholder="https://images.unsplash.com/photo-1584395630827-860eee694d7b?ixlib=r..."   handler={validateLink}/>
                {message && <p>{message}</p>}
                <div className="buttonMolecule">
                    <span onClick={handleClose}>Cancel</span>
                    {!disabledState ? <Button text="submit" type="submit" disabled /> : <Button text="submit" type="submit"  />}
                </div>
            </form>
        </div>
        </div>
    )
}
