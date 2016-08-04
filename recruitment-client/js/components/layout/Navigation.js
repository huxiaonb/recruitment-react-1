import React from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import { List, ListItem, Paper } from 'material-ui';

import ContentInbox from 'material-ui/svg-icons/content/inbox';
import ActionGrade from 'material-ui/svg-icons/action/grade';
import ContentSend from 'material-ui/svg-icons/content/send';
import ContentDrafts from 'material-ui/svg-icons/content/drafts';
import Divider from 'material-ui/Divider';
import ActionInfo from 'material-ui/svg-icons/action/info';

const style = {
  width : 200,
  float : 'left'
}
const Navigation = () => {
  return (
    <MuiThemeProvider>
      <Paper style={style}>
        <List onTouchTap={e => {
          console.log(e.target)
        }}>
          <ListItem primaryText="Position" leftIcon={<ContentInbox />} value="position" />
          <ListItem primaryText="Starred" leftIcon={<ActionGrade />} />
          <ListItem primaryText="Sent mail" leftIcon={<ContentSend />} />
          <ListItem primaryText="Drafts" leftIcon={<ContentDrafts />} />
          <ListItem primaryText="Inbox" leftIcon={<ContentInbox />} />
        </List>
      </Paper>
    </MuiThemeProvider>
  )
}

export default Navigation
