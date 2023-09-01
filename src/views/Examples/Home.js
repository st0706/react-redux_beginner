import React from "react";
import { withRouter } from "react-router";
import Color from "../HOC/Color";
import { connect } from 'react-redux';
class Home extends React.Component {
    handleDeleteUser = (user) => {
        this.props.deleteUserRedux(user)
    }
    handleCreateUser = () => {
        this.props.addUserRedux();
    }
    render() {
        let listUsers = this.props.dataRedux;
        return (
            <>
                <div>
                    Self learning with redux
                </div>
                <div>
                    {listUsers && listUsers.length > 0 &&
                        listUsers.map((user, index) => {
                            return (
                                <div key={user.id}>
                                    {index + 1} - {user.name} <span style={{ cursor: 'pointer' }} onClick={() => this.handleDeleteUser(user)}>x</span>
                                </div>
                            )
                        })
                    }
                </div >
                <button onClick={() => this.handleCreateUser()}>Add new</button>
            </>
        )
    }
}

const mapStateToProps = (state) => {
    return { dataRedux: state.users }
}
const mapDispatchToProps = (dispatch) => {
    return {
        deleteUserRedux: (userDelete) => dispatch({ type: 'DELETE_USER', payload: userDelete }),
        addUserRedux: () => dispatch({ type: 'CREATE_USER' })
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Color(Home));