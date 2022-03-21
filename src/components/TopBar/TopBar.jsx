import React from "react";
import {Link} from "react-router-dom";
import {Search, Person, Chat, Notifications} from "@material-ui/icons";
import profileImg from "../../assets/images/profile.jpg"
import "./topbar.css";
import {Container,Row,Col} from "react-bootstrap";

const TopBar = () => {
    return (
        <div className="topbarContainer px-0">
            <div className="topbarLeft">
                <Link to="/" style={{ textDecoration: "none" }}>
                    <span className="logo">mobiOs</span>
                </Link>
            </div>
            <div className="topbarCenter">
                <div className="searchbar">
                    <Search className="searchIcon" />
                    <input
                        placeholder="Search"
                        className="searchInput"
                    />
                </div>
            </div>
            <div className="topbarRight">
                <div className="topbarIcons">
                    <div className="topbarIconItem">
                        <Person />
                        <span className="topbarIconBadge">1</span>
                    </div>
                    <div className="topbarIconItem">
                        <Chat />
                        <span className="topbarIconBadge">2</span>
                    </div>
                    <div className="topbarIconItem">
                        <Notifications />
                        <span className="topbarIconBadge">1</span>
                    </div>
                </div>
                <img
                    src={profileImg}
                    alt="user profile picture"
                    className="topbarImg"
                />
            </div>
        </div>
    );
}

export default TopBar;