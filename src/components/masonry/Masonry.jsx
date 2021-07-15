import './masonry.css'
import { masonryGallery } from '../../utils'
import { useNumberOfColumns } from '../../hooks/useWindowWidth'
import { useState, useEffect, useRef, useContext } from 'react'
import { Context } from '../../context/Context'
import { Bouncing } from '../atoms/bouncing-three-dots-animation/Bouncing'
const host = process.env.REACT_APP_HOST || 'http://localhost:5001/api/'
export const Masonry = (props) => {
    const {posts, dispatch, error, isFetching} =useContext(Context)
    const numberOfColumns = useNumberOfColumns(props.search)
    const masonryRef =useRef(undefined)
    const [isLoading, setIsLoading] = useState()
    const [scrollHeight, setScrollHeight ] = useState(undefined)
    const [scrollTop, setScrollTop ] = useState(undefined)
    const [clientHeight, setClientHeight ] = useState(undefined)
    const [imagesBatch, setImagesBatch] =useState(10)
    const dataSearched = new RegExp( props?.search, 'gi')
    const workingData = posts?.data?.filter(item => (item?.title?.match(dataSearched))).slice(0, imagesBatch)
    useEffect(()=>{

        const handleScroll = ()=>{

          setScrollHeight(window.pageYOffset)
          setScrollTop( window.innerHeight)
          setClientHeight(masonryRef?.current?.clientHeight)
            if(!props?.search && (workingData?.length < posts?.data?.length)){
               if(scrollHeight + scrollTop >= (clientHeight*0.75)){ 
                    setIsLoading(true)
                    setImagesBatch(imagesBatch + 5)
                    setTimeout(()=>setIsLoading(false), 1000)
            
          }
         }
            
        
         
      }
      window.addEventListener('scroll', handleScroll)
         handleScroll()
         return ()=> {
             window.removeEventListener('scroll', handleScroll)
          }
        },[masonryRef, props.search, scrollHeight, scrollTop, clientHeight, isLoading, imagesBatch, numberOfColumns, workingData?.length, posts?.length, posts?.data])
        
        const newData = masonryGallery(workingData, numberOfColumns)
        const handleDelete = async(e)=>{
            e.preventDefault()
            const {id} = e.target
            const confirmation = window.confirm("Are you sure")
            confirmation && dispatch({type: "DELETE_START"})
            try {
                const res = await fetch(host + "posts/"+ id, {
                    method: "DELETE"
                })
            if(res.ok){
                dispatch({type: "DELETE_SUCCESS"})
                window.location.reload()
            }
            } catch (err) {
                dispatch({type: "DELETE_FAILURE", payload: err})
            }

        }
        return (
            <> 
    
     {(isLoading)&& <div className="isLoading">
            <Bouncing dimensions={{size:10,height: 50, width: 60}} color={'#fefefe'} backgroundColor={'transparent'}/>
            </div>}
            {error.type === "loading gallery" && <p className="errorMessage">{error.message}</p>}
            {(props.search && !workingData?.length >0) && (<p className="noMatches">No matches.</p>)}
        {(!isFetching && newData) && (<>
        <ul className="masonry" style={{columns: numberOfColumns}} ref={masonryRef} >
            {newData.map((columns, i)=> {
                return <section className="columns" key={i}>
                {columns.map((item) => (
                    <li className="card" key={item._id} >
                        <button className="btnDelete" id={item._id} onClick={e=> handleDelete(e)}>delete</button>
                        <a href={item.images.large} >
                    <img
                            loading={i<=10?"eager": "lazy" }
                            srcSet={`${item.images.small} 500w, ${item.images.medium} 1000w, ${item.images.large} 1500w`}
                            sizes="(max-width: 300px) 100w,
                                (max-width: 6000px) 50w,
                                (max-width: 900px) 33.33w,
                                (max-width: 1200px) 25w"
                                src={item.images.small} alt={item.images.name} />
                        
                                <div className="title">{item.title}</div >
                        
                    </a>
                    </li>
                    ))}
                </section>})} 
            </ul>   
            { workingData?.length === posts?.data?.length && (<p className="wrapperFullWidth" style={{maxWidth: "none", marginBottom: "60px"}}>End of Gallery</p>)}  
        
        </>) }
        </>
    )
}
