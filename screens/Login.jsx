import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Image,
    StyleSheet,
    Alert,
    ImageBackground
} from 'react-native';
import config from '../config';
import AsyncStorage from '@react-native-async-storage/async-storage';

const BACKGROUND_IMAGE = require('../assets/imagens/background2.png');
const LOGO_IMAGE = require('../assets/imagens/logoicon.png');
const EYE_OPEN = { uri: "https://cdn-icons-png.flaticon.com/512/2767/2767149.png" };
const EYE_CLOSED = { uri: "https://cdn-icons-png.flaticon.com/512/2767/2767146.png" };

export default function LoginScreen({ navigation }) {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [mostrarSenha, setMostrarSenha] = useState(false);


    const handleLogin = async () => {
        if (!email || !senha) {
            Alert.alert('Erro!', 'Por favor, preencha todos os campos!');
            return;
        }
        try {
            const resposta = await fetch(`${config.IP_LOCAL}/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, senha })
            });
            const dados = await resposta.json();

            // Checagem de erro da API
            if (resposta.status !== 200 || !dados.token) {
                Alert.alert('Erro!', dados.error || 'Não foi possível fazer login.');
                return;
            }

            // Grava o token (e dados de usuário se quiser)
            await AsyncStorage.setItem('token', dados.token);
            await AsyncStorage.setItem('usuario', JSON.stringify(dados.usuario));

            Alert.alert('Login bem-sucedido!');

            // Redirecione para sua tela Home principal (mude para sua rota adequada)
            navigation.reset({ // Garante que o usuário não volte para login com "voltar"
                index: 0,
                routes: [{ name: 'Home' }],
            });

        } catch (erro) {
            Alert.alert('Erro!', erro.message || 'Erro ao tentar fazer login.');
        }
    };


    return (
        <ImageBackground
            source={BACKGROUND_IMAGE}
            style={styles.background}
            resizeMode="cover"
        >
            <View style={styles.formulario}>
                <Text style={styles.titulo}>Login</Text>
                <Image source={LOGO_IMAGE} style={styles.logoCanto} />
                <TextInput
                    placeholder="E-mail"
                    value={email}
                    onChangeText={setEmail}
                    style={styles.input}
                    autoCapitalize="none"
                    keyboardType="email-address"
                />
                <View style={styles.senhaContainer}>
                    <TextInput
                        placeholder="Senha"
                        value={senha}
                        onChangeText={setSenha}
                        style={styles.inputSenha}
                        secureTextEntry={!mostrarSenha}
                    />
                    <TouchableOpacity
                        onPress={() => setMostrarSenha(!mostrarSenha)}
                        style={styles.iconeSenha}
                        hitSlop={12}
                    >
                        <Image
                            source={mostrarSenha ? EYE_OPEN : EYE_CLOSED}
                            style={{ width: 24, height: 24 }}
                        />
                    </TouchableOpacity>
                </View>

                <TouchableOpacity style={styles.botaoLogin} onPress={handleLogin}>
                    <Text style={styles.textoBotaoLogin}>Entrar</Text>
                </TouchableOpacity>
                <Text style={styles.cadastro}>
                    Não possui uma conta?{' '}
                    <Text
                        style={{ color: '#007BFF', textDecorationLine: 'underline' }}
                        onPress={() => navigation.navigate('Cadastro')}
                    >
                        Cadastre-se
                    </Text>
                </Text>
            </View>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        justifyContent: 'center'
    },
    formulario: {
        width: 400,
        alignSelf: 'center',
        backgroundColor: 'white',
        borderRadius: 10,
        alignItems: 'center',
        paddingVertical: 32,
        paddingHorizontal: 24,
        gap: 20,
        elevation: 6, // sombra (Android)
        shadowColor: '#000', // sombra (iOS)
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.25,
        shadowRadius: 10,
    },

    titulo: {
        fontFamily: 'serif',
        fontWeight: '400',
        fontSize: 28,
        color: 'black',
        paddingTop: 20,
    },
    logoCanto: {
        width: 115,
        height: 60,
        resizeMode: 'contain',
        alignSelf: 'flex-end',
        position: 'absolute',
        top: 20,
        right: 20,
    },
    input: {
        width: '88%',
        height: 48,      // antes 40
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 3,
        paddingLeft: 10,
        fontFamily: 'serif',
        fontSize: 18,    // antes 16
        backgroundColor: '#F4F2EE',
        marginBottom: 5,
    },

    senhaContainer: {
        width: '88%',
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 3,
        backgroundColor: '#F4F2EE',
    },
    inputSenha: {
        flex: 1,
        paddingLeft: 10,
        fontFamily: 'serif',
        fontSize: 18,
        backgroundColor: '#F4F2EE',
        borderWidth: 0,  // sem borda aqui!
    },

    iconeSenha: {
        marginRight: 10,
    },
    botaoLogin: {
        width: '88%',
        height: 50,
        borderRadius: 10,
        backgroundColor: '#FFC9D6',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 12,
        elevation: 2,
        shadowColor: '#000',
        shadowOpacity: 0.20,
        shadowRadius: 3,
        shadowOffset: { width: 0, height: 2 },
    },
    textoBotaoLogin: {
        color: 'white',
        fontFamily: 'serif',
        fontSize: 20,
    },
    cadastro: {
        fontWeight: '500',
        marginTop: 10,
        fontFamily: 'serif',
        fontSize: 16,
    },
});