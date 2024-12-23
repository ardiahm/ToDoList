import React, {useState} from 'react';
import { KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View, Platform, Touchable, Keyboard,  TouchableWithoutFeedback, ScrollView } from 'react-native';
import Task from './components/Task'


/* use 'npx expo start' and scan QR code to dev*/
export default function App() {
  

  /* Declare useStates */ 
  const [task, setTask] = useState();
  /* taskItems handles the storage of ALL inputted tasks*/
  const [taskItems, setTaskItems] = useState([]);
  
  /* This arrow function handles adding a task */
  const handleAddTask = () => { 
    setTaskItems([...taskItems, task])
    setTask(null);
  }

  /* This arrow function handles completing or finishing a task given the INDEX*/
  const completeTask = (index) => {
    /* first create a copy of the existing tasks */
    let itemsCopy = [...taskItems];
    /* then remove the selected task from copy*/
    itemsCopy.splice(index, 1);
    /* then set the task items list to the updated itemsCopy*/
    setTaskItems(itemsCopy);
  }
  
  return (
    /* The entire code is wrapped in a Touchable Feedback so user's can dismiss the keyboard */
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      {/* View components which handle styling for UI*/}
      <View style={styles.container}>
        <View style={styles.tasksWrapper}>

          <Text style={styles.sectionTitle}>Today's Tasks</Text>
          <Text style={styles.sectionInstructions}>To delete a task, simply press the blue square.</Text>
          
          {/* Wrap Items (all tasks which will be displayed) in a scroll view*/}
          <ScrollView style={styles.items}>
            <View style={styles.items}>
              {
                taskItems.map((item, index) => {
                  return (
                      <Task 
                      text={item}
                      key={index}
                      onDelete={() => completeTask(index)}
                      />
                  )
                })
              }
            </View>
          </ScrollView>
        </View>

        {/* using React Native documentation -> handle padding for text input and plus button based on user's platform  */}
        <KeyboardAvoidingView
          behavior={Platform.OS =="ios" ? "padding" : "height" }
          style={styles.writeTaskWrapper}
          >
            <TextInput style={styles.input} placeholder={'Write a task'} value={task} onChangeText={text => setTask(text)}/>
            <TouchableOpacity onPress={() => handleAddTask()}>
              <View style={styles.addWrapper}>
                <Text style={styles.addText}>+</Text>
              </View>
            </TouchableOpacity>
        </KeyboardAvoidingView>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8EAED',

  },
  tasksWrapper: {
    paddingTop: 80,
    paddingHorizontal: 20

  },
  sectionTitle: {
    fontSize: 30,
    fontWeight: 'bold'
  },
  sectionInstructions: {
    fontsize: 15,
    fontWeight: 'bold',
    color: '#808080'
  },

  items: {
    marginTop: 30,
    marginBottom: 50,
  },
  writeTaskWrapper: {
    position: 'absolute',
    bottom: 30,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  input: {
    paddingVertical: 15,
    width: 250,
    paddingHorizontal: 15,
    backgroundColor: '#FFF',
    borderRadius: 15,
    borderColor: '#C0C0C0',
    borderWidth: 1

  },
  addWrapper: {
    width: 60,
    height: 60,
    backgroundColor: 'white',
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#C0C0C0',
    borderWidth: 1
  },
  addText: {

  },
});
