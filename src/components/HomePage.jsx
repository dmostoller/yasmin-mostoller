import React from "react";
import Slider from './Slider.jsx';
import PostsList from "./PostsList.jsx";
import { useUser } from "../context/user.jsx";
import { useAdmin } from "../context/admin.jsx"

export default function HomePage () {
    const { user } = useUser()
    const { isAdmin } = useAdmin()
return (
    <div className="ui container fluid">

        {/* <div className="ui container" style={{width: "60%", float:"left", paddingRight:"25px"}}><CarouselContainer /></div> */}
        <div className="ui container fluid"><Slider /></div>
        <p style={{textAlign: "center", marginTop:"15px", marginBottom: "0px"}}>"To draw, you must close your eyes and sing." <i> -Pablo Picasso</i></p>
        <div className="ui container fluid"><PostsList user={user} isAdmin={isAdmin}/></div>
    </div>
)
}