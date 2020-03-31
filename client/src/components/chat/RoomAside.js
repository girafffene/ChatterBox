import React from "react"
import { useAuth } from "react-auth"
import { Icon, Button, Divider, Menu } from "semantic-ui-react"

export default props => {
  const { profile, signout } = useAuth()

  return (
    <aside className="userInfo">
      <div>
        <Icon size="large" color="grey" name="user" />
        <span className="status online"></span>{" "}
        <span className="name">{profile.username}</span>
        <Button
          title="Logout"
          onClick={e => signout()}
          circular
          icon="fighter jet"
        ></Button>
      </div>
      <Divider />
      <Menu inverted secondary vertical>
        <Menu.Item name="general" active={true} />
      </Menu>
    </aside>
  )
}
