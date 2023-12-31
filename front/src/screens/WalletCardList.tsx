import {
	View,
	Text,
	StyleSheet,
	Image,
	TouchableOpacity,
	Modal,
} from "react-native";
import * as SecureStore from "expo-secure-store";
import {
	ABB_APP_KEY,
	CONTRACT_ADDRESS_COFFEE,
	CONTRACT_ADDRESS_DOG_FOOD,
	CONTRACT_ADDRESS_GAS,
} from "@env";
import { ABB_BASE_URL } from "../constants/constants";
import CommonLayout from "../components/CommonLayout";
import ColorHeader from "../components/ColorHeader";
import Footer from "../components/Footer";
import {
	responsiveHeight,
	responsiveWidth,
} from "react-native-responsive-dimensions";
import { LinearGradient } from "react-native-linear-gradient";
import { useEffect, useState } from "react";
import QRCode from "react-native-qrcode-svg";
import axios from "axios";
import Icon from "react-native-vector-icons/FontAwesome";

type Wallet = {
	name: string;
	period: string;
	contractAddress: string;
	discount: string;
	balance: number;
	recognize: string;
	imageSource: string;
};

const WAlletCardList = () => {
	const [walletList, setWalletList] = useState<Wallet[]>([]);
	const [selectedWallet, setSelectedWallet] = useState(null);
	const [modalVisible, setModalVisible] = useState(false);

	const selectMyAsset = async () => {
		try {
			const response = await axios.post(
				`${ABB_BASE_URL}/v1/mitumt/token/tokens`,
				{
					token: ABB_APP_KEY,
					chain: "mitumt",
				},
			);
			const responseJSON = JSON.parse(response.request._response);
			const contractList = responseJSON.data;

			let newWalletList: Wallet[] = [];

			for (let i = 0; i < contractList.length; i++) {
				const element = contractList[i];
				const contractAddress = element.contract.data.address;
				console.log(contractAddress);
				const myAddress = await SecureStore.getItemAsync("address");
				const balanceResponse = await axios.post(
					`${ABB_BASE_URL}/v1/mitumt/token/balance`,
					{
						token: ABB_APP_KEY,
						chain: "mitumt",
						cont_addr: contractAddress,
						addr: myAddress,
					},
				);

				let balance = balanceResponse.data.data.balance;
				let name, discount, period, recognize, imageSource;

				if (contractAddress === CONTRACT_ADDRESS_COFFEE && balance > 0) {
					imageSource = require("../../assets/images/icon_Coffee_.png");
					recognize = "커피";
					name = "커피 할인 쿠폰";
					discount = "5%";
					period = "2023-12-11";
				} else if (
					contractAddress === CONTRACT_ADDRESS_DOG_FOOD &&
					balance > 0
				) {
					imageSource = require("../../assets/images/icon_dogfoodii_.png");
					recognize = "사료";
					name = "강아지 사료 할인 쿠폰";
					discount = "10%";
					period = "2023-12-11";
				} else if (contractAddress === CONTRACT_ADDRESS_GAS && balance > 0) {
					imageSource = require("../../assets/images/icon_GasPump_.png");
					recognize = "주유소";
					name = "주유소 할인 쿠폰";
					discount = "5%";
					period = "2023-12-11";
				} else {
					continue;
				}

				newWalletList.push({
					imageSource,
					recognize,
					name,
					period,
					contractAddress,
					discount,
					balance,
				});
			}

			setWalletList(newWalletList);
		} catch (error) {
			console.error("Error fetching wallet data:", error);
		}
	};

	useEffect(() => {
		selectMyAsset();
	}, []);

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
						<Text>쿠폰함</Text>
					</View>
				</View>

				<View style={styles.walletList}>
					<View style={styles.walletTable}>
						<Text> 아이템 리스트 </Text>
					</View>
					{walletList?.map((wallet, index) => {
						return (
							<>
								<TouchableOpacity
									key={index}
									style={styles.wallet}
									onPress={() => {
										openModal(wallet);
									}}
								>
									{/* <Image
										style={styles.couponImg}
										source={{ uri: wallet.imageSource }} // 이미지 소스
									/> */}
									<View style={styles.wallettextcol}>
										<Text>{wallet.name}</Text>
										{/* <Text>유효기간: {wallet.period}</Text> */}
										<Text>저장된 갯수: {wallet.balance}</Text>
									</View>
									<Text>품목: {wallet.recognize}</Text>
									<View>
										<Text>{wallet.discount}</Text>
									</View>
								</TouchableOpacity>
							</>
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
										{/* <Text>유효기간: {selectedWallet?.period}</Text> */}
										<Text>토큰번호: {selectedWallet.contractAddress}</Text>
									</View>
									<View style={styles.qrImg}>
										<QRCode
											value={selectedWallet.contractAddress}
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
		width: 30,
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
