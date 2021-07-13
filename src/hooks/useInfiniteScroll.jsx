import {useState, useEffect} from 'react'


export const useInfiniteScroll = ()=>{
    const [scrollHeight, setScrollHeight] = useState(0)
    const [trigger, setTrigger] = useState(0)
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
        const handleScroll = ()=>{
       
            setScrollHeight(window.pageYOffset)
            // console.log(scrollHeight, windowSize.height)
            if(trigger === 0 && ((scrollHeight) === (Math.floor(windowSize.height *0.6)))){
                setTrigger(1)
            }
            // console.log("Calculation", Math.floor(windowSize.height*0.6 * trigger))
            if(trigger>0 &&((scrollHeight) === (Math.floor(windowSize.height*0.6 * trigger)))){
                setTrigger(trigger+1)
            }
        }
        window.addEventListener('resize', handleResize)
        window.addEventListener('scroll', handleScroll)
        handleResize()
        handleScroll()
        return ()=> {
            window.removeEventListener('resize', handleResize)
            window.removeEventListener('scroll', handleScroll)
        }
    },[ scrollHeight, windowSize.height, trigger])
    return trigger
}