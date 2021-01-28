import React from 'react'
import { Image, ImageSourcePropType, ImageStyle, StyleSheet, TouchableOpacityProps, ViewStyle } from 'react-native'
import Pressable from './Pressable'

type ButtonImageProps = {
    source: ImageSourcePropType
    onPress?: () => void
    style?: ViewStyle,
    styleImg?: ImageStyle
}

export default (props: ButtonImageProps & TouchableOpacityProps) => {
    const { source, onPress, style, styleImg } = props

    return <Pressable
        {...props}
        style={[styles.container, style]}
        onPress={onPress}>
        <Image
            source={source}
            style={{ ...styles.image, ...styleImg }}
            resizeMode='contain' />
    </Pressable>
}

const styles = StyleSheet.create({
    container: {
        width: 44,
        height: 44,
        justifyContent: 'center',
        alignItems: 'center',
        // borderColor: 'blue',
        // borderWidth: 2,
    },
    image: {
        width: 18,
        height: 18
    }
})