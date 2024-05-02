import React, { useEffect, useState } from "react";
import Newsitem from "./Newsitem";
import Spinnar from "./Spinnar";
import InfiniteScroll from 'react-infinite-scroll-component';
import LoadingBar from 'react-top-loading-bar';
import axios from 'axios';

const News = (props) => {
    const [page, setPage] = useState(1);
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [totalResults, setTotalResults] = useState(0);
    const [progress, setProgress] = useState(0);
    const [fetchingData, setFetchingData] = useState(false);

    const cpitlizeFirstLatter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    const updateNews = async () => {
        try {
            setProgress(30);
            const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apikey}`;
            console.log(url);

            const response = await axios.get(url);

            // Check if response status is 429 (Too Many Requests)
            if (response.status === 429) {
                throw new Error("API rate limit exceeded. Please try again later.");
            }

            const parseData = response.data;
            setArticles(prevArticles => [...prevArticles, ...parseData.articles]); // Concatenate new articles to existing ones
            setLoading(false);
            setTotalResults(parseData.totalResults); // Correctly update totalResults
            setProgress(100);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }

    useEffect(() => {
        updateNews();
    }, []); // Run once on component mount

    const fetchMoreData = async () => {
        if (fetchingData) return; // Prevent multiple simultaneous requests
        setFetchingData(true);

        // Introduce a delay before making the request
        setTimeout(async () => {
            setPage(page + 1);
            setLoading(true);
            
            try {
              const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apikey}`;
                const response = await axios.get(url);
                const parseData = response.data;
                setArticles(prevArticles => [...prevArticles, ...parseData.articles]); // Concatenate new articles to existing ones
                setLoading(false);
                setTotalResults(parseData.totalResults); // Correctly update totalResults
            } catch (error) {
                console.error("Error fetching more data:", error);
            } finally {
                setFetchingData(false);
            }
        }, 1000); // Adjust the delay as needed
    }

    return (
        <div className="container my-3">
            <LoadingBar height={3} color='#f11946' progress={progress} />
            <h1 className="text-center" style={{ margin: "35px" }}>NewsMonkey - Top {cpitlizeFirstLatter(props.category)} Headlines</h1>
            <div className="text-center">
                {loading && <Spinnar />}
                <InfiniteScroll
                    dataLength={articles.length}
                    next={fetchMoreData}
                    hasMore={articles.length < totalResults} // Adjusted condition for hasMore
                    loader={<Spinnar />}
                >
                    <div className="container">
                        <div className="row">
                            {articles.map((element, index) => (
                                <div className="col-md-4 my-3" key={index}>
                                    <Newsitem
                                        title={element.title ? element.title.slice(0, 45) : ""}
                                        description={element.description ? element.description.slice(0, 80) : ""}
                                        imageUrl={element.urlToImage}
                                        newsUrl={element.url}
                                        author={element.author}
                                        date={element.publishedAt}
                                        source={element.source.name}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </InfiniteScroll>
            </div>
        </div>
    );
}

export default News;
