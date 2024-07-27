import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { Text, Pressable, Modal, TextInput, TouchableOpacity, View, KeyboardAvoidingView, Image, Alert } from "react-native";
import { auth, firestore, storage } from "../firebase";
import meuestilo from "../meuestilo";
import { Cachorro } from "../model/Cachorro";
import * as ImagePicker from "expo-image-picker";
import { uploadBytes } from "firebase/storage";
import { FlatList } from "react-native-gesture-handler";

import { Agenda } from "../model/Agenda";
import { EscolheCachorro } from "./EscolheCachorro";
import { Servico } from "../model/Servico";
import { EscolheServico } from "./EscolheServico";

const ManterAgenda = (props) => {
  const [formAgenda, setFormAgenda] = useState<Partial<Agenda>>({});
  const navigation = useNavigation();
  const [agendas, setAgendas] = useState<Agenda[]>([]);
  const [loading, setLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(true);

  const [formServico, setFormServico] = useState<Partial<Servico>>({});
  const [formCachorro, setFormCachorro] = useState<Partial<Cachorro>>({});
  const [modalCachorroVisible, setModalCachorroVisible] = useState(false);
  const [modalServicoVisible, setModalServicoVisible] = useState(false);

  const servicoRef = firestore.collection("Usuario").doc(auth.currentUser?.uid).collection("Servico");

  const cachorroRef = firestore.collection("Usuario").doc(auth.currentUser?.uid).collection("Cachorro");

  const agendaRef = firestore.collection("Usuario").doc(auth.currentUser?.uid).collection("Agenda");

  const limparFormulario = () => {
    setFormAgenda({});
  };

  const cancelar = () => {
    setFormAgenda({});
  };

  const setCachorro = async (item) => {
    const doc = await cachorroRef.doc(item.id).get();
    const cachorro = new Cachorro(doc.data());
    setFormCachorro(cachorro);
    setFormAgenda({ ...formAgenda, cachorro: cachorro.toFirestore() });
  };

  const setServico = async (item) => {
    const doc = await servicoRef.doc(item.id).get();
    const servico = new Servico(doc.data());
    setFormServico(servico);
    setFormAgenda({ ...formAgenda, servico: servico.toFirestore() });
  };

  const salvar = async () => {
    const agenda = new Agenda(formAgenda);
    console.log("🚀 ~ sal ~ agenda:", agenda);

    console.log(agenda.id);

    if (agenda.id === undefined) {
      const agendaRefComId = agendaRef.doc();
      agenda.id = agendaRefComId.id;

      agendaRefComId.set(agenda.toFirestore()).then(() => {
        alert("Agenda para o cachorro" + agenda.cachorro + " adicionado!");
        limparFormulario();
      });
    } else {
      const agendaRefComId = agendaRef.doc(agenda.id);
      agendaRefComId.update(agenda.toFirestore()).then(() => {
        alert("Agenda para o cachorro " + agenda.cachorro?.nome + " atualizado!");
        limparFormulario();
      });
    }
  };

  useEffect(() => {
    if (loading) {
      const subscriber = agendaRef.onSnapshot((querySnapshot) => {
        const agendasTemp = [];

        querySnapshot.forEach((documentSnapshot) => {
          agendasTemp.push({
            ...documentSnapshot.data(),
            key: documentSnapshot.id,
          });
        });

        setAgendas(agendasTemp);
        setLoading(false);
        setIsRefreshing(false);
      });
      return () => subscriber();
    }
  }, [agendas]);

  const editAgenda = async (agenda: Agenda) => {
    const result = firestore
      .collection("Usuario")
      .doc(auth.currentUser?.uid)
      .collection("Agenda")
      .doc(agenda.id)
      .onSnapshot((documentSnapshot) => {
        const agenda = new Agenda(documentSnapshot.data());
        setFormAgenda(agenda);

        console.log(agenda);
      });
    return () => result();
  };

  const deleteAgenda = async (agenda: Agenda) => {
    Alert.alert(`Apagar agenda do cachorro "${agenda.cachorro?.nome}?" `, "Essa ação não pode ser desfeita!", [
      {
        text: "Cancelar",
      },
      {
        text: "Excluir",
        onPress: async () => {
          const res = await agendaRef
            .doc(agenda.id)
            .delete()
            .then(() => {
              alert("Agenda para o cachorro " + agenda.cachorro?.nome + " excluído!");
              limparFormulario();
              setIsRefreshing(true);
            });
        },
      },
    ]);
  };

  const renderAgendas = ({ item }: { item: Agenda }) => {
    console.log("🚀 ~ renderAgendas ~ item:", item);

    return (
      <View style={meuestilo.item} key={item.id}>
        <Pressable onLongPress={() => deleteAgenda(item)} onPress={() => editAgenda(item)}>
          <View style={meuestilo.alinhamentoLinha}>
            <Image
              style={{ height: 80, width: 80, borderRadius: 100, marginRight: 10 }}
              source={{ uri: item.cachorro?.urlfoto ?? "-" }}
            />
            <View style={meuestilo.alinhamentoColuna}>
              <Text style={meuestilo.title}>Data: {item.data}</Text>
              <Text style={meuestilo.title}>Cachorro: {item.cachorro?.nome ?? "Não encontrado"}</Text>
              <Text style={meuestilo.title}>Servico: {item.servico?.descricao ?? "Não Encontrado"}</Text>
              <Text style={meuestilo.title}>Valor: {item.servico?.valor ?? "Não encontrado"}</Text>
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
          placeholder="Data"
          style={meuestilo.input}
          value={formAgenda.data}
          onChangeText={(data) =>
            setFormAgenda({
              ...formAgenda,
              data: data,
            })
          }
        />
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalCachorroVisible}
          onRequestClose={() => {
            Alert.alert("Fechar modal");
            setModalCachorroVisible(!modalCachorroVisible);
          }}
        >
          <View style={meuestilo.centeredView}>
            <View style={meuestilo.modalView}>
              <EscolheCachorro setModalCachorroVisible={setModalCachorroVisible} setCachorro={setCachorro} />
            </View>
          </View>
        </Modal>
        <Pressable style={[meuestilo.buttonModal, meuestilo.buttonOpen]} onPress={() => setModalCachorroVisible(true)}>
          <Text style={meuestilo.textStyle}>Cachorro: {formAgenda.cachorro?.nome ?? "-"}</Text>
        </Pressable>

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalServicoVisible}
          onRequestClose={() => {
            Alert.alert("Fechar modal");
            setModalServicoVisible(!modalServicoVisible);
          }}
        >
          <View style={meuestilo.centeredView}>
            <View style={meuestilo.modalView}>
              <EscolheServico setModalServicoVisible={setModalServicoVisible} setServico={setServico} />
            </View>
          </View>
        </Modal>
        <Pressable style={[meuestilo.buttonModal, meuestilo.buttonOpen]} onPress={() => setModalServicoVisible(true)}>
          <Text style={meuestilo.textStyle}>Serviço: {formAgenda.servico?.descricao ?? "-"}</Text>
        </Pressable>
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
        data={agendas}
        renderItem={renderAgendas}
        keyExtractor={(item) => item.id.toString()}
        refreshing={isRefreshing}
      />
    </KeyboardAvoidingView>
  );
};

export default ManterAgenda;
