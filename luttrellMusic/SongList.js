/**
 * Music app
 * 
 */

var React = require('react-native')
  , MusicPlayer = require('NativeModules').MusicPlayer
  , audioImg = require('image!megaphone_speaker_blue')
// Can't get this event emitter to work from Swift for some reason
//  , RCTDeviceEventEmitter = require('RCTDeviceEventEmitter')
//    var subscription = RCTDeviceEventEmitter.addListener(
//      'Loading',
//      (title) => console.log('loading file' + title +' right here')
//    )

var {
  StyleSheet,
  Text,
  View,
  ListView,
  PixelRatio,
  TouchableHighlight,
  Image
  } = React

var SongList = React.createClass({
  album: {},
    
  getInitialState: function() {
    this.album = this.props.album
    return {
      currentTitle: '',
      playing: false,
      dataSource: new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1 !== r2
      })
    }
  },
  componentDidMount: function() {
    this.setState({
        currentTitle: '',
        playing: false,
        dataSource: this.state.dataSource.cloneWithRows(this.album.songs)
    })
  },
  playSong: function (song){
    var self = this

    MusicPlayer.playSong(song.title, song.source,
        function(events){ // this is when the track has been loaed
            console.log('started playing ' + events)
            self.setState({
                currentTitle: events,
                playing: true,
                dataSource: self.state.dataSource

            })
          }, 
         function(events){ // this is when it's done
            console.log('done playing ' + events)
            self.setState({
                currentTitle: '',
                playing: false,
                dataSource: self.state.dataSource
            })
         })
    for(songIdx in this.album.songs){
        if(song.title == this.album.songs[songIdx].title){
            this.album.songs[songIdx].nowPlaying = true
        }
        else {
            this.album.songs[songIdx].nowPlaying = false
        }
    }
      
  },
  renderSong: function(song) {
    var nowPlaying = 
        song.nowPlaying ? <Image source={ audioImg }  style={ styles.nowPlaying}/> : <View />

    return (
      <View>
        <TouchableHighlight onPress={ this.playSong.bind(this, song) }>
          <View>
            <View style={ styles.row }>
              <View style={ styles.textContainer }>
                <Text style={ styles.songTitle} numberOfLines={ 1 }>
                  { song.title } 
                </Text>
                {nowPlaying}
              </View>
            </View>
                                 
            <View style={ styles.cellBorder } />
          </View>
        </TouchableHighlight>
      </View>
    )
  },
  renderHeader: function(){
      return (<Text></Text>)
  },
  render: function() {
    return (
        <ListView
            dataSource={this.state.dataSource}
            renderRow={this.renderSong}
            renderSectionHeader={this.renderHeader}
        />
    )
  }
})

var styles = StyleSheet.create({
  row: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
    flexDirection: 'row',
    padding: 10
  },
  textContainer: {
    flex: 1,
    flexDirection: 'row'
  },
  songTitle: {
    flex: 1,
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 2
  },
  cellBorder: {
    backgroundColor: '#F2F2F2',
    height: 1 / PixelRatio.get(),
    marginLeft: 4
  },
  nowPlaying:{
      height: 30 / PixelRatio.get(),
      width: 30
  }
})

module.exports = SongList