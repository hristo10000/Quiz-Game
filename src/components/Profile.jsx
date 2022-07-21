function Profile() {
  return console.log(this.props.location.state.token);
}
export default Profile;
