import React, { useEffect, useRef, useState } from 'react'
import {
    NativeSyntheticEvent,
    NativeScrollEvent,
    ScrollView,
    View,
    ViewStyle,
    StyleSheet,
    LayoutChangeEvent
} from 'react-native'
import ButtonImage from './ButtonImage'

const colorPrimary = '#00b2bd'
const SIZE_DOT = 9
const MARGIN_DOT = 8
const SIZE_BUTTON_IMG = 30
const SIZE_BUTTON = 44

type Props = {
    widthSize: number // size of swiper
    children: React.ReactNode
    loading?: boolean
    style?: ViewStyle
    styleDot?: ViewStyle
    styleDotActive?: ViewStyle
    showButtons?: boolean
    pageIndex?: number
    onPageChanged?: (page: number) => void // only for notify when page changed
}

export default ({
    widthSize,
    children,
    style,
    styleDot,
    styleDotActive,
    showButtons = false,
    pageIndex = 0,
    onPageChanged
}: Props) => {

    const COUNT_OF_CHILDREN = React.Children.count(children)

    const [heightOfSwiper, setHeightOfSwiper] = useState(0) // use to set position for Buttons
    const [page, setPage] = useState(0) // current page in swiper

    const scroll = useRef<ScrollView>(null)

    useEffect(() => {
        onPageChanged?.(page)
    }, [page])

    // update new page index
    useEffect(() => {
        if (pageIndex != page) setTimeout(() => {
            scrollToPage(pageIndex)
        }, 100)
    }, [pageIndex])

    // actions
    const onMomentumScrollEnd = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
        const { x } = event.nativeEvent.contentOffset
        const newPage = Math.floor(x / widthSize)
        setPage(newPage)
    }

    const scrollToPage = (page: number, animated = true) => {
        if (page <= COUNT_OF_CHILDREN - 1 || page >= 0) {
            scroll?.current?.scrollTo({ x: page * widthSize, animated })
        }
    }

    // views
    const createButton = (type: 'next' | 'prev') => {
        if (heightOfSwiper == 0) return

        const topOfButton = (heightOfSwiper - (SIZE_DOT + MARGIN_DOT * 2)) / 2 - SIZE_BUTTON / 2

        const disabled = type == 'next' ?
            (page == COUNT_OF_CHILDREN - 1)
            :
            (page == 0)

        const style = type == 'next' ?
            {
                right: -SIZE_BUTTON / 3
            }
            :
            {
                left: -SIZE_BUTTON / 3
            }

        return <ButtonImage
            disabled={disabled}
            style={{
                ...style,
                position: 'absolute',
                top: topOfButton,
                opacity: disabled ? 0.5 : 1
            }}
            styleImg={{ width: SIZE_BUTTON_IMG, height: SIZE_BUTTON_IMG }}
            source={type == 'next' ? require('./imgs/swiper_next.png') : require('./imgs/swiper_prev.png')}
            onPress={() => {
                const count = type == 'next' ? 1 : -1
                scrollToPage(page + count)
            }} />
    }

    const createIndicator = () => {
        const COUNT = React.Children.count(children)

        const arr = []
        for (let i = 0; i < COUNT; i++) arr.push(createIndicatorDot(i))

        if (arr.length <= 1) return null

        return <View style={styles.indicatorView}>{arr}</View>
    }

    const createIndicatorDot = (index: number) => {
        return <View
            key={index.toString()}
            style={page != index ?
                (styleDot ? styleDot : styles.dot)
                :
                (styleDotActive ? styleDotActive : { ...styles.dot, ...styles.dotActive })}
        />
    }

    // if (loading) return <View style={styles.loadingView}>
    //     <ActivityIndicator size='large' color={colorPrimary}/>
    // </View>

    return <View
        style={{ width: widthSize, ...style }}
        onLayout={(event: LayoutChangeEvent) => setHeightOfSwiper(event.nativeEvent.layout.height)}>

        <ScrollView
            ref={scroll}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onMomentumScrollEnd={onMomentumScrollEnd}>
            {children}
        </ScrollView>

        {showButtons && createButton('prev')}
        {showButtons && createButton('next')}

        {createIndicator()}
    </View>
}

const styles = StyleSheet.create({
    indicatorView: {
        flexDirection: 'row',
        alignSelf: 'center',
        paddingVertical: MARGIN_DOT
    },
    dot: {
        width: SIZE_DOT,
        height: SIZE_DOT,
        borderRadius: SIZE_DOT,
        borderWidth: 1,
        borderColor: colorPrimary,
        marginHorizontal: SIZE_DOT / 2,
    },
    dotActive: {
        backgroundColor: colorPrimary
    },
    loadingView: {
        width: '100%',
        minHeight: 200,
        justifyContent: 'center',
        alignItems: 'center'
    }
})