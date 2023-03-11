import React from "react";

const Newsitem=(props)=>  {
  
    let { title, description, imageUrl, newsUrl, author, date , source } = props;
    return (
      <div>
        <div className="card">
          <div style={{display:"flex",justifyContent:"felx-end",position:"absolute",right:"end"}}>
        <span className="  badge rounded-pill bg-danger" >
                {source}
              </span>
        </div>
          <img src={!imageUrl ? "https:image.cnbcfm.com/api/v1/image/107131110-1665157490980-nys4.jpg?v=1669662559&w=1920&h=1080":imageUrl} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">
              {" "}
              {title}{" "}
              {" "}
            </h5>
            <p className="card-text">{description}</p>
            <p className="card-text">
              <small className="text-muted">
                By {!author ? "Unknown" : author} on{" "}
                {new Date(date).toGMTString()}
              </small>
            </p>
            <a href={newsUrl} target="_blank" className="btn btn-sm btn-dark">
              See More
            </a>
          </div>
        </div>
      </div>
    );
  }


export default Newsitem;
