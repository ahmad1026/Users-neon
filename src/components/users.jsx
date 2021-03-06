import React, { Component } from "react";
import axios from "axios";
import LoadingUsers from "./loading/loadingUsers";

class Users extends Component {
  state = {
    users: [],
    isLoading: true,
  };

  async componentDidMount() {
    const response = await axios.get("https://reqres.in/api/users");
    setTimeout(() => {
      this.setState({ users: response.data.data, isLoading: false });
    }, 1000);
  }

  render() {
    return (
      <>
        <button onClick={this.handleCreate} className="btn btn-lg btn-primary">
          Create
        </button>
        <div className="row">
          {this.state.isLoading ? (
            <LoadingUsers />
          ) : (
            this.state.users.map((user, index) => {
              return (
                <div className="col-4 text-center p-5" key={index}>
                  <img
                    src={user.avatar}
                    style={{ borderRadius: "50%", width: "100px" }}
                    alt=""
                  />
                  <h4>
                    {user.first_name} {user.last_name}
                  </h4>
                  <h5>{user.email}</h5>
                  <div className="row">
                    <div className="col-6">
                      <button
                        onClick={() => {
                          this.handleUpdate(user);
                        }}
                        className="btn btn-info btn-sm"
                      >
                        update
                      </button>
                      <button
                        onClick={() => {
                          this.handleDelete(user);
                        }}
                        className="btn btn-danger btn-sm"
                      >
                        delete
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </>
    );
  }
  handleCreate = async () => {
    const newUser = {
      first_name: "ahmad",
      last_name: "mohammadi",
      email: "ahmad@gmail.com",
      avatar: "https://reqres.in/img/faces/2-image.jpg",
    };
    const response = await axios.post("https://reqres.in/api/users", newUser);
    this.setState({ users: [...this.state.users, newUser] });
  };
  handleUpdate = async (user) => {
    user.first_name = "updated";
    const response = await axios.put(
      `https://reqres.in/api/users/${user.id}`,
      user
    );
    const updateUsers = [...this.state.users];
    const index = updateUsers.indexOf(user);
    updateUsers[index] = { ...user };
    this.setState({ users: updateUsers });
  };
  handleDelete = async (user) => {
    const response = await axios.delete(
      `https://reqres.in/api/users/${user.id}`
    );
    const newUser = this.state.users.filter((u) => u.id !== user.id);
    this.setState({ users: newUser });
  };
}

export default Users;
