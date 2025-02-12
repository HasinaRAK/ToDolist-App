import { TouchableOpacity, View, Text } from "react-native";
import { s } from "./tabBottomMenu.style";
export const TabBottomMenu = ({ selectedName, onPress, toDOList }) => {
  const countBySstatus = toDOList.reduce(
    (acc, todo) => {
      todo.isCompleted ? acc.inprogress++ : acc.done++;
      return acc;
    },
    { all: toDOList.length, inprogress: 0, done: 0 }
  );

  //console.log(countBySstatus);
  function getNameStyle(TabName) {
    return {
      fontWeight: "bold",
      color: TabName === selectedName ? "#2F76E5" : "black",
    };
  }
  return (
    <View style={s.container}>
      <TouchableOpacity onPress={() => onPress("All")}>
        <Text style={getNameStyle("All")}>All ({countBySstatus.all})</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => onPress("InProgress")}>
        <Text style={getNameStyle("InProgress")}>
          In progress ({countBySstatus.inprogress})
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => onPress("Done")}>
        <Text style={getNameStyle("Done")}>Done ({countBySstatus.done})</Text>
      </TouchableOpacity>
    </View>
  );
};
