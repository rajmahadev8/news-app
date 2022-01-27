import React,{useEffect, useState}from 'react'
import Newsitem from './Newsitem'
import Spinner from './spinner'
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";



const News = (props)=>{
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalResults, setTotalResults] = useState(0);
    
    const capitalize = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    const updateNews = async()=> {
        props.setProgress(10);
        console.log(page);
        let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=0a7b0f3f66544d648d8c7b6679b56f08&page=${page}&pageSize=${props.pageSize}`
       
        setLoading(true);
        let data = await fetch(url);
        props.setProgress(30);
        let parsedData = await data.json();
        console.log(parsedData);
        props.setProgress(70);
        setArticles(parsedData.articles);
        setTotalResults(parsedData.totalResults);
        setLoading(false);
        props.setProgress(100);
    }
    useEffect(() => {
        updateNews();
        document.title = `${capitalize(props.category)} - Daily Bugle`;//eslint-disable-next-line
    }, [])

    const fetchMoreData = async () => {
        console.log(page);
        let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=0a7b0f3f66544d648d8c7b6679b56f08&page=${page+1}&pageSize=${props.pageSize}`
        setPage(page+1);
        let data = await fetch(url);
        let parsedData = await data.json();
        console.log(parsedData);
        setArticles(articles.concat(parsedData.articles));
        setTotalResults(parsedData.totalResults);
    }
    // handlePrevClick = async () => {
    //     this.setState({
    //         page: this.state.page - 1
    //     });
    //     this.updateNews();

    // }
    // handleNextClick = async () => {
    //     this.setState({
    //         page: this.state.page + 1,
    //     });
    //     this.updateNews();
    // }
        return (
            <div className="container my-3">
                <h2 className='text-center' style={{margintop:'90px'}}>DailyBugle - Top {props.category} Headlines</h2>
                <InfiniteScroll
                    dataLength={articles}
                    next={fetchMoreData}
                    hasMore={articles.length !== totalResults}
                    loader={<Spinner/>}
                >
                    {loading && <Spinner/>}
                   <div className="container">
                       
                       <div className="row ">
                        {articles.map((element) => {
                            return <div className="col md-4 " key={element.url}>
                                <Newsitem title={element.title ? element.title.slice(0, 45) : ""} description={element.description ? element.description.slice(0, 88) : ""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
                            </div>
                        })}

                        </div> 
                    </div>
                </InfiniteScroll>
                {/* <div className="container d-flex justify-content-between">
                    <button type="button" disabled={page <= 1} className="btn btn-secondary" onClick={handlePrevClick}>&larr; Previous</button>
                    <button type="button" disabled={page + 1 > Math.ceil(totalResults / 20)} className="btn btn-secondary" onClick={handleNextClick}>Next &rarr;</button>
                </div> */}
            </div>
        )
    
}
News.defaultProps = {
    country: 'in',
    pageSize: '8',
    category: 'general'
}
News.propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.string,
    category: PropTypes.string,
}

export default News
