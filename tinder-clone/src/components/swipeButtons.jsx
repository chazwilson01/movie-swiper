import React from "react";
import "./swipeButtons.css";
import ReplayIcon from "@mui/icons-material/Replay";
import CloseIcon from "@mui/icons-material/Close";
import StarRateIcon from "@mui/icons-material/StarRate";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FlashOnIcon from "@mui/icons-material/FlashOn";
import IconButton from "@mui/material/IconButton";
const SwipeButtons = () => {
    return (
        <div className="swipeButtons fixed bottom-[10vh] flex justify-evenly w-full">
            <IconButton className="swipeButtons__repeat text-[#f5b748] p-[3vw]">
                <ReplayIcon fontSize="large" />
            </IconButton>
            <IconButton className="swipeButtons__left p-[3vw]">
                <CloseIcon fontSize="large" />
            </IconButton>
            <IconButton className="swipeButtons__star p-[3vw]">
                <StarRateIcon fontSize="large" />
            </IconButton>
            <IconButton className="swipeButtons__right p-[3vw]">
                <FavoriteIcon fontSize="large" />
            </IconButton>
            <IconButton className="swipeButtons__lightning p-[3vw]">
                <FlashOnIcon fontSize="large" />
            </IconButton>
        
        </div>
    );
}


export default SwipeButtons;