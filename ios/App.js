import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {Image, StatusBar} from "react-native";
import {NavigationContainer} from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ExpoJobQueue from "expo-job-queue";
import {useFonts} from "expo-font";
import Constants from "expo-constants";
import {createStackNavigator} from "@react-navigation/stack";

import uploadWorker from "./uploadWorker";
import Main from "./Main";
import {useEffect, useState} from "react";
import HTTPClient from "./httpClient";
import {
    AddStackScreen,
    FutureStackScreen,
    HomeStackScreen,
    NotificationsStackScreen,
    ProfileStackScreen
} from "./stacks";
import MediaView from "./screens/MediaView";
import * as React from "react";

const apiUrl = Constants.expoConfig.extra.apiUrl;
const frontendUrl = Constants.expoConfig.extra.frontendUrl;

uploadWorker();
const setSession = async (session) => {
    console.log("SETTING SESSION");
    await AsyncStorage.setItem('@session', session);

}

function Viewer({baseRoute, navigation}) {
    return (
        <Main
            baseRoute={baseRoute}
            apiUrl={apiUrl}
            navigation={navigation}
            frontendUrl={frontendUrl}
        />
    );
}

function Invite ({navigation, route}) {
    return <Viewer navigation={navigation} baseRoute={"/event/"+route.params.eventId+"/join"}/>
}

function AuthScreen({navigation, route}) {

    return <Main
            baseRoute={"/auth"}
            apiUrl={apiUrl}
            frontendUrl={frontendUrl}
            setSession={setSession}
            navigation={navigation}
        />;
}
export default function App() {

    StatusBar.setBarStyle('dark-content', true);

    return <NavigationContainer><CoreStackScreen/></NavigationContainer>;

}

const CoreStack = createStackNavigator();
function CoreStackScreen() {

    const [authenticated, setAuthenticated] = useState(true);
    const [currentSession, setCurrentSession] = useState(null);

    useEffect(() => {
        new Promise(async (resolve, reject) => {
            HTTPClient("/auth/check", "GET")
                .then((_res) => {

                    setAuthenticated(true);

                })
                .catch((_err) => {
                    setAuthenticated(false);
                })
        }).then(_r => {});
    }, [currentSession]);

    return (
        <CoreStack.Navigator screenOptions={{
            headerShown: false,
            animationEnabled: false,
            gestureEnabled: false
        }}>
            <CoreStack.Screen name="Main" component={Nav} />
            <CoreStack.Screen name="Auth" navigationOptions={{
                animationEnabled: false
            }} component={AuthScreen} />
            <CoreStack.Screen name="Invite" navigationOptions={{
                animationEnabled: false
            }} component={Invite} />
            {/*<CoreStack.Screen options={{*/}
            {/*    presentation: "card",*/}
            {/*    animationTypeForReplace: "pop",*/}
            {/*    gestureEnabled: true,*/}
            {/*    gestureDirection: "vertical",*/}
            {/*    animationEnabled: true,*/}
            {/*}} name="MediaView" component={MediaView} />*/}

        </CoreStack.Navigator>
    );
}


const Tab = createBottomTabNavigator();
function Nav() {

    ExpoJobQueue.start().then(() => console.log("JOB_QUEUE_STARTED"));

    useFonts({
        'Red Hat Display Black': require('./assets/fonts/RedHatDisplay-Black.ttf'),
        'Red Hat Display Black Italic': require('./assets/fonts/RedHatDisplay-BlackItalic.ttf'),
        'Red Hat Display Bold': require('./assets/fonts/RedHatDisplay-Bold.ttf'),
        'Red Hat Display Bold Italic': require('./assets/fonts/RedHatDisplay-BoldItalic.ttf'),
        'Red Hat Display Italic': require('./assets/fonts/RedHatDisplay-Italic.ttf'),
        'Red Hat Display Medium': require('./assets/fonts/RedHatDisplay-Medium.ttf'),
        'Red Hat Display Medium Italic': require('./assets/fonts/RedHatDisplay-MediumItalic.ttf'),
        'Red Hat Display Regular': require('./assets/fonts/RedHatDisplay-Regular.ttf'),
        'Red Hat Display Semi Bold': require('./assets/fonts/RedHatDisplay-SemiBold.ttf'),
        'Red Hat Display Semi Bold Italic': require('./assets/fonts/RedHatDisplay-SemiBoldItalic.ttf'),
    });

    return (
        <Tab.Navigator
            screenOptions={{
                showLabel: false,
                headerShown: false,
                tabBarStyle: {
                    padding: 20, // Increase the vertical margin of the tab bar,
                    borderWidth: 0,
                    margin: 0
                },
            }}
        >
            <Tab.Screen
                name="HomeStack"
                component={HomeStackScreen}
                screenOptions={{
                }}
                options={{
                    style: {
                        marginVertical: 10, // Increase the vertical margin of the tab bar
                    },
                    tabBarLabel: '',
                    tabBarIcon: ({ color, size, focused }) => {
                        if(focused) return <Image style={{width: 30, height: 30}} source={require("./assets/icons/nav/home_black.png")}/>
                        return <Image style={{width: 30, height: 30}} source={require("./assets/icons/nav/home_white.png")}/>
                    }
                }}
            />
            <Tab.Screen
                name="EventsStack"
                component={FutureStackScreen}
                c
                options={{
                    tabBarLabel: '',
                    tabBarIcon: ({ color, size, focused }) => {
                        if(focused) return <Image style={{width: 30, height: 30}} source={require("./assets/icons/nav/future_black.png")}/>
                        return <Image style={{width: 30, height: 30}} source={require("./assets/icons/nav/future_white.png")}/>

                    }
                }}
            />

            <Tab.Screen
                name="AddStack"
                component={AddStackScreen}
                // options={(tab)=> {
                //     console.log(tab);
                //     const navigation = tab.navigation;
                //     return ({
                //         tabBarButton:props => <TouchableOpacity style={{backgroundColor: "red"}} {...props} onPress={()=>navigation.navigate('SignIn')}>
                //             <Image style={{width: 40, height: 40, marginTop: 10}} source={require("./assets/icons/nav/add_white.png")}/>
                //         </TouchableOpacity>,
                //         tabBarLabel: '',
                //     })
                // }}
                options={{
                    tabBarLabel: '',
                    tabBarIcon: ({ color, size, focused }) => {
                        if(focused) return <Image style={{width:40, height: 40}} source={require("./assets/icons/collection/timestack.png")}/>
                        return <Image style={{width: 40, height: 40}} source={require("./assets/icons/collection/timestack.png")}/>

                    }
                }}
            />
            <Tab.Screen
                name="NotificationsStack"
                component={NotificationsStackScreen}
                options={{
                    tabBarLabel: '',
                    tabBarIcon: ({ color, size, focused }) => {
                        if(focused) return <Image style={{width: 30, height: 30}} source={require("./assets/icons/nav/notifications_black.png")}/>
                        return <Image style={{width: 30, height: 30}} source={require("./assets/icons/nav/notifications_white.png")}/>

                    }
                }}
            />
            <Tab.Screen
                name="ProfileStack"
                component={ProfileStackScreen}
                options={{
                    tabBarLabel: '',
                    tabBarIcon: ({ color, size, focused }) => {
                        if(focused) return <Image style={{width: 30, height: 30}} source={require("./assets/icons/nav/profile_black.png")}/>
                        return <Image style={{width: 30, height: 30}} source={require("./assets/icons/nav/profile_white.png")}/>

                    }
                }}
            />

        </Tab.Navigator>


    );
}


