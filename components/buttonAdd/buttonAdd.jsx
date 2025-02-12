import { Text, TouchableOpacity } from "react-native";
import { s } from "./buttonAdd.style";

export const ButtonAdd = ({ onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={s.button}>
      <Text style={s.txt}>+ New TODO</Text>
    </TouchableOpacity>
  );
};
