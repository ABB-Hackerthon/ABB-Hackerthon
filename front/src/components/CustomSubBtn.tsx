import React from "react";
import { TouchableOpacity, View, Text, StyleSheet } from "react-native";
import {
	responsiveHeight,
	responsiveWidth,
} from "react-native-responsive-dimensions";
import { LinearGradient } from "react-native-linear-gradient";

type CustomButtonProps = {
	text: string;
	onPress: () => void;
	color: string;
};

const CustomButton: React.FC<CustomButtonProps> = ({
	text,
	onPress,
	color,
}) => {
	return (
		<View style={styles.container}>
			<TouchableOpacity
				style={{ backgroundColor: color, borderRadius: 10 }}
				activeOpacity={0.7}
				onPress={onPress}
			>
				<View style={styles.button}>
					<Text style={styles.text}>{text}</Text>
				</View>
			</TouchableOpacity>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		// justifyContent: "center",
		alignItems: "center",
		marginBottom: responsiveHeight(5),
	},
	button: {
		width: responsiveWidth(85),
		// backgroundColor: "#EE8A72",
		height: 50,
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
	},
	text: {
		fontSize: 17,
		fontWeight: "900",
		color: "#FFFFFF",
	},
});

export default CustomButton;
