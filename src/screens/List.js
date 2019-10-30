import React, { Component } from "react";
import {
    View,
    FlatList,
    AsyncStorage
} from 'react-native';
import { Header, Button} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

import Task from '../components/Task';
import AddTask from "./AddTask";

export default class List extends Component {
    state = {
        tasks: [],
        visibleTasks: [],
        showDoneTask: true,
        showAddTask: false
    }

    filterTasks() {
        let visibleTasks = null;
        if(this.state.showDoneTask) {
            visibleTasks = [...this.state.tasks];
        } else {
            const pending = task => task.done === false;
            visibleTasks = this.state.tasks.filter(pending);
        }
        this.setState({ visibleTasks });
        AsyncStorage.setItem('tasks', JSON.stringify(this.state.tasks));
    }

    toggleFilter = () => {
        this.setState({ showDoneTask: !this.state.showDoneTask }, this.filterTasks);
    }

    componentDidMount = async () => {
        const data = await AsyncStorage.getItem('tasks');
        const tasks = JSON.parse(data) || [];
        this.setState({ tasks }, this.filterTasks);
    }

    addTask = task => {
        const tasks = [...this.state.tasks];
        tasks.push({
            id: task.id,
            name: task.name,
            description: task.description,
            done: task.done
        });

        this.setState({ tasks, showAddTask: false }, this.filterTasks);
    }

    deleteTask = id => {
        const tasks = this.state.tasks.filter(task => task.id !== id);        
        this.setState({ tasks }, this.filterTasks);
    }

    toggleTask = id => {
        const tasks = [...this.state.tasks]
        tasks.forEach(task => {
            if (task.id === id) {
                task.done = task.done == true ? false : true;
            }
        });
        this.setState({ tasks }, this.filterTasks);
    }

    render() {
        return (
            <View>
                <Header
                    leftComponent={<Button type='clear' icon={{ 
                        name: 'add',
                        size: 20, 
                        color: '#fff' 
                    }} onPress={() => this.setState({ showAddTask: true })} />}
                    backgroundColor='#4492ff'
                    centerComponent={{ text: 'TODO-list', style: { color: '#fff' } }}
                    rightComponent={<Button type='clear' icon={<Icon
                        name={this.state.showDoneTask ? 'eye' : 'eye-slash'}
                        size={20}
                        color='#fff'
                    />} onPress={this.toggleFilter}/>}
                />
                <AddTask isVisible={this.state.showAddTask} 
                    onSave={this.addTask}
                    onCancel={() => this.setState({ showAddTask: false })}/>
                <View>
                    <FlatList data={this.state.visibleTasks} keyExtractor={item => `${item.id}`} renderItem={({item}) => {
                        return <Task {...item} toggleTask={this.toggleTask} onDelete={this.deleteTask} />
                    }} />
                </View>
            </View>
        );
    }
}
