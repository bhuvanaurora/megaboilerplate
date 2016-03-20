import React from 'react';
import { connect } from 'react-redux'
import { updateProfile, changePassword, deleteAccount, clearMessages} from '../../actions/auth';
import Messages from '../Shared/Messages';

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleProfileUpdate = this.handleProfileUpdate.bind(this);
    this.handleChangePassword = this.handleChangePassword.bind(this);
    this.handleDeleteAccount = this.handleDeleteAccount.bind(this);
    this.state = {
      email: props.user.email,
      name: props.user.name,
      gender: props.user.gender,
      location: props.user.location,
      website: props.user.website,
      password: '',
      confirm: ''
    };
  }

  componentWillMount() {
    const { dispatch } = this.props;
    dispatch(clearMessages());
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleProfileUpdate(event) {
    event.preventDefault();
    const state = this.state;
    const { dispatch, token } = this.props;
    dispatch(updateProfile(state, token));
  }

  handleChangePassword(event) {
    event.preventDefault();
    const { dispatch } = this.props;
    const { password, confirm } = this.state;
    dispatch(changePassword(password, confirm));
  }

  handleDeleteAccount(event) {
    event.preventDefault();
    const { dispatch } = this.props;
    dispatch(deleteAccount());
  }

  render() {
    const state = this.state;
    const { user } = this.props;
    return (
      <div className="container">
        <div className="panel">
          <div className="panel-body">
            <Messages messages={this.props.messages} />
            <form onSubmit={this.handleProfileUpdate} className="form-horizontal">
              <legend>Profile Information</legend>
              <div className="form-group">
                <label htmlFor="email" className="col-sm-3">Email</label>
                <div className="col-sm-7">
                  <input type="email" name="email" id="email" className="form-control" value={user.email} onChange={this.handleChange} />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="name" className="col-sm-3">Name</label>
                <div className="col-sm-7">
                  <input type="text" name="name" id="name" className="form-control" value={user.name} onChange={this.handleChange} />
                </div>
              </div>
              <div className="form-group">
                <label className="col-sm-3">Gender</label>
                <div className="col-sm-4">
                  <label className="radio-inline radio col-sm-4">
                    <input type="radio" name="gender" value="male" checked={user.gender === 'male'} onChange={this.handleChange} /><span>Male</span>
                  </label>
                  <label className="radio-inline col-sm-4">
                    <input type="radio" name="gender" value="female" checked={user.gender === 'female'} onChange={this.handleChange} /><span>Female</span>
                  </label>
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="location" className="col-sm-3">Location</label>
                <div className="col-sm-7">
                  <input type="text" name="location" id="location" className="form-control" value={user.location} onChange={this.handleChange} />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="website" className="col-sm-3">Website</label>
                <div className="col-sm-7">
                  <input type="text" name="website" id="website" className="form-control" value={user.website} onChange={this.handleChange} />
                </div>
              </div>
              <div className="form-group">
                <label className="col-sm-3">Gravatar</label>
                <div className="col-sm-4">
                  <img src={user.gravatar} width="100" height="100" className="profile" />
                </div>
              </div>
              <div className="form-group">
                <div className="col-sm-offset-3 col-sm-4">
                  <button type="submit" className="btn btn-success">Update Profile</button>
                </div>
              </div>
            </form>
          </div>
        </div>
        <div className="panel">
          <div className="panel-body">
            <form onSubmit={this.handleChangePassword} className="form-horizontal">
              <legend>Change Password</legend>
              <div className="form-group">
                <label htmlFor="password" className="col-sm-3">New Password</label>
                <div className="col-sm-7">
                  <input type="password" name="password" id="password" className="form-control" value={state.password} onChange={this.handleChange} />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="confirm" className="col-sm-3">Confirm Password</label>
                <div className="col-sm-7">
                  <input type="password" name="confirm" id="confirm" className="form-control"  value={state.confirm} onChange={this.handleChange} />
                </div>
              </div>
              <div className="form-group">
                <div className="col-sm-4 col-sm-offset-3">
                  <button type="submit" className="btn btn-success">Change Password</button>
                </div>
              </div>
            </form>
          </div>
        </div>
        <div className="panel">
          <div className="panel-body">
            <div className="form-horizontal">
              <legend>Linked Accounts</legend>
              <div className="form-group">
                <div className="col-sm-offset-3 col-sm-4">
                  <p><a href="/unlink/google" className="text-danger">Unlink your Google account</a></p>
                  <p><a href="/auth/google">Link your Google account</a></p>
                  <p><a href="/unlink/facebook" className="text-danger">Unlink your Facebook account</a></p>
                  <p><a href="/auth/facebook">Link your Facebook account</a></p>
                  <p><a href="/unlink/twitter" className="text-danger">Unlink your Twitter account</a></p>
                  <p><a href="/auth/twitter">Link your Twitter account</a></p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="panel">
          <div className="panel-body">
            <form onSubmit={this.handleDeleteAccount} className="form-horizontal">
              <legend>Delete Account</legend>
              <div className="form-group">
                <p className="col-sm-offset-3 col-sm-9">You can delete your account, but keep in mind this action is irreversible.</p>
                <div className="col-sm-offset-3 col-sm-9">
                  <button type="submit" className="btn btn-danger">Delete my account</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

const mapReduxStateToProfileProps = (state) => {
  return {
    token: state.token,
    user: state.user,
    messages: state.messages
  };
};

export default connect(mapReduxStateToProfileProps)(Profile);