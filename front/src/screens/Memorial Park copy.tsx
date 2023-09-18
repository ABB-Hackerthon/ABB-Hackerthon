import React, { useRef } from "react";
import LottieView from "lottie-react-native";
import {
	Animated,
	Easing,
	TouchableOpacity,
	Text,
	StyleSheet,
	Image,
	View,
} from "react-native";
import ripLayout from "../styles/ripLayout";
import LinearGradient from "react-native-linear-gradient";

const Test: React.FC = () => {
	const ani1Opacity = useRef(new Animated.Value(0)).current;
	const ani2Opacity = useRef(new Animated.Value(0)).current;
	const ani3Opacity = useRef(new Animated.Value(0)).current;
	const ani4Opacity = useRef(new Animated.Value(0)).current;
	const bImageOpacity = useRef(new Animated.Value(0)).current;
	const memorialGradientColors = [
		["rgba(255, 255, 255, 0)", "#2c3e50", "#34495e", "#7f8c8d"], // 차가운 회색 톤
		["rgba(255, 255, 255, 0)", "#1f3a93", "#34495e", "#d35400"], // 진한 파란색과 오렌지의 조화
		["rgba(255, 255, 255, 0)", "#46344e", "#5e366a", "#793a95"], // 어두운 보라색
		["rgba(255, 255, 255, 0)", "#1e212d", "#283048", "#4b6278"], // 심연의 파란색과 회색의 조화
		["rgba(255, 255, 255, 0)", "#001f3f", "#003366", "#004080"], // 깊은 바다색
		["rgba(255, 255, 255, 0)", "#243949", "#517fa4", "#86a8e7"], // 조용한 하늘색
		["rgba(255, 255, 255, 0)", "#2d3436", "#636e72", "#b2bec3"], // 중성적인 회색 톤
		["rgba(255, 255, 255, 0)", "#4a148c", "#6a1b9a", "#9c27b0"], // 깊은 보라색
		["rgba(255, 255, 255, 0)", "#2c2c54", "#474787", "#aaa69d"], // 밤하늘의 별빛처럼 조용한 색상
		["rgba(255, 255, 255, 0)", "#0a3d62", "#1e272e", "#3c6382"], // 깊은 바다의 밤
		["rgba(255, 255, 255, 0)", "#373b44", "#4286f4", "#67e6dc"], // 어두운 회색과 청록색의 대조
	];

	const getRandomColors = () => {
		const randomIndex = Math.floor(
			Math.random() * memorialGradientColors.length,
		);
		return memorialGradientColors[randomIndex];
	};

	// 사용 예
	const selectedColors = getRandomColors();

	const showLottieAnimation = (
		aniOpacity: Animated.Value,
		nextAniFunction?: () => void,
	) => {
		Animated.sequence([
			Animated.timing(aniOpacity, {
				toValue: 1,
				duration: 500,
				easing: Easing.linear,
				useNativeDriver: true,
			}),
			Animated.timing(aniOpacity, {
				toValue: 0,
				duration: 500,
				easing: Easing.linear,
				delay: 1000,
				useNativeDriver: true,
			}),
		]).start(() => {
			if (nextAniFunction) {
				nextAniFunction();
			} else {
				// ani4 애니메이션이 끝났을 때 B.png의 opacity를 1로 변경
				Animated.timing(bImageOpacity, {
					toValue: 1,
					duration: 500,
					useNativeDriver: true,
				}).start();
			}
		});
	};

	const startAnimations = () => {
		showLottieAnimation(ani1Opacity, () => {
			showLottieAnimation(ani2Opacity, () => {
				showLottieAnimation(ani3Opacity, () => {
					showLottieAnimation(ani4Opacity);
				});
			});
		});
	};

	return (
		<>
			{/* 아래 스타일을 적용하여 중앙에 위치하도록 함 */}
			<Animated.View style={[styles.centered, { opacity: ani1Opacity }]}>
				<LottieView
					source={require("../../assets/ani1.json")}
					autoPlay
					loop={true}
				/>
			</Animated.View>

			<Animated.View style={[styles.centered, { opacity: ani2Opacity }]}>
				<LottieView
					source={require("../../assets/ani2.json")}
					autoPlay
					loop={true}
				/>
			</Animated.View>

			<Animated.View style={[styles.centered, { opacity: ani3Opacity }]}>
				<LottieView
					source={require("../../assets/ani3.json")}
					autoPlay
					loop={true}
				/>
			</Animated.View>

			<Animated.View style={[styles.centered, { opacity: ani4Opacity }]}>
				<LottieView
					source={require("../../assets/ani4.json")}
					autoPlay
					loop={true}
				/>
			</Animated.View>

			{/* 시작 버튼은 전체 화면에 배치하고, 그 위에 중앙에 텍스트를 배치합니다. */}
			<TouchableOpacity
				style={styles.fullScreenCentered}
				onPress={startAnimations}
			>
				<Text selectionColor={"transparent"}>Start</Text>
			</TouchableOpacity>
			<Animated.View pointerEvents="none" style={[{ opacity: bImageOpacity }]}>
				{/* <Image
					source={require("../../assets/B.png")}
					style={styles.imageStyle}
					resizeMode="contain"
				/> */}
				<View>
					<View style={[ripLayout.ripContent]}>
						<View style={[ripLayout.ripview1]}>
							<Image
								style={[ripLayout.ripImage]}
								source={require("../../assets/dog.jpg")}
							></Image>
						</View>
						<LinearGradient
							colors={selectedColors}
							style={[ripLayout.gradient]}
							locations={[0, 0.05, 0.5, 1]}
						>
							<Text style={[ripLayout.riptext1]}>Na. Max</Text>
							<View style={[ripLayout.view2]}></View>
							<Text style={[ripLayout.riptext2]}>hello</Text>
							<View style={[ripLayout.view2]}>
								<Text style={[ripLayout.riptext2]}>hello</Text>
							</View>
						</LinearGradient>
					</View>
				</View>
			</Animated.View>
		</>
	);
};

const styles = StyleSheet.create({
	centered: {
		flex: 1,
		zIndex: 1,
		justifyContent: "center",
		alignItems: "center",
		position: "absolute",
		top: 200,
		left: 0,
		right: 0,
		bottom: 0,
		borderRadius: 50,
		height: 300,
	},
	fullScreenCentered: {
		zIndex: 2,
		position: "absolute",
		top: 20,
		left: 0,
		right: 0,
		justifyContent: "center",
		alignItems: "center",
	},
	imageStyle: {
		zIndex: 5, // zIndex 값을 변경합니다.
		width: 415,
		position: "absolute",
		top: -80,
		justifyContent: "center",
		alignItems: "center",
	},
	views: {
		justifyContent: "center",
		alignItems: "center",
		top: 200,
		width: 200,
		textAlign: "center",
		backgroundColor: "red",
	},
});

export default Test;