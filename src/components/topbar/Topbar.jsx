import React, { useContext } from 'react'
import './topbar.css'

import { Context } from '../../context/Context'
import Logo from './my_unsplash_logo.svg'
import { Button } from '../button/Button'
import { Modal } from '../modal/Modal'

export const Topbar = (props) => {
    const {isActive, dispatch} = useContext(Context)
    return (
        <>
     
           {isActive &&  <Modal />}
        <nav className="top">
            <div className="topbarContainer">
                <section className="topbarLeft">
                    <div className="logo" onClick={()=>window.location.reload()}>
                        <img src={Logo} alt="logo" />
                    </div>
                </section>
                <section className="topbarCenter">
                   <div className="searchMolecule">
                   <input type="text" name="search" id="search" placeholder="Search by name" onChange={e=>props?.setSearch(e.target.value)} />
                <div className="searchIcon" > <i className="fas fa-search"></i></div>
                   </div>
                </section>
                <section className="topbarRight" onClick={()=>dispatch({type: "TOGGLE_MODAL" })}>
                    <Button text="Add a photo" type="submit" ></Button>
                </section>
            </div>
        </nav>
    
        </>
    )
}
