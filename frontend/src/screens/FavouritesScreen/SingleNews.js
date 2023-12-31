import axios from "axios";
import React from "react";
import {
    Dimensions,
    Image,
    ImageBackground,
    Linking,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,ToastAndroid
} from "react-native";
import {Pressable} from "react-native";
import url from '../url.js';

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const SingleNews = ({ item,user,func}) => {
   

    function ShareNews(obj){
        axios.post(url+'/sharearticle', {
 
            article:obj
          })
          .then(function (response) {
            if(response.data.message==="error"){
              ToastAndroid.show("Something went wrong ... Try Again",5000);
            }
            else{
              if(response.data.message==="success"){
                ToastAndroid.show("Article is successfully shared to All",5000);
              }
              
            }
             
          })
          .catch(function (error) {
            console.log(error);
            ToastAndroid.show("Something went wrong ... Try Again",5000);
          });
    }

    function UnSave(obj){
        console.log(obj,user.username);
        axios.post(url+'/unsavearticle', {
            username:user.username,
            article:obj
          })
          .then(function (response) {
            if(response.data.message==="error"){
              ToastAndroid.show("Something went wrong ... Try Again",5000);
            }
            else{
              if(response.data.message==="success"){
                  func();
                ToastAndroid.show("Article is removed from Favourites Successfully",5000);
              }
              
            }
             
          })
          .catch(function (error) {
            console.log(error);
            ToastAndroid.show("Something went wrong ... Try Again",5000);
          });

    }


    return (
        <View
            style={{
                height: windowHeight,
                width: windowWidth,
                transform: [{ scaleY: -1 }],
            }}
        >
            <Image
                source={{ uri: item.urlToImage }}
                style={{ height: "45%", resizeMode: "cover", width: windowWidth }} />
            <View
                style={{
                    ...styles.description,
                    backgroundColor: "#52595D",
                    alignItems: 'stretch',
                    justifyContent: 'space-between',
                }}
            >
                <View>
                    <Text style={{ ...styles.title, color: "white" }}>
                        {item.title}
                    </Text>
                    <Text
                        style={{ ...styles.content, color: "white" }}
                    >
                        {item.description}
                    </Text>
                    <Text style={{ color: "white" }}>
                        Short by
                        <Text style={{ fontWeight: "bold" }}>
                            {" "}
                            {item.author ?? "unknown"}
                        </Text>
                    </Text>

                </View>
            </View>

            <View style={styles.rss}>
                <Pressable onPress={() => Linking.openURL(item.url)}>
                    <Text style={{ fontSize: 17, fontWeight: "bold", color: "black", marginLeft: 30,margin: 10 }}>
                        Read More
                    </Text>

                </Pressable>
                <Pressable onPress={()=>{
                    UnSave(item);
                }} >
                    <Text style={{ fontSize: 17, fontWeight: "bold", color: "black", margin: 10 }}>UnSave</Text>
                </Pressable>
                <Pressable onPress={()=>{
                    ShareNews(item);
                }} >
                    <Text style={{ fontSize: 17, fontWeight: "bold", color: "black", marginRight: 60,margin: 10 }}>Share</Text>
                </Pressable>
            </View>
        

        </View>
    );
};

export default SingleNews;

const styles = StyleSheet.create({
    description: {
        padding: 15,
        flex: 1,
    },
    rss: {
        alignItems: 'stretch',
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#fff',
        resizeMode: "cover", width: windowWidth,
    },
    title: {
        fontSize: 25,
        fontWeight: "bold",
        paddingBottom: 10,
    },
    content: { fontSize: 18, paddingBottom: 10 },
    footer: {
        height: 80,
        width: windowWidth,
        position: "absolute",
        bottom: 0,
        backgroundColor: "#d7be69",
        justifyContent: "center",
        paddingHorizontal: 20,
    },
});