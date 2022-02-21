import { ReactChild } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import styles from './Layout.module.css';

interface LayoutProps {
  children: ReactChild;
}

const theme = createTheme({
  typography: {
    fontSize: 10,
  }
})

function Layout({ children }: LayoutProps): JSX.Element {
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
