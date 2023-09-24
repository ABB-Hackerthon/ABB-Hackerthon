import {useState,useEffect} from "react"
import {View, Text, TextInput, Image, TouchableOpacity} from "react-native"
import ColorHeader from "../components/ColorHeader"
import CommonLayout from "../components/CommonLayout"
import Footer from "../components/Footer"
import DateTimePickerModal from "react-native-modal-datetime-picker"
import * as SecureStore from 'expo-secure-store';
import {ethers, Transaction} from "ethers"
import {mintAnimakTokenContract} from "../contracts/index";

import DatePickerIcon from "../../assets/images/date-picker-icon.png"
import AddPlusIcon from "../../assets/images/add-plus-icon.png"

import CreateProfileLayout from "../styles/createProfileLayout"

const CreateProfile = ({navigation} : any) => {
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [walletAddress, setWalletAddress] = useState<string>();
    const [walletPrivateKey, setWalletPrivateKey] = useState<string>();

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleConfirm = (date:string) => {
        console.warn("사용자가 선택한 날짜: ", date);
        hideDatePicker();
    };

    const createProfile = async () => {

        const walletAddress = await SecureStore.getItemAsync("walletAddress");
        const walletPrivateKey = await SecureStore.getItemAsync("walletPrivateKey");
        
        const provider = await new ethers.JsonRpcProvider(process.env.RPC_URL);

        const privateKey = process.env.ADMIN_WALLET_PRIVATE_KEY;
        const gasPriceGwei = "0.00001";
        const priceWei = ethers.parseUnits(gasPriceGwei, 'gwei');

        const response = await mintAnimakTokenContract.mintAnimakToken();
        console.log("response", response);

    }

    useEffect(() => {
        const getWalletInfoFromStore = async () => {
            const walletAddress = await SecureStore.getItemAsync("walletAddress");
            if(walletAddress){
                setWalletAddress(walletAddress);
            }
            const privateKey = await SecureStore.getItemAsync("privateKey");
            if(privateKey){
                setWalletPrivateKey(privateKey);
            }
        }

        getWalletInfoFromStore();
    }, [])

    return(
        <>
            <CommonLayout>
                <ColorHeader title="프로필 작성"/>
                <View style={CreateProfileLayout.createProfileTitleWrap}>
                    <Text style={CreateProfileLayout.createProfileDesc}>반려견 NFT</Text>
                    <Text style={CreateProfileLayout.createProfileTitle}>
                        내 NFT에 저장하는,{"\n"}
                        나의 반려견
                    </Text>
                </View>
                <TouchableOpacity activeOpacity={0.7}>
                    <View style={CreateProfileLayout.imageUploadWrap}>
                        <Image
                            source={AddPlusIcon}
                        />
                        <Text>사진 등록하기</Text>
                    </View>
                </TouchableOpacity>

                <View style={CreateProfileLayout.formWrap}>

                    <Text style={CreateProfileLayout.formTitle}>반려견의 이름을 입력해주세요.</Text>
                    <TextInput style={CreateProfileLayout.formInput}></TextInput>
                    <Text style={CreateProfileLayout.formTitle}>반려견의 종을 입력해주세요.</Text>
                    <TextInput style={CreateProfileLayout.formInput}></TextInput>
                    <Text style={CreateProfileLayout.formTitle}>반려견의 성별을 입력해주세요.</Text>
                    <TextInput style={CreateProfileLayout.formInput}></TextInput>
                    <Text style={CreateProfileLayout.formTitle}>반려견의 생일을 입력해주세요.</Text>
                    <TouchableOpacity activeOpacity={0.7} onPress={showDatePicker}>
                        <View style={CreateProfileLayout.dateFormWrap}>
                            <Image
                                source={DatePickerIcon}
                            />
                            <Text style={CreateProfileLayout.dateFormText}>2023. 09. 04.</Text>
                        </View>
                    </TouchableOpacity>
                    <DateTimePickerModal
                        isVisible={isDatePickerVisible}
                        mode="date"
                        onConfirm={handleConfirm}
                        onCancel={hideDatePicker}
                    />

                </View>

                <View style={CreateProfileLayout.formButtonWrap}>
                    <TouchableOpacity activeOpacity={0.7} onPress={createProfile}>
                        <View style={CreateProfileLayout.submitButton}>
                            <Text style={CreateProfileLayout.submitButtonText}>
                                앨범 등록하기
                            </Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={0.7} onPress={() => navigation.navigate('Profile')}>
                        <View style={CreateProfileLayout.cancelButton}>
                            <Text style={CreateProfileLayout.cancelButtonText}>
                                취소하기
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <Footer/>
            </CommonLayout>
        </>
    );
}

export default CreateProfile;