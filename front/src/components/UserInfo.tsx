import { View, Text, Image } from "react-native";
import styles from "../styles/PatrolReportDetailLayout";
import exImg from "../../assets/images/photo-ex-img1.png";
import chatImg from "../../assets/images/Chat.png";
import ClockImg from "../../assets/images/Colock.png";
import HitImg from "../../assets/images/Hit.png";

const ReportUserInfo = ({ data, userData }: any) => {
	const dateTime = data?.patrolLogDate
		? `${data.patrolLogDate.slice(0, 10)} ${data.patrolLogDate.slice(11, 16)}`
		: "";

	return (
		<>
			<View style={styles.userContainer}>
				<View style={styles.userContainerImg}>
					<Image
						source={{ uri: userData?.userProfileImg }}
						style={styles.userImg}
					></Image>
				</View>

				<View style={styles.userTextCol}>
					<View>
						<Text style={styles.usernameText}>{userData?.userName}</Text>
						<View style={styles.rowContainer}>
							<View style={styles.chatcontainer}>
								<Text style={styles.chatText}>
									<Image source={chatImg} style={styles.chatImg}></Image>{" "}
									{data?.patrolComments?.length}건
								</Text>
							</View>
							<View>
								<Text style={styles.hitcontainer}>
									<Image source={HitImg} style={styles.hitImg}></Image>{" "}
									{data?.patrolReportHit}회
								</Text>
							</View>
						</View>

						<View style={styles.datacontainer}>
							<Text>{dateTime}</Text>
						</View>
					</View>
				</View>
				<View style={styles.patrollication}>
					<Text>순찰 장소</Text>
					<Text style={styles.patrollocationText}>
						{data?.patrolLogAddress}
					</Text>
				</View>
			</View>
		</>
	);
};

export default ReportUserInfo;
