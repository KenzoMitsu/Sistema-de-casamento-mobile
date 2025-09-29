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
    Dimensions,
} from 'react-native';

const SearchIcon = () => <Text style={styles.icon}>🔍</Text>;
const FilterIcon = () => <Text style={styles.icon}>📊</Text>;

// Componente da tela
export default function VisitanteScreen({ navigation }) {
    const irParaLogin = () => {
        navigation.navigate('Login');
    };

    // --- CORREÇÃO 1: O Header agora é um componente separado para clareza ---
    const Header = () => (
        <View style={styles.header}>
            <View style={styles.headerContainer}>
                <Image source={require('../assets/imagens/logo-branca.png')} style={styles.logoImg} />
                <TouchableOpacity style={styles.loginButton} onPress={irParaLogin}>
                    <Text style={styles.loginButtonText}>Login</Text>
                </TouchableOpacity>
            </View>
        </View>
    );

    return (
        // --- CORREÇÃO 2: Estrutura principal com um View raiz ---
        <View style={styles.container}>
            <Header />
            <ScrollView>
                {/* A ScrollView agora contém todo o conteúdo que rola */}
                <ImageBackground
                    source={require('../assets/imagens/background.png')}
                    style={styles.heroSection}
                    resizeMode="cover"
                >
                    {/* O Header foi removido daqui */}
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
            </ScrollView>
        </View>
    );
}

// O resto do seu código (FeatureItem e StyleSheet) permanece o mesmo,
// mas adicionei/ajustei alguns estilos.

const FeatureItem = ({ icon, title, description }) => (
    <View style={styles.featureItem}>
        <View style={styles.featureIconContainer}>
            <Image source={icon} style={styles.featureIcon} />
        </View>
        <Text style={styles.featureTitle}>{title}</Text>
        <Text style={styles.featureDescription}>{description}</Text>
    </View>
);

const { width, height } = Dimensions.get('window');

// --- CORREÇÃO 3: Ajustes nos Estilos ---
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F3F2EE',
    },
    // --- CABEÇALHO (HEADER) ---
    header: {
        // Agora o header fica posicionado corretamente no topo da tela
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        backgroundColor: 'rgba(255, 183, 201, 0.75)',
        zIndex: 1000,
        paddingTop: 40, // Espaço seguro para a status bar do celular
    },
    headerContainer: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    logoImg: {
        height: 50,
        width: 140,
        resizeMode: 'contain',
    },
    loginButton: {
        backgroundColor: '#FF87A5',
        paddingVertical: 10,
        paddingHorizontal: 25,
        borderRadius: 25,
    },
    loginButtonText: {
        color: '#ffffff',
        fontWeight: '700',
    },
    // --- SEÇÃO HERO ---
    heroSection: {
        height: height, // Usar height em vez de minHeight para preencher a tela
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: '6%',
        paddingTop: 80, // Adicionado para não ficar atrás do header
    },
    heroContent: {
        alignItems: 'flex-start',
        width: '100%',
    },
    heroSubtitle: {
        fontSize: 24,
        fontWeight: '500',
        color: 'white',
        letterSpacing: 1,
        marginBottom: 20,
        fontFamily: 'Old Standard TT',
    },
    heroTitle: {
        fontFamily: 'Great Vibes',
        fontSize: 80,
        fontWeight: '400',
        lineHeight: 80,
        color: 'white',
        marginTop: -10,
    },
    heroButton: {
        backgroundColor: 'rgba(255, 183, 201, 0.75)',
        paddingVertical: 12,
        paddingHorizontal: 30,
        marginTop: 20,
        borderRadius: 4,
    },
    heroButtonText: {
        color: 'white',
        fontWeight: '500',
        fontSize: 20,
        fontFamily: 'Old Standard TT',
    },

    // --- BARRA DE PESQUISA ---
    searchBarContainer: {
        position: 'absolute',
        bottom: 50,
        width: '100%',
        paddingHorizontal: 20,
    },
    searchBar: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#ffffff',
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 8,
        width: '100%',
        alignSelf: 'center',
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 15,
    },
    searchInput: {
        flex: 1,
        fontSize: 16,
        color: '#555',
        marginHorizontal: 15,
        paddingVertical: 0,
    },
    icon: {
        fontSize: 24,
        color: '#777',
    },

    // --- SEÇÃO FEATURES ---
    featuresSection: {
        paddingVertical: 80,
        paddingHorizontal: '8%',
        backgroundColor: '#EEECE1',
        alignItems: 'center',
    },
    logoBege: {
        width: '100%',
        maxWidth: 450,
        height: 100,
        resizeMode: 'contain',
        marginBottom: 10,
    },
    featuresGrid: {
        width: '100%',
        alignItems: 'center',
        marginTop: 40,
        gap: 40,
    },
    featureItem: {
        alignItems: 'center',
        maxWidth: 230,
    },
    featureIconContainer: {
        width: 100,
        height: 100,
        alignItems: 'center',
        justifyContent: 'center',
    },
    featureIcon: {
        width: 130,
        height: 130,
        resizeMode: 'contain',
    },
    featureTitle: {
        fontSize: 22,
        fontWeight: '700',
        color: '#BB9245',
        marginVertical: 15,
        letterSpacing: 1,
        fontFamily: 'Old Standard TT',
    },
    featureDescription: {
        fontSize: 18,
        color: '#BB9245',
        lineHeight: 27,
        textAlign: 'center',
        fontFamily: 'Old Standard TT',
    },
});