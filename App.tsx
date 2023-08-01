import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Navigation } from './src/navigation';
import { PaperProvider, configureFonts } from 'react-native-paper';
import { fontConfig } from './src/themes';

function App(): JSX.Element {
    const theme = {
        fonts: configureFonts({ config: fontConfig })
    };

    return (
        <SafeAreaProvider>
            <PaperProvider theme={theme}>
                <Navigation />
            </PaperProvider>
        </SafeAreaProvider>
    );
}

export default App;
