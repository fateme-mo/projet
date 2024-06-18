import React, {useEffect , useState} from 'react';
import axios from 'axios';
// import InfiniteScroll from 'react-infinite-scroll-component';

const InfiniteScrollComp = () => {

    const [data , setData] = useState([])

    useEffect (()=>{
        axios.get('	https://file.siraf.app/api/file/files/?web=true&cityIds[]=39&lastId=0&=&_limit=10')
        .then(res=> {
            setData(res.data.data.files)
        })
        .catch(err => {
            console.error(err);
         })
    },[])

    console.log(data)

    return (
        <div className='bg-zinc-600'>
            
            {/* <InfiniteScroll
            dataLength={data.length}
            next={useEffect}
            hasMore={true}
            loader={<h4>Loading...</h4>}
            > */}
            {data?.map((item, index) =>(
                <p key={index} className='text-[red]'>{item.name}</p>
            ))}
            {/* </InfiniteScroll> */}
        </div>
    );
};

export default InfiniteScrollComp;