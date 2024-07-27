import React, { useState, useEffect } from "react";
import { ActivityIndicator, SafeAreaView, View, StyleSheet, FlatList, Text, Pressable, } from "react-native";
import { auth, firestore } from "../firebase";
import meuestilo from "../meuestilo";
import { Raca } from "../model/Raca";


export const EscolheRaca = (props) => {
    const [loading, setLoading] = useState(true); // Set loading to true
    const [racas, setRacas] = useState<Raca[]>([]); // Initial empty array
    const [isRefreshing, setIsRefreshing] = useState(true)

//  const racaRef = firestore.collection('Raca');
    const racaRef = firestore.collection('Usuario').doc(auth.currentUser?.uid)
                        .collection('Raca');

    useEffect(() => {
        const subscriber = racaRef
            .onSnapshot((querySnapshot) => {
                const racas = [];
                querySnapshot.forEach((documentSnapshot) => {
                    racas.push({
                        ...documentSnapshot.data(),
                        key: documentSnapshot.id,
                    });
                });
                setRacas(racas);
                setLoading(false);
            });
        return () => subscriber();
    }, [racas]);


    if (loading) {
        return <ActivityIndicator />;
    }

    const closeModal = (bool, item) => {
        console.log(item)
        props.setModalRacaVisible(bool);
        props.setRaca(item);
    }

    const renderRaca = ({ item }: { item: Raca }) => {
        return <View style={styles.itemCard} key={item.id}>
            <Pressable
                style={({ pressed }) => [{ backgroundColor: pressed ? '#f1f1f1' : 'transparent' }, styles.listItem]}
                onLongPress={() => { closeModal(false, item) }}
                //onLongPress={() => deleteTipoUsuario(item)}
                //onPress={() => { editTipoUsuario(item) }}
                onPress={() => { closeModal(false, item) }}
            >
                {/* <Image source={{ uri: item.imageUri }} style={styles.itemImage} /> */}
                <View>
                    <Text>ID: {item.id}</Text>
                    <Text>Raça: {item.raca}</Text>
                </View>
            </Pressable>
        </View>
    }




    return (
        <SafeAreaView style={meuestilo.containerlistar}>
            <FlatList
                data={racas}
                renderItem={renderRaca}
                keyExtractor={(item) => item.id}
                refreshing={isRefreshing}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    listItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10
    },
    emptyList: {
        textAlign: 'center',
        marginTop: 10,
        marginBottom: 10,
        fontSize: 16
    },
    itemCard: {
        backgroundColor: '#fff',
        shadowColor: '#222222',
        shadowOffset: { height: 1, width: 1 },
    },
    itemImage: {
        width: 64,
        height: 64,
        marginLeft: 10,
        marginRight: 15,
        backgroundColor: '#eee'
    }
})


