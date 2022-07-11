import { Route } from "react-router-dom"

//this has been discontinued use outlet instead


const PrivateRoute = ({children, ...rest}) => {
    console.log('does it works');
  return (
    <Route {...rest}>{children}</Route>
  )
}

export default PrivateRoute