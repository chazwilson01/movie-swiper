import React from "react";
import "./swipeButtons.css";
import ReplayIcon from "@mui/icons-material/Replay";
import CloseIcon from "@mui/icons-material/Close";
import StarRateIcon from "@mui/icons-material/StarRate";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FlashOnIcon from "@mui/icons-material/FlashOn";
import IconButton from "@mui/material/IconButton";


const SwipeButtons = ({
    onFavorite,
    onDislike,
    goBack
    }) => {
    return (
        <div className="swipeButtons fixed bottom-[15vh] flex justify-center gap-15 w-full bg-gradient-to-br">
            <IconButton className="swipeButtons__repeat text-[#f5b748] p-[3vw]" onClick={goBack}>
                <ReplayIcon fontSize="large" />
            </IconButton>
            <IconButton className="swipeButtons__left p-[3vw]" onClick={onDislike}>
                <CloseIcon fontSize="large" />
            </IconButton>
            <IconButton className="swipeButtons__right p-[3vw]" onClick={onFavorite}>
                <FavoriteIcon fontSize="large" />
            </IconButton>
        </div>
    );
}


export default SwipeButtons;