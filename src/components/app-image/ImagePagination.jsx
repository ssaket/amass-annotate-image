import React, { useEffect, useState } from 'react';

const ImagePagination = ({ totalCount, count, handlePagination }) => {

    const [numberOfPages, setnumberOfPages] = useState(1);
    const [pages, setPages] = useState(Array.from(Array(1).keys()));
    const [activePage, setActivePage] = useState(0);

    useEffect(() => {
        if (!count) return;
        console.log(totalCount, count);
        const pgno = Math.floor(totalCount / count);
        setnumberOfPages(pgno);
        const pgs = Array.from(Array(pgno).keys());
        setPages(pgs);
    }, [count, totalCount]);

    const pagination = e => {
        e.numberOfPages = numberOfPages;
        e.pageSize = count;
        if (e.target.innerText === "Next") {
            if ((activePage + 1) < numberOfPages) {
                e.startIndex = (activePage + 1) * count;
                e.endIndex = (activePage + 1) * count + count;
                setActivePage( (activePage + 1));
            }
            else return;
        }
        else if (e.target.innerText === "Previous") {
            if ((activePage - 1) >= 0) {
                e.startIndex = (activePage - 1) * count;
                e.endIndex = (activePage - 1) * count + count;
                setActivePage((activePage - 1));
            }
            else return;
        } else {
            e.startIndex = parseInt(e.target.innerText) * count;
            e.endIndex = parseInt(e.target.innerText) * count + count;
            setActivePage(parseInt(e.target.innerText));
        }

        handlePagination(e);
    }


    return (
        <React.Fragment>
            <nav aria-label="">
                <ul className="pagination pagination-sm justify-content-end">
                    <li  onClick={pagination} className={activePage === 0 ? "page-item  disabled" : "page-item"}>
                        <button className="page-link" tabIndex="-1">Previous</button>
                    </li>
                    {pages.map((item, index) => {
                        return (<li key={index} onClick={pagination} id={item} className={activePage === item ? "page-item  active" : "page-item"} style={{ cursor: 'pointer' }} aria-current="page">
                            <span className="page-link">{item}</span>
                        </li>)
                    })}

                    {/* <li className="page-item active" aria-current="page">
                        <span className="page-link">1</span>
                    </li>
                    <li className="page-item"><button className="page-link" to="#">2</button></li>
                    <li className="page-item"><button className="page-link" to="#">3</button></li> */}
                    <li onClick={pagination} className={activePage + 1 === numberOfPages ? "page-item  disabled" : "page-item"}>
                        <button className="page-link">Next</button>
                    </li>
                </ul>
            </nav>
        </React.Fragment>
    )
}

export default ImagePagination