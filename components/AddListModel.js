import React from "react";
import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  TouchableOpacity,
  ColorPropType,
  TextInput,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { Colors } from "react-native/Libraries/NewAppScreen";
import colors from "../colors";

export default class AddListModel extends React.Component {
  backgroundColors = [
    "#20B2AA",
    "#1e90ff",
    "#01FF70",
    "#3cb371",
    "#FF6347",
    "#BA55D3",
    "#6A5ACD",
  ];
  state = {
    name: "",
    color: this.backgroundColors[0],
  };

  createTodo = () => {
    const { name, color } = this.state;

    const list = { name, color };
    this.props.addList(list);

    this.setState({ name: "" });
    this.props.closeModel();
  };
  renderColors() {
    return this.backgroundColors.map((color) => {
      return (
        <TouchableOpacity
          key={color}
          style={[styles.colorSelect, { backgroundColor: color }]}
          onPress={() => this.setState({ color })}
        />
      );
    });
  }
  render() {
    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        <TouchableOpacity
          style={{ position: "absolute", top: 64, right: 32 }}
          onPress={this.props.closeModel}
        >
          <AntDesign name="doubleleft" size={24} color={colors.white} />
        </TouchableOpacity>

        <View style={{ alignSelf: "stretch", marginHorizontal: 32 }}>
          <Text style={styles.title}>Create ToDo List</Text>
          <TextInput
            style={styles.input}
            placeholder="Hey!, give the list Name"
            onChangeText={(text) => this.setState({ name: text })}
          />

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: 12,
            }}
          >
            {this.renderColors()}
          </View>

          <TouchableOpacity
            style={[styles.create, { backgroundColor: this.state.color }]}
            onPress={this.createTodo}
          >
            <Text
              style={{ color: colors.white, fontWeight: "Bold", fontSize: 24 }}
            >
              Create!
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 180,
    backgroundColor: "#374745",
    position: "absolute",
    width: "100%",
    height: "100%",
  },
  title: {
    fontSize: 34,
    fontWeight: "800",
    color: colors.white,
    alignSelf: "center",
    marginBottom: 26,
  },
  input: {
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.white,
    borderRadius: 6,
    height: 50,
    marginTop: 8,
    paddingHorizontal: 16,
    fontSize: 18,
    color: "white",
    marginBottom: 10,
  },
  create: {
    marginTop: 34,
    height: 50,
    borderRadius: 6,
    alignItems: "center",
    justifyContent: "center",
  },
  colorSelect: {
    width: 30,
    height: 30,
    borderRadius: 4,
  },
});
