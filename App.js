import React, {useState} from 'react';
import {View, StyleSheet, FlatList, Alert} from 'react-native';
import Header from './android/components/header';
import ListItem from './android/components/listItem';
import AddItem from './android/components/addItem';

const App = () => {
  const [items, setItems] = useState([]);
  const [editStatus, editStatusChange] = useState(false);

  const [editItemDetail, editItemDetailChange] = useState({
    id: null,
    text: null,
  });

  const [checkedItems, checkedItemChange] = useState([]);

  const deleteItem = id => {
    setItems(prevItems => {
      return prevItems.filter(item => item.id !== id);
    });
  };

  const saveEditItem = (id, text) => {
    setItems(prevItems => {
      return prevItems.map(item =>
        item.id === editItemDetail.id ? {id, text: editItemDetail.text} : item,
      );
    });
    editStatusChange(!editStatus);
  };

  const handleEditChange = text => {
    editItemDetailChange({id: editItemDetail.id, text});
  };

  const addItem = text => {
    if (!text) {
      Alert.alert(
        'No task entered',
        'Please provide a proper title when creating a task',
        [
          {
            text: 'Understood',
            style: 'cancel',
          },
        ],
        {cancelable: true},
      );
    } else {
      setItems(prevItems => {
        return [{id: Math.floor(Math.random() * 100) + 1, text}, ...prevItems];
      });
    }
  };

  const editItem = (id, text) => {
    editItemDetailChange({
      id,
      text,
    });
    return editStatusChange(!editStatus);
  };

  const itemChecked = (id, text) => {
    const isChecked = checkedItems.filter(checkedItem => checkedItem.id === id);
    isChecked.length;
    checkedItemChange(prevItems => {
      return [...prevItems.filter(item => item.id !== id)];
    });
    checkedItemChange(prevItems => {
      return [...prevItems.filter(item => item.id !== id), {id, text}];
    });
  };

  return (
    <View style={styles.container}>
      <Header title="To Do List" />
      <AddItem addItem={addItem} />
      <FlatList
        data={items}
        renderItem={({item}) => (
          <ListItem
            item={item}
            deleteItem={deleteItem}
            editItem={editItem}
            isEditing={editStatus}
            editItemDetail={editItemDetail}
            saveEditItem={saveEditItem}
            handleEditChange={handleEditChange}
            itemChecked={itemChecked}
            checkedItems={checkedItems}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
