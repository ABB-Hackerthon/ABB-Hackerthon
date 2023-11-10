import { useState, useEffect } from "react";
import {
	View,
	Text,
	TextInput,
	Modal,
	Image,
	TouchableOpacity,
	Alert,
	StyleSheet,
} from "react-native";
import ColorHeader from "../components/ColorHeader";
import CommonLayout from "../components/CommonLayout";
import Footer from "../components/Footer";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import * as SecureStore from "expo-secure-store";

import axios from "../utils/axios";

import DatePickerIcon from "../../assets/images/date-picker-icon.png";
import AddPlusIcon from "../../assets/images/add-plus-icon.png";

import CreateProfileLayout from "../styles/createProfileLayout";
import {
	responsiveHeight,
	responsiveWidth,
} from "react-native-responsive-dimensions";
import { ABB_BASE_URL } from "../constants/constants";
import { ABB_APP_KEY } from "@env";

const EditProfile = ({ navigation, route }: any) => {
	const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
	const [selectedDog, setSelectedDog] = useState<Object>();
	const [myWalletAddress, setMyWalletAddress] = useState<String>();

	const [nowDid, setNowDid] = useState("");
	const [jwtList, setJwtList] = useState([]);
	const [didInfo, setDidInfo] = useState({});

	const getDid = async () => {
		const nowDID = await SecureStore.getItemAsync("did");
		setNowDid(nowDID);
		console.log(nowDID);
	};

	const getDidInfo = async () => {
		console.log("들어오는지확인");
		const response = await axios.post(
			`${ABB_BASE_URL}/v1/mitumt/did/disclosure`,
			{
				token: ABB_APP_KEY,
				chain: "mitumt",
				did: nowDid,
				template_id: "15096075413786892734",
			},
		);
		const { jwt_list, did_info } = response.data.data;
		console.log(jwtList);
		console.log(didInfo);
        setJwtList(jwt_list || []); // API가 배열을 반환하지 않을 경우를 대비해 빈 배열을 설정
        setDidInfo(did_info || {}); // API가 객체를 반환하지 않을 경우를 대비해 빈 객체를 설정
      };

	useEffect(() => {
		getDid();
		getDidInfo();
	}, [nowDid]);

	const showDatePicker = () => {
		setDatePickerVisibility(true);
	};

	const hideDatePicker = () => {
		setDatePickerVisibility(false);
	};

	const handleConfirm = (date: string) => {
		console.warn("사용자가 선택한 날짜: ", date);
		hideDatePicker();
	};

	const handleDetail = async () => {
		console.log("DDD");
		setModalVisible(!modalVisible);
	};

	useEffect(() => {
		const selectedNo = route.params.selectedNo;

		axios.get(`/dog/${selectedNo}`).then((data) => {
			if (data.status === 200) {
				setSelectedDog(data.data.data);
			}
		});

		const getAddress = async () => {
			const address = await process.env.MINT_DOG_TOKEN_ADDRESS;
			setMyWalletAddress(String(address));
		};

		getAddress();
	}, []);

	const [modalVisible, setModalVisible] = useState(false);
	return (
		<>
			<CommonLayout>
				<ColorHeader title="반려견 상세보기" />
				<View style={CreateProfileLayout.createProfileTitleWrap}>
					<Text style={CreateProfileLayout.createProfileDesc}>반려견 NFT</Text>
					<Text style={CreateProfileLayout.createProfileTitle}>
						내 NFT에 저장하는,{"\n"}
						나의 반려견
					</Text>
				</View>
				{selectedDog?.dogImg ? (
					<Image
						source={{ uri: selectedDog?.dogImg }}
						style={CreateProfileLayout.editShowDogImg}
					/>
				) : (
					<></>
				)}

				<View style={CreateProfileLayout.formWrap}>
					<Text style={CreateProfileLayout.formTitle}>
						반려견의 이름을 입력해주세요.
					</Text>
					<TextInput
						style={CreateProfileLayout.formInput}
						value={selectedDog?.dogName}
					/>
					<Text style={CreateProfileLayout.formTitle}>
						반려견의 종을 입력해주세요.
					</Text>
					<TextInput
						style={CreateProfileLayout.formInput}
						value={selectedDog?.dogBreed}
					/>
					<Text style={CreateProfileLayout.formTitle}>
						반려견의 성별을 입력해주세요.
					</Text>
					<TextInput
						style={CreateProfileLayout.formInput}
						value={selectedDog?.dogSex}
					/>
					<Text style={CreateProfileLayout.formTitle}>
						반려견의 생일을 입력해주세요.
					</Text>
					<TouchableOpacity activeOpacity={0.7} onPress={showDatePicker}>
						<View style={CreateProfileLayout.dateFormWrap}>
							<Image source={DatePickerIcon} />
							<Text style={CreateProfileLayout.dateFormText}>
								{selectedDog?.dogBirthDate}
							</Text>
						</View>
					</TouchableOpacity>
					<DateTimePickerModal
						isVisible={isDatePickerVisible}
						mode="date"
						onConfirm={handleConfirm}
						onCancel={hideDatePicker}
					/>
					<Text style={CreateProfileLayout.formTitle}>
						반려견이 등록된 지갑 주소입니다.
					</Text>
					<TextInput
						style={CreateProfileLayout.formInput}
						value={myWalletAddress}
					/>
					<Text style={CreateProfileLayout.formTitle}>
						내 반려견의 token id입니다.
					</Text>
					{selectedDog?.dogNft === null ? (
						<TextInput
							style={CreateProfileLayout.formInput}
							value="token id 생성 전 입니다. 최대 하루까지 소요될 수 있습니다."
						/>
					) : (
						<TextInput
							style={CreateProfileLayout.formInput}
							value={String(selectedDog?.dogNft)}
						/>
					)}
				</View>

				<View style={CreateProfileLayout.formButtonWrap}>
					<TouchableOpacity activeOpacity={0.7} onPress={() => handleDetail()}>
						<View style={CreateProfileLayout.submitButton}>
							<Text style={CreateProfileLayout.submitButtonText}>
								DID 상세보기
							</Text>
						</View>
					</TouchableOpacity>
					<TouchableOpacity
						activeOpacity={0.7}
						onPress={() => navigation.navigate("Profile")}
					>
						<View style={CreateProfileLayout.cancelButton}>
							<Text style={CreateProfileLayout.cancelButtonText}>취소하기</Text>
						</View>
					</TouchableOpacity>
				</View>

				<Modal
					animationType="slide"
					transparent={true}
					visible={modalVisible}
					onRequestClose={() => {
						Alert.alert("Modal has been closed.");
						setModalVisible(!modalVisible);
					}}
				>
					<View style={styles.centeredView}>
						<View style={styles.modalView}>
							<Text style={styles.modalText}>{nowDid}</Text>
							{/* <Text style={styles.modalText}>{jwtList}</Text> */}
							{/* <Text style={styles.modalText}>{didInfo}</Text> */}

							{jwtList &&
								jwtList.map((jwtItem, index) => (
									<Text key={index} style={styles.modalText}>
										Key: {jwtItem.key}, JWT: {jwtItem.jwt}
									</Text>
								))}

							<Text style={styles.modalText}>
								Template Name: {didInfo.template?.name || "N/A"}
							</Text>
							<Text style={styles.modalText}>
								Service Date: {didInfo.template?.service_dt || "N/A"}
							</Text>

							<TouchableOpacity
								style={[styles.button, styles.buttonClose]}
								onPress={() => setModalVisible(!modalVisible)}
							>
								<Text style={styles.textStyle}>나가기</Text>
							</TouchableOpacity>
						</View>
					</View>
				</Modal>
				<Footer />
			</CommonLayout>
		</>
	);
};

export default EditProfile;

const styles = StyleSheet.create({
	centeredView: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		marginTop: 22,
	},
	modalView: {
		margin: 20,
		borderRadius: 20,
		backgroundColor: "#fff",
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
		width: responsiveWidth(85),
	},
	buttonOpen: {
		backgroundColor: "#F194FF",
	},
	buttonClose: {
		backgroundColor: "#EE8A72",
		width: responsiveWidth(70),
		paddingVertical: responsiveHeight(2),
		borderRadius: 20,
	},
	textStyle: {
		color: "white",
		fontWeight: "bold",
		textAlign: "center",
	},
	modalText: {
		marginBottom: 15,
		textAlign: "center",
	},
	button: {
		// backgroundColor: "#EE8A72",
	},
	Text1: {
		fontSize: 15,
	},
});
