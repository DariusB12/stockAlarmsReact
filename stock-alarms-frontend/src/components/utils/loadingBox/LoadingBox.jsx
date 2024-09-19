import ReactLoading from "react-loading";


export default function LoadingBox(){
    return <>
            <div className="loadingBox">
                <div className="content">
                    <p>loading</p>    
                    <ReactLoading type="bubbles" color="#77e8ff"
                    height={100} width={50} />
                </div>
            </div>
        </>
}