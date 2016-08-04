import React from 'react'
import {Link} from 'react-router'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {IconButton, IconMenu,MenuItem, Paper,Menu,Drawer} from 'material-ui'
import NavigationMenu from 'material-ui/svg-icons/navigation/menu';
import {browserHistory} from 'react-router'

import Header from 'components/layout/Header'
import Navigation from 'components/layout/Navigation'

const Nav = ({isOpen}) => (
  <MuiThemeProvider>
    <Drawer open={isOpen} style={{top:'10%'}}>
      <MenuItem primaryText="Home" value="/"/>
      <MenuItem primaryText="Main" value="main"/>
      <MenuItem primaryText="Flights" />
      <MenuItem primaryText="Apps" />
    </Drawer>
  </MuiThemeProvider>
)

const style={
  float : 'left'
}
const Layout = ({children}) => {
  return (
    <div>
        <Header />
<Navigation />
      <MuiThemeProvider>
      {children}
      </MuiThemeProvider>
    </div>


  )
}

export default Layout
