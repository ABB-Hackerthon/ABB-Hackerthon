import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import AlbumLayout from "../styles/albumLayout";
import TempProfileImg from "../../assets/images/dog1.jpg";
import WhitePenIcon from "../../assets/images/pen-icon.png";
import {
	responsiveHeight,
	responsiveWidth,
} from "react-native-responsive-dimensions";
import { useState } from "react";
import { launchImageLibrary } from "react-native-image-picker";

const EditImage = ({ selectedImg, setSelectedImg }: any) => {
	const handleChoosePhoto = () => {
		const options = {
			storageOptions: {
				skipBackup: true,
				path: "images",
			},
		};

		launchImageLibrary(options, (response) => {
			if (response.didCancel) {
				console.log("User cancelled image picker");
			} else if (response.error) {
				console.log("ImagePicker Error: ", response.error);
			} else if (response.assets && response.assets.length > 0) {
				const source = { uri: response.assets[0].uri };

				setSelectedImg(source.uri); // 부모 컴포넌트의 상태 업데이트
			}
		});
	};

	return (
		<>
			<View style={styles.profileWrap}>
				<Image
					source={selectedImg ? { uri: selectedImg } : TempProfileImg}
					style={styles.userPhoto}
				/>
				<TouchableOpacity
					activeOpacity={0.7}
					style={styles.changeImageWrap}
					onPress={handleChoosePhoto}
				>
					<View>
						<Image source={WhitePenIcon} style={styles.changeImageIcon} />
					</View>
				</TouchableOpacity>
			</View>
		</>
	);
};

export default EditImage;
const styles = StyleSheet.create({
	profileWrap: {
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		paddingHorizontal: responsiveWidth(4),
		position: "relative",
	},
	myNameTitle: {
		fontSize: 22,
		fontWeight: "600",
		color: "#5B5B5B",
		textAlign: "center",
	},
	changeImageWrap: {
		padding: 8,
		borderRadius: 50,
		backgroundColor: "#EE8A72",
		position: "absolute",
		bottom: 0,
		right: responsiveWidth(35),
	},
	changeImageIcon: {},
	userPhoto: {
		position: "relative",
		width: 120,
		height: 120,
		borderRadius: 100,
		marginTop: 20,
	},
});
