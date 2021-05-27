import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  Image,
  useColorScheme,
  View, TouchableOpacity, ImageBackground, useWindowDimensions, Dimensions,
} from "react-native";
import { NavigationContainer, useNavigation, useRoute } from "@react-navigation/native";
import Swiper from "react-native-swiper";
import styled from "styled-components";
import { IC_BACK, IC_LIKE, IC_MESS, IC_SHARE, IC_SIGNPORT, IC_USER } from "../image/index";
import { requestGetDetailCity } from "../api/city";
import HTML from "react-native-render-html";

const Container = styled.View`
  flex: 1;
  background-color: #ffffff;
`;
const Stop = styled.View`
  flex: 0.7;
  padding-right: 16px;
  padding-left: 16px;
  flex-direction: row;
  background-color: #5b71f6;
`;
const Sbot = styled.View`
  flex: 9;
  background-color: white;
  flex-direction: column;
`;
const BGimage = styled.ImageBackground`
  height: 300px;
`;
const Sbinhluan = styled.View`
  height: 40px;
  flex-direction: row;
  border-bottom-width: 1px;
  border-bottom-color: #c7c7c7;
`;
const SView = styled.TouchableOpacity`
  flex: 1;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;
const Name = styled.Text`
  font-size: 14px;
  font-weight: bold;
  color: #b3b0b0;
  padding-left: 10px;
`;
const Botmess = styled.View`
  padding: 10px 16px 10px 16px;
`;
const Time = styled.View`
  flex-direction: row;
  padding: 20px 16px 20px 16px;
  background-color: #e5e5e5;
