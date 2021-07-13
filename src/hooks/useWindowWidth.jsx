import {useState, useEffect} from 'react'

const getWindowsDimensions = ()=>{
    const {innerWidth:width, innerHeight: height} = window
    return {width, height}
}
const getNumberOfColumns = ()=>{
    //Challenge mockup indicates image width of 385px
    const numberOfColumns = Math.floor(((window.innerWidth)/240))
    return !numberOfColumns > 0 ? 1 : numberOfColumns
}

export const useNumberOfColumns = ()=>{
    const [numberOfColumns, setNumberofColumns] = useState(getNumberOfColumns())
    const [width, setWidth] = useState(getWindowsDimensions())
    const [height, setHeight] = useState(getWindowsDimensions())
    useEffect(()=>{
        const handleResize = ()=>{
            console.log(width, height)
            setWidth(getWindowsDimensions())
            setHeight(getWindowsDimensions())
            setNumberofColumns(getNumberOfColumns() )
        }
        window.addEventListener('resize', handleResize)
        return ()=> window.removeEventListener('resize', handleResize)
    },[width,height ])
    return numberOfColumns
}