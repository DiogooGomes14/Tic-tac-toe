/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState} from 'react';
import type {Node} from 'react';
import historico from './components/historico';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  TouchableOpacity,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

/* $FlowFixMe[missing-local-annot] The type annotation(s) required by Flow's
 * LTI update could not be added via codemod */


const App: () => Node = () => {

  const [home, setHome] = useState('menu');
  const [playerAtual, setPlayerAtual] = useState('');
  const [frame, setFrame] = useState([]);
  const [playsLeft, setPlaysLeft] = useState(0);
  const [winner, setWinner] = useState('');

  function startGame(player) {
    setPlayerAtual(player);

    setPlaysLeft(9);
    setFrame([
      ['','',''],
      ['','',''],
      ['','','']
    ]);

    setHome('jogo');
  }

  function play(line, column) {

    frame[line][column] = playerAtual;
    setFrame([...frame]);

    setPlayerAtual(playerAtual === 'X' ? 'O' : 'X');

    verifyWinner(frame, line, column);

  }

  function verifyWinner(frame, line, column) {

    if (frame[line][0] !== '' && frame[line][0] === frame[line][1] && frame[line][1] === frame[line][2]) {

      return endGame(frame[line][0]);

    }

    if (frame[0][column] !== '' && frame[0][column] === frame[1][column] && frame[1][column] === frame[2][column]) {

      return endGame(frame[0][column]);

    }

    if (frame[0][0] !== '' && frame[0][0] === frame[1][1] && frame[1][1] === frame[2][2]) {

      return endGame(frame[0][0]);

    }

    if (frame[0][2] !== '' && frame[0][2] === frame[1][1] && frame[1][1] === frame[2][0]) {

      return endGame(frame[0][2]);

    }

    if ((playsLeft - 1) === 0) {

      return endGame('');

    }

    setPlaysLeft((playsLeft - 1));

  }

  function endGame(player) {

    setWinner(player);
    setHome('vencedor');

  }

  switch(home) {
    case 'menu':
      return getHomeMenu();
    case 'jogo':
      return getHomeJogo();
    case 'vencedor':
      return getHomeVencedor();
  }

  function getHomeMenu() {
    return (
      <View style = {styles.container}>
        <Text style={styles.titulo}>Jogo do Galo</Text>
        <Text style={styles.subtitulo}>Escolhe o primeiro jogador</Text>
        <StatusBar style = "auto" />

        <TouchableOpacity
        onPress={() => startGame('X')}>
        <Text style={styles.playerX}>X</Text>
        </TouchableOpacity>

        <TouchableOpacity
        onPress={() => startGame('O')}>
        <Text style={styles.playerO}>O</Text>
        </TouchableOpacity>
      </View>
    );
  }

  function getHomeJogo() {
    return (
    <View style = {styles.container}>
      <Text style={styles.titulo}>Jogo do Galo</Text>

      {
        frame.map((line, numberline) => {
          return (
            <View key = {numberline} style = {styles.inlineItems}>

              {
                line.map((column, numberColumn) => {
                  return (
                    <TouchableOpacity
                      key = {numberColumn}
                      style = {styles.boxPlayer}
                      onPress= {() => play(numberline, numberColumn)}
                      disabled={column !== ''}>
                      <Text style={column === 'X' ? styles.playerX : styles.playerO}>{column}</Text>
                    </TouchableOpacity>
                  )
                })
              }

            </View>
          )
        })
      }

      <TouchableOpacity
        style = {styles.buttonMenu}
        onPress= {() => setHome('menu')}>
        <Text style = {styles.textButtonMenu}> Voltar ao menu</Text>
      </TouchableOpacity>
      
      
      
    </View>
    );
  }

  function getHomeVencedor() {
    return (
      <View style = {styles.container}>
        <Text style={styles.titulo}>Jogo do Galo</Text>
        <Text style={styles.subtitulo}>Resultado final</Text>
        <StatusBar style = "auto" />

        {
          winner === '' &&
          <Text style = {styles.finalText}>Empate</Text>
        }

        {
          winner !== '' &&
          <>
          <Text style = {styles.finalText}>Vencedor</Text>
          <View
            style = {styles.boxPlayer}>
            <Text style={winner === 'X' ? styles.playerX : styles.playerO}>{winner}
            </Text>
          </View>
          </>
        }

        

        <TouchableOpacity
            style = {styles.buttonMenu}
          onPress= {() => setHome('menu')}>
          <Text style = {styles.textButtonMenu}> Voltar ao menu</Text>
        </TouchableOpacity>

      </View>
    );
  }

  
};



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  titulo: {
    color:'black',
    fontSize: 30,
    fontWeight: 'bold',
    fontFamily: 'Arial',
  },
  subtitulo: {
    color: '#555',
    fontSize: 15,
    marginTop: 20,
  },
  playerX: {
    fontSize: 40,
    color: '#00FF00',
  },
  playerO: {
    fontSize: 40,
    color: '#FF0000',
  },
  texto: {
    color: 'black'
  },
  inlineItems: {
    flexDirection: 'row'
  },
  boxPlayer: {
    width: 80,
    height: 80,
    backgroundColor: '#ddd',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 5
  },
  buttonMenu: {
    marginTop: 20
  },
  textButtonMenu: {
    color: '#4e6fe4'
  },
  finalText: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#333'
  }
});

export default App;
