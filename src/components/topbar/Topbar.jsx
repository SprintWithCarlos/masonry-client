import React, { useContext, useState } from 'react'
import './topbar.css'
import {constants} from '../../constants'

import { Context } from '../../context/Context'
import Logo from './my_unsplash_logo.svg'
import { Button } from '../button/Button'
import { Modal } from '../modal/Modal'

export const Topbar = (props) => {
    const [isActive, setIsActive] = useState(false)
    const {user, dispatch} = useContext(Context)
    const handleLogout = ()=>{
        dispatch({type: "LOGOUT"})
    }
    const handleClick = e =>{
        e.preventDefault()
        setIsActive(!isActive)

    }
    
    return (
        <>
     
           {isActive &&  <Modal handleClick={handleClick}/>}
        <nav className="top">
            <div className="topbarContainer">
                <section className="topbarLeft">
                    <div className="logo">
                        <img src={Logo} alt="logo" />
                    </div>
                </section>
                <section className="topbarCenter">
                   <div className="searchMolecule">
                   <input type="text" name="search" id="search" placeholder="Search by name" onChange={e=>props?.setSearch(e.target.value)} />
                <div className="searchIcon" > <i className="fas fa-search"></i></div>
                   </div>
                </section>
                <section className="topbarRight" onClick={handleClick}>
                    <Button text="Add a photo" type="submit" ></Button>
                </section>
            </div>
        </nav>
    
        </>
    )
}
