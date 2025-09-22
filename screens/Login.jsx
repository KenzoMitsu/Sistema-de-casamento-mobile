import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    ImageBackground,
    Image,
    StyleSheet,
    Alert,
    Dimensions,
    ScrollView
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width, height } = Dimensions.get('window');

const LoginScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleLogin = async () => {
        // Validação básica
        if (!email.trim() || !senha.trim()) {
            Alert.alert('Erro!', 'Por favor, preencha todos os campos!');
            return;
        }

        const dados = {
            email: email.trim(),
            senha: senha.trim()
        };

        try {
            const response = await fetch('http://10.92.3.202:5000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(dados),
            });

            const retorno = await response.json();

            if (response.ok) {
                console.log('Resposta do servidor:', retorno);

                const usuario = retorno.usuario || retorno.user || retorno;

                if (!usuario || !retorno.token) {
                    Alert.alert('Erro!', 'Não foi possível recuperar os dados do usuário.');
                    return;
                }

                // Salvar dados no AsyncStorage
                await AsyncStorage.setItem('token', retorno.token || '');
                await AsyncStorage.setItem('nome', usuario.nome || '');
                await AsyncStorage.setItem('email', usuario.email || '');
                await AsyncStorage.setItem('telefone', usuario.telefone || '');
                await AsyncStorage.setItem('id_usuario', usuario.id_usuario?.toString() || '');
                await AsyncStorage.setItem('cargo', usuario.cargo || '');

                Alert.alert('Sucesso!', 'Login realizado com sucesso!', [
                    {
                        text: 'OK',
                        onPress: () => {
                            if (usuario.cargo === 'adm') {
                                navigation.navigate('HomeAdmin');
                            } else {
                                navigation.navigate('Home');
                            }
                        }
                    }
                ]);
            } else {
                Alert.alert('Erro!', retorno.error || 'Erro ao tentar fazer login.');
            }
        } catch (error) {
            console.error('Erro na requisição:', error);
            Alert.alert('Erro!', 'Erro de conexão. Verifique sua internet.');
        }
    };

    return (
        <ImageBackground
            source={{ uri: 'https://your-background-image-url.com/background2.png' }} // Substitua pela sua imagem
            style={styles.backgroundImage}
            resizeMode="cover"
        >
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <View style={styles.principal}>
                    <View style={styles.formulario}>
                        <Image
                            source={{ uri: 'https://your-logo-url.com/logo-preta.png' }} // Substitua pelo seu logo
                            style={styles.logoCanto}
                            resizeMode="contain"
                        />

                        <Text style={styles.titulo}>Login</Text>

                        <View style={styles.inputContainer}>
                            <TextInput
                                style={styles.input}
                                placeholder="E-mail"
                                placeholderTextColor="#666"
                                value={email}
                                onChangeText={setEmail}
                                keyboardType="email-address"
                                autoCapitalize="none"
                                autoCorrect={false}
                            />
                        </View>

                        <View style={styles.inputContainer}>
                            <TextInput
                                style={[styles.input, styles.inputWithIcon]}
                                placeholder="Senha"
                                placeholderTextColor="#666"
                                value={senha}
                                onChangeText={setSenha}
                                secureTextEntry={!showPassword}
                                autoCapitalize="none"
                                autoCorrect={false}
                            />
                            <TouchableOpacity
                                style={styles.eyeIcon}
                                onPress={() => setShowPassword(!showPassword)}
                            >
                                <Ionicons
                                    name={showPassword ? 'eye-off' : 'eye'}
                                    size={20}
                                    color="#666"
                                />
                            </TouchableOpacity>
                        </View>

                        <TouchableOpacity style={styles.botaoLogin} onPress={handleLogin}>
                            <Text style={styles.botaoLoginText}>Entrar</Text>
                        </TouchableOpacity>

                        <View style={styles.cadastroContainer}>
                            <Text style={styles.cadastroText}>Não possui uma conta? </Text>
                            <TouchableOpacity onPress={() => navigation.navigate('Cadastro')}>
                                <Text style={styles.cadastroLink}>Cadastre-se</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        width: '100%',
        height: '100%',
    },
    scrollContainer: {
        flexGrow: 1,
    },
    principal: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 40,
    },
    formulario: {
        width: width * 0.9,
        maxWidth: 400,
        backgroundColor: 'white',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.25,
        shadowRadius: 10,
        elevation: 5,
        paddingHorizontal: 30,
        paddingVertical: 40,
        alignItems: 'center',
        position: 'relative',
    },
    logoCanto: {
        width: 80,
        height: 60,
        position: 'absolute',
        top: 15,
        right: 15,
    },
    titulo: {
        fontFamily: 'serif',
        fontSize: 28,
        color: 'black',
        marginBottom: 30,
        marginTop: 20,
    },
    inputContainer: {
        width: '100%',
        marginBottom: 20,
        position: 'relative',
    },
    input: {
        width: '100%',
        height: 45,
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 3,
        paddingHorizontal: 15,
        fontSize: 14,
        fontFamily: 'serif',
        backgroundColor: 'white',
    },
    inputWithIcon: {
        paddingRight: 45,
    },
    eyeIcon: {
        position: 'absolute',
        right: 15,
        top: 12,
        padding: 5,
    },
    botaoLogin: {
        width: '100%',
        height: 50,
        backgroundColor: '#FFC9D6', // rosa-médio-escuro
        borderRadius: 10,
        borderWidth: 1,
        borderColor: 'black',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 20,
    },
    botaoLoginText: {
        color: 'white',
        fontSize: 20,
        fontFamily: 'serif',
        fontWeight: '400',
    },
    cadastroContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    cadastroText: {
        fontSize: 14,
        color: 'black',
        fontWeight: '500',
    },
    cadastroLink: {
        fontSize: 14,
        color: '#007BFF',
        fontWeight: '500',
        textDecorationLine: 'underline',
    },
});

export default LoginScreen;
