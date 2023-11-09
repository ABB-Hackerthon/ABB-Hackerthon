import { useState, useRef, useEffect } from "react";
import {
	View,
	Text,
	TextInput,
	Image,
	TouchableOpacity,
	Platform,
	Alert,
} from "react-native";
import ColorHeader from "../components/ColorHeader";
import CommonLayout from "../components/CommonLayout";
import Footer from "../components/Footer";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import * as SecureStore from "expo-secure-store";
import { mintDogTokenContract } from "../contracts/contract";
import * as ImagePicker from "expo-image-picker";
import axiosApi from "../utils/axios";
import axios from "axios";
import { Picker } from "@react-native-picker/picker";
import { S3 } from "aws-sdk";
import {
	AWS_ACCESS_KEY,
	AWS_SECRET_ACCESS_KEY,
	AWS_REGION,
	AWS_BUCKET,
	ABB_APP_KEY,
	DID_PROJECT_ID,
} from "@env";
import RNFS from "react-native-fs";
import { ethers } from "ethers";
import { ABB_BASE_URL } from "../constants/constants";

import WalletLoading from "../components/WalletLoading";

import DatePickerIcon from "../../assets/images/date-picker-icon.png";
import AddPlusIcon from "../../assets/images/add-plus-icon.png";
import PhotoImg from "../../assets/images/photo-ex-img4.png";

import CreateProfileLayout from "../styles/createProfileLayout";

