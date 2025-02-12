import { Text, Image } from "react-native";
import { s } from "./header.style";
import heardlogo from "../../assets/images/img_project/logo.png";

export const Header = () => {
  return (
    <>
      <Image style={s.img} source={heardlogo} resizeMode="contain"/>
      <Text style={s.subtitle}>Tu n'as pas de truc à faire</Text>
    </>
  );
};
