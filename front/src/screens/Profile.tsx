import { useEffect, useRef, useState } from "react";
import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import GestureFlipView from "../components/GestureFlipView";
import CommonLayout from "../components/CommonLayout";
import ProfileItem from "../components/ProfileItem";
import NftProfile from "../components/NftProfile";
import Footer from "../components/Footer";
import * as SecureStore from "expo-secure-store";

import axios from "../utils/axios";
import { ABB_BASE_URL } from "../constants/constants";
import {
	ABB_APP_KEY,
} from "@env";

import WhiteHeader from "../components/WhiteHeader";
import SubMain from "../components/SubMain";
import SubMainImg from "../../assets/images/sub-main-bg.png";
import rightArrowIcon from "../../assets/images/right-arrow.png";
import ProfileLayout from "../styles/profileLayout";
import NftCardIcon from "../../assets/images/nft-card-icon.png";
import AdoptionIcon from "../../assets/images/adoption-icon.png";
import CertificateIcon from "../../assets/images/certificate-icon.png";
import AddPlusIcon from "../../assets/images/add-plus-icon.png";
import PuppyThumbnail1 from "../../assets/images/puppy-thumbnail1.png";

import MyPetThumbnail1 from "../../assets/images/my-pet-thumbnail1.png";

const Profile = ({ navigation }: any) => {
	const flipView = useRef<any>();
	const [dogList, setDogList] = useState<any>([]);
	const renderFront = () => {
		return (
			<View>
				<NftProfile
					dogName="내 반려견 해피"
					createdTitle="등록한 날짜"
					createdAt="2023. 09. 02."
					species="시베리안허스키"
					bgImg="../../assets/images/puppy-thumbnail1.png"
				/>
			</View>
		);
	};

	const renderBack = () => {
		return (
			<View>
				<NftProfile
					createdTitle="좌우로 회전해보세요"
					bgImg="../../assets/images/puppy-thumbnail1.png"
				/>
			</View>
		);
	};

	const createProfile = async (moveUri: string) => {
		const walletAddress = await SecureStore.getItemAsync("address");
		console.log("address", walletAddress);

		// 1. DID account 계정 생성
		const createDIDResponse = await axios.post(
			`${ABB_BASE_URL}/v1/mitumt/did/create_account`,
			{
			  token: ABB_APP_KEY,
			  chain: "mitumt",
			}
		  );
	
		  console.log("createDIDResponse.data.data : ", createDIDResponse.data.data);
		  const nowDID = createDIDResponse.data.data.did;
		  console.log("nowDID : ", nowDID);
		  await SecureStore.setItemAsync("did", nowDID);

		if (
			walletAddress === null ||
			walletAddress === undefined ||
			walletAddress === ""
		) {
			alert("생성된 지갑이 없습니다. 지갑 생성을 먼저 진행해 주세요.");
			navigation.navigate("CreateWalletMain");
			return;
		} else {
			navigation.navigate(moveUri);
		}
	};

	useEffect(() => {
		axios.get("/dog/list").then((data) => {
			if (data.data.message === "사용자의 모든 강아지 목록 조회 완료") {
				setDogList(data.data.data);
			}
		});
	}, []);

	return (
		<>
			<CommonLayout>
				<WhiteHeader title="프로필 만들기" />
				<SubMain
					subTitle="DID 프로필"
					mainTitle={`IDog는 내 반려견의\n프로필을 DID로 만들어\n평생 소장 프로필을 만듭니다.`}
					bgImg={SubMainImg}
					desc="프로필 만들기"
				/>
				<View style={ProfileLayout.profileWrap}>
					<Text style={ProfileLayout.subTitle}>DID Service</Text>
					<View style={ProfileLayout.titleWrap}>
						<Text style={ProfileLayout.mainTitle}>
							더 쉽고 간편한{"\n"}반려견 소유 증명
						</Text>
						<Image
							source={rightArrowIcon}
							style={ProfileLayout.rightArrowIcon}
						/>
					</View>
					<ScrollView style={ProfileLayout.iconWrap} horizontal={true}>
						<TouchableOpacity
							activeOpacity={0.7}
							onPress={() => createProfile("CreateProfile")}
						>
							<ProfileItem
								desc="평생 소장하는 내 반려견 DID 프로필"
								title="프로필 만들기"
								thumbnail={NftCardIcon}
							/>
						</TouchableOpacity>
						<TouchableOpacity
							activeOpacity={0.7}
							onPress={() => navigation.navigate("Adoption")}
						>
							<ProfileItem
								desc="간편한 소유권 변경"
								title="입양절차"
								thumbnail={AdoptionIcon}
							/>
						</TouchableOpacity>
						{/* <TouchableOpacity activeOpacity={0.7}>
                            <ProfileItem desc="내 반려견 NFT를 모아보여드려요" title="반려견 족보" thumbnail={CertificateIcon}/>
                        </TouchableOpacity> */}
					</ScrollView>
				</View>
				<View style={ProfileLayout.myNftWrap}>
					<View style={ProfileLayout.myNftTitleWrap}>
						<Text style={ProfileLayout.myNftTitle}>내 보유 DID</Text>
						<Text style={ProfileLayout.myNftMore}>전체보기</Text>
					</View>
					<ScrollView horizontal={true} style={ProfileLayout.nftList}>
						<GestureFlipView width={100} height={132} ref={flipView}>
							{renderBack()}
							{renderFront()}
						</GestureFlipView>
						{dogList.map((dogItem: any, index: any) => {
							// console.log("dog Item  : : : : : ", dogItem);
							return (
								<View key={index} style={{ marginLeft: 10 }}>
									<NftProfile
										dogName={`내 반려견 ${dogItem.dogName}`}
										createdTitle="등록한 날짜"
										createdAt={dogItem.createDate.split("T")[0]}
										species={dogItem.dogBreed}
										bgImg={dogItem.dogImg}
										dogNo={dogItem.dogNo}
									/>
								</View>
							);
						})}
						<TouchableOpacity
							activeOpacity={0.8}
							onPress={() => createProfile("CreateProfile")}
						>
							<View style={ProfileLayout.addNewNftWrap}>
								<Image source={AddPlusIcon} />
								<Text style={ProfileLayout.newButtonText}>반려견 등록하기</Text>
							</View>
						</TouchableOpacity>
					</ScrollView>
				</View>
				<Footer />
			</CommonLayout>
		</>
	);
};

export default Profile;
