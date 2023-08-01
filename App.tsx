import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Navigation } from './src/navigation';
import { ThemeProvider } from './src/context/ThemeContext';
import './src/i18n/i18n';

function App(): JSX.Element {
    return (
        <SafeAreaProvider>
            <ThemeProvider>
                <Navigation />
            </ThemeProvider>
        </SafeAreaProvider>
    );
}

export default App;