`;
const tagsStyles = {
  img: {
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: 20,
  },
};
// ten file phai viet hoa chu cai dau tien
const ChiTietScreen = () => { // ko copy code nhu nay
  const [isShowinfo, setisShowinfo] = useState(false);
  const onPress = () => {
    setisShowinfo(isShowinfo ? false : true);
  };
  const contentWidth = useWindowDimensions().width;
  const computeEmbeddedMaxWidth = (availableWidth) => {
    return Math.min(availableWidth, 500);
  };
  const navigation = useNavigation();
  const route = useRoute();

  console.log("route ", route.params);

  const [data, setData] = useState(null);

  const getData = async () => {
    const res = await requestGetDetailCity({ locale: "vi", id: route.params?.id || "" });
    // làm thì nhớ dùng console.log để hiển thị dữ liệu ra còn biết là có những dữ liệu gì
    if (res) {
      setData(res);
    }
  };

  useEffect(() => {
    getData().then();
  }, [route.params]);
  return (
    <Container>
      <Stop>
        <View style={{ width: 40, justifyContent: "center" }}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image source={IC_BACK} style={{ width: 20, height: 20, tintColor: "#ffffffff" }} />
          </TouchableOpacity>

        </View>
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <Text style={{ fontSize: 14, color: "#ffffff" }}>
            {data?.translation?.name || ""}
          </Text>
        </View>
        <View style={{ width: 40, justifyContent: "center" }}>
        </View>
      </Stop>
      <Sbot>
        <ScrollView>
          <View style={{ height: 300 }}>
            <Swiper>
              <BGimage source={{ uri: data?.avatar?.url }}></BGimage>
            </Swiper>
          </View>
          <Sbinhluan>
            <SView>
              <Image source={IC_LIKE}
                     style={{ width: 14, height: 14, tintColor: [isShowinfo ? "#d0c0c0" : "#af3535"] }} />
              <Name>Thích</Name>
            </SView>
            <SView>
              <Image source={IC_MESS} style={{ width: 14, height: 14 }} />
              <Name>Bình luận</Name>
            </SView>
            <SView>
              <Image source={IC_SHARE} style={{ width: 14, height: 14 }} />
              <Name>Chia sẻ</Name>
            </SView>
          </Sbinhluan>

          <Botmess>
            <Text style={{ fontSize: 18, color: "#000000", fontWeight: "bold" }}>
              {data?.translation?.name || ""}
            </Text>
            <Text style={{ fontSize: 14, color: "#000000" }}>
              {data?.translation?.name || ""}
            </Text>
            <View style={{ flexDirection: "row" }}>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <View>
                  <Text>0</Text>
                </View>

                <View style={{ paddingLeft: 10 }}>
                  <Image source={IC_LIKE} style={{ width: 14, height: 14 }} />
                </View>
              </View>

              <View style={{ flexDirection: "row", alignItems: "center", paddingLeft: 10 }}>
                <View>
                  <Text>0</Text>
                </View>

                <View style={{ paddingLeft: 10 }}>
                  <Image source={IC_MESS} style={{ width: 14, height: 14 }} />
                </View>
              </View>
            </View>
          </Botmess>
          <Time>
            <View
              style={{ flex: 5, flexDirection: "column", borderRightWidth: 1, borderRightColor: "#ffffff", margin: 5 }}>
              <Text>Ngày mở cửa</Text>
              <Text>Mon-Sun</Text>
            </View>
            <View style={{ flex: 5, flexDirection: "column", alignItems: "flex-end", margin: 5 }}>
              <Text>Giờ mở cưa</Text>
              <Text>{data?.opening_time?.open_time || " "} - {data?.opening_time?.close_time || ""}</Text>
            </View>
          </Time>
          <View
            style={{ paddingHorizontal: 16, paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: "#cdcbcb" }}>
            <Text>Mô tả</Text>
            <HTML source={{ html: ` ${data?.translation?.content}` }}
                  cosntentWidth={contentWidth}
                  imagesMaxWidth={Dimensions.get("window").width * .9}
                  staticContentMaxWidth={Dimensions.get("window").width * .9}
                  tagsStyles={tagsStyles}
            />
          </View>
          <Smap>
            <Lotrinh>
              <View style={{ width: 100, flexDirection: "row", alignItems: "center" }}>
                <Image source={IC_SIGNPORT} style={{ width: 14, height: 14 }} />
                <Text style={{ fontSize: 16, paddingLeft: 5 }}>Lộ trình</Text>
              </View>
              <View style={{ flex: 1 }}></View>
              <View style={{ width: 80, alignItems: "flex-end" }}>
                <>
                  <TouchableOpacity onPress={onPress}>
                    <Text style={{ color: "#2c7aec" }}>Xem thêm</Text>
                  </TouchableOpacity>
                </>
              </View>
            </Lotrinh>
            {
              isShowinfo
                ?
                <View style={{ paddingBottom: 15, paddingHorizontal: 16 }}>
                  <Text>{data?.description || ""}</Text>
                </View>
                : null
            }

            <View style={{ height: 150, backgroundColor: "red" }}>
            </View>

            <Address>
              <Dchi>
                <Text style={{ fontSize: 16, fontWeight: "bold" }}>Địa chỉ </Text>
                <Stitle>{data?.address || ""}</Stitle>
              </Dchi>
              <Cduong>
                <TouchableOpacity>
                  <Text style={{ color: "#2c7aec" }}>Chỉ đường</Text>
                </TouchableOpacity>
              </Cduong>

            </Address>
          </Smap>

          <SBL>
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 16, fontWeight: "bold" }}>Bình Luận</Text>
            </View>

            <Comment>
              <View style={{ width: 40, justifyContent: "center" }}>
                <Image source={IC_USER} style={{ width: 30, height: 30 }} />
              </View>
              <View style={{ flex: 1, flexDirection: "column" }}>
                <Text style={{ fontWeight: "bold" }}>Nguyễn chí thanh</Text>
                <Stitle>25/10/2020</Stitle>
                <Stitle>không gian yên tĩnh,ok đẹp</Stitle>
              </View>
            </Comment>

            <View style={{ borderWidth: 1, borderColor: "#b6b4b4", flex: 1 }}>
              <TouchableOpacity style={{ margin: 6, alignItems: "center", justifyContent: "center" }}>
                <Text style={{ fontSize: 16, fontWeight: "bold", color: "#767474" }}>Bình luận</Text>
              </TouchableOpacity>
            </View>
          </SBL>

        </ScrollView>
      </Sbot>
    </Container>

  );
};
const Smap = styled.View`
  flex: 1;
  flex-direction: column;
`;
const Address = styled.View`
  flex: 1;
  flex-direction: row;
  padding-top: 10px;
  padding-left: 16px;
  padding-right: 16px;
  padding-bottom: 10px;
  border-bottom-width: 1px;
  border-bottom-color: #c1c0c0;
`;
const Dchi = styled.View`
  flex: 8
`;
const Cduong = styled.View`
  flex: 2;
  align-items: center;

`;
const SBL = styled.View`
  flex-direction: column;
  flex: 1;
  padding: 10px 16px 10px 16px;

`;
const Comment = styled.View`
  flex-direction: row;
  flex: 1;
  padding: 10px 0 10px 0;
`;
const Stitle = styled.Text`
  font-size: 14px;
  color: #5a5959;
`;
const Lotrinh = styled.View`
  flexDirection: row;
  padding: 10px 16px 10px 16px;
`;
export default ChiTietScreen;
