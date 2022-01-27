import React from 'react'

const Newsitem = (props)=>{
        let { title, description, imageUrl, newsUrl, author, date, source } = props;
        return (
            <div className='my-3 d-flex justify-content-center'>

                <div className="card" style={{ width: "21rem", backgroundColor: "#212529", color: "white" }}>
                    <img src={imageUrl} className="card-img-top" alt="..." />
                    <div className="card-body">
                        <div>
                            
                        <span className="position-absolute top-0 translate-middle badge rounded-pill bg-danger" style={{left:'80%'}}>
                            {source}
                            <span className="visually-hidden">unread messages</span>
                        </span>
                        </div>
                        <h5 className="card-title">{title} </h5>
                        <p className="card-text">{description}...</p>
                        <p className="card-text"><small className="text-muted">By {author ? author : "Unknown"} on {new Date(date).toGMTString()}</small></p>
                        <a rel="noreferrer" href={newsUrl} target="_blank" className="btn btn-secondary">Read More</a>
                    </div>
                </div>
            </div>
        )
}

export default Newsitem
