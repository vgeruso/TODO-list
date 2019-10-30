import React, { Component } from 'react';
import {
    Modal,
    View,
    Text,
    TextInput,
    StyleSheet,
    TouchableWithoutFeedback,
    TouchableOpacity,
    Alert
} from 'react-native';

const initialState = {
    id: 0,
    name: '',
    description: '',
    done: false
}

export default class AddTask extends Component {

    state = {...initialState}

    save = () => {
        if(!this.state.description.trim()) {
            Alert.alert('dados inválidos, informe um nome e uma descrição para a tarefa');
            return
        }
        const data = { ...this.state };
        const id = Math.random();
        data.id = id;
        this.props.onSave(data);
        this.setState({...initialState});
    }

    render() {
        return (
            <Modal 
                animationType='slide' 
                transparent={true}
                visible={this.props.isVisible}
                onRequestClose={this.props.onCancel}>
                <TouchableWithoutFeedback onPress={this.props.onCancel}>
                    <View style={styles.offset}></View>
                </TouchableWithoutFeedback>
                <View style={styles.container}>
                    <Text style={styles.header}>New Task!</Text>
                    <TextInput value={String(this.state.name)}
                        placeholder='Name' 
                        style={styles.input} 
                        onChangeText={name => this.setState({ name })} />
                    <TextInput value={String(this.state.description)}
                        placeholder='Description' 
                        style={styles.input} 
                        onChangeText={description => this.setState({ description })} />
                    <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
                        <TouchableOpacity onPress={this.props.onCancel}>
                            <Text style={styles.button}>Cancel</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={this.save}>
                            <Text style={styles.button}>Save</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <TouchableWithoutFeedback onPress={this.props.onCancel}>
                    <View style={styles.offset}></View>
                </TouchableWithoutFeedback>
            </Modal>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        justifyContent: 'space-between'
    },
    offset: {
        flex: 2,
        backgroundColor: 'rgba(0,0,0,0.7)'
    },
    button: {
       margin: 20,
       marginRight: 30,
       color: '#4492ff'
    },
    header: {
        backgroundColor: '#4492ff',
        color: '#fff',
        textAlign: 'center',
        padding: 15,
        fontSize: 15
    },
    input: {
        padding: 8,
        width: '90%',
        height: 40,
        marginTop: 10,
        marginLeft: 20,
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#c1c1cc',
        borderRadius: 5
    }
});
