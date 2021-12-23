import AppHeader from '../app-header/app-header';

const Layout = (props ) => {

  return (
    <>
      <AppHeader />
      {props.children}
    </>
  )
}

export default Layout;