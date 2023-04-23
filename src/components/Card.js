import React, { useEffect, useState } from "react";
import "./Card.css";
import { MailOutlined, PhoneOutlined, GlobalOutlined } from "@ant-design/icons";

import axios from "axios";
import edit from "../Icons/edit.png";
import like from "../Icons/like.png";
import unlike from "../Icons/unLike.png";
import deleteImg from "../Icons/delete.png";
import Spinner from "./Spinner";
const Card = () => {
  const [apidata, setApiData] = useState();
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [editId, setEditId] = useState();
  const [updateUser, setupdateUser] = useState({
    username: "",
    email: "",
    number: "",
    url: "",
  });

  function inputHandler(e) {
    console.log(updateUser);
    const { name, value } = e.target;
    setupdateUser({ ...updateUser, [name]: value });
    console.log(updateUser);
  }
  const updateUserData = async () => {
    try {
      axios.post("https://bytive-technologies-mern-stack-d2co.onrender.com/", {
        id: editId,
        username: updateUser.username,
        email: updateUser.email,
        number: updateUser.number,
        url: updateUser.url,
      });
    } catch (error) {
      console.log(error);
    }
  };
  const editHandler = (e) => {
    e.preventDefault();
    setIsOpen(!isOpen);
    setEditId(e.target.id);
    apidata.filter((data) =>
      data._id === e.target.id
        ? setupdateUser({
            username: data.username,
            email: data.email,
            number: data.number,
            url: data.url,
          })
        : ""
    );
  };
  const deleteHandler = (e) => {
    setApiData(apidata.filter((data2) => data2._id !== e.target.id));
    if (apidata.length <= 1) {
      setLoading(true);
    }
  };
  const likeHandler = (index) => {
    setApiData((prevState) => {
      const updatedApidata = [...prevState];
      updatedApidata[index].liked = !updatedApidata[index].liked;
      return updatedApidata;
    });
  };

  useEffect(() => {
    fetch("https://bytive-technologies-mern-stack-d2co.onrender.com/")
      .then((response) => response.json())
      .then((data) => {
        const dataWithLiked = data.map((obj) => {
          return { ...obj, liked: false };
        });
        setApiData(dataWithLiked);
        setTimeout(() => {
          setLoading(false);
        }, 2000);
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <div>
      {loading === false ? (
        <div className="container">
          <div class="row">
            {apidata
              ? apidata.map((data, index) => (
                  <div class="column">
                    <div class="card">
                      <div>
                        <div>
                          <img alt="" src={data.image}></img>
                        </div>
                        <div>
                          <p>{data.username}</p>
                          <div className="commonCLass">
                            <MailOutlined />
                            <p>{data.email}</p>
                          </div>
                          <div className="commonCLass">
                            <PhoneOutlined />
                            <p>{data.number}</p>
                          </div>

                          <div className="commonCLass">
                            <GlobalOutlined />
                            <p>{data.url}</p>
                          </div>
                        </div>
                        <div className="iconDiv">
                          <img
                            alt=""
                            className="editImg"
                            onClick={() => likeHandler(index)}
                            src={data.liked ? like : unlike}
                          ></img>
                          <div className="slashDiv"></div>
                          <img
                            alt=""
                            id={data._id}
                            className="editImg"
                            src={edit}
                            onClick={editHandler}
                          ></img>

                          <div className="slashDiv"></div>

                          <img
                            alt=""
                            id={data._id}
                            className="editImg"
                            src={deleteImg}
                            onClick={deleteHandler}
                          ></img>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              : ""}
          </div>

          {isOpen && (
            <div className="popup-overlay">
              <div>
                <form onSubmit={updateUserData}>
                  <div className="popup">
                    <div className="popupChildDiv">
                      <p>Basic Modal </p>
                      <button onClick={() => setIsOpen(!isOpen)}>X</button>
                    </div>

                    <hr />
                    <div className="labelDiv">
                      <div className="label">
                        <label>✶Name:</label>
                        <label>✶Email:</label>
                        <label>✶Phone:</label>
                        <label>✶Website:</label>
                      </div>
                      <div className="inputDiv">
                        <input
                          required
                          onChange={inputHandler}
                          name="username"
                          value={updateUser.username}
                        />
                        <input
                          value={updateUser.email}
                          required
                          onChange={inputHandler}
                          name="email"
                        />
                        <input
                          value={updateUser.number}
                          required
                          onChange={inputHandler}
                          name="number"
                        />
                        <input
                          value={updateUser.url}
                          required
                          onChange={inputHandler}
                          name="url"
                        />
                      </div>
                    </div>
                    <hr />

                    <div className="submitDiv">
                      <button onClick={() => setIsOpen(!isOpen)}>Cancel</button>
                      <button type="submit">OK</button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      ) : (
        <Spinner />
      )}
    </div>
  );
};

export default Card;
