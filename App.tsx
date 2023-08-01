import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Navigation } from './src/navigation';
import { ThemeProvider } from './src/context/ThemeContext';

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
