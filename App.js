import {
  View,
  TextInput,
  Image,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from 'react-native';
import { useState, useEffect } from 'react';
import axios from 'axios';
import SnackImage from './assets/snack-icon.png';

export default function App() {
  const [phrase, setPhrase] = useState({});
  const [typeAdvice, setTypeAdvice] = useState('');
  const [isList, setIsList] = useState(false);
  const [phrasesList, setPhrasesList] = useState([]);

  const getPhrase = async () => {
    const response = await axios.get('https://api.adviceslip.com/advice');
    setPhrase(response.data);
    setIsList(false);
  };

  const getPhraseByType = async () => {
    const response = await axios.get(
      `https://api.adviceslip.com/advice/search/${typeAdvice}`
    );
    setPhrasesList(response.data.slips);
    setIsList(true);
  };

  useEffect(() => {
    getPhrase();
  }, []);

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Tipo de conselho"
        style={styles.textInput}
        placeholderTextColor="gray"
        value={typeAdvice}
        onChangeText={setTypeAdvice}
      />

      {isList ? (
        <FlatList
          data={phrasesList}
          renderItem={({item}) => (
            <>
            <Text style={styles.phrase}>{item?.advice}</Text>
            <View style={{ borderWidth: 2 }} />
            </>
          )}
        />
      ) : (
        <>
          <Image
            source={SnackImage}
            style={styles.image}
            resizeMode="contain"
          />

          <Text style={styles.phrase}>{phrase?.slip?.advice}</Text>
        </>
      )}

      <TouchableOpacity
        style={styles.button}
        onPress={typeAdvice == '' ? getPhrase : getPhraseByType}>
        <Text style={styles.textButton}>Trocar frase</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  textInput: {
    borderWidth: 2,
    borderRadius: 10,
    borderColor: 'gray',
    padding: 8,
  },
  image: {
    width: 130,
    height: 130,
  },
  phrase: {
    fontWeight: 'bold',
    fontSize: 22,
    color: 'purple',
    fontStyle: 'italic',
    textAlign: 'center',
  },
  button: {
    backgroundColor: 'gray',
    borderRadius: 10,
    padding: 10,
    borderWidth: 1,
  },
  textButton: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});
