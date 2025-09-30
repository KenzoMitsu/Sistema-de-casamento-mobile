import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Importe as telas
import VisitanteScreen from './screens/Visitante'; // Nova tela
import Login from './screens/Login';
import Cadastro from './screens/Cadastro';
import Home from './screens/Home';

const Stack = createNativeStackNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator
                // A tela inicial agora é a de Visitante
                initialRouteName="Visitante"
                screenOptions={{ headerShown: false }}
            >
                {/* Ordem das telas */}
                <Stack.Screen name="Visitante" component={VisitanteScreen} />
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="Cadastro" component={Cadastro} />
                <Stack.Screen name="Home" component={Home} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}