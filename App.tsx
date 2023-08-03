import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Navigation } from './src/navigation';
import { ThemeProvider } from './src/context/ThemeContext';
import { Provider } from 'react-redux';
import './src/i18n/i18n';
import { store } from './src/app/store';

function App(): JSX.Element {
    return (
        <SafeAreaProvider>
            <Provider store={store}>
                <ThemeProvider>
                    <Navigation />
                </ThemeProvider>
            </Provider>
        </SafeAreaProvider>
    );
}

export default App;
