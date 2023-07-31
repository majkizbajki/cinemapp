import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Navigation } from './src/navigation';

function App(): JSX.Element {
    return (
        <SafeAreaProvider>
            <Navigation />
        </SafeAreaProvider>
    );
}

export default App;
