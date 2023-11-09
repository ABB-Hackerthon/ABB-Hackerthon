import React, { useState, useEffect } from "react";
import { Button, Text, View } from "react-native";
import Geolocation from "@react-native-community/geolocation";
import axios from "axios";
import { GEOCODING_API_KEY } from "@env";

type Props = {
	setAddress: (address: string) => void;
};

const GeoLocationAPI = (props: Props) => {
	useEffect(() => {
		getGeoLocation();
	}, []);

	const getGeoLocation = () => {
		Geolocation.getCurrentPosition(
			(position) => {
				const latitude = JSON.stringify(position.coords.latitude);
				const longitude = JSON.stringify(position.coords.longitude);
				getAddressCode(Number(latitude), Number(longitude));
			},
			(error) => {
				console.log(error.code, error.message);
			},
			{ enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
		);
	};

	const getAddressCode = async (latitude: number, longitude: number) => {
		try {
			const response = await axios.get(
				`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&language=ko&key=${GEOCODING_API_KEY}`,
			);
			const formattedAddress = response.data.results[0].formatted_address;
			const addressParts = formattedAddress.split(" ");
			const address = `${addressParts[1]} ${addressParts[2]} ${addressParts[3]}`;
			props.setAddress(address);
			console.log("address : ", address);
		} catch (error) {
			console.error("An error occurred while fetching the dong code:", error);
		}
	};

	return <></>;
};

export default GeoLocationAPI;
