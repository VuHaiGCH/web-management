import React, { useState, useEffect } from "react";
import { Drawer, IconButton, List } from "@material-ui/core";
import {
  Home as HomeIcon,
  FilterNone as UIElementsIcon,
  QuestionAnswer as SupportIcon,
  LibraryBooks as LibraryIcon,
  HelpOutline as FAQIcon,
  ArrowBack as ArrowBackIcon,
} from "@material-ui/icons";
import { useTheme } from "@material-ui/styles";
import { withRouter } from "react-router-dom";
import classNames from "classnames";

// styles
import useStyles from "./styles";

// components
import SidebarLink from "./components/SidebarLink/SidebarLink";

// context
import {
  useLayoutState,
  useLayoutDispatch,
  toggleSidebar,
} from "../../context/LayoutContext";
import ListofNews from "../../pages/News/ListofNews";
import FeedIcon from '@mui/icons-material/Feed';
import GroupIcon from '@mui/icons-material/Group';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';

const structure = [
  { id: 0, label: "Dashboard", link: "/app/dashboard", icon: <HomeIcon /> },
  {
    id: 1,
    label: "Manage Students",
    link: "/app/list-of-students",
    icon: <PermIdentityIcon />,
    children: [
      { label: "List of Students", link: "/app/list-of-students" },
      { label: "Fee of Student", link: "/app/fee-students" },
      { label: "Score of Student", link: "/app/list-of-score" },
    ],
  },
  {
    id: 2,
    label: "Manage Teachers",
    link: "/app/list-of-teachers",
    icon: <PermIdentityIcon />,
    children: [
      { label: "List of Teachers", link: "/app/list-of-teachers" },
      { label: "Feedback of Teacher", link: "/app/feedback-teachers" }
    ],
  },
  {
    id: 3,
    label: "Manage Classes",
    link: "/app/list-of-classes",
    icon: <GroupIcon />,
    children: [
      { label: "List of Classes", link: "/app/list-of-classes" },
      { label: "Feedback of Classes", link: "/app/feedback-classes" }
    ],
  },
  { id: 4, label: "Manage News", link: "/app/list-of-news", icon: <FeedIcon /> },
  { id: 5, type: "divider" },
  { id: 6, label: "Library", link: "", icon: <LibraryIcon /> },
  { id: 7, label: "Support", link: "", icon: <SupportIcon /> },
  { id: 8, label: "FAQ", link: "", icon: <FAQIcon /> },
  { id: 9, type: "divider" },

];

function Sidebar({ location }) {
  var classes = useStyles();
  var theme = useTheme();

  // global
  var { isSidebarOpened } = useLayoutState();
  var layoutDispatch = useLayoutDispatch();

  // local
  var [isPermanent, setPermanent] = useState(true);

  useEffect(function () {
    window.addEventListener("resize", handleWindowWidthChange);
    handleWindowWidthChange();
    return function cleanup() {
      window.removeEventListener("resize", handleWindowWidthChange);
    };
  });

  return (
    <Drawer
      variant={isPermanent ? "permanent" : "temporary"}
      className={classNames(classes.drawer, {
        [classes.drawerOpen]: isSidebarOpened,
        [classes.drawerClose]: !isSidebarOpened,
      })}
      classes={{
        paper: classNames({
          [classes.drawerOpen]: isSidebarOpened,
          [classes.drawerClose]: !isSidebarOpened,
        }),
      }}
      open={isSidebarOpened}
    >
      <div className={classes.toolbar} />
      <div className={classes.mobileBackButton}>
        <IconButton onClick={() => toggleSidebar(layoutDispatch)}>
          <ArrowBackIcon
            classes={{
              root: classNames(classes.headerIcon, classes.headerIconCollapse),
            }}
          />
        </IconButton>
      </div>
      <List className={classes.sidebarList}>
        {structure.map(link => (
          <SidebarLink
            key={link.id}
            location={location}
            isSidebarOpened={isSidebarOpened}
            {...link}
          />
        ))}
      </List>
    </Drawer>
  );

  // ##################################################################
  function handleWindowWidthChange() {
    var windowWidth = window.innerWidth;
    var breakpointWidth = theme.breakpoints.values.md;
    var isSmallScreen = windowWidth < breakpointWidth;

    if (isSmallScreen && isPermanent) {
      setPermanent(false);
    } else if (!isSmallScreen && !isPermanent) {
      setPermanent(true);
    }
  }
}

export default withRouter(Sidebar);
