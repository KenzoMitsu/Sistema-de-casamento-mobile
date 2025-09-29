import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    ScrollView,
    TextInput,
    ImageBackground,
} from 'react-native';

// Ícones podem ser SVGs ou imagens. Usei placeholders.
// Recomendo a biblioteca 'react-native-svg' para os ícones de busca.
const SearchIcon = () => <Text style={styles.icon}>🔍</Text>;
const FilterIcon = () => <Text style={styles.icon}>📊</Text>;

// Componente da tela
export default function VisitanteScreen({ navigation }) {

    // Função para navegar para a tela de Login
    const irParaLogin = () => {
        navigation.navigate('Login');
    };

    return (
        <ScrollView style={styles.container}>
            {/* Seção Hero */}
            <ImageBackground
                source={require('../assets/imagens/hero-background.jpg')} // Coloque sua imagem de fundo aqui
                style={styles.heroSection}
                resizeMode="cover"
            >
                <View style={styles.header}>
                    <Image source={require('../assets/imagens/logo-branca.png')} style={styles.logoImg} />
                    <View style={styles.navbar}>
                        <TouchableOpacity onPress={irParaLogin}>
                            <Text style={styles.loginButtonText}>Login</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.heroContent}>
                    <Text style={styles.heroSubtitle}>SEU SONHO</Text>
                    <Text style={styles.heroTitle}>Começa Aqui!</Text>
                    <TouchableOpacity style={styles.heroButton}>
                        <Text style={styles.heroButtonText}>CERIMONIALISTA</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.searchBarContainer}>
                    <View style={styles.searchBar}>
                        <SearchIcon />
                        <TextInput style={styles.searchInput} placeholder="Pesquisar" placeholderTextColor="#888" />
                        <FilterIcon />
                    </View>
                </View>
            </ImageBackground>

            {/* Seção Features */}
            <View style={styles.featuresSection}>
                <Image source={require('../assets/imagens/logo-bege.png')} style={styles.logoBege} />
                <View style={styles.featuresGrid}>
                    <FeatureItem
                        icon={require('../assets/imagens/caderneta.png')}
                        title="PLANEJAMENTO"
                        description="Planeje o seu casamento, organizando as tarefas e o que será necessário."
                    />
                    <FeatureItem
                        icon={require('../assets/imagens/aliancas.png')}
                        title="CERIMONIALISTA"
                        description="Contacte cerimonialistas disponíveis em sua região."
                    />
                    <FeatureItem
                        icon={require('../assets/imagens/tacas.png')}
                        title="COMEMORAÇÃO"
                        description="Celebre esse dia tão especial da melhor maneira possível."
                    />
                </View>
            </View>

            {/* Outras seções como Destaques e Jornada podem ser adicionadas aqui de forma similar */}

        </ScrollView>
    );
}

// Componente auxiliar para os itens de features
const FeatureItem = ({ icon, title, description }) => (
    <View style={styles.featureItem}>
        <View style={styles.featureIconContainer}>
            <Image source={icon} style={styles.featureIcon} />
        </View>
        <Text style={styles.featureTitle}>{title}</Text>
        <Text style={styles.featureDescription}>{description}</Text>
    </View>
);


// Estilos
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
    },
    heroSection: {
        // A altura pode ser ajustada
        paddingBottom: 20,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingTop: 40, // Espaço para a status bar
    },
    logoImg: {
        width: 120,
        height: 40,
        resizeMode: 'contain',
    },
    navbar: {
        // No mobile, geralmente não temos uma lista de links,
        // mas um botão de login direto ou um menu hambúrguer.
    },
    loginButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
        backgroundColor: '#FFC9D6',
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 20,
    },
    heroContent: {
        alignItems: 'center',
        marginTop: 60,
    },
    heroSubtitle: {
        color: 'white',
        fontSize: 18,
        fontFamily: 'Luxurious Script', // Verifique se a fonte está instalada no projeto
    },
    heroTitle: {
        color: 'white',
        fontSize: 48,
        fontWeight: 'bold',
        fontFamily: 'Great Vibes', // Verifique se a fonte está instalada no projeto
    },
    heroButton: {
        backgroundColor: '#FFC9D6',
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderRadius: 25,
        marginTop: 20,
    },
    heroButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    searchBarContainer: {
        paddingHorizontal: 20,
        marginTop: 40,
    },
    searchBar: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: 25,
        paddingHorizontal: 15,
        height: 50,
    },
    searchInput: {
        flex: 1,
        marginLeft: 10,
        fontSize: 16,
    },
    icon: {
        fontSize: 20,
    },
    featuresSection: {
        padding: 20,
        alignItems: 'center',
    },
    logoBege: {
        width: 150,
        height: 75,
        resizeMode: 'contain',
        marginBottom: 20,
    },
    featuresGrid: {
        width: '100%',
    },
    featureItem: {
        alignItems: 'center',
        marginBottom: 30,
    },
    featureIconContainer: {
        backgroundColor: '#F4F2EE',
        padding: 15,
        borderRadius: 50,
        marginBottom: 10,
    },
    featureIcon: {
        width: 40,
        height: 40,
        resizeMode: 'contain',
    },
    featureTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    featureDescription: {
        fontSize: 14,
        textAlign: 'center',
        color: '#666',
    },
});