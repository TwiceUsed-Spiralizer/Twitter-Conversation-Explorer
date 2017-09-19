import React from 'react';
import { connect } from 'react-redux';
import { AuthNav, GuestNav } from '../components';

const NavBar = props =>
 (props.user ? (<AuthNav />) : (<GuestNav />));


const mapStateToProps = state => ({
  user: state.user,
});

export default connect(mapStateToProps)(NavBar);
