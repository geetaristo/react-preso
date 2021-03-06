var React = require('react-native')
  , SongList = require('./SongList')

var {
  StyleSheet,
  Text,
  Image,
  View,
  PixelRatio
  } = React

var AlbumView = React.createClass({
  render: function(){
    var album = this.props.album
    
    return (
      <View style={ styles.container }>
        <View>
          <Image
            source={ { uri: album.thumbnail } }
            style={ styles.albumImage }
            />
          <View style={ styles.textContainer }>
            <Text style={ styles.albumTitle} numberOfLines={ 1 }>
              { album.albumtitle}
            </Text>
            <Text style={ styles.albumSummary } numberOfLines={ 1 }>
              { album.summary }
            </Text>
          </View>

          <SongList album={album} />

        </View>
      </View>
    )
  }
})

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 64
  },
  textContainer: {
    marginLeft: 10
  },
  albumImage: {
    height: 100,
    marginLeft: 10,
    marginTop:10,
    width: 100,
    justifyContent:'center'  
  },
  albumSummary: {
    color: '#999999',
    fontSize: 12
  }

})

module.exports = AlbumView