const CreateProfile = ({ navigation }: any) => {
	const [imageUri, setImageUri] = useState<any>(null);
	const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
	const [walletAddress, setWalletAddress] = useState<string>();
	const [walletPrivateKey, setWalletPrivateKey] = useState<string>();
	const [petName, setPetName] = useState<string | null>();
	const [petSpecies, setPetSpecies] = useState<string | null>();
	const [petGender, setPetGender] = useState<string | null>("M");
	const [petBirth, setPetBirth] = useState<string | null>(
		new Date().getFullYear() +
			"-" +
			("0" + Number(1 + Number(new Date().getMonth()))).slice(-2) +
			"-" +
			("0" + new Date().getDate()).slice(-2),
	);
	const [secretkey, setSecretkey] = useState<any>(null);
	const [speciesList, setSpeciesList] = useState<any[]>([]);
	const [hashId, setHashId] = useState<any>();
	const [isLoading, setIsLoading] = useState<Boolean>(false);
	const [myWalletAddress, setMyWalletAddress] = useState<string>();
	const [searchTerm, setSearchTerm] = useState(""); // 검색어 상태
	const [dropdownVIsible, setDropdownVisible] = useState(false);

	const showDatePicker = () => {
		setDatePickerVisibility(true);
	};

	const hideDatePicker = () => {
		setDatePickerVisibility(false);
	};

	const handleConfirm = async (date: string) => {
		console.log("handle confirm date:", date);

		const dateAll = new Date(date);
		var year = dateAll.getFullYear();
		var month = ("0" + (1 + dateAll.getMonth())).slice(-2);
		var day = ("0" + dateAll.getDate()).slice(-2);
		await setPetBirth(year + "-" + month + "-" + day);
		hideDatePicker();
	};

	// s3 클라이언트 초기화
	const s3 = new S3({
		accessKeyId: AWS_ACCESS_KEY,
		secretAccessKey: AWS_SECRET_ACCESS_KEY,
		region: AWS_REGION,
	});

	//template subjectkey 스위치문
	
	// useEffect(() => {
	// 	getSecure();
	// }, []);

	// const getSecure = async () => {
	// 	const secret = await SecureStore.getItemAsync(
	// 		"privatekey",
	// 	);
	// 	setSecretkey(secret);
	// }

	const uploadImage = async (uri) => {
		const response = await fetch(uri);
		const blob = await response.blob();
		const filename = uri.split("/").pop();
		const type = blob.type;
		const params = {
		  Bucket: AWS_BUCKET,
		  Key: filename,
		  Body: blob,
		  ContentType: type,
		};
	  
		s3.upload(params, async (err, data) => {
		  if (err) {
			alert("s3 시스템 에러, 관리자에게 문의하세요.");
			setIsLoading(false);
			console.log("err", err);
			return;
		  }
	  
		  const s3ImageUrl = data.Location;
		  try {
			// 2. Issue Credential 생성 (DID에 들어가는 세부항목-조건?)
			// 2-1. template 리스트 받아오기
			const nowDID = await SecureStore.getItemAsync("did");
			const response = await axios.post(
			  `${ABB_BASE_URL}/v1/mitumt/did/templates`,
			  {
				token: ABB_APP_KEY,
				chain: "mitumt",
				project_id: DID_PROJECT_ID,
			  }
			);
	  
			const templateList = response.data.data;
			let templateValue;
	  
			for (const element of templateList) {
			  console.log("element : ", element);
			  const templateId = element.template_id;
			  console.log("templateId : ", templateId);
			  const value = element.subject_key;
	  
			  if (value === "dogBirth") {
				templateValue = petBirth;
			  } else if (value === "dogBreed") {
				templateValue = petSpecies;
			  } else if (value === "dogName") {
				templateValue = petName;
			  } else if (value === "dogSex") {
				templateValue = petGender;
			  } else if (value === "dogOwner") {
				await axiosApi.get("/user").then((data) => {
				  if (data.data.message === "회원 정보 조회 완료") {
					console.log("user", data.data.data);
					console.log("userName", data.data.data.userName);
					templateValue = data.data.data.userName;
				  }
				}).catch((error) => {
				  console.log("현재 에러상황발생", error);
				});
			  }
	  
			  console.log("templateSubjectKey : ", value);
			  console.log("templateValue : ", templateValue);
	  
			  // 2-2. DID Template 를 기준으로 크리덴셜을 발행
			  const issueResponse = await axios.post(
				`${ABB_BASE_URL}/v1/mitumt/did/issue`,
					{
						"token": ABB_APP_KEY,
						"chain": "mitumt",
						"did": nowDID,
						"template_id": templateId,
						"subject": {
							"key": value,
							"value": templateValue
						},
						"validfrom": "2023-11-01T00:00:00.000Z",
						"validuntil": "2023-12-31T23:59:59.999Z"
					}
			  );

			  console.log("issueResponse : ",issueResponse);
			}
	  
			// 3. DB에 강아지 정보 저장
			const idogResponse = await axiosApi.post(`/dog`, {
			  dogName: petName,
			  dogBreed: petSpecies,
			  dogBirthDate: petBirth,
			  dogSex: petGender,
			  dogHash: "",
			  dogImg: String(s3ImageUrl),
			});
	  
			if (idogResponse.data.message === "강아지 프로필 등록 완료") {
			  Alert.alert("프로필 생성이 완료되었습니다.");
			  setIsLoading(false);
			  navigation.replace("Profile");
			} else {
			  setIsLoading(false);
			  alert("프로필 생성 실패, 관리자에게 문의하세요.");
			}
		  } catch (error) {
			console.log(error);
		  }
		});
	  };
	  
	const uploadIpfs = async () => {
		try {
			await setIsLoading(true);
			await uploadImage(imageUri);
		} catch (err) {
			await setIsLoading(false);
			alert("민팅 생성 에러, 관리자에게 문의하세요.");
		}
	};

	// 권한 요청
	const getPermissionAsync = async () => {
		if (Platform.OS !== "web") {
			const { status } =
				await ImagePicker.requestMediaLibraryPermissionsAsync();
			if (status !== "granted") {
				// 권한이 거부되었을 때 alert
				alert("Sorry, we need camera roll permissions to make this work!");
			}
		}
	};

	// 이미지 선택
	const pickImage = async () => {
		await getPermissionAsync(); // 권한 확인

		// 이미지 또는 동영상 선택 -> 당연히 비동기
		let result = await ImagePicker.launchImageLibraryAsync({
			// 일단 모든 타입 다 허용 동영상도 허용해뒀음
			mediaTypes: ImagePicker.MediaTypeOptions.All,
			// 편집 가능하게
			allowsEditing: true,
			// 가로세로 비율
			aspect: [3, 3],
			// 0 ~ 1 사이의 숫자로 품질 나타냄
			quality: 1,
		});

		console.log("result", result);
		if (!result.canceled) {
			console.log("img", result.assets[0].uri);
			setImageUri(result.assets[0].uri);
		}
	};

	useEffect(() => {
		const getWalletInfoFromStore = async () => {
			const walletAddress = await SecureStore.getItemAsync("address");
			if (walletAddress) {
				setWalletAddress(walletAddress);
			}
			const privateKey = await SecureStore.getItemAsync("privatekey");
			if (privateKey) {
				setWalletPrivateKey(privateKey);
			}
		};

		const getPetSpecies = async () => {
			axiosApi.get("/dog/breed").then((data) => {
				if (data.data.message === "견종 전체 목록 조회 완료") {
					setSpeciesList(() => {
						return data.data.data;
					});
				}
			});
		};

		const getWalletAddress = async () => {
			const myWalletAddress = await SecureStore.getItemAsync("address");
			setMyWalletAddress(String(myWalletAddress));
		};

		getWalletInfoFromStore();
		getPetSpecies();
		getWalletAddress();
	}, []);

	const filteredSpeciesList = speciesList.filter((species) => {
		if (!species.breedName || !searchTerm) return false;
		return species.breedName.toLowerCase().includes(searchTerm.toLowerCase());
	});

	return (
		<>
			<CommonLayout>
				<ColorHeader title="프로필 작성" />
				<View style={CreateProfileLayout.createProfileTitleWrap}>
					<Text style={CreateProfileLayout.createProfileDesc}>반려견 NFT</Text>
					<Text style={CreateProfileLayout.createProfileTitle}>
						내 NFT에 저장하는,{"\n"}
						나의 반려견
					</Text>
				</View>
				<TouchableOpacity activeOpacity={0.7} onPress={pickImage}>
					<View style={CreateProfileLayout.imageUploadWrap}>
						<Image source={AddPlusIcon} />
						<Text>사진 등록하기</Text>
					</View>
				</TouchableOpacity>
				<View>
					{imageUri && (
						<Image
							source={{ uri: imageUri }}
							style={CreateProfileLayout.selectedImage}
						/>
					)}
				</View>
				<View style={CreateProfileLayout.formWrap}>
					<Text style={CreateProfileLayout.formTitle}>
						반려견의 이름을 입력해주세요.
					</Text>
					<TextInput
						style={CreateProfileLayout.formInput}
						onChangeText={(text) => setPetName(text)}
						value={petName}
					/>
					<Text style={CreateProfileLayout.formTitle}>
						반려견의 종을 입력해주세요.
					</Text>

					<>
						<TextInput
							style={CreateProfileLayout.formInput}
							value={petSpecies || ""}
							onChangeText={(text) => {
								setPetSpecies(text);
								setSearchTerm(text); // 검색어 업데이트
								setDropdownVisible(true);
							}}
							placeholder="종을 검색해 아래를 클릭하세요"
							onBlur={() => setDropdownVisible(false)}
						/>
						{dropdownVIsible ? (
							<Picker
								selectedValue={petSpecies} // 여기는 petSpecies를 사용합니다.
								onValueChange={(itemValue, itemIndex) => {
									setPetSpecies(itemValue);
									setSearchTerm(`${itemValue}`);
								}}
								style={CreateProfileLayout.formInput}
							>
								<Picker.Item
									key={-1}
									label={`"${petSpecies}"검색결과를 클릭하세요`}
									value={""}
									style={{ color: "#EE8A72", fontWeight: "bold", fontSize: 16 }}
								/>
								{filteredSpeciesList.map((species, index) => {
									return (
										<Picker.Item
											key={index}
											label={species.breedName}
											value={species.breedName}
											style={{ color: "#000000" }}
										/>
									);
								})}
							</Picker>
						) : null}
					</>

					<Text style={CreateProfileLayout.formTitle}>
						반려견의 성별을 입력해주세요.
					</Text>
					<Picker
						selectedValue={petGender}
						onValueChange={(itemValue, itemIndex) => setPetGender(itemValue)}
						style={CreateProfileLayout.formInput}
					>
						<Picker.Item label="M" value="M" />
						<Picker.Item label="F" value="F" />
					</Picker>
					<Text style={CreateProfileLayout.formTitle}>
						반려견의 생일을 입력해주세요.
					</Text>
					<TouchableOpacity activeOpacity={0.7} onPress={showDatePicker}>
						<View style={CreateProfileLayout.dateFormWrap}>
							<Image source={DatePickerIcon} />
							<Text style={CreateProfileLayout.dateFormText}>{petBirth}</Text>
						</View>
					</TouchableOpacity>
					<DateTimePickerModal
						isVisible={isDatePickerVisible}
						mode="date"
						onConfirm={handleConfirm}
						onCancel={hideDatePicker}
					/>
				</View>
				{dropdownVIsible ? (
					<>
						<View style={{ marginTop: 33 }}></View>
						<View style={CreateProfileLayout.formButtonWrap}>
							{isLoading ? (
								<TouchableOpacity activeOpacity={0.7}>
									<View style={CreateProfileLayout.submitInactiveButton}>
										<Text style={CreateProfileLayout.submitInactiveButtonText}>
											프로필 생성하기
										</Text>
									</View>
								</TouchableOpacity>
							) : (
								<TouchableOpacity
									activeOpacity={0.7}
									onPress={() => {
										uploadIpfs();
									}}
								>
									<View style={CreateProfileLayout.submitButton}>
										<Text style={CreateProfileLayout.submitButtonText}>
											프로필 생성하기
										</Text>
									</View>
								</TouchableOpacity>
							)}

							<TouchableOpacity
								activeOpacity={0.7}
								onPress={() => navigation.navigate("Profile")}
							>
								<View style={CreateProfileLayout.cancelButton}>
									<Text style={CreateProfileLayout.cancelButtonText}>
										취소하기
									</Text>
								</View>
							</TouchableOpacity>
						</View>
					</>
				) : (
					<View style={CreateProfileLayout.formButtonWrap}>
						{isLoading ? (
							<TouchableOpacity activeOpacity={0.7}>
								<View style={CreateProfileLayout.submitInactiveButton}>
									<Text style={CreateProfileLayout.submitInactiveButtonText}>
										프로필 생성하기
									</Text>
								</View>
							</TouchableOpacity>
						) : (
							<TouchableOpacity
								activeOpacity={0.7}
								onPress={() => {
									uploadIpfs();
								}}
							>
								<View style={CreateProfileLayout.submitButton}>
									<Text style={CreateProfileLayout.submitButtonText}>
										프로필 생성하기
									</Text>
								</View>
							</TouchableOpacity>
						)}

						<TouchableOpacity
							activeOpacity={0.7}
							onPress={() => navigation.navigate("Profile")}
						>
							<View style={CreateProfileLayout.cancelButton}>
								<Text style={CreateProfileLayout.cancelButtonText}>
									취소하기
								</Text>
							</View>
						</TouchableOpacity>
					</View>
				)}

				<Footer />
			</CommonLayout>
			{isLoading ? (
				<WalletLoading title="프로필을 생성하는데 10초 이상 소요될 수 있습니다." />
			) : (
				<></>
			)}
		</>
	);
};

export default CreateProfile;
