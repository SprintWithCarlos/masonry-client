import './masonry.css'
import { masonryGallery } from '../../utils'
import { useNumberOfColumns } from '../../hooks/useWindowWidth'
import { useState, useEffect, useRef, useContext } from 'react'
import { Context } from '../../context/Context'

export const Masonry = (props) => {
    const {posts, dispatch, isFetching, error} =useContext(Context)
    const numberOfColumns = useNumberOfColumns(props.search)
    const masonryRef =useRef(undefined)
    const [isLoading, setIsLoading] = useState()
    const [scrollHeight, setScrollHeight ] = useState(undefined)
    const [scrollTop, setScrollTop ] = useState(undefined)
    const [clientHeight, setClientHeight ] = useState(undefined)
    const [imagesBatch, setImagesBatch] =useState(10)
    const dataSearched = new RegExp( props?.search, 'gi')
    
    useEffect(()=>{
        const fetchData = async()=>{
            try {
                dispatch({type: "START_FETCHING"})
                const res = await fetch('http://localhost:5001/api/posts')
                if(!res.ok){
                    throw Error(res.statusText)
                }
                const data = await res.json()
                dispatch({type: "FETCHING_SUCCESS", payload: data}) 
            } catch (err) {
                dispatch({type: "FETCHING_ERROR", payload: err.message})
            }
        }
        fetchData() 
    },[dispatch])

    const workingData = posts?.data?.filter(item => (item?.title?.match(dataSearched))).slice(0, imagesBatch)
    useEffect(()=>{

        const handleScroll = ()=>{

          setScrollHeight(window.pageYOffset)
          setScrollTop( window.innerHeight)
          setClientHeight(masonryRef?.current?.clientHeight)
            if(!props?.search && (workingData?.length < posts?.data?.length)){
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
        },[masonryRef, props.search, scrollHeight, scrollTop, clientHeight, isLoading, imagesBatch, numberOfColumns, workingData?.length, posts?.length])
        
        
        
        
        
        // console.log(workingData)
        // [clientHeight, dispatch, imagesBatch, posts?.length, props.search, scrollHeight, scrollTop])
        // [masonryRef, props.search, data.length, scrollHeight, scrollTop, clientHeight, isLoading, imagesBatch, numberOfColumns, data1?.length]
        // const PF = process.env.REACT_APP_PUBLIC_FOLDER
        // const host = process.env.REACT_APP_STORAGE || PF
        // console.log(error)
        const newData = masonryGallery(workingData, numberOfColumns)
        //  console.log(workingData)
        return (
            <> 
        {/* {isFetching && <p>Loading...</p>}
        {error && <p>{error}</p>}
    <code>{JSON.stringify(posts)}</code> */}
         {!workingData?.length >0 && (<p className="noMatches">No matches.</p>)}
        <ul className="masonry" style={{columns: numberOfColumns}} ref={masonryRef} >
            {newData.map((columns, i)=> {
                return <section className="columns" key={i}>
                {columns.map((item, i) => (
                    <a href={item.images.large} key={i}>
                    <li className="card" >
                    <img
                            loading={i<=10?"eager": "lazy" }
                            srcSet={`${item.images.small} 500w, ${item.images.medium} 1000w, ${item.images.large} 1500w`}
                            sizes="(max-width: 300px) 100w,
                                (max-width: 6000px) 50w,
                                (max-width: 900px) 33.33w,
                                (max-width: 1200px) 25w"
                                src={item.images.small} alt={item.images.name} />
                        
                                <p>delete</p>
                                <div className="title">{item.title}</div >
                        
                    </li>
                    </a>
                    ))}
                </section>})} 
            </ul>   
                    
            {(isLoading)&& (<p>Loading...</p>)}
            { workingData?.length === posts?.data?.length && (<p>End of Gallery</p>)}  
        </>
    )
}
