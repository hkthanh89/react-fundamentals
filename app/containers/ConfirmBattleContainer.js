var React = require('react');
var ConfirmBattle = require('../components/ConfirmBattle');
var githubHelpers = require('../utils/githubHelpers');

var ConfirmBattleContainer = React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },
  getInitialState: function () {
    console.log('getInitialState');
    return { 
      isLoading: true, 
      playersInfo: []
    }
  },
  componentWillMount: function () {
    console.log('componentWillMount')
  },
  componentDidMount: function () {
    var query = this.props.location.query;
    console.log('componentDidMount');
    console.log('QUERY', query);
    // Fetch info from github then update state
    // https://egghead.io/playlists/the-this-key-word-250c37d9
    githubHelpers.getPlayersInfo([query.playerOne, query.playerTwo])
      .then(function (players) {
        console.log('PLAYERS', players)
        this.setState({
          isLoading: false,
          playersInfo: [players[0], players[1]]
        })
      }.bind(this))
  },
  handleInitiateBattle: function () {
    this.context.router.push({
      pathname: '/results',
      state: {
        playersInfo: this.state.playersInfo
      }
    }); 
  },
  componentWillReceiveProps: function () {
    console.log('componentWillReceiveProps')
  },
  componentWillUnmount: function () {
    console.log('componentWillUnmount')
  },
  render: function() {
    console.log('render')
    return (
      <ConfirmBattle 
        isLoading={this.state.isLoading}
        onInitiateBattle={this.handleInitiateBattle}
        playersInfo={this.state.playersInfo} />
    )
  }
});

module.exports = ConfirmBattleContainer;
