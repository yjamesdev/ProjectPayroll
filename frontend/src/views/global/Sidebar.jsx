import PropTypes from 'prop-types';
import { useState } from "react";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import "react-pro-sidebar/dist/css/styles.css";
import { tokens } from "../../Theme";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import BadgeIcon from '@mui/icons-material/Badge';
import AssessmentIcon from '@mui/icons-material/Assessment';
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";

const Item = ({ title, icon, selected, setSelected }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <>
      <MenuItem
        active={selected === title}
        style={{
          color: colors.grey[100],
        }}
        onClick={() => setSelected(title)}
        icon={icon}
      >
        <Typography>{title}</Typography>
      </MenuItem>
    </>
  );
};

Item.propTypes = {
  title: PropTypes.string.isRequired,
  to: PropTypes.string,
  icon: PropTypes.element,
  selected: PropTypes.bool,
  setSelected: PropTypes.func,
};

const Sidebar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapse, setIsCollapse] = useState(false);
  const [selected, setSelected] = useState("Dashboard");

  return (
    <>
      <Box
        sx={{
          "& .pro-sidebar-inner": {
            background: `${colors.primary[400]} !important`,
          },
          "& .pro-icon-wrapper": {
            backgroundColor: "transparent !important",
          },
          "& .pro-inner-item": {
            padding: "5px 35px 5px 20px !important",
          },
          "& .pro-inner-item:hover": {
            color: "#868dfb !important",
          },
          "& .pro-menu-i  tem.active": {
            color: "#6870fa !important",
          },
        }}
      >
        <ProSidebar collapse={isCollapse}>
          <Menu iconShape="square">
            {/* LOGO AND MENU ICON */}
            <MenuItem
              onClick={() => setIsCollapse(!isCollapse)}
              icon={isCollapse ? <MenuOutlinedIcon /> : undefined}
              style={{
                margin: "10px 0 20px 0",
                color: colors.grey[100],
              }}
            >
              {!isCollapse && (
                <Box
                  display={"flex"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                  ml="15px"
                >
                  <Typography variant="h3" color={colors.grey[100]}>
                    {/* DATABASE ROL USER */}
                    ADMIN
                  </Typography>
                  <IconButton onClick={() => setIsCollapse(!isCollapse)}>
                    <MenuOutlinedIcon />
                  </IconButton>
                </Box>
              )}
            </MenuItem>
            {/* DATABASE USER */}
            {!isCollapse && (
              <Box mb="25px">
                <Box
                  display={"flex"}
                  justifyContent={"center"}
                  alignItems={"center"}
                >
                  <img
                    alt="profile-user"
                    width={"100px"}
                    height={"100px"}
                    src={`/user.png`}
                    style={{ cursor: "pointer", borderRadius: "50%" }}
                  />
                </Box>
                <Box textAlign={"center"}>
                  <Typography
                    variant="h2"
                    color={colors.grey[100]}
                    fontWeight="bold"
                    sx={{ m: "10px 0 0 0" }}
                  >
                    Ed Roch
                  </Typography>
                  <Typography variant="h5" color={colors.greenAccent}>
                    VP Fancy Admin
                  </Typography>
                </Box>
              </Box>
            )}

            <Box paddingLeft={isCollapse ? undefined : "10%"}>
                <Item
                   title="Dashboard"
                   to="/"
                   icon={<HomeOutlinedIcon />}
                   selected={selected}
                   setSelected={setSelected}
                />
                  <Item
                   title="Employee"
                   to="/Employee"
                   icon={<BadgeIcon />}
                   selected={selected}
                   setSelected={setSelected}
                />
                  <Item
                   title="Report"
                   to="/Report"
                   icon={<AssessmentIcon />}
                   selected={selected}
                   setSelected={setSelected}
                />
                  <Item
                   title="Profile"
                   to="/Profile"
                   icon={<HomeOutlinedIcon />}
                   selected={selected}
                   setSelected={setSelected}
                />
                  <Item
                   title="Attendance"
                   to="/Attendance"
                   icon={<HomeOutlinedIcon />}
                   selected={selected}
                   setSelected={setSelected}
                />
                  <Item
                   title="Calendar"
                   to="/Calendar"
                   icon={<HomeOutlinedIcon />}
                   selected={selected}
                   setSelected={setSelected}
                />
            </Box>
          </Menu>
        </ProSidebar>
      </Box>
    </>
  );
};

export default Sidebar;
