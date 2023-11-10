import {useState} from "react";
import {HeaderButtons, HiddenItem, OverflowMenu} from "react-navigation-header-buttons";
import {ActivityIndicator, Alert, Image, TouchableOpacity, View} from "react-native";
import mediaDownload from "../../utils/mediaDownload";
import * as React from "react";

export default function MediaViewHeaders(
    { media, hasPermission, deleteMedia }: {
        media: any,
        hasPermission: boolean,
        deleteMedia: (mediaId) => void
    }
) {

    const [sharing, setSharing] = useState(false);
    return <HeaderButtons>
        <View>
            <ActivityIndicator color={"#4fc711"} animating={sharing} style={{ marginTop: 5 }} />
        </View>
        <TouchableOpacity onPress={async () => {
            setSharing(true);
            try {

                await mediaDownload(media?.storageLocation, "share", setSharing, false);

                return;
            } catch (e) {
                console.log(e)
                // if(e !== "[Error: User did not share]") Alert.alert("Error", "Unable to share media");
            }
            setSharing(false);
        }}>

            <Image source={require("../../assets/icons/collection/share.png")} style={{ width: 30, height: 30 }} />
        </TouchableOpacity>
        {hasPermission ? <OverflowMenu
            style={{ marginHorizontal: 10, marginRight: -10 }}
            OverflowIcon={({ color }) => <TouchableOpacity onPress={() => {
            }}>
                <Image source={require("../../assets/icons/collection/three-dots.png")} style={{ width: 35, height: 35 }} />
            </TouchableOpacity>}
        >
            <HiddenItem title="Delete" onPress={() => {
                Alert.alert("Delete", "Are you sure you want to delete this item?", [
                    {
                        text: "Cancel",
                        onPress: () => console.log("Cancel Pressed"),
                        style: "cancel"
                    },
                    { text: "Yes", onPress: () => deleteMedia(media?._id) }

                ]);
            }} />
        </OverflowMenu> : null}
    </HeaderButtons>
}