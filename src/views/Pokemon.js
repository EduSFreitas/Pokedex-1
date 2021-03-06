import React,{Fragment} from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    ScrollView
} from 'react-native';

import PokemonUtil from '../utils/PokemonUtil';
import Card from '../components/card/Card';
import EvolutionChain from '../components/evolution-chain/EvolutionChain';

class Pokemon extends React.Component {

    constructor(props) {
        super(props);
        
        this.state = {
            specie:{},
            evolution_chain: []
        }
    }

    componentDidMount(){
        this.getPokemonSpecies();
    }

    getListTypes = () => {
        if(this.props.pokemon.types !== undefined){
            return this.props.pokemon.types.map(typeAux => {
                return (
                    <Text key={`${this.props.pokemon.name}-${typeAux.type.name}`} style={styles.type} >
                        {PokemonUtil.upperCaseFirstLetter(typeAux.type.name)}
                    </Text>);
            });
        }
    }

    getPokemonSpecies = () => {
        fetch(this.props.pokemon.species.url)
        .then(res => res.json())
        .then(res => {
            this.setState({specie:res});
        });
    }

    getEvlotuinChain = () => {
        if(this.state.specie.evolution_chain !== undefined){
            return (
                <Fragment>
                    <Text style={styles.title} >Evolution Chain</Text>
                    <EvolutionChain urlEvolutionChain={this.state.specie.evolution_chain.url} />
                </Fragment>
            );
        }
    }


    render() {

        const { pokemon } = this.props;
        const { specie } = this.state;

        return (
            <ScrollView contentContainerStyle={styles.container} >
                <View style={{ ...styles.header, backgroundColor: PokemonUtil.getColor(pokemon.types) }} >
                    <View style={styles.info} >
                        <Text style={styles.name} >{PokemonUtil.upperCaseFirstLetter(pokemon.name)}</Text>
                        <View style={styles.types} >
                            {this.getListTypes()}
                        </View>
                        <View style={styles.teste} >
                            <Image style={styles.image} source={PokemonUtil.getImagePokemon(pokemon)} />
                        </View>
                    </View>
                </View>
                <View style={styles.body} >
                    <Fragment>
                        <Text style={styles.title} >About</Text>
                        <Text style={styles.description} >{PokemonUtil.getDescriptionPokemon(specie.flavor_text_entries)}</Text>

                        <Card>
                            <View style={styles.viewHeightWeight} >
                                <View style={styles.dataHeightWeight} >
                                    <Text style={styles.titleHeightWeight} >Height</Text>
                                    <Text>{PokemonUtil.getHeightPokemon(pokemon.height)}</Text>
                                </View>
                                <View style={styles.dataHeightWeight} >
                                    <Text style={styles.titleHeightWeight} >Weight</Text>
                                    <Text>{PokemonUtil.getWeightPokemon(pokemon.weight)}</Text>
                                </View>
                            </View>
                        </Card>
                    </Fragment>
                    {this.getEvlotuinChain()}
                </View>
            </ScrollView>
        );
    };

}

const styles = StyleSheet.create({
    header: {
        height: 250,
    },
    body: {
        marginLeft:15,
        marginRight:15
    },
    title:{
        fontSize: 20,
        color: "#303943",
        lineHeight: 42,
        fontFamily: "Circular Std",
        fontWeight: "bold",
    },
    container: {
        // height: "100%"
    },
    name: {
        fontSize: 30,
        color: "#303943",
        lineHeight: 42,
        fontFamily: "Circular Std",
        fontWeight: "bold",
        color: 'white'
    },
    info: {
        marginLeft: 15,
        height: "100%"
    },
    image: {
        height: 200,
        width: 200
    },
    types: {
        flexDirection: "row",
        marginTop: 5
    },
    type: {
        backgroundColor: "rgba(255,255,255,0.2)",
        fontSize: 11,
        color: "white",
        padding: 3,
        borderRadius: 15,
        marginRight: 5,
        textAlign: "center",
        width: 50
    },
    teste: {
        flex: 1,
        justifyContent: "flex-end",
        alignItems: "center"
    },
    description:{
        marginRight:15
    },
    card:{
        flexDirection:'row',
    },
    viewHeightWeight:{
        flexDirection:"row"
    },
    dataHeightWeight:{
        flex: 1,
        alignItems: "center",
        marginBottom:12,
        marginTop: 12,
        fontSize: 14,
    },
    titleHeightWeight: {
        color: "#acb0b4",
        marginBottom: 5
    }
});

export default Pokemon;