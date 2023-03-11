import React, { useEffect,useState } from "react";
import Newsitem from "./Newsitem";
import Spinnar from "./Spinnar";
// import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroll-component';
import LoadingBar from 'react-top-loading-bar';

const News= (props)=>  {
  const[page,setPage] = useState(1);
 const[articles,setArticles] = useState([]);
 const[loading,setLoading] = useState(true);
 const[totalResults,setTotalResult] = useState(0);
 const [progress,setProgress]=useState(0)
 
 
  // document.title = `${cpitlizeFirstLatter(props.category)} - NewsMonkey`
 const cpitlizeFirstLatter =(string)=>{
   return string.charAt(0).toUpperCase() +string.slice(1);
  }
  
  const updateNews = async(props)=>{
     setProgress(30);
    const url =
    `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=c3784978b0fa483587410a8a60f9bac2&page=${page}&pageSize=${props.pageSize}`;
    
    let data = await fetch(url);
    let parseData = await data.json();
    setArticles(parseData.articles)
    setLoading(false)
    setTotalResult(parseData.totalResults) 
    setProgress(100);
  }
  useEffect(()=>{
    updateNews();
  },[]);
  //  const handlePreClick =async()=>{
    //     updateNews();
    //  setPage(page-1)
    // }
    //  const handleNextClick =async()=>{
      //   updateNews();
      //   setPage(page+1)
      // }
      const fetchMoreData =async ()=>{
        setPage(page+1)
        let url =
        `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=c3784978b0fa483587410a8a60f9bac2&page=${this.state.page}&pageSize=${props.pageSize}`;
        setLoading(true)
        let data = await fetch(url);
        let parseData = await data.json();
        console.log(parseData);
        setArticles(articles.concat(parseData.articles))
        setLoading(false)
        setTotalResult(parseData.articles)
        console.log(articles);
      }
      
      return (
        <div className="container my-3">
          <LoadingBar height={3} color='#f11946' progress={ progress} />
        <h1 className="text-center" style={{margin:"35px"}}>NewsMonkey - Top {cpitlizeFirstLatter(props.category)} Headlines</h1>
        <div className="text-center">
          {loading && <Spinnar/>}
          <InfiniteScroll
  dataLength={articles.length} //This is important field to render the next data
  next={fetchMoreData}
  hasMore={articles.length !== totalResults}
  loader={<Spinnar/>}>
    <div className="container">
    <div className="row">
          {articles.map((element) => {
            return (
              <div className="col-md-4 my-3" key={element.url}>
                <Newsitem
                  title={element.title ? element.title.slice(0, 45) : ""}
                  description={
                    element.description ? element.description.slice(0, 80) : ""
                  }
                  imageUrl={element.urlToImage}
                  newsUrl={element.url}
                  author ={element.author} 
                  date={element.publishedAt}
                  source={element.source.name}
                  />
              </div>
            );
          })}
          </div>
        </div>
    </InfiniteScroll>
  </div>
  </div>
    );
 

// News.defaultProps ={
//   country:'in',
//   pageSize:8,
//   category:'general',
// }
// News.propTypes ={
//   country:PropTypes.string,
//   pageSize:PropTypes.number,
//   category:PropTypes.string,
// }
}
export default News;
