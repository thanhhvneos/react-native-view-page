import React from 'react'
import { StyleProp, TouchableOpacity, TouchableOpacityProps, ViewStyle } from 'react-native'

export type Props = {
    style?: StyleProp<ViewStyle>,
    children: React.ReactNode
}

export default (props: Props & TouchableOpacityProps) => {
    return <TouchableOpacity {...props} activeOpacity={0.5} />
}