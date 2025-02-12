import { Alert, ScrollView, Text, View } from "react-native";
import { s } from "./index.style";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { Header } from "../../components/Header/header";
import { ToDo } from "../../components/cardToDo/CardToDo";
import { TabBottomMenu } from "../../components/TabBottomMenu/tabBottomMenu";
import { useEffect, useState } from "react";
import { ButtonAdd } from "../../components/buttonAdd/buttonAdd";
import Dialog from "react-native-dialog";
import uuid from "react-native-uuid";
import AsyncStorage from "@react-native-async-storage/async-storage";

// const TODO_List = [
//   { id: "1", title: "Miantsena Sakafo", isCompleted: true },
//   { id: "2", title: "Mahandro vary sy loaka", isCompleted: true },
//   { id: "3", title: "Mampirin-trano", isCompleted: true },
//   { id: "4", title: "Maka mpianatra", isCompleted: true },
// ];
let isFisrtRender = true;
let isLoadUpdate = false;
export default function HomeScreen() {
  const [isAddVisible, setIsAddVisible] = useState(false);
  const [newToDo, setNewToDo] = useState("");
  const [selectTabName, setSelectTabName] = useState("All");
  const [toDoList, setToDoList] = useState([]);
  // const [toDoList, setToDoList] = useState([
  //   { id: "1", title: "Miantsena Sakafo", isCompleted: true },
  //   { id: "2", title: "Mahandro vary sy loaka", isCompleted: true },
  //   { id: "3", title: "Mampirin-trano", isCompleted: true },
  //   { id: "4", title: "Maka mpianatra", isCompleted: true },
  //   { id: "5", title: "Mampisakafo zaza", isCompleted: true },
  //   { id: "6", title: "Manasa lovia", isCompleted: true },
  //   { id: "7", title: "Mampatory zaza", isCompleted: true },
  //   { id: "8", title: "Manasa lamba", isCompleted: true },
  // ]);
  useEffect(() => {
    loadToDo();
  }, []);

  useEffect(() => {
    if (isLoadUpdate) {
      isLoadUpdate = false;
    } else {
      if (!isFisrtRender) {
        saveToDo();
      } else {
        isFisrtRender = false;
      }
    }
  }, [toDoList]);
  async function saveToDo() {
    try {
      await AsyncStorage.setItem("@todo", JSON.stringify(toDoList));
    } catch (error) {
      alert("Erreur" + error);
    }
  }
  async function loadToDo() {
    try {
      const getTodoStr = await AsyncStorage.getItem("@todo");
      if (getTodoStr !== null) {
        const ArrayTodo = JSON.parse(getTodoStr);
        isLoadUpdate = true;
        setToDoList(ArrayTodo);
      }
    } catch (error) {
      alert("Erreur" + error);
    }
  }
  function UpdateTodo(todo) {
    const updatetodo = {
      ...todo,
      isCompleted: !todo.isCompleted,
    };
    const indexToDoUpDate = toDoList.findIndex(
      (todo) => todo.id === updatetodo.id
    );
    const upDateToDolist = [...toDoList];
    upDateToDolist[indexToDoUpDate] = updatetodo;
    setToDoList(upDateToDolist);
  }

  function getFiltersList() {
    switch (selectTabName) {
      case "All":
        return toDoList;
      case "InProgress":
        return toDoList.filter((todo) => todo.isCompleted);
      case "Done":
        return toDoList.filter((todo) => !todo.isCompleted);
    }
    return toDoList;
  }

  function deleteToDoItems(itemDel) {
    Alert.alert("Suppression", "Vous voullez supprimer cette tâche?", [
      {
        text: "Supprimer",
        style: "destructive",
        onPress: () => {
          setToDoList(toDoList.filter((todo) => todo.id !== itemDel.id));
        },
      },
      {
        text: "Annuler",
        style: "cancel",
      },
    ]);
  }

  function renderToDoList() {
    return getFiltersList().map((todo) => (
      <View key={todo.id} style={s.card}>
        <ToDo onLongPress={deleteToDoItems} onPress={UpdateTodo} todo={todo} />
      </View>
    ));
  }
  const showAddDialog = () => {
    setIsAddVisible(true);
  };

  const addNewToDo = () => {
    const newAddToDo = {
      id: uuid.v4(),
      title: newToDo,
      isCompleted: true,
    };

    setToDoList([...toDoList, newAddToDo]);
    setIsAddVisible(false);
  };

  return (
    <>
      <SafeAreaProvider>
        <SafeAreaView style={s.app}>
          <View style={s.header}>
            <Header />
          </View>
          <View style={s.body}>
            <ScrollView>{renderToDoList()}</ScrollView>
          </View>
          <ButtonAdd onPress={showAddDialog} />
        </SafeAreaView>
      </SafeAreaProvider>
      <View style={s.footer}>
        <TabBottomMenu
          onPress={setSelectTabName}
          selectedName={selectTabName}
          toDOList={toDoList}
        />
      </View>
      <Dialog.Container
        visible={isAddVisible}
        onBackdropPress={() => setIsAddVisible(false)}
      >
        <Dialog.Title>Créer une tâche</Dialog.Title>
        <Dialog.Description>
          choisi un nom pour la nouvelle tâche
        </Dialog.Description>
        <Dialog.Input onChangeText={setNewToDo} />
        <Dialog.Button
          disabled={newToDo.trim().length === 0}
          label="Créer"
          onPress={addNewToDo}
        />
      </Dialog.Container>
    </>
  );
}
