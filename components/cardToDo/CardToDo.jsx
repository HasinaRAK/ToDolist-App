import { Image, Text, TouchableOpacity } from "react-native";
import checkImg from "../../assets/images/img_project/check.png";
import { s } from "./CardToDo.style";

export const ToDo = ({ todo, onPress, onLongPress }) => {
  return (
    <TouchableOpacity
      onLongPress={() => onLongPress(todo)}
      onPress={() => onPress(todo)}
      style={s.card}
    >
      <Text
        style={[
          s.txt,
          !todo.isCompleted
            ? { textDecorationLine: "line-through" }
            : { textDecorationLine: "none" },
        ]}
      >
        {todo.title}
      </Text>
      {!todo.isCompleted && <Image source={checkImg} style={s.img} />}
    </TouchableOpacity>
  );
};
