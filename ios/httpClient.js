import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Constants from "expo-constants";
export default async function HTTPClient (path, method, data, headers) {
	console.log(await AsyncStorage.getItem('@session'))
	console.log(Constants.expoConfig.extra.apiUrl+path)
	return axios({
		method: method,
		url: Constants.expoConfig.extra.apiUrl+"/v1"+path,
		data: data,
		headers: {
			"Content-Type": "application/json",
			"Accept": "application/json",
			"Authorization": "Bearer " + await AsyncStorage.getItem('@session') || "",
			...headers
		}
	})
}