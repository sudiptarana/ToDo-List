import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Modal,
  ActivityIndicator,
} from "react-native";
import { AntDesign } from "@expo/vector-icons"; //for icon
import colors from "./colors";
import TodoList from "./components/todoList";
import AddListModel from "./components/AddListModel";
import Fire from "./Fire";

export default class App extends React.Component {
  state = {
    addTodoVisible: false,
    lists: [],
    user: {},
    loading: true,
  };

  componentDidMount() {
    firebase = new Fire((error, user) => {
      if (error) {
        return alert("oho sorry! Something went wrong!");
      }

      firebase.getLists((lists) => {
        this.setState({ lists, user }, () => {
          this.setState({ loading: false });
        });
      });

      this.setState({ user });
    });
  }

  componentWillUnmount() {
    firebase.detach();
  }
  toggleAddTodoModel() {
    this.setState({ addTodoVisible: !this.state.addTodoVisible });
  }
  renderList = (list) => {
    return <TodoList list={list} updateList={this.updateList} />;
  };

  addList = (list) => {
    firebase.addList({
      name: list.name,
      color: list.color,
      todos: [],
    });
  };

  updateList = (list) => {
    firebase.updateList(list);
  };

  render() {
    if (this.state.loading) {
      return (
        <View style={styles.container}>
          <ActivityIndicator size="large" color={colors.blue} />
        </View>
      );
    }
    return (
      <View style={styles.container}>
        <Modal
          animationType="slide"
          visible={this.state.addTodoVisible}
          onRequestClose={() => this.toggleAddTodoModel()}
        >
          <AddListModel
            closeModel={() => this.toggleAddTodoModel()}
            addList={this.addList}
          />
        </Modal>

        <View style={{ flexDirection: "row" }}>
          <View style={styles.divider} />
          <Text style={styles.title}>
            ToDo{" "}
            <Text style={{ fontWeight: "bold", color: colors.blue }}>
              Lists
            </Text>
          </Text>
          <View style={styles.divider} />
        </View>

        <View style={{ marginVertical: 48 }}>
          <TouchableOpacity
            style={styles.addList}
            onPress={() => this.toggleAddTodoModel()}
          >
            <AntDesign name="plus" size={30} color={colors.blue}></AntDesign>
          </TouchableOpacity>
          <Text style={styles.add}>Add List</Text>
        </View>

        <View style={{ height: 275 }}>
          <FlatList
            data={this.state.lists}
            keyExtractor={(item) => item.id.toString()}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => this.renderList(item)}
            keyboardShouldPersistTaps="always"
          />
        </View>
        <AntDesign
          name="copyright"
          size={20}
          color={colors.blue}
          style={{ paddingTop: 50 }}
        >
          <Text> Ratron</Text>
        </AntDesign>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#2D3436",
    alignItems: "center",
    justifyContent: "center",
  },
  divider: {
    backgroundColor: colors.lightBlue,
    height: 1,
    flex: 1,
    alignSelf: "center",
  },
  title: {
    fontSize: 38,
    fontWeight: "bold",
    color: colors.white,
    paddingHorizontal: 64,
  },
  addList: {
    borderWidth: 2,
    borderColor: colors.lightBlue,
    borderRadius: 4,
    padding: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  add: {
    color: colors.blue,
    fontWeight: "600",
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 8,
  },
});
