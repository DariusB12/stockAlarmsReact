import { useEffect, useState, useRef } from "react";
import List from "../../../utils/list/List";
import Button from "../../../utils/button/Button";

export default function StockSymbolsContainer({items}){
    const [filteredItems,setFilteredItems] = useState(items);

    useEffect(()=>{
        setFilteredItems(items)
    },[])
    const inputRef = useRef(null);

    const handleOnClick = ()=>{
        const search = inputRef.current.value;
        setFilteredItems(items.filter((item)=>{
            if(item.key.startsWith(search.toUpperCase()))
                return item;
        }));
    }
    const handleOnChange = (event)=>{
        if(event.target.value == "")
            setFilteredItems(items);
    }

    return <div className="stockSymbolsContainer">
                <div className="searchBarButtonSearchContainer">
                    <input type="text" id="symbolInput" className="symbolsSearchBox" ref={inputRef} onChange={handleOnChange}/>
                    <Button value="search" className="buttonSearch" onClick={()=>handleOnClick()}></Button>
                </div>
                
                <div className="listSymbolsContainer">
                        <List className="listSymbols" items={filteredItems} />
                </div>
        </div>
}