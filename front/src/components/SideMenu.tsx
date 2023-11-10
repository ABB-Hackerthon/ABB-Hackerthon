import { View, Text, Image, TouchableOpacity, Button } from "react-native";
import { useNavigation } from "@react-navigation/native";

import SideMenuIcon from "./SideMenuIcon";
import SideMenuLayout from "../styles/sideMenuLayout";
import LoginStore from "../stores/LoginStore";
import Login from "../screens/Login";
import CloseIcon from "../../assets/images/close-icon.png";
import DIDIcon from "../../assets/images/DID.png";
import AdoptionIcon from "../../assets/images/line-adoption-icon.png";
import PhotoAlbumIcon from "../../assets/images/line-photo-album-icon.png";
import WalkRootIcon from "../../assets/images/line-walk-root-icon.png";
import TribeIcon from "../../assets/images/line-tribe-icon.png";
import WalletIcon from "../../assets/images/wallet.png";
import Record from "../../assets/images/record.png";

const SideMenu = (props: any) => {
	const navigation = useNavigation();

	const authMoveMypage = () => {
		if (LoginStore.isLogged) {
			navigation.navigate("MyPage");
		} else {
			alert("로그인 후 이용하실 수 있는 서비스입니다.");
		}
	};
	return (
		<>
			<View style={SideMenuLayout.sideMenuWrap}>
				<View style={SideMenuLayout.sideMenuHeader}>
					<Text style={SideMenuLayout.sideMenuLogo}>IDOG</Text>
					<TouchableOpacity
						activeOpacity={0.7}
						onPress={() => props.updateActiveSideMenu(false)}
					>
						<Image source={CloseIcon} />
					</TouchableOpacity>
				</View>
				<View style={SideMenuLayout.navWrap}>
					<Text style={SideMenuLayout.navTitle}>
						반려견 <Text style={SideMenuLayout.boldNavTitle}>소유증명</Text>
					</Text>
					<Text style={SideMenuLayout.navDesc}>
						간편한 DID 소유증명 및 이전
					</Text>
					<View style={SideMenuLayout.navFlex}>
						<SideMenuIcon
							title="프로필 등록"
							imageIcon={DIDIcon}
							movePage="Profile"
						></SideMenuIcon>
						<SideMenuIcon
							title="내 지갑"
							imageIcon={WalletIcon}
							movePage="WalletCardList"
						></SideMenuIcon>
					</View>
					<View style={{ marginTop: 25 }}></View>
					<Text style={SideMenuLayout.navTitle}>
						반려견과의 <Text style={SideMenuLayout.boldNavTitle}>추억공유</Text>
					</Text>
					<Text style={SideMenuLayout.navDesc}>소중한 추억을 간직하세요.</Text>
					<View style={SideMenuLayout.navFlex}>
						<SideMenuIcon
							title="포토앨범"
							imageIcon={PhotoAlbumIcon}
							movePage="Album"
						></SideMenuIcon>
						{/* <SideMenuIcon title="진료일정등록" imageIcon={MedicalIcon}></SideMenuIcon> */}
						<SideMenuIcon
							title="산책기록"
							imageIcon={WalkRootIcon}
							movePage="Walk"
						></SideMenuIcon>
						<SideMenuIcon
							title="하늘공원"
							imageIcon={TribeIcon}
							movePage="Three"
						></SideMenuIcon>
						<SideMenuIcon
							title="안전신문고"
							imageIcon={Record}
							movePage="CreateRecord"
						/>
					</View>
				</View>
				<View style={SideMenuLayout.authButtonWrap}>
					<Login />
					<TouchableOpacity
						activeOpacity={0.7}
						style={SideMenuLayout.moveMypageButton}
						onPress={authMoveMypage}
					>
						<Text style={SideMenuLayout.moveMypageButtonText}>마이페이지</Text>
					</TouchableOpacity>
				</View>
			</View>
		</>
	);
};

export default SideMenu;
