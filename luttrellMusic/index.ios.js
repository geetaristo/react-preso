/**
 * Music app
 * 
 */

var React = require('react-native')
  , MusicList = require('./MusicList')


var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  PixelRatio,
  NavigatorIOS,
  StatusBarIOS
  } = React

var LuttrellMusic = React.createClass({
  render: function() {
    return (
      <NavigatorIOS
        style={ styles.container }
        barTintColor='#1c9ccb'
        titleTextColor='#fff'
        tintColor='#fff'
        initialRoute={
          {
            component: MusicList,
            title: 'Albums'
          }
        }
        />
    )
  }
})

var styles = StyleSheet.create({
  container: {
    flex: 1
  }})

AppRegistry.registerComponent('luttrellMusic', () => LuttrellMusic)