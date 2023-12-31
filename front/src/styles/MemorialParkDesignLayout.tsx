import { StyleSheet } from "react-native";
import {
	responsiveWidth,
	responsiveHeight,
} from "react-native-responsive-dimensions";

const MemorialParkDesignLayout = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
	},
	view1: {
		position: "relative",
		display: "flex",
		alignItems: "center",
		backgroundColor: "#ffffff",
	},
	bg1: {
		zIndex: -1,
		// backgroundColor: "#EE8A72",
		resizeMode: "cover",
	},
	cloud1: {
		zIndex: -2,
		position: "absolute",
		resizeMode: "cover",
		top: responsiveHeight(55),
	},
	cloud2: {
		position: "absolute",
		resizeMode: "cover",
		top: responsiveHeight(50),
		left: responsiveWidth(0),
	},
	grass1: {
		position: "absolute",
		top: responsiveHeight(50),
		right: responsiveWidth(43),
		transform: [{ scale: 1 }],
	},
	grass2: {
		position: "absolute",
		top: responsiveHeight(48),
		right: responsiveWidth(35),
		transform: [{ scale: 0.8 }],
	},
	grass3: {
		position: "absolute",
		top: responsiveHeight(50),
		left: responsiveWidth(36),
		transform: [{ scale: 1 }],
	},
	grass4: {
		position: "absolute",
		top: responsiveHeight(47),
		left: responsiveWidth(44),
		transform: [{ scale: 0.9 }],
	},
	grass5: {
		position: "absolute",
		top: responsiveHeight(48),
		left: responsiveWidth(30),
		transform: [{ scale: 0.9 }],
	},
	grass6: {
		position: "absolute",
		top: responsiveHeight(49),
		right: responsiveWidth(25),
		transform: [{ scale: 1 }],
	},
	sectionHeader: {
		paddingTop: 2,
		paddingLeft: 10,
		paddingRight: 10,
		paddingBottom: 2,
		fontSize: 49,
		fontWeight: "bold",
		backgroundColor: "red",
	},
	item: {
		padding: 10,
		fontSize: 20,
		height: 44,
	},
	ripdetailbtn: {},

	ripnfbtn: {
		position: "absolute",
		top: responsiveHeight(40),
		borderRadius: 20,
		paddingHorizontal: responsiveWidth(5),
		paddingVertical: responsiveHeight(1),
		backgroundColor: "#91b4e6",
		alignItems: "center",
		justifyContent: "center",
	},
	ripnftbtntext: {
		fontSize: 20,
		color: "#ffffff",
	},
	nftcontainer: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
	},
	linearalign: {
		position: "relative",
		alignItems: "center",
		justifyContent: "center",
	},
	lineralignbg: {
		flex: 1,
		position: "absolute",
		opacity: 0.4,
		height: responsiveHeight(80),
		// resizeMode: "cover",
		// transform: [{ scale: 1 }],
	},
	nftview: {
		height: responsiveHeight(80),
		width: responsiveWidth(100),
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: "#ffffff",
		marginHorizontal: responsiveWidth(20),
	},
	nftbg: {
		marginTop: responsiveHeight(5),
		// display: "flex",
		height: responsiveHeight(40),
		width: responsiveWidth(80),
		// paddingHorizontal: responsiveWidth(30),
		marginHorizontal: responsiveWidth(10),
		backgroundColor: "rgba(0, 0, 0, 0.6)",
		borderRadius: 30,
		position: "relative",
	},
	nftbgtitle: {
		justifyContent: "center",
		alignItems: "center",
		paddingVertical: responsiveHeight(2),
		paddingHorizontal: responsiveWidth(2),
	},
	nftbgtitletext: {
		fontSize: 20,
		color: "#ffffff",
		fontWeight: "bold",
	},

	nftinnercontainer: {
		zIndex: 1,
		paddingHorizontal: responsiveWidth(4),
		paddingVertical: responsiveHeight(2),
		display: "flex",
		flexDirection: "row",
	},
	nfttext: {
		fontSize: 20,
		color: "#ffffff",
		fontWeight: "bold",
	},
	nfttext2: {
		fontSize: 20,
		color: "black",
		fontWeight: "bold",
	},
	ripdetailalign: { justifyContent: "center", alignItems: "center" },

	ripnftinnerbtncontainer: {
		alignItems: "center",
		justifyContent: "center",
		width: responsiveWidth(30),
	},
	ripnftinnerbtn: {
		borderRadius: 20,
		paddingHorizontal: responsiveWidth(5),
		paddingVertical: responsiveHeight(1),
	},

	ripnftinnertext: {
		fontSize: 20,
		color: "#ffffff",
	},
	ripnftinnermainimg: {
		height: responsiveHeight(20),
		width: responsiveWidth(30),
		borderRadius: 20,
		resizeMode: "cover",
	},
	ripnftinnersubimg: {
		height: responsiveHeight(8),
		width: responsiveWidth(12),
		borderRadius: 10,
		resizeMode: "cover",
		marginHorizontal: 2,
	},

	ripnftrow1: {
		display: "flex",
		flexDirection: "column",
	},
	ripnftrow2: {
		display: "flex",
		flexDirection: "column",
		justifyContent: "space-between",
		paddingHorizontal: responsiveWidth(2),
		width: responsiveWidth(40),
		overflow: "scroll",
	},
	ripnftbwn: {
		display: "flex",
		flexDirection: "row",
		justifyContent: "space-between",
	},
	nfttextdate: {
		fontSize: 13,
		color: "#ffffff",
	},
	modalcontainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	modalinnercontainer: {
		position: "relative",
		width: responsiveWidth(80),
		height: responsiveHeight(60),
		backgroundColor: "rgba(255, 255, 255, 0.9)",
		padding: 20,
		borderRadius: 10,
		elevation: 20,
	},
	modaltitlecontainer: {
		alignItems: "center",
		justifyContent: "center",
	},
	modaltitle: {
		fontSize: 20,
		fontWeight: "bold",
		paddingVertical: responsiveHeight(2),
		// backgroundColor: "red",
	},
	modalclosebtn: {
		position: "absolute",
		backgroundColor: "#2196F3",
		paddingHorizontal: responsiveWidth(2),
		paddingVertical: responsiveHeight(0.5),
		borderRadius: 10,
		top: 30,
		right: 30,
	},
	modalclosetext: {
		color: "black",
		fontSize: 20,
		fontWeight: "bold",
	},
	modalcontentcontainer: {
		paddingVertical: responsiveHeight(2),
		flexDirection: "row",
		display: "flex",
		// alignItems: "center",
		// justifyContent: "space-between",
	},
	modalcontents: {
		display: "flex",
		paddingHorizontal: responsiveWidth(3),
		flexDirection: "column",
		justifyContent: "space-between",
		// backgroundColor: "red",
		paddingVertical: responsiveHeight(2),
		// backgroundColor: "red",
	},
	modalcontentrow: {
		width: responsiveWidth(35),
		display: "flex",
		flexDirection: "row",
		// alignItems: "center",
		justifyContent: "space-between",
	},
	modalcontentimg: {
		height: responsiveHeight(12),
		width: responsiveWidth(20),
		borderRadius: 20,
		resizeMode: "cover",
	},
	modalcontenttitle: {
		fontSize: 20,
		fontWeight: "bold",
	},
	modalcontentdatetitle: {
		fontSize: 14,
	},
	ripregistercontainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "rgba(0,0,0,0.5)",
	},
	ripregistermodal: {
		width: 300,
		padding: 20,
		backgroundColor: "white",
		borderRadius: 10,
	},
	ripregistercontent: { fontSize: 18, marginBottom: 20 },
	ripregistertitle: { fontSize: 18, fontWeight: "bold" },
	ripregisterapplycontainer: {
		flexDirection: "row",
		justifyContent: "space-between",
	},
	ripregisteryes: {
		fontSize: 16,
		color: "blue",
		fontWeight: "bold",
		paddingHorizontal: responsiveWidth(10),
		// backgroundColor: "red",
	},
	ripregisterno: {
		fontSize: 16,
		color: "red",
		fontWeight: "bold",
		paddingHorizontal: responsiveWidth(10),
	},
	scrollview: {
		marginLeft: responsiveWidth(2),
		display: "flex",
		flexDirection: "row",
	},
	riptitlename: {
		// width: responsiveWidth(4),
	},

	registerdesign: {
		position: "absolute",
		left: responsiveWidth(0),
		// fontWeight : "bold",
	},
});

export default MemorialParkDesignLayout;
