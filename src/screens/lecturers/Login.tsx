import React, { useState } from 'react';
import {
    Dimensions,
    Image,
    Modal,
    Pressable,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { ARROW_DOWN, Colors, GOOGLE, IMAGE_LOGIN, LOGO,  SUBTRACT, TOGGLE, TOGGLE_CLICK, fontFamily } from '../../../assets';


type Item = {
    id: string;
    title: string
  };
  
  type ItemProps = {
    item: Item;
    onPress: () => void;
  };
  
  
const Login: React.FC = () => {
    const [toggle, setToggle] = useState(false);
    const [toggleStaff, setToggleStaff] = useState(false);
    const [selectedId, setSelectedId] = useState<string>();
    const [modalVisible, setModalVisible] = useState(false);

    const handleToggle = () => {
        setToggle(!toggle);
        setToggleStaff(false);
    }
    const handleToggleStaff = () => {
        setToggleStaff(!toggleStaff);
        setToggle(false);
    }

    const [data, setData] = React.useState<Item[]>(
        [{
          id: '1',
          title: 'Hồ Chí Minh'
        },
        {
          id: '2',
          title: 'Đà Nẵng'
        },
        {
          id: '3',
          title: 'Hà Nội'
        },
        {
          id: '4',
          title: 'Cần Thơ'
        },
        {
          id: '5',
          title: 'Tây Nguyên'
    
        },
       ]
      );
    
      const Item = ({item, onPress}: ItemProps) => (
        <TouchableOpacity onPress={onPress} style={[styles.item,{ backgroundColor: item.id === selectedId ?  Colors.YELLOW : Colors.YELLOW_PALE}]}>
          <Text style={[styles.text2, {color: item.id === selectedId ? Colors.WHITE : Colors.GRAY_TEXT2}]}>{item.title}</Text>
        </TouchableOpacity>
      );
 
      const handleSelect = (item:Item) => {
        setSelectedId(item.id);
        console.log(item.title)
        setModalVisible(!modalVisible);
    }
    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content"
                backgroundColor={'transparent'}
                translucent />
            <Image
                source={SUBTRACT}
                style={styles.backgroundImage}
            />
            <Image
                source={IMAGE_LOGIN}
                style={styles.imageLogin}
            />
            <View style={styles.content}>
                <Image
                    source={LOGO}
                    style={styles.logo}
                />
                <View style={[styles.row, { marginTop: 51, marginBottom: 37 }]}>
                    <TouchableOpacity onPress={handleToggle}>
                        <Image
                            source={toggle ? TOGGLE_CLICK : TOGGLE}
                            style={styles.icon}
                        />
                    </TouchableOpacity>
                    <Text style={[styles.text, { marginRight: 15 }]}>Giảng viên</Text>
                    <TouchableOpacity onPress={handleToggleStaff}>
                        <Image
                            source={toggleStaff ? TOGGLE_CLICK : TOGGLE}
                            style={styles.icon}
                        />
                    </TouchableOpacity>
                    <Text style={styles.text}>Nhân viên</Text>
                </View>

                <View style={styles.button}>
                    <Text style={styles.text2}>Chọn cơ sở đào tạo</Text>
                    <TouchableOpacity onPress={()=>setModalVisible(true)}>
                        <Image
                            source={ARROW_DOWN}
                            style={styles.arrow}
                        />
                        <Modal
                            animationType="slide"
                            transparent={true}
                            visible={modalVisible}
                            onRequestClose={() => {
                                setModalVisible(!modalVisible);
                            }}>
                            <View style={styles.centeredView}>
                                <View style={styles.modalView}>
                                    <Text style={styles.text}>Chọn cơ sở đào tạo!</Text>
                                    <ScrollView
                                        showsHorizontalScrollIndicator={false}>
                                        {data.map((item: Item) => (
                                            <Item item={item} key={item.id} onPress={()=>handleSelect(item)} />   
                                        ))}
                                    </ScrollView>
                                </View>
                            </View>
                        </Modal>
                    </TouchableOpacity>
                </View>
                <Pressable style={styles.button} onPress={() => { }}>
                    <Image
                        source={GOOGLE}
                        style={styles.gg}
                    />
                    <Text style={styles.text2}>Login with google</Text>
                </Pressable>
            </View>



        </SafeAreaView>


    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.GRAY_PALE2
    },
    
    backgroundImage: {
        width: Dimensions.get('window').width * 1,
        resizeMode: 'stretch',
        position: 'absolute',
        bottom: 0,
        zIndex: -1

    },
    imageLogin: {
        alignSelf: 'center',
        width: Dimensions.get('window').width * 0.75,
        height: 180,
        resizeMode: 'stretch',
        position: 'absolute',
        bottom: 153,
        right: Dimensions.get('window').width * 0.07,
        zIndex: -1,

    },
    logo: {
        width: Dimensions.get('window').width * 0.5,
        height: 82,
        resizeMode: 'stretch',
    },
    content: {
        width: Dimensions.get('window').width * 1,
        top: 111,
        position: 'absolute',
        zIndex: 0,
        flexDirection: 'column',
        alignItems: 'center',
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    icon: {
        width: 17,
        height: 17,
        marginRight: 5
    },
    gg: {
        width: 26,
        height: 26,
    },
    arrow: {
        width: 12,
        height: 7,
    },
    text: {
        fontFamily: fontFamily.Black,
        fontSize: 14,
        color: Colors.BLACK,
    },
    text2: {
        fontFamily: fontFamily.Regular,
        fontSize: 14,
        color: Colors.GRAY_TEXT2,
        width: Dimensions.get('window').width * 0.4,
        textAlign: 'center'

    },
    button: {
        flexDirection: 'row',
        width: Dimensions.get('window').width * 0.65,
        borderRadius: 16,
        backgroundColor: Colors.WHITE,
        height: 48,
        alignItems: 'center',
        paddingHorizontal: 18,
        justifyContent: 'center',
        marginBottom: 24
    },
    modalView: {
        height:Dimensions.get('window').height * 0.38 ,
        backgroundColor: Colors.WHITE,
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    item:{
        backgroundColor:Colors.YELLOW_PALE,
        height:30,
        marginTop:10,
        alignItems:'center',
        flexDirection:'row',  
        borderRadius: 20,  
    }

});

export default Login;
