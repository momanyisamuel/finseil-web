import { BrowserRouter as Router } from 'react-router-dom';
import { Toaster } from 'sonner';
import { ThemeProvider } from './components/layout/ThemeProvider';
import { AppRoutes } from './routes';

const App = () => {
  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <Router>
        <AppRoutes />
      </Router>
      <Toaster position="bottom-center" richColors />
    </ThemeProvider>
  );
};

export default App;
