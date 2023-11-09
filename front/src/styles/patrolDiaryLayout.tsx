import { StyleSheet } from "react-native";
import {
	responsiveWidth,
	responsiveHeight,
} from "react-native-responsive-dimensions";

const PatrolDiaryLayout = StyleSheet.create({
	container: {
		alignItems: "center",
	},
	settings: {
		position: "relative",
	},
	headerWrap: {
		marginLeft: responsiveWidth(3),
		marginTop: responsiveHeight(1.5),
		width: responsiveWidth(88),
	},
	headerTextDesc: {
		fontWeight: "600",
	},
	headerTextTitle: {
		fontSize: 25,
		fontWeight: "900",
		color: "black",
	},
	headerRowWrap: {
		flexDirection: "row",
		justifyContent: "space-between",
	},

	radioWrap: {
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
		marginTop: responsiveHeight(1),
		// backgroundColor: "blue",
	},

	imgWrap: {
		position: "relative",
		borderRadius: 20,
	},
	img: {
		width: responsiveWidth(80),
		resizeMode: "stretch",
	},
	imgText: {
		position: "absolute",
		right: 0,
		marginVertical: responsiveHeight(1),
		marginHorizontal: responsiveWidth(1),
		paddingVertical: responsiveHeight(0.5),
		paddingHorizontal: responsiveWidth(1.5),
		borderRadius: 50,
		backgroundColor: "rgba(0, 0, 0, 0.2)",
		color: "white",
		fontSize: 15,
		fontWeight: "bold",
	},
	imgAddrText: {
		top: 0,
	},
	imgHitText: {
		bottom: 0,
	},

	formInput: {
		width: responsiveWidth(85),
		height: 36,
		borderRadius: 12,
		marginTop: 7,
		padding: 6,
		backgroundColor: "rgba(118, 118, 128, 0.12)",
	},

	patrolRowWrap: {
		width: responsiveWidth(88),
		flexDirection: "row",
		justifyContent: "space-between",
		marginTop: responsiveHeight(2),
		flexWrap: "wrap",
	},

	iconImg: {
		width: 30,
		height: 30,
	},
	modalContainer: {
		// position: "absolute",
		// width: "100%", // You might want to adjust this
		// height: "100%", // You might want to adjust this
		// justifyContent: "flex-start",
		// alignItems: "flex-start",
	},
	modalView: {
		width: responsiveWidth(40),
		// top: responsiveHeight(50),
		// left: responsiveWidth(50),
		// marginHorizontal: responsiveWidth(5),
		// height: responsiveHeight(5),
		backgroundColor: "white",
		borderRadius: 10,
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
		elevation: 5,
	},
	modalItem: {
		height: responsiveHeight(8),
		// marginBottom: 15,
		justifyContent: "center",
		alignItems: "center",
	},
	modalText: {
		fontSize: 17,
	},
});

export default PatrolDiaryLayout;
