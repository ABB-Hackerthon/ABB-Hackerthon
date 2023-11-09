import {
	View,
	Text,
	StyleSheet,
	Image,
	TouchableOpacity,
	Modal,
} from "react-native";
import CommonLayout from "../components/CommonLayout";
import ColorHeader from "../components/ColorHeader";
import Footer from "../components/Footer";
import {
	responsiveHeight,
	responsiveWidth,
} from "react-native-responsive-dimensions";
import { LinearGradient } from "react-native-linear-gradient";
import { useState } from "react";
import QRCode from "react-native-qrcode-svg";

const WAlletCardList = () => {
	const wallet1 = {
		분류: "식품",
		id: 1,
		name: "쿠폰이름1",
		유효기간: "2021-09-01",
		품목: "품목입니다.",
		할인율: "10%",
		발행일: "2021-08-01",
		쿠폰번호: "1234-1234-1234-1234",
	};

	const textToImg = {
		식품: {
			img: require("../../assets/images/food.png"),
			color: "#FD807E",
		},
	};

	const [walletList, setWalletList] = useState([wallet1, wallet1, wallet1]);

	const [selectedWallet, setSelectedWallet] = useState(null);
	const [modalVisible, setModalVisible] = useState(false);

	// 모달을 여는 함수
	const openModal = (wallet) => {
		setSelectedWallet(wallet);
		setModalVisible(true);
	};

	// 모달을 닫는 함수
	const closeModal = () => {
		setModalVisible(false);
		setSelectedWallet(null); // 선택된 지갑 정보 초기화
	};
	return (
		<>
			<CommonLayout>
				<ColorHeader title={"내 지갑"}></ColorHeader>
				<View>
					<LinearGradient
						style={styles.container}
						colors={["#52B5ED", "#EB3131"]}
					></LinearGradient>
				</View>
				<View style={styles.btncontainer}>
					<View style={styles.btncontentcontainer}>
						<Text>텍스트</Text>
					</View>
				</View>

				<View style={styles.walletList}>
					<View style={styles.walletTable}>
						<Text> 테이블에 넣어야 할 것 </Text>
					</View>
					{walletList?.map((wallet, index) => {
						const categoryData = textToImg[wallet.분류] || {
							img: "",
							color: "",
						};
						const img = categoryData.img;
						const color = categoryData.color;

						// Image 컴포넌트에 이미지 소스를 올바르게 전달
						const imageSource =
							typeof img === "string" && img.startsWith("http")
								? { uri: img }
								: img; // 로컬 이미지일 경우 require(img)를 사용해야 합니다.
						return (
							<TouchableOpacity
								key={index}
								style={styles.wallet}
								onPress={() => {
									openModal(wallet);
								}}
							>
								<View style={[styles.imgcontainer, { backgroundColor: color }]}>
									<Image style={styles.couponImg} source={img}></Image>
								</View>
								<View style={styles.wallettextcol}>
									<Text>{wallet.name}</Text>
									<Text>유효기간: {wallet.유효기간}</Text>
								</View>
								<Text>품목: {wallet.품목}</Text>
								<View>
									<Text>{wallet.할인율}</Text>
								</View>
							</TouchableOpacity>
						);
					})}
				</View>

				<Modal
					animationType="slide"
					transparent={true}
					visible={modalVisible}
					onRequestClose={closeModal}
				>
					<View style={styles.centeredView}>
						<View style={styles.modalView}>
							{/* 모달 내부 정보 표시 */}
							{selectedWallet && (
								<>
									<View style={styles.cardcontainer}>
										<Text style={styles.modalText}>{selectedWallet?.name}</Text>
										<Text>유효기간: {selectedWallet?.유효기간}</Text>
										<Text>번호: {selectedWallet.쿠폰번호}</Text>
									</View>
									<View style={styles.qrImg}>
										<QRCode
											value={selectedWallet.쿠폰번호}
											size={200} // QR 코드의 크기를 정할 수 있습니다.
											color="black" // QR 코드의 색상을 지정할 수 있습니다.
											backgroundColor="white"
										/>
									</View>
								</>
							)}

							<TouchableOpacity style={styles.button} onPress={closeModal}>
								<Text style={styles.buttonText}>닫기</Text>
							</TouchableOpacity>
						</View>
					</View>
				</Modal>

				<Footer />
			</CommonLayout>
		</>
	);
};

export default WAlletCardList;

const styles = StyleSheet.create({
	container: {
		position: "relative",
		justifyContent: "center",
		alignItems: "center",
		height: responsiveHeight(30),
		backgroundColor: "#fff",
	},
	btncontainer: {
		position: "absolute",
		height: responsiveHeight(10),
		width: responsiveWidth(100),
		top: responsiveHeight(30),
		zIndex: 1,
		borderRadius: 20,
	},
	btncontentcontainer: {
		backgroundColor: "#fff",
		justifyContent: "center",
		alignItems: "center",
		height: responsiveHeight(13),
		marginHorizontal: responsiveWidth(5),
		borderRadius: 15,
	},
	walletTable: {
		marginVertical: responsiveHeight(2),
	},
	walletList: {
		marginTop: 50,
		marginHorizontal: responsiveWidth(5),
	},
	wallet: {
		flexDirection: "row",
		justifyContent: "space-between",

		marginVertical: responsiveHeight(1),
		backgroundColor: "#fff",
		paddingHorizontal: 20,
		paddingVertical: 20,
		borderRadius: 15,
	},
	wallettextcol: {
		flexDirection: "column",
		justifyContent: "space-between",
	},
	imgcontainer: {
		justifyContent: "center",
		alignItems: "center",
		borderRadius: 50,
		padding: 10,
		marginRight: responsiveWidth(4),
	},
	couponImg: {
		width: 20,
		height: 20,
		resizeMode: "contain",
	},
	modalcontainer: {
		backgroundColor: "rgba(0,0,0,0.5)",
	},
	centeredView: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		marginTop: 22,
	},
	modalView: {
		margin: 20,
		backgroundColor: "white",
		borderRadius: 20,
		padding: 35,
		alignItems: "center",
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 4,
		elevation: 5,
	},
	button: {
		borderRadius: 20,
		padding: 10,
		elevation: 2,
	},
	buttonText: {
		color: "white",
		fontWeight: "bold",
		textAlign: "center",
	},
	modalText: {
		marginBottom: 15,
		textAlign: "center",
	},
	cardcontainer: { marginBottom: 20 },
	qrImg: {
		marginBottom: 20,
	},
});
