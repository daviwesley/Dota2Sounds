/**
 * Aplicativo para compartilhar sons do Battlepass TI8 do jogo Dota 2
 */
import React, {Component} from 'react';
import {StyleSheet, Text, ScrollView, StatusBar, Alert, View, NativeModules} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'
import Sound from 'react-native-sound';
import Share from 'react-native-share';
import RNFS from 'react-native-fs'
import RNFetchBlob from 'rn-fetch-blob'
import audios from './audios'
import file64 from './audios'
const Header = ({children, style}) => <Text style={[styles.header, style]}>{children}</Text>

const Feature = ({title, onPressPlay, onShare}) => (
  <View style={styles.feature}>
    <Icon.Button name="ios-play" size={32} color="#0e141f" onPress={onPressPlay} padding={0} 
                 backgroundColor='#273445'/>
    <Header style={{flex: 1}}>{title}</Header>
    <Icon.Button name="ios-share" size={32} color="#0e141f" onPress={onShare} padding={0} 
                 backgroundColor='#273445'/>
  </View>
);

export default class App extends Component {
    static navigationOptions = {
		  title: 'Login',
		  headerStyle: {
			  backgroundColor: '#273445'
		  },
		  headerTitleStyle: {
        color: 'white',
        textAlign: 'center'
		  }
	  };
    constructor(props) {
      super(props)
      Sound.setCategory('Playback', true); // true = mixWithOthers
      this.state = {
        whoosh: new Sound('phantom.mp3', Sound.MAIN_BUNDLE),
        text: []
      }
    }
    componentDidMount(){
      var RNSound = NativeModules.RNSound;
      s = RNSound.MainBundlePath;
      console.log(s)
      console.log('oioioi')
    }
    /**
    * Compartilha o arquivo mp3 com outros aplicativos
    * @param path caminho para o arquivo
    */
    share(path){
      const FACEBOOK_ICON = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAMAAAANIilAAAAAYFBMVEUAAAAAQIAAWpwAX5kAX5gAX5gAX5gAXJwAXpgAWZ8AX5gAXaIAX5gAXpkAVaoAX5gAXJsAX5gAX5gAYJkAYJkAXpoAX5gAX5gAX5kAXpcAX5kAX5gAX5gAX5YAXpoAYJijtTrqAAAAIHRSTlMABFis4vv/JL0o4QvSegbnQPx8UHWwj4OUgo7Px061qCrcMv8AAAB0SURBVEjH7dK3DoAwDEVRqum9BwL//5dIscQEEjFiCPhubziTbVkc98dsx/V8UGnbIIQjXRvFQMZJCnScAR3nxQNcIqrqRqWHW8Qd6cY94oGER8STMVioZsQLLnEXw1mMr5OqFdGGS378wxgzZvwO5jiz2wFnjxABOufdfQAAAABJRU5ErkJggg==";
      let shareImageBase64 = {
        title: "React Native",
        message: "Hola mundo",
        url: FACEBOOK_ICON,
        subject: "Share Link" //  for email
      };
      Share.open(shareImageBase64);
    }
    /**
    * Toca arquivos mp3's encontrados dentro do aplicativo
    * @param testInfo um objeto com título, url(caminho do arquivo) e fonte do arquivo
    */
    playSound(testInfo) {
      const callback = (error, sound) => {
        if (error) {
          Alert.alert('error', error.message);
        }
        sound.play(() => {
          sound.release();

        });
      };
      const sound = new Sound(testInfo.url, testInfo.basePath, error => callback(error, sound));
    }
  render() {
    return (
      <ScrollView style={styles.container}>
        {audios.map(testInfo => {
            return (
              <Feature
                key={testInfo.title}
                title={testInfo.title}
                onPressPlay={() => {this.playSound(testInfo)}}
                onShare={() => {this.share(testInfo.url)}}
              />
            );
          })}
        <StatusBar backgroundColor='#273445' barStyle='light-content'/>
      </ScrollView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#273445',
    flex:1
  },
  feature: {
    flexDirection: 'row',
    padding: 6,
    alignSelf: 'stretch',
    alignItems: 'center',
    // borderTopWidth: 1,
    // borderTopColor: 'rgb(180,180,180)',
    borderBottomWidth: 1,
    // borderBottomColor: 'rgb(230,230,230)',
  },
  header: {
    textAlign: 'left',
    paddingLeft: 4,
    color: '#95a3ab'
  },
});
