import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MailIcon from '@mui/icons-material/Mail';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Link, Outlet } from 'react-router-dom';
import { AuthContext } from '../../AuthProvider/AuthProvider';
import { AccountBox, AdminPanelSettings, Badge, GroupAdd, Home, Login, Logout, PlaylistAdd, Queue, RecentActors, RequestPage, RequestQuote, StackedBarChart } from '@mui/icons-material';
import { Button, LinearProgress } from '@mui/material';
import useEmployeeData from '../../AuthProvider/useEmployeeData';
import useAdminData from '../../AuthProvider/useAdminData';

const drawerWidth = 240;

function ResponsiveDrawer(props) {
  const { user, loading, logOut } = React.useContext(AuthContext);
  if (loading) {
    return (<Box sx={{ width: '100%' }}>
      <LinearProgress />
    </Box>);
  }
  const [employee] = useEmployeeData();
  const emp = employee?.filter((em) => em?.email == user?.email);
  console.log(emp);
  const [admin] = useAdminData();
  const adm = admin?.filter((adm) => adm?.email == user?.email);
  console.log(adm[0]);
  const handleLogOut = () => {
    logOut()
      .then()
      .catch()
  }
  const withoutLogin = [
    {
      id: 1,
      title: 'HOME',
      link: '/',
      icon:<Home/>
    },
    {
      id: 2,
      title: 'Join as EMPLOYEE',
      link: '/joinemployee',
      icon:<Badge/>
    },
    {
      id: 3,
      title: 'Join as ADMIN',
      link: '/joinadmin',
      icon:<AdminPanelSettings/>
    }
  ];
  const withEmployeeLogin = [
    {
      id: 1,
      title: 'HOME',
      link: '/',
      icon:<Home/>
    },
    {
      id: 2,
      title: 'MY TEAM',
      link: '/myteam',
      icon:<GroupAdd/>
    },
    {
      id: 3,
      title: 'MY ASSET',
      link: '/myasset',
      icon:<StackedBarChart/>
    },
    {
      id: 4,
      title: 'REQUEST FOR AN ASSET',
      link: '/requestforanasset',
      icon:<Queue/>
    },
    {
      id: 5,
      title: 'MAKE A CUSTOM REQUEST',
      link: '/cusreq',
      icon:<RequestPage/>
    },
    {
      id: 6,
      title: 'PROFILE',
      link: '/profile',
      icon: <AccountBox/>
    }
  ];
  const withAdminLogin = [
    {
      id: 1,
      title: 'HOME',
      link: '/',
      icon:<Home/>
    },
    {
      id: 2,
      title: 'My Employee List',
      link: '/myemployeelist',
      icon:<RecentActors/>
    },
    {
      id: 3,
      title: 'Add an Employee',
      link: '/addEmployee',
      icon: <PlaylistAdd/>
    },
    {
      id: 4,
      title: 'Asset List',
      link: '/assetlist',
      icon:<StackedBarChart/>
    },
    {
      id: 5,
      title: 'Add An Asset',
      link: '/addasset',
      icon: <Queue/>
    },
    {
      id: 6,
      title: 'All Request',
      link: '/adminreqlist',
      icon: <RequestPage/>
    },
    {
      id: 7,
      title: 'Custom Request List',
      link: '/',
      icon:<RequestQuote/>
    }
  ];
  console.log(user);
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div className='bg-[#dcafa4] h-[100vh]'>
      <Toolbar />
      <Divider />
      <List>
        {
          user ?
            <span className='hidden'></span>
            :
            <span>
              {withoutLogin?.map((text, index) => (
                <Link to={text.link}>
                  <ListItem key={text} disablePadding className='hover:shadow-xl'>
                    <ListItemButton>
                      <ListItemIcon>
                        {text.icon}
                      </ListItemIcon>
                      <ListItemText primary={text.title} />
                    </ListItemButton>
                  </ListItem>
                </Link>
              ))}
            </span>
        }
        {/* // employee navbar section */}
        {
          user && emp?.length>0 ?
            <span>
              {withEmployeeLogin?.map((text, index) => (
                <Link to={text.link}>
                  <ListItem key={text} disablePadding className='hover:shadow-xl'>
                    <ListItemButton>
                      <ListItemIcon>
                        {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                      </ListItemIcon>
                      <ListItemText primary={text.title} />
                    </ListItemButton>
                  </ListItem>
                </Link>
              ))}
            </span>
            :
            <span className='hidden'></span>
        }
        {/* // admin navbar section */}
        {
          user && adm?.length>0 ?
            <span>
              {withAdminLogin?.map((text, index) => (
                <Link to={text.link}>
                  <ListItem key={text} disablePadding className='hover:shadow-xl'>
                    <ListItemButton>
                      <ListItemIcon>
                        {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                      </ListItemIcon>
                      <ListItemText primary={text.title} />
                    </ListItemButton>
                  </ListItem>
                </Link>
              ))}
            </span>
            :
            <span className='hidden'></span>
        }
        {/* // login logout section */}
        {
          user ?
            <ListItem disablePadding className='hover:shadow-xl bg-red-400' onClick={handleLogOut}>
              <ListItemButton>
                <ListItemIcon>
                  <Logout></Logout>
                </ListItemIcon>
                <ListItemText primary='Log Out' />
              </ListItemButton>
            </ListItem>
            :
            <Link to='/login'>
              <ListItem disablePadding className='hover:shadow-xl'>
                <ListItemButton>
                  <ListItemIcon>
                    <Login></Login>
                  </ListItemIcon>
                  <ListItemText primary='Login' />
                </ListItemButton>
              </ListItem>
            </Link>
        }
      </List>
      <Divider />
      {/* <List>
        {['All mail', 'Trash', 'Spam'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List> */}
    </div>
  );

  // Remove this const when copying and pasting into your project.
  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar className='bg-[#dcafa4]'>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>

        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
        className='bg-[#F6E8D5] min-h-[100vh] h-max'
      >
        <br /><br /><br />
        <Outlet></Outlet>
      </Box>
    </Box>
  );
}

ResponsiveDrawer.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * Remove this when copying and pasting into your project.
   */
  window: PropTypes.func,
};

export default ResponsiveDrawer;