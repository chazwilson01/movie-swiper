import React from "react";
import PersonIcon from '@mui/icons-material/Person';
import IconButton from '@mui/material/IconButton';
import ForumIcon from '@mui/icons-material/Forum';

const Header = () => {  
  return (
    <div className="flex justify-between items-center p-4 bg-white z-10">
        <IconButton>
            <PersonIcon />
        </IconButton>
        <IconButton>
            <ForumIcon />   
        </IconButton>
    </div>
  );
}

export default Header;