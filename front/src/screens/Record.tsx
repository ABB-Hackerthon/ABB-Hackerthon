import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import CommonLayout from "../components/CommonLayout";
import WhiteHeader from "../components/WhiteHeader";
import SubMain from "../components/SubMain";
import report from "../../assets/images/report.png";
import Footer from "../components/Footer";
import {
	responsiveHeight,
	responsiveWidth,
} from "react-native-responsive-dimensions";
import PatrolDiaryCard from "../components/PatrolDiaryCard";
import { useNavigation } from "@react-navigation/native";

// 해결해줘
//  dd
const Record = () => {
	const navigation = useNavigation();

	const petrolList = [
		{
			patrolDiaryInfo: {
				patrolNo: 1,
				userName: "userName",
				patrolLogAddress: "patrolLogAddress",
				patrolDate: "patrolDate",
			},
		},
		{
			patrolDiaryInfo: {
				patrolNo: 2,
				userName: "userName",
				patrolLogAddress: "patrolLogAddress",
				patrolDate: "patrolDate",
			},
		},
		{
			patrolDiaryInfo: {
				patrolNo: 3,
				userName: "userName",
				patrolLogAddress: "patrolLogAddress",
				patrolDate: "patrolDate",
			},
		},
		{
			patrolDiaryInfo: {
				patrolNo: 4,
				userName: "userName",
				patrolLogAddress: "patrolLogAddress",
				patrolDate: "patrolDate",
			},
		},
	];
	return (
		<>
			<CommonLayout>
				<WhiteHeader title={"신고 기록"} />
				<SubMain
					subTitle="신고기록"
					mainTitle={`산책을 하며\n주변 이상 신호를 감지하고\n신고를 통해 리워드를 받으세요.`}
					bgImg={report}
					desc="신고하기"
				/>

				<View style={styles.recordcontainer}>
					<View style={styles.titlecontainer}>
						<Text style={styles.recordmainText}>현재 신고 목록</Text>

						<TouchableOpacity
							style={styles.titleCreatebtn}
							onPress={() => {
								navigation.navigate("CreateRecord");
							}}
						>
							<Text style={styles.titleCreatebtnText}>작성하기</Text>
						</TouchableOpacity>
					</View>
					<View style={styles.contentcontainer}>
						{petrolList.map((item, index) => {
							return (
								<>
									<PatrolDiaryCard
										imgSrc={report}
										patrolDiaryInfo={item.patrolDiaryInfo}
										key={`ptlcard_${index}`}
									/>
								</>
							);
						})}
					</View>
				</View>

				<Footer />
			</CommonLayout>
		</>
	);
};

export default Record;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		// backgroundColor: "#fff",
	},
	recordcontainer: {
		marginHorizontal: responsiveWidth(5),
	},
	recordmainText: {
		fontSize: 27,
		fontWeight: "bold",
		color: "#656565",
	},
	titlecontainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},

	titleCreatebtn: {
		// backgroundColor: "#fff",
		borderWidth: 1,
		borderColor: "#656565",
		borderRadius: 30,
		paddingHorizontal: 20,
		paddingVertical: 10,
		marginRight: 10,
	},
	titleCreatebtnText: {
		fontSize: 15,
		fontWeight: "bold",
		color: "#656565",
	},
	contentcontainer: {
		marginTop: 20,
		flexWrap: "wrap",
		flexDirection: "row",
		overflow: "scroll",
	},
});
