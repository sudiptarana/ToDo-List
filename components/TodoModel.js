import React from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  KeyboardAvoidingView,
  TextInput,
  Keyboard,
  Animated,
} from "react-native";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import colors from "../colors";

export default class TodoModel extends React.Component {
  state = {
    newTodo: "",
  };

  toggleTodoCompleted = (index) => {
    let list = this.props.list;

    list.todos[index].completed = !list.todos[index].completed;
    this.props.updateList(list);
  };

  addTodo = () => {
    let list = this.props.list;

    if (!list.todos.some((todo) => todo.title === this.state.newTodo)) {
      list.todos.push({ title: this.state.newTodo, completed: false });
      this.props.updateList(list);
    }
    this.setState({ newTodo: "" });
    Keyboard.dismiss();
  };

  deleteTodo = (index) => {
    let list = this.props.list;
    list.todos.splice(index, 1);

    this.props.updateList(list);
  };

  renderTodo = (todo, index) => {
    return (
      <View style={styles.todoContainer}>
        <TouchableOpacity onPress={() => this.toggleTodoCompleted(index)}>
          <Ionicons
            name={todo.completed ? "ios-square" : "ios-square-outline"}
            size={26}
            color={colors.gray}
            style={{ width: 40 }}
          />
        </TouchableOpacity>

        <Text
          style={[
            styles.todo,
            {
              textDecorationLine: todo.completed ? "line-through" : "none",
              color: todo.completed ? colors.gray : colors.white,
            },
          ]}
        >
          {todo.title}
        </Text>

        <TouchableOpacity
          style={[styles.delb]}
          onPress={() => this.deleteTodo(index)}
        >
          <View style={{ paddingRight: 20 }}></View>
          <Animated.View style={[styles.deleteButton]}>
            <Animated.Text
              style={{
                color: colors.white,
                fontWeight: "bold",
              }}
            >
              <AntDesign
                name="delete"
                size={20}
                color={colors.blue}
              ></AntDesign>
            </Animated.Text>
          </Animated.View>
        </TouchableOpacity>
      </View>
    );
  };

  render() {
    const list = this.props.list;
    const taskCount = list.todos.length;
    const completeCount = list.todos.filter((todo) => todo.completed).length;
    return (
      <KeyboardAvoidingView style={{ flex: 1 }}>
        <SafeAreaView style={styles.container}>
          <TouchableOpacity
            style={{ position: "absolute", top: 64, right: 32, zIndex: 10 }}
            onPress={this.props.closeModal}
          >
            <AntDesign name="doubleleft" size={24} color={colors.white} />
          </TouchableOpacity>

          <View
            style={[
              styles.section,
              styles.header,
              { borderBottomColor: list.color },
            ]}
          >
            <View>
              <Text style={styles.title}>{list.name}</Text>
              <Text style={styles.taskCount}>
                {completeCount} of {taskCount} tasks
              </Text>
            </View>
          </View>

          <View style={[styles.section, { flex: 3, marginVertical: 16 }]}>
            <FlatList
              data={list.todos}
              renderItem={({ item, index }) => this.renderTodo(item, index)}
              keyExtractor={(item) => item.title}
              showsVerticalScrollIndicator={false}
            />
          </View>
          <View style={[styles.section, styles.footer]}>
            <TextInput
              style={[
                styles.input,
                { borderColor: list.color, backgroundColor: "#37474f" },
              ]}
              onChangeText={(text) => this.setState({ newTodo: text })}
              value={this.state.newTodo}
            />
            <TouchableOpacity
              style={[styles.addTodo, { backgroundColor: list.color }]}
              onPress={() => this.addTodo()}
            >
              <AntDesign name="plus" size={16} color={colors.white} />
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#2D3436",
  },
  section: {
    alignSelf: "stretch",
  },
  header: {
    justifyContent: "flex-end",
    marginLeft: 64,
    borderBottomWidth: 3,
  },
  title: {
    fontSize: 40,
    fontWeight: "bold",
    color: colors.blue,
    paddingTop: 16,
  },
  taskCount: {
    fontSize: 20,
    marginTop: 4,
    marginBottom: 16,
    color: colors.gray,
    fontWeight: "bold",
  },
  footer: {
    paddingHorizontal: 32,
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
  },
  input: {
    flex: 1,
    height: 48,
    borderWidth: 2,
    borderRadius: 6,
    marginRight: 8,
    paddingHorizontal: 8,
    color: "white",
  },
  addTodo: {
    borderRadius: 4,
    padding: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  todoContainer: {
    paddingVertical: 16,
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 32,
  },
  todo: {
    color: colors.black,
    fontWeight: "bold",
    fontSize: 18,
  },
  delb: {
    flex: 1,
    flexDirection: "row-reverse",
  },
  deleteButton: {
    alignItems: "center",
    width: 40,
  },
});
