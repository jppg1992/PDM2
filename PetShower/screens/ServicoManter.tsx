import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { Text, Pressable, Modal, TextInput, TouchableOpacity, View, KeyboardAvoidingView, Image, Alert } from "react-native";
import { auth, firestore, storage } from "../firebase";
import meuestilo from "../meuestilo";
import { FlatList } from "react-native-gesture-handler";
import { Servico } from "../model/Servico";

const ManterServico = (props) => {
  const [formServico, setFormServico] = useState<Partial<Servico>>({});
  const navigation = useNavigation();
  const [servicos, setServicos] = useState<Servico[]>([]);
  const [loading, setLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(true);

  const servicoRef = firestore.collection("Usuario").doc(auth.currentUser?.uid).collection("Servico");

  const limparFormulario = () => {
    setFormServico({});
  };

  const cancelar = () => {
    setFormServico({});
  };

  const salvar = async () => {
    const servico = new Servico(formServico);

    console.log(servico.id);

    if (servico.id === undefined) {
      // PARAMOS AQUI
      const servicoRefComId = servicoRef.doc();
      servico.id = servicoRefComId.id;

      servicoRefComId.set(servico.toFirestore()).then(() => {
        alert("Serviço " + servico.descricao + " adicionado!");
        limparFormulario();
      });
    } else {
      const servicoRefComId = servicoRef.doc(servico.id);
      servicoRefComId.update(servico.toFirestore()).then(() => {
        alert("Serviço " + servico.descricao + " atualizado!");
        limparFormulario();
      });
    }
  };

  useEffect(() => {
    if (loading) {
      const subscriber = servicoRef.onSnapshot((querySnapshot) => {
        const servicos = [];
        querySnapshot.forEach((documentSnapshot) => {
          servicos.push({
            ...documentSnapshot.data(),
            key: documentSnapshot.id,
          });
        });
        setServicos(servicos);
        setLoading(false);
        setIsRefreshing(false);
      });
      return () => subscriber();
    }
  }, [servicos]);

  const editServico = async (servico: Servico) => {
    const result = firestore
      .collection("Usuario")
      .doc(auth.currentUser?.uid)
      .collection("Servico")
      .doc(servico.id)
      .onSnapshot((documentSnapshot) => {
        const servico = new Servico(documentSnapshot.data());
        setFormServico(servico);
        console.log(servico);
      });
    return () => result();
  };

  const deleteServico = async (servico: Servico) => {
    Alert.alert(`Apagar Serviço "${servico.descricao}?" `, "Essa ação não pode ser desfeita!", [
      {
        text: "Cancelar",
      },
      {
        text: "Excluir",
        onPress: async () => {
          const res = await servicoRef
            .doc(servico.id)
            .delete()
            .then(() => {
              alert("Servico " + servico.descricao + " excluído!");
              limparFormulario();
              setIsRefreshing(true);
            });
        },
      },
    ]);
  };

  const renderServicos = ({ item }: { item: Servico }) => {
    return (
      <View style={meuestilo.item} key={item.id}>
        <Pressable onLongPress={() => deleteServico(item)} onPress={() => editServico(item)}>
          <View style={meuestilo.alinhamentoLinha}>
            <View style={meuestilo.alinhamentoColuna}>
              <Text style={meuestilo.title}>Servico: {item.descricao}</Text>
              <Text style={meuestilo.title}>Valor: {item.valor}</Text>
            </View>
          </View>
        </Pressable>
      </View>
    );
  };

  return (
    <KeyboardAvoidingView style={meuestilo.container}>
      <View style={meuestilo.inputContainer}>
        <TextInput
          placeholder="Servico"
          style={meuestilo.input}
          value={formServico.descricao}
          onChangeText={(servico) =>
            setFormServico({
              ...formServico,
              descricao: servico,
            })
          }
        />
        <TextInput
          placeholder="Valor"
          keyboardType="numeric"
          style={meuestilo.input}
          value={formServico.valor}
          onChangeText={(valor) =>
            setFormServico({
              ...formServico,
              valor: valor.toString(),
            })
          }
        />
      </View>

      <View style={meuestilo.buttonContainer}>
        <TouchableOpacity onPress={cancelar} style={meuestilo.button}>
          <Text style={meuestilo.buttonText}>Cancelar</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={salvar} style={[meuestilo.button, meuestilo.buttonOutline]}>
          <Text style={meuestilo.buttonOutlineText}>Salvar</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={servicos}
        renderItem={renderServicos}
        keyExtractor={(item) => item.id.toString()}
        refreshing={isRefreshing}
      />
    </KeyboardAvoidingView>
  );
};

export default ManterServico;
