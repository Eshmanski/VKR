import { createTheme, ThemeProvider } from '@mui/material/styles';
import styles from './Layout.module.css';


const theme = createTheme({
  typography: {
    fontSize: 14,
  },
})

function Layout({ children }) {
  return (
    <>
      <nav className={styles.navbar}>
        <li className={styles.logo}>КТМ</li>
      </nav>


      <ThemeProvider theme={theme}>
        {children}
      </ThemeProvider>
    </>
  )
}

export default Layout;
