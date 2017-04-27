import React, { Component, PropTypes } from 'react';
// import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';
// import { showUserStories } from '../../../redux/modules/story';
import { connect } from 'react-redux';
import { asyncConnect } from 'redux-connect';
import { isLoaded as isStoriesLoaded, load as loadStories } from 'redux/modules/users';
import Sbox from './Sbox';
import Post from './Post';
import './index.scss';

@asyncConnect([{
  promise: ({store: {dispatch, getState}}) => {
    const promises = [];

    if (!isStoriesLoaded(getState())) {
      promises.push(dispatch(loadStories()));
    }

    return Promise.all(promises);
  }
}])

@connect(
  state => ({
    storiesArr: state.story.storiesArr
  })
)

class Stream extends Component {
  // constructor(props) {
  //   super(props);
  //
  //   this.showStories = this.showStories.bind(this);
  // }
  //
  // componentWillMount() {
  //   this.showStories();
  // }
  //
  // showStories() {
  //   this.props.showUserStoriesRequest();
  // }

  render() {
    const { storiesArr } = this.props;
    return (
      <div className="stream">
        <Sbox
          createStoryRequest={this.props.createStoryRequest}
        />
        {/*<button onClick={this.showStories}>click me</button>*/}
        {storiesArr.map((story) => (
          <Post
            key={story.id}
            post={story.description}
          />
        ))}
        {this.props.children}
      </div>
    );
  }
}

Stream.propTypes = {
  children: PropTypes.element,
  // showUserStoriesRequest: PropTypes.func,
  createStoryRequest: PropTypes.func,
  storiesArr: PropTypes.array
};

// function mapDispatchToProps(dispatch) {
//   return {
//     showUserStoriesRequest: bindActionCreators(showUserStories, dispatch)
//   };
// }

// function mapStateToProps(state) {
//   return {
//     storiesArr: state.story.storiesArr
//   };
// }

// export default connect(null, mapDispatchToProps)(Stream);
export default Stream;
