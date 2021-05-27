import React, { useCallback, useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { FlatList, ImageBackground, RefreshControl, StyleSheet, TextInput, TouchableOpacity, View,useWindowDimensions } from "react-native";
import styled from "styled-components";
import { IC_BELL, IC_LOUPE, IC_VM } from "../image/index";
import chitiet from "./ChiTietScreen";
import { requestGetListCity } from "../api/city";

const Name = styled.Text`
  font-size: 16px;
  color: #ffffff;
  font-weight: bold;
  padding-left: 15px;
  padding-bottom: 15px;
`;
const Item = ({ item, index }) => {
  const data = item;
  const navigation = useNavigation();
  // mình sẽ thêm cái dấu ? vào đằng trước để nếu ko có thì nó sẽ ko bị lỗi
  // data?.avatar?.url  || "" nếu có data thì lấy avatar nếu có avatar thì lấy url nếu bị lỗi thì lấy "" dấu || có nghĩa là "hoặc"
  // làm như kia sẽ ko bao giờ bị lỗi

  const openDetail = useCallback(() => {
    navigation.navigate("chitiet", {id: data.id})
  }, [data]);

  return (
    <View style={styles.Sitem}>
      <TouchableOpacity onPress={openDetail}>
        <ImageBackground source={{ uri: data?.avatar?.url}}
                         style={{ flex: 1, height: 240, backgroundColor: '#eee', justifyContent: "flex-end" }}>
          <Name>{data?.translation?.name || ""} - {data?.area_name || ""} </Name>
        </ImageBackground>
      </TouchableOpacity>
    </View>

  );
};

const Container = styled.SafeAreaView`
  flex: 1;
  background-color: #ffffff;

`;
const Stop = styled.View`
  flex: 1;
  flex-direction: row;
  padding-left: 16px;
  padding-right: 16px;
  background-color: #5b71f6;
`;
const Sbot = styled.View`
  flex: 9;
  flex-direction: column;
`;
const Sinput1 = styled.View`
  width: 40px;
  justify-content: center;
`;
const Sinput2 = styled.View`
  flex: 1;
  justify-content: center;
`;
const Sinput3 = styled.View`
  width: 40px;
  justify-content: center;
  align-items: flex-end;
`;
const Simage = styled.Image`
  width: 20px;
  height: 20px;
  tint-color: #ffffff;
`;
const KhuVucScreen = () => {
  const [isLoading, setLoading] = useState(true);
  // thuong xuyen format code nhin cho dep Control + Alt + L
  const [data, setData] = useState([]);

  const getData = async () => {

    setLoading(true);
    const response = await requestGetListCity({ locale: "vi"}); // gọi api lấy danh sách khu vực (truyền vào ngôn ngữ vi hoặc en)
    if (response) {
      setData(response); // sao lai response.data
      setLoading(false);
    }
  };

  useEffect(() => {
    getData().then();
  }, []);


  const renderItem = ({ item }) => {
    return (
      <Item
        item={item}
      />
    );
  };
  const [text, setText] = useState("");
  return (
    <Container>
      <Stop>
        <Sinput1>
          <Simage source={IC_LOUPE} />
        </Sinput1>
        <Sinput2>
          <TextInput
            style={{ height: 40 }}
            placeholder={"Tìm kiếm"}
            onChangeText={setText}
            value={text}
          />
        </Sinput2>
        <Sinput3>
          <TouchableOpacity>
            <Simage source={IC_BELL} />
          </TouchableOpacity>
        </Sinput3>
      </Stop>
      <Sbot>
        <FlatList refreshControl={<RefreshControl refreshing={isLoading} onRefresh={getData} />}
                  data={data}
                  renderItem={renderItem}
                  keyExtractor={(item) => item.id}
        />
      </Sbot>
    </Container>
  );
};
const styles = StyleSheet.create({
  Sitem: {
    flexDirection: "column",
    backgroundColor: "white",
  },
});
export default KhuVucScreen;
