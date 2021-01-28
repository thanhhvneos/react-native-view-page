import React, { useEffect, useState } from 'react'
import { Button, Text, View } from 'react-native'
import { loadStatusRestroom, saveStatusRestroom } from './store'
import ViewPage from './ViewPage'

const WIDTH = 220
const DATA = [{
    backgroundColor: '#123123'
}, {
    backgroundColor: '#123456'
}, {
    backgroundColor: '#098765'
}, {
    backgroundColor: '#465465'
}]

const App = () => {
    const [index, setIndex] = useState(-1)
    const [data, setData] = useState(DATA)

    // effect
    useEffect(() => {
        loadStatusRestroom().then(setIndex)
    }, [])

    useEffect(() => {
        if (index != -1) saveStatusRestroom(index)
    }, [index])

    // actions
    const changeIndex = () => {
        const newIndex = Math.floor(Math.random() * 4)
        setIndex(newIndex != index ? newIndex : newIndex + 1)
    }

    const reload = () => {
        if (data.length > 0) setData([])
        else setData(DATA)
    }

    // views
    return <View style={{
        flex: 1,
        padding: 50,
        backgroundColor: 'lightblue',
        alignItems: 'center'
    }}>

        {data.length > 0 && <ViewPage
            showButtons
            widthSize={220}
            style={{ alignSelf: 'center', marginTop: 100 }}
            pageIndex={index}
            onPageChanged={setIndex}>
            {
                data.map((value, index) => <Page
                    key={index.toString()}
                    count={index}
                    backgroundColor={value.backgroundColor}
                />)
            }
        </ViewPage>}

        <Text style={{ fontSize: 20, marginVertical: 20 }}>{index}</Text>

        <Button title='Change Index'
            onPress={changeIndex} />

        <Button title='Reload'
            onPress={reload} />

    </View>
}

const Page = ({ count, backgroundColor }: { count: number, backgroundColor: string }) => {
    return <View style={{
        width: WIDTH,
        paddingVertical: 50,
        backgroundColor,
        justifyContent: 'center',
        alignItems: 'center'
    }}>
        <Text style={{ fontSize: 30, color: 'white' }}>{count}</Text>
    </View>
}

export default App