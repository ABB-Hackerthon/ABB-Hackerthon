import { Image, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import {
	responsiveHeight,
	responsiveWidth,
} from "react-native-responsive-dimensions";
import locationIcon from "../../assets/images/location-pin-icon.png";
import { useNavigation } from "@react-navigation/native";

const PatrolDiaryCard = ({ imgSrc, patrolDiaryInfo }: any) => {
	const navigation = useNavigation();

	console.log(patrolDiaryInfo);
	return (
		<>
			<TouchableOpacity
				onPress={() => {
					console.log(patrolDiaryInfo.patrolNo);
					navigation.navigate("PatrolReportDetail", {
						patrolNo: patrolDiaryInfo.patrolNo,
					});
				}}
			>
				<View style={style.cardWrap}>
					<View style={style.imgWrap}>
						<Image source={imgSrc} style={style.img} />
					</View>
					<View style={style.textWrap}>
						<View style={style.textLocationWrap}>
							<Image source={locationIcon} style={style.iconLocation} />
							<Text style={style.textLocation}>
								{patrolDiaryInfo.patrolLogAddress}
							</Text>
						</View>
						<View style={style.textTitleWrap}>
							<Text style={style.textTitle}>{patrolDiaryInfo.patrolTitle}</Text>
						</View>
						<View style={style.textRowWrap}>
							<Text style={style.textRowWrapName}>
								{patrolDiaryInfo.userName}
							</Text>
							<Text style={style.textRowWrapViewCount}>
								{patrolDiaryInfo.patrolHit}
							</Text>
							<Text>{patrolDiaryInfo.patrolDate.slice(0, 10)}</Text>
						</View>
					</View>
				</View>
			</TouchableOpacity>
		</>
	);
};

export default PatrolDiaryCard;

const style = StyleSheet.create({
	cardWrap: {
		marginHorizontal: responsiveWidth(2),
		marginVertical: responsiveHeight(1),
		width: responsiveWidth(40),
		height: responsiveHeight(30),
		borderRadius: 20,
		borderColor: "#D3D3D3",
		borderWidth: 1,
		alignItems: "center",
	},

	imgWrap: {},
	img: {
		borderRadius: 20,
		width: responsiveWidth(39),
		height: responsiveHeight(20),
		resizeMode: "stretch",
	},

	textWrap: {
		paddingVertical: responsiveHeight(1),
		width: responsiveWidth(39),
		paddingHorizontal: responsiveWidth(1),
	},

	textLocationWrap: {
		//paddingBottom: responsiveHeight(0.5),
		flexDirection: "row",
		alignItems: "center",
		alignContent: "center",
	},
	textLocation: {
		fontSize: 11,
	},
	iconLocation: {
		width: 15,
		height: 15,
	},

	textTitleWrap: {
		paddingBottom: responsiveHeight(0.5),
	},

	textTitle: {
		height: 22,
		fontWeight: "900",
		fontSize: 20,
		color: "black",
	},

	textRowWrap: {
		flexDirection: "row",
		justifyContent: "space-between",
	},

	textRowWrapName: {
		width: responsiveWidth(13),
		height: 15,
	},
	textRowWrapViewCount: {
		width: responsiveWidth(6),
		height: 15,
	},
});
