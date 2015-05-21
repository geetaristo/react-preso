/**
 * Music app
 * 
 */

var React = require('react-native')
  , musicListData = require('./musicListData.json')
  , AlbumView = require('./AlbumView')


var {
  StyleSheet,
  Text,
  View,
  Image,
  ListView,
  PixelRatio,
  NavigatorIOS,
  StatusBarIOS,
  TouchableHighlight
  } = React;


var MusicList = React.createClass({
  getInitialState: function() {
    return {
      dataSource: new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1 !== r2
      }),
      loaded: false,
    }
  },
  componentDidMount: function() {
    this.fetchData()
  },
  fetchData: function() {
    // in reality we would load this from a server.
    this.setState({
        dataSource: this.state.dataSource.cloneWithRows(musicListData),
        loaded: true,
    })
  },
  openAlbum: function (album){
    this.props.navigator.push({
      title: `${album.title}`,
      component: AlbumView,
      passProps: { album }
    });
  },
  renderLoadingView: function() {
    return (
      <View style={styles.container}>
        <Text>
          Loading music...
        </Text>
      </View>
    );
  },
  renderAlbum: function(album) {
    return (
      <View>
        <TouchableHighlight onPress={ this.openAlbum.bind(this, album) }>
          <View>
            <View style={ styles.row }>
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
            </View>
            <View style={ styles.cellBorder } />
          </View>
        </TouchableHighlight>
      </View>
    );
  },
  render: function() {
    StatusBarIOS.setStyle(1) // Set the color of the StatusBar text to white
    
    if (!this.state.loaded) {
      return this.renderLoadingView();
    }

    return (
        <View style={ styles.container }>
            <ListView
                dataSource={this.state.dataSource}
                renderRow={this.renderAlbum}
            />
        </View>
    );
  }
});

var styles = StyleSheet.create({
  row: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
    flexDirection: 'row',
    padding: 10
  },
  textContainer: {
    flex: 1
  },
  albumImage: {
    height: 60,
    borderRadius: 30,
    marginRight: 10,
    width: 60
  },
  albumTitle: {
    flex: 1,
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 2
  },
  albumSummary: {
    color: '#999999',
    fontSize: 12
  },
  cellBorder: {
    backgroundColor: '#F2F2F2',
    height: 1 / PixelRatio.get(),
    marginLeft: 4
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  listContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-start',
    backgroundColor: '#F5FCFF',
    paddingTop:0,
    marginTop:0
  }
});

module.exports = MusicList;