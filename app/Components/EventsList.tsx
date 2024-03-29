import {TouchableOpacity} from "react-native-gesture-handler";
import {Image, Text, View} from "react-native";
import TimestackMedia from "./TimestackMedia";
import TextComponent from "./Library/Text";
import {dateFormatter} from "../utils/time";
import ProfilePicture from "./ProfilePicture";
import React from "react";
import { EventObject } from "@api-types/public";
import {useNavigation} from "@react-navigation/native";
import {EventScreenNavigationProp} from "../navigation";
import FastImage from "react-native-fast-image";

const iconWidth = 25;

export default function EventsList({
    events,
}: {
    events: EventObject[];
}) {

    const navigation = useNavigation<EventScreenNavigationProp>()

    return <React.Fragment>

        {events.map((event, index) => {
            return <TouchableOpacity style={{
            }} onPress={() => {
                // navigation.goBack();
                navigation.navigate("Event", {
                    eventId: event._id,
                })
            }}>
                <View style={{
                    height: 120,

                    marginVertical: 7,
                    flexDirection: "row",
                    borderRadius: 10,
                    elevation: 10,
                    backgroundColor: "white",
                    shadowColor: 'rgba(0, 0, 0, 0.05)',
                    shadowOffset: {
                        width: 0,
                        height: 0,
                    },
                    shadowOpacity: 1,
                    shadowRadius: 15,
                }}>

                    <TimestackMedia itemInView={true} source={event.thumbnailUrl} style={{
                        width: 80,
                        borderRadius: 10,
                        borderWidth: 0
                    }} />

                    <View style={{
                        flex: 5,
                        padding: 5,
                        marginHorizontal: 5,
                        flexDirection: "column",
                        justifyContent: "space-between",
                        height: 120,

                    }}>
                        <TextComponent fontFamily={"Bold"} numberOfLines={2} fontSize={14} style={{
                            margin: 5,
                            lineHeight: 20,
                        }}>{event.name}</TextComponent>

                        <View>
                            <View style={{
                                borderRadius: 100,
                            }}>
                                <TextComponent
                                    fontFamily="Regular"
                                    fontSize={13}
                                    style={{
                                        padding: 3,
                                        borderRadius: 100,
                                    }}
                                    numberOfLines={1}
                                >
                                    {event?.startsAt ? dateFormatter(new Date(event?.startsAt), event?.endsAt ? new Date(event?.endsAt) : null) : ""}
                                </TextComponent>
                            </View>
                            <View style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                marginVertical: 5,
                            }}>

                                {event?.people ? [...event?.people].map((user, i) => {
                                    if (i === 6 && event?.peopleCount > 7) {
                                        return (
                                            <View style={{ marginRight: 5 }}>
                                                <View style={{
                                                    backgroundColor: "black",
                                                    opacity: 0.6,
                                                    zIndex: 1,
                                                    position: "absolute",
                                                    right: 0,
                                                    bottom: 0,
                                                }}>
                                                    <Text>{event.peopleCount - 6}</Text>
                                                </View>
                                                <ProfilePicture
                                                    userId={user.id}
                                                    key={i}
                                                    width={iconWidth}
                                                    height={iconWidth}
                                                    location={user.profilePictureSource}
                                                />
                                            </View>
                                        );
                                    } else {
                                        return (
                                            <ProfilePicture
                                                userId={user.id}
                                                key={i}
                                                style={{ marginRight: 5 }}
                                                width={iconWidth}
                                                height={iconWidth}
                                                location={user.profilePictureSource}
                                            />
                                        );
                                    }
                                }) : null}

                            </View>
                        </View>


                    </View>
                    <View style={{
                        flex: 1,
                        flexDirection: "row",
                        marginTop: 10,
                        marginRight: 5,
                        alignContent: "center",
                        justifyContent: "center",
                    }}>
                        <TextComponent fontFamily={"Semi Bold"} fontSize={12} style={{
                            lineHeight: 20,
                        }} numberOfLines={1}>{event.mediaCount}
                        </TextComponent>
                        <FastImage
                            source={require("../assets/icons/collection/memories-black.png")}
                            style={{
                                width: 18,
                                height: 18,
                            }}
                        />

                    </View>

                </View>
            </TouchableOpacity>
        })}

    </React.Fragment>

}