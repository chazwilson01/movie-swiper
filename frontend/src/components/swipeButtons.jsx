import React from "react";
import "./swipeButtons.css";
import ReplayIcon from "@mui/icons-material/Replay";
import CloseIcon from "@mui/icons-material/Close";
import FavoriteIcon from "@mui/icons-material/Favorite";
import IconButton from "@mui/material/IconButton";


const SwipeButtons = ({
    onFavorite,
    onDislike,
    goBack
    }) => {
    return (
        <div className="swipeButtons fixed bottom-[18vh] flex justify-center gap-15 w-full bg-gradient-to-br">
            <IconButton className="swipeButtons__repeat p-[3vw]" onClick={goBack}>
                <ReplayIcon fontSize="large" sx={{color: "#f5b748"}} />
            </IconButton>
            <IconButton className="swipeButtons__left p-[3vw]" onClick={onDislike}>
                <CloseIcon fontSize="large" sx={{color:"#FF4C4C"}}/>
            </IconButton>
            <IconButton className="swipeButtons__right p-[3vw]" onClick={onFavorite}>
                <FavoriteIcon fontSize="large" sx={{color:"#A855F7"}} />
            </IconButton>
        </div>
    );
}


export default SwipeButtons;