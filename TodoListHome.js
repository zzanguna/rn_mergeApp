import React, {Component} from 'react';
import { StyleSheet, Text, View, StatusBar, TextInput, TouchableOpacity, Dimensions, Platform, ScrollView, AsyncStorage } from 'react-native';
import ToDo from "./ToDo"
import { AppLoading} from "expo";
import uudv1 from "uuid";

const {height, width} = Dimensions.get("window");//전체 window 크기

export default class TodoListHome extends Component {
  static navigationOptions = {
    headerMode: 'none'
  }


  state = {
    newtodo : "",
    loadedTodos: false,
    toDos : {

    }
  };
  _controlNewTodo = text => {
    this.setState({
      newtodo : text
     }
    )
  };
  _loadToDos = async () => {
    try {
        const toDos = await AsyncStorage.getItem("toDos");
        const paresedToDos = toDos!==null ? {} : JSON.parse(toDos);
        this.setState({
          loadedTodos: true,
          toDos : paresedToDos
        })
    } catch (err) {
      console.log(err)
    }
  }
  _addToDo = () => {
    const {newtodo} = this.state;
    if(newtodo !==""){
      this.setState({
        newtodo : ""
      });
      this.setState(prevState=> {
        const ID = uudv1();
        const newToDoObject = {
          [ID] : {
            id : ID,
            isCompleted : false,
            text : newtodo,
            createdAt : Date.now()
          }
        };
        const newState = {
          ...prevState,
          newtodo:"",
          toDos:{
            ...prevState.toDos,
            ...newToDoObject
          }
        };
        this._saveToDos(newState.toDos);
        return {...newState };
      })
    }
  }
  componentDidMount = () => {
    this._loadToDos();
  }

  _deleteToDo = (id)=>{
    this.setState(prevState=>{
        const toDos = prevState.toDos;
        delete toDos[id];
        const newState = {
            ...prevState,
            ...toDos
        }
        this._saveToDos(newState.toDos);
        return {...newState}
    })
}
_uncompleteToDo = id=>{
  this.setState(prevState => {
    const newState = {
        ...prevState,
      toDos:{
          ...prevState.toDos,
          [id]:{
              ...prevState.toDos[id],
              isCompleted:false
          }
      }
    }
    this._saveToDos(newState.toDos);
    return {...newState}
  })
}
_completeToDo = id =>{
this.setState(prevState => {
    const newState = {
        ...prevState,
      toDos:{
          ...prevState.toDos,
          [id]:{
              ...prevState.toDos[id],
              isCompleted:true
          }
      }
    }
    this._saveToDos(newState.toDos);
    return {...newState}
  })
}

_updateToDo = (id, text) => {
  this.setState(prevState => {
    const newState = {
        ...prevState,
      toDos:{
          ...prevState.toDos,
          [id]:{
              ...prevState.toDos[id],
              text:text
          }
      }
    }
    this._saveToDos(newState.toDos);
    return {...newState}
  })
}
_saveToDos = newToDos => {
  console.log(JSON.stringify(newToDos))
  const _saveToDos = AsyncStorage.setItem("toDos", JSON.stringify(newToDos));//string 저장
}

  render(){
    const { newtodo, loadedTodos, toDos} = this.state;
    if(!loadedTodos){
      return <AppLoading/>
    }
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <TouchableOpacity style={styles.backBtn} >
            <Text style={styles.backBtnTxt} onPress={() => this.props.navigation.navigate("Home")}>⬅</Text>
        </TouchableOpacity>
        <Text style={styles.title}>오늘 할일을 알려죠!</Text>
        
        <View style={styles.card}>
        <TextInput 
            style={styles.newinputTxt} 
            placeholder={"할일을 입력해죠!"} 
            value = {newtodo}
            onChangeText ={this._controlNewTodo}
            placeholderTextColor = {"#999"}
            returnKeyType={"done"}  
            autoCorrect={false}
            onSubmitEditing={this._addToDo}
          />
          <ScrollView contentContainerStyle={styles.toDos} >
            {Object.values(toDos).map(todo=> 
              <ToDo key={todo.id}  
              deteleToDo={this._deleteToDo}
              completeToDo={this._completeToDo}
              uncompleteToDo = {this._uncompleteToDo}
              updateToDo = {this._updateToDo}
              {...todo}
              />)}
          </ScrollView>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ff9a9e',
    alignItems: 'center',
  },
  backBtn:{
    width:"10%",
    flexDirection:"row",
    marginTop:20,
    alignSelf:"flex-start",
    margin:15,
  },
  backBtnTxt:{
    color:"white",
    fontSize:30,
    fontWeight:"200",
  },
  title:{
    color:"white",
    fontSize:30,
    marginTop:40,
    fontWeight:"200",
    marginBottom:30
  },
  newinputTxt : {
    padding: 20,
    borderBottomColor: "#bbbb",
    borderBottomWidth: 1,
    fontSize : 25,
    
  },
  card : {
    backgroundColor:"white",
    flex:1,
    width:width - 25,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    ...Platform.select({
      ios:{
        shadowColor:"rgb(50, 50, 50)",
        shadowOpacity:0.5,
        shadowRadius:5,
        shadowOffset:{
          height:-1,
          width:1
        }
      },
      android : {
        elevation:3
      }
    })
  },
  toDos : {
    alignItems : "center"
  }
  
});
