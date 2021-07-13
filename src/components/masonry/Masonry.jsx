import './masonry.css'
import { masonryGallery } from '../../utils'
import { useNumberOfColumns } from '../../hooks/useWindowWidth'
import { useState, useEffect, useRef } from 'react'
import {Modal} from '../modal/Modal'
import seedData from './data.json'

export const Masonry = (props) => {
    
    const numberOfColumns = useNumberOfColumns(props.search)
    const masonryRef =useRef()
    const [scrollHeight, setScrollHeight ] = useState(undefined)
    const [scrollTop, setScrollTop ] = useState(undefined)
    const [clientHeight, setClientHeight ] = useState(undefined)
    const [isLoading, setIsLoading] =useState(false)
    const [imagesBatch, setImagesBatch] =useState(10)
    const dataSearched = new RegExp( props?.search, 'gi')
    const data = seedData.filter(item => (item.title.match(dataSearched))).sort((a,b)=>(b.name-a.name)).slice(0, imagesBatch)
    console.log(data)
    useEffect(()=>{
        
       
        const handleScroll = ()=>{

            setScrollHeight(window.pageYOffset)
            setScrollTop( window.innerHeight)
            setClientHeight(masonryRef.current.clientHeight)
           if(!props.search && (data.length < seedData.length)){
            if(scrollHeight + scrollTop >= (clientHeight*0.85)){ 
                setIsLoading(true)
                setImagesBatch(imagesBatch + 5)
                setTimeout(() => {
                    setIsLoading(false)
                }, 3000);

            }
           }
        }
        window.addEventListener('scroll', handleScroll)
           handleScroll()
           return ()=> {
           window.removeEventListener('scroll', handleScroll)
        }
    },[masonryRef, props.search, scrollHeight, scrollTop, clientHeight, isLoading, imagesBatch, numberOfColumns, data.length])
    
    const PF = process.env.REACT_APP_PUBLIC_FOLDER
    const host = process.env.REACT_APP_STORAGE || PF
    const newData = masonryGallery(data, numberOfColumns)
    console.log(dataSearched)
    return (
        <>
        {!data.length >0 && (<p className="noMatches">No matches.</p>)}
        <ul className="masonry" style={{columns: numberOfColumns}} ref={masonryRef} >
            {newData.map((columns, i)=> {
                return <section className="columns" key={i}>
                    {columns.map((item, i) => (
                        <a href={host+item.images.large}>
                        <li key={i} className="card" >
                            <img
                            loading={i<=10?"eager": "lazy" }
                            srcSet={`${host+item.images.small} 500w, ${host+item.images.medium} 1000w, ${host+item.images.large} 1500w`}
                            sizes="(max-width: 300px) 100w,
                                (max-width: 6000px) 50w,
                                (max-width: 900px) 33.33w,
                                (max-width: 1200px) 25w"
                                src={host+item.images.small} alt={host+item.images.name} />
                        
                                <p>delete</p>
                                <div className="title">{item.title}</div >
                        
                    </li>
                    </a>
                    ))}
                </section>})}
                    </ul>   
                    
                {(isLoading)&& (<p>Loading...</p>)}
                { data.length === seedData.length && (<p>End of Gallery</p>)} 
        </>
    )
}
