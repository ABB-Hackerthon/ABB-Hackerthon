import React, { useState, useRef } from "react";
import { ScrollView, View, Image, Text, StyleSheet } from "react-native";
import {
	responsiveHeight,
	responsiveWidth,
} from "react-native-responsive-dimensions";

const MyHorizontalScrollView = ({ imgList, location }) => {
	const [currentIndex, setCurrentIndex] = useState(0);
	const scrollViewRef = useRef(null);

	console.log(imgList, location);

	// 페이지가 변경될 때 호출됩니다.
	const handleScroll = (event: any) => {
		const contentOffsetX = event.nativeEvent.contentOffset.x;
		const newIndex = Math.floor(contentOffsetX / responsiveWidth(80)); // '80'은 각 이미지 뷰의 너비입니다.
		if (newIndex !== currentIndex) {
			setCurrentIndex(newIndex);
		}
	};

	// 페이지 인디케이터를 렌더링합니다.
	const renderPagination = () => {
		return (
			<View style={styles.paginationWrapper}>
				{[...Array(imgList?.length).keys()].map((key, index) => (
					<View
						key={key}
						style={[
							styles.paginationDot,
							{ opacity: currentIndex === index ? 1 : 0.5 },
						]}
					/>
				))}
			</View>
		);
	};

	return (
		<View style={styles.container}>
			<ScrollView
				ref={scrollViewRef}
				horizontal
				pagingEnabled
				onScroll={handleScroll}
				scrollEventThrottle={16} // iOS에서 스크롤 이벤트를 받는 빈도를 결정합니다.
				showsHorizontalScrollIndicator={false}
				style={styles.scrollViewStyle}
			>
				{imgList?.map((img, index) => {
					return (
						<View key={img.id} style={styles.viewStyle}>
							<Image style={styles.viewStyle} source={{ uri: img }} />
							<View style={styles.textView}>
								<Text style={styles.text}>{location}</Text>
							</View>
						</View>
					);
				})}
			</ScrollView>
			{renderPagination()}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		justifyContent: "center",
		alignItems: "center",
		// marginHorizontal: responsiveWidth(10),
	},
	scrollViewStyle: {
		width: responsiveWidth(100),
	},
	viewStyle: {
		width: responsiveWidth(100),
		height: responsiveHeight(30),
		borderRadius: 10,
		resizeMode: "cover",
	},
	paginationWrapper: {
		position: "absolute",
		bottom: 10,
		left: 0,
		right: 0,
		justifyContent: "center",
		alignItems: "center",
		flexDirection: "row",
	},
	paginationDot: {
		width: 10,
		height: 10,
		borderRadius: 5,
		backgroundColor: "black",
		margin: 3,
	},
	text: {
		color: "white",
		fontSize: 20,
		fontWeight: "bold",
	},
	textView: {
		backgroundColor: "rgba(0,0,0,0.5)",
		paddingHorizontal: responsiveWidth(3),
		paddingVertical: responsiveHeight(1),
		marginTop: responsiveHeight(0.5),
		right: responsiveWidth(1),
		borderRadius: 20,
		zIndex: 20,
		position: "absolute",
		top: 0,
	},
});

export default MyHorizontalScrollView;
