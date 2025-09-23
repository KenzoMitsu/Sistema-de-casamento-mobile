import React, { useState } from 'react';
import {
    View, Text, TextInput, TouchableOpacity, Image, StyleSheet, Alert, ScrollView, ImageBackground
} from 'react-native';
import config from '../config';

const tiposUsuarios = [
    { label: 'Noivo(a)', value: '1' },
    { label: 'Fornecedor(a)', value: '2' },
    { label: 'Cerimonialista', value: '3' }
];

export default function Cadastro({ navigation }) {
    const [tipo, setTipo] = useState('1');
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [mostrarSenha, setMostrarSenha] = useState(false);
    const [nomeMarca, setNomeMarca] = useState('');
    const [telefone, setTelefone] = useState('');
    const [dataNascimento, setDataNascimento] = useState('');
    const [cep, setCep] = useState('');
    const [categoria, setCategoria] = useState('');

    const validarEmail = (email) => /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i.test(email);
    const validarTelefone = (tel) => /^[0-9]{10,11}$/.test(tel);
    const validarSenha = (senha) => /^(?=.*[A-Z])(?=.*[!@#$%^&*()_+{}":;'?/>,.<]).{8,}$/.test(senha);

    const handleCadastrar = async () => {
        if (!nome || !email || !senha || !telefone || !dataNascimento || !cep) {
            return Alert.alert('Erro', 'Todos os campos são obrigatórios!');
        }
        if (!validarEmail(email)) {
            return Alert.alert('Erro', 'Digite um e-mail válido!');
        }
        if (!validarSenha(senha)) {
            return Alert.alert('Erro', 'A senha deve ter pelo menos 8 caracteres, incluindo uma letra maiúscula e um caractere especial!');
        }
        if (!validarTelefone(telefone)) {
            return Alert.alert('Erro', 'O telefone deve ter 10 ou 11 dígitos numéricos!');
        }
        if (tipo === '2' && !categoria) {
            return Alert.alert('Erro', 'Selecione uma categoria para fornecedor!');
        }

        const cargo = tipo;
        const parts = dataNascimento.split('-');
        const dataFormatada = parts.length === 3 ? `${parts[2]}-${parts[1]}-${parts[0]}` : dataNascimento;

        const dados = {
            nome,
            email,
            senha,
            telefone,
            data_nascimento: dataFormatada,
            cep,
            categoria: tipo === '2' ? categoria : null,
            nome_marca: nomeMarca,
            cargo
        };

        try {
            const resposta = await fetch(`${config.IP_LOCAL}/usuario`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(dados)
            });

            if (resposta.ok) {
                Alert.alert('Sucesso', 'Cadastro realizado com sucesso!', [
                    { text: 'Ok', onPress: () => navigation.navigate('Login') }
                ]);
            } else {
                const erro = await resposta.json();
                Alert.alert('Erro', erro.error || 'Erro no cadastro');
            }
        } catch {
            Alert.alert('Erro', 'Falha na comunicação com o servidor.');
        }
    };

    return (
        <ImageBackground
            source={require('../assets/imagens/background2.png')}
            style={styles.background}
            resizeMode="cover"
        >
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <View style={styles.formulario}>
                    <Text style={styles.titulo}>Cadastre-se</Text>
                    <Image source={require('../assets/imagens/logoicon.png')} style={styles.logoCanto} />

                    <View style={styles.tiposContainer}>
                        {tiposUsuarios.map(({ label, value }) => (
                            <TouchableOpacity
                                key={value}
                                style={[styles.tipoBotao, tipo === value && styles.tipoSelecionado]}
                                onPress={() => setTipo(value)}
                            >
                                <Text style={[styles.tipoTexto, tipo === value && styles.tipoTextoSelecionado]}>
                                    {label}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>

                    <TextInput placeholder="Seu nome" value={nome} onChangeText={setNome} style={styles.input} />
                    <TextInput placeholder="E-mail" keyboardType="email-address" value={email} onChangeText={setEmail} style={styles.input} />

                    <View style={styles.senhaContainer}>
                        <TextInput
                            placeholder="Senha"
                            secureTextEntry={!mostrarSenha}
                            value={senha}
                            onChangeText={setSenha}
                            style={styles.inputSenha}
                        />
                        <TouchableOpacity onPress={() => setMostrarSenha(!mostrarSenha)} style={styles.iconeSenha}>
                            <Image
                                source={{ uri: mostrarSenha ? 'https://cdn-icons-png.flaticon.com/512/2767/2767149.png' : 'https://cdn-icons-png.flaticon.com/512/2767/2767146.png' }}
                                style={{ width: 24, height: 24 }}
                            />
                        </TouchableOpacity>
                    </View>

                    {tipo === '1' && (
                        <TextInput placeholder="Nome da marca (Opcional)" value={nomeMarca} onChangeText={setNomeMarca} style={styles.input} />
                    )}

                    {(tipo === '2' || tipo === '3') && (
                        <>
                            <TextInput placeholder="Telefone" keyboardType="phone-pad" value={telefone} onChangeText={setTelefone} style={styles.input} />
                            <TextInput placeholder="Data de nascimento (aaaa-mm-dd)" value={dataNascimento} onChangeText={setDataNascimento} style={styles.input} />
                            <TextInput placeholder="CEP" value={cep} onChangeText={setCep} style={styles.input} />

                            {tipo === '2' && (
                                <TextInput placeholder="Categoria do fornecedor" value={categoria} onChangeText={setCategoria} style={styles.input} />
                            )}
                        </>
                    )}

                    <TouchableOpacity style={styles.botaoCadastrar} onPress={handleCadastrar}>
                        <Text style={styles.textoBotaoLogin}>Cadastrar</Text>
                    </TouchableOpacity>
                    <View style={{ flexDirection: 'row', marginTop: 10 }}>
                        <Text>Já possui uma conta? </Text>
                        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                            <Text style={styles.linkLogin}>Login</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
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
        elevation: 6,
        shadowColor: '#000',
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
    tiposContainer: {
        flexDirection: 'row',
        gap: 20,
        marginBottom: 20,
    },
    tipoBotao: {
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 20,
        backgroundColor: 'white',
    },
    tipoSelecionado: {
        backgroundColor: '#FFC9D6',
    },
    tipoTexto: {
        fontSize: 16,
        fontFamily: 'serif',
        color: 'black',
    },
    tipoTextoSelecionado: {
        fontWeight: 'bold',
    },
    input: {
        width: '88%',
        height: 48,
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 3,
        paddingLeft: 10,
        fontFamily: 'serif',
        fontSize: 18,
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
        borderWidth: 0,
    },
    iconeSenha: {
        marginRight: 10,
    },
    botaoCadastrar: {
        width: '88%',
        height: 50,
        borderRadius: 10,
        backgroundColor: '#FFC9D6',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 12,
    },
    textoBotaoLogin: {
        color: 'white',
        fontFamily: 'serif',
        fontSize: 20,
    },
    linkLogin: {
        marginTop: 10,
        color: '#007BFF',
        textDecorationLine: 'underline',
    },
});
