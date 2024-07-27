import React, { useState, useEffect } from "react";
import { auth, firestore } from "../firebase";
import meuestilo from "../meuestilo";
import { Raca } from "../model/Raca";
import { Text, FlatList, View, ActivityIndicator, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const ListarRacas = () => {
  const [loading, setLoading] = useState(true);
  const [racas, setRacas] = useState<Raca[]>([]);
  const racaRef = firestore.collection("Usuario").doc(auth.currentUser?.uid).collection("Raca");

  useEffect(() => {
    if (loading) {
      const subscriber = racaRef.onSnapshot((querySnapshot) => {
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
    }
  }, [racas]);

  if (loading) {
    return <ActivityIndicator />;
  }

  const Item = ({ item }) => (
    <View style={meuestilo.item}>
      <View style={meuestilo.alinhamentoLinha}>
        <View style={meuestilo.alinhamentoColuna}>
          <Text style={meuestilo.title}>Raça: {item.raca}</Text>
        </View>
      </View>
    </View>
  );

  const renderItem = ({ item }) => <Item item={item} />;

  return (
    <SafeAreaView style={meuestilo.containerlistar}>
      <FlatList data={racas} renderItem={renderItem} keyExtractor={(item) => item.id} />
    </SafeAreaView>
  );
};

export default ListarRacas;
