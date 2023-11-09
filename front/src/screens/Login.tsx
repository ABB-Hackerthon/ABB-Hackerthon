import React, { useEffect, useState } from "react";
import { Text, TouchableOpacity } from "react-native";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import * as SecureStore from "expo-secure-store";
import { Button, View } from "react-native";
import { ANDROID_CLIENT_ID, ABB_APP_KEY } from "@env";
// import axios from "../utils/axios";
import axios from "axios";
import IndexStore from "../stores/IndexStore";
import SideMenuLayout from "../styles/sideMenuLayout";
import {
	BASE_URL,
	CONTENT_TYPE,
	TIMEOUT,
	ABB_BASE_URL,
} from "../constants/constants";
import { logout } from "../utils/logout";
import { observer } from "mobx-react";

WebBrowser.maybeCompleteAuthSession();

const Login = () => {
	const stores = IndexStore();
	const [request, response, promptAsync] = Google.useAuthRequest({
		androidClientId: ANDROID_CLIENT_ID,
	});

	const handleSignInWithGoogle = async () => {
		console.log("response 변화 체크 : ", response?.type);
		if (response?.type !== "success") return;

		const idToken = response.authentication?.idToken;
		const url = `${BASE_URL}/user`;
		try {
			const data = await axios.post(url, null, {
				headers: {
					Authorization: `Bearer ${idToken}`,
					"Content-Type": CONTENT_TYPE,
				},
				timeout: TIMEOUT,
			});
			console.log(data.data.message);
			if (data.data?.message === "로그인 완료") {
				stores.LoginStore.setLogged(true);
				console.log("로그인데이터 확인!:", data.data.data);
				console.log("data.data.data.accessToken: ", data.data.data.accessToken);
				console.log(
					"data.data.data.refreshToken: ",
					data.data.data.refreshToken,
				);
				await SecureStore.setItemAsync(
					"accessToken",
					data.data.data.accessToken,
				);
				await SecureStore.setItemAsync(
					"refreshToken",
					data.data.data.refreshToken,
				);
				const address = await SecureStore.getItemAsync("address");
				console.log(address);
				if (address === null) {
					console.log("널값");
					await postCreateAccount();
				}
			} else {
				console.log("else : data.data: ", data.data);
			}
		} catch (error) {
			console.log("error : ", error);
		}
	};

	const handleLogout = async () => {
		await logout();
	};

	const postCreateAccount = async () => {
		try {
			const data = await axios.post(
				`${ABB_BASE_URL}/v1/mitumt/com/acc_create`,
				{
					token: ABB_APP_KEY,
					chain: "mitumt",
				},
			);

			console.log(
				"Data.data.data.wallet.address : ",
				data.data.data.wallet.address,
			);
			console.log(
				"Data.data.data.wallet.privatekey : ",
				data.data.data.wallet.privatekey,
			);
			console.log(
				"Data.data.data.wallet.publickey : ",
				data.data.data.wallet.publickey,
			);
			await SecureStore.setItemAsync("address", data.data.data.wallet.address);
			await SecureStore.setItemAsync(
				"privatekey",
				data.data.data.wallet.privatekey,
			);
			await SecureStore.setItemAsync(
				"publickey",
				data.data.data.wallet.publickey,
			);
		} catch (error) {
			console.log(error);
		}
	};

	// Google 인증 응답이 바뀔때마다 실행
	useEffect(() => {
		handleSignInWithGoogle();
	}, [response]);

	return (
		<View>
			{!stores.LoginStore.isLogged ? (
				<TouchableOpacity
					activeOpacity={0.7}
					style={SideMenuLayout.googleAuthButton}
					onPress={() => promptAsync()}
				>
					<View>
						<Text style={SideMenuLayout.googleAuthButtonText}>로그인</Text>
					</View>
				</TouchableOpacity>
			) : (
				<TouchableOpacity
					activeOpacity={0.7}
					style={SideMenuLayout.googleAuthButton}
					onPress={() => handleLogout()}
				>
					<View>
						<Text style={SideMenuLayout.googleAuthButtonText}>로그아웃</Text>
					</View>
				</TouchableOpacity>
			)}
		</View>
	);
};

export default observer(Login);
