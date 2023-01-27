import { Grid } from "@mui/material";
import React, { useState, useEffect } from "react";
import Feed from "../components/Feed";
import SideMenu from "../components/SideMenu";
import StatusBar from "../components/StatusBar";
import "./HomePage.css";
import Search from "./../components/Search";
import { UserState } from "./../context/UserProvider";
import VisitorProfile from "../components/VisitorProfile";

const HomePage = () => {
  const { selectedUser, setSelectedUser } = UserState();
  const [item3Display, setItem3Display] = useState('block');
  const [item2Size, setItem2Size] = useState(6);

  useEffect(() => {
    viewUser();
  }, [selectedUser]);
  

  const viewUser=()=>{
    if(selectedUser){
    setItem3Display('none');
    setItem2Size(9);
    }
    else{
      setItem3Display("block");
      setItem2Size(6);
    }
  }

  return (
    <div>
      <Grid container component="main" sx={{ maxHeight: "70vh" }}>
        <Grid item xs={2} sm={2} md={3}>
          <SideMenu data={"home"} />
        </Grid>
        <Grid item xs={6} sm={6} md={item2Size} className="main_content">
          {selectedUser ? (
            <div>
              <VisitorProfile data={selectedUser} />
            </div>
          ) : (
            <div>
              <Search />
              <StatusBar />
              <Feed />
            </div>
          )}
        </Grid>
        <Grid
          item
          xs={4}
          sm={4}
          md={3}
          sx={{ backgroundColor: "whitesmoke", display:item3Display }}
        >
          item3
        </Grid>
      </Grid>
    </div>
  );
};

export default HomePage;
