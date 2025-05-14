// components/BackButton.tsx
import { useNavigate } from 'react-router-dom'
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { Pressable } from 'react-native'

export default function BackButton() {
    const navigate = useNavigate()

    return (
        <Pressable
            onPress={() => navigate(-1)}
            style={{
                position: 'absolute',
                top: 180,
                left: 30,
                zIndex: 10,
                flexDirection: 'row',
                alignItems: 'center',
                gap: 8
            }}
        >
            <IoArrowBackCircleOutline size={60} />
        </Pressable>
    )
}