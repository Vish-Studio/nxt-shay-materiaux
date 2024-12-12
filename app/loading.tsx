import { TrophySpin } from "react-loading-indicators";


export default function Loading() {
    return(
        <div className="loading-page" style={{backgroundColor: '#1b1b1b'}}>
            <TrophySpin color="#fff" size="medium" text="Loading.." textColor="#fff" />
        </div>
    )
}