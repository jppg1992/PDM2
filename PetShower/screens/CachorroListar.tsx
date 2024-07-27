import React, { useState, useEffect } from "react";
import { auth, firestore } from "../firebase";
import meuestilo from "../meuestilo";
import { Cachorro } from "../model/Cachorro";
import { Text, FlatList, View, ActivityIndicator, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const ListarCachorros = () => {
  const [loading, setLoading] = useState(true);
  const [cachorros, setCachorros] = useState<Cachorro[]>([]);
  const cachorroRef = firestore.collection("Usuario").doc(auth.currentUser?.uid).collection("Cachorro");

  useEffect(() => {
    if (loading) {
      const subscriber = cachorroRef.onSnapshot((querySnapshot) => {
        const cachorros = [];
        querySnapshot.forEach((documentSnapshot) => {
          cachorros.push({
            ...documentSnapshot.data(),
            key: documentSnapshot.id,
          });
        });
        setCachorros(cachorros);
        setLoading(false);
      });
      return () => subscriber();
    }
  }, [cachorros]);

  if (loading) {
    return <ActivityIndicator />;
  }

  const Item = ({ item }) => (
    <View style={meuestilo.item}>
      <View style={meuestilo.alinhamentoLinha}>
        <Image style={{ height: 80, width: 80, borderRadius: 100, marginRight: 10 }} source={{ uri: item.urlfoto }} />

        <View style={meuestilo.alinhamentoColuna}>
          <Text style={meuestilo.title}>Nome: {item.nome}</Text>
          <Text style={meuestilo.title}>Raça: {item.raca.raca}</Text>
          <Text style={meuestilo.title}>Sexo: {item.sexo}</Text>
          <Text style={meuestilo.title}>Data Nasc: {item.datanasc}</Text>
        </View>
      </View>
    </View>
  );

  const renderItem = ({ item }) => <Item item={item} />;

  return (
    <SafeAreaView style={meuestilo.containerlistar}>
      <FlatList data={cachorros} renderItem={renderItem} keyExtractor={(item) => item.id} />
    </SafeAreaView>
  );
};

export default ListarCachorros;
