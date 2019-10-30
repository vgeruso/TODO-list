import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableWithoutFeedback
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Swipeable from 'react-native-swipeable';

export default props => {
    let check = null;
    if (props.done == true) {
        check = (
            <View style={styles.done}>
                <Icon name='check' size={20} color='#fff' />
            </View>
        );
    } else {
        check = (
            <View style={styles.pending}/>
        );
    }

    const taskDone = props.done == true ? {textDecorationLine: 'line-through'} : {};

    const leftContent = (
        <View style={styles.exclude}>
            <Icon name='trash' size={20} color='#fff'/>
            <Text style={styles.excludeText}>Delete</Text>
        </View>
    );

    return (
        <Swipeable leftActionActivationDistance={200}
            onLeftActionActivate={() => props.onDelete(props.id)}
            leftContent={leftContent}>
            <View style={styles.container}>
                <TouchableWithoutFeedback onPress={() => props.toggleTask(props.id)}>
                    <View style={styles.checkContainer}>{check}</View>
                </TouchableWithoutFeedback>
                <View>
                    <Text style={[styles.name, taskDone]}>{props.name}</Text>
                    <Text style={[styles.description, taskDone]}>{props.description}</Text>
                </View>
            </View>
        </Swipeable>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingVertical: 15,
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderColor: '#aaa'
    },
    checkContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '20%'
    },
    pending: {
        borderWidth: 1,
        height: 25,
        width: 25,
        borderRadius: 5,
        borderColor: '#c1c1cc'
    },
    done: {
        height: 25,
        width: 25,
        borderRadius: 5,
        backgroundColor: '#4492ff',
        alignItems: 'center',
        justifyContent: 'center'
    },
    name: {
        paddingVertical: 2,
        fontSize: 14,
        color: '#000'
    },
    description: {
        paddingVertical: 2,
        fontSize: 12,
        color: '#c1c1cc'
    },
    exclude: {
        flex: 1,
        backgroundColor: 'red',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    excludeText: {
        color: '#fff',
        fontSize: 20,
        margin: 10
    }
});
