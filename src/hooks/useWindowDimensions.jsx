import {useState, useEffect} from 'react'

export const useWindowDimensions = ()=>{
    const [windowSize, setWindowSize] = useState({
        width: undefined,
        height: undefined
    })
    useEffect(()=>{
        const handleResize = ()=>{
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight
            })
        }
      
        window.addEventListener('resize', handleResize)
        window.addEventListener('scroll', ()=>   console.log(window.pageYOffset))
        handleResize()
        return ()=> window.removeEventListener('resize', handleResize)
    },[ ])
    return windowSize
}