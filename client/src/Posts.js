import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Button, Form } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import { Space, Table, Tag } from 'antd';

function Posts() {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [updatedPost, setUpdatedPost] = useState({
    year: "",
  });
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    axios
      .get("/posts")
      .then((res) => {
        console.log(res);
        setPosts(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const deletePost = (id) => {
    console.log(id);

    axios
      .delete(`/delete/${id}`)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));

    window.location.reload();
  };

  const updatePost = (id, title, description) => {
    setUpdatedPost((prev) => {
      return {
        ...prev,
        id: id,
        title: title,
        description: description,
      };
    });
    handleShow();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedPost((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const saveUpdatedPost = () => {
    console.log(updatedPost);

    axios
      .put(`/update/${updatedPost.id}`, updatedPost)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));

    handleClose();
    window.location.reload();
  };

  const handleFilter = ()=>{
    axios
      .get(`/posts/${updatedPost.year}`)
      .then((res) => {
        console.log(res);
        setPosts(res.data);
      })
      .catch((err) => console.log(err));
  }
  
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Roll Number',
      dataIndex: 'rollNo',
      key: 'age',
    },
    {
      title: 'Passed Out year',
      dataIndex: 'passedYear',
      key: 'address',
    },
  ];

  return (
    <div style={{ width: "90%", margin: "auto auto", textAlign: "center" }}>
      <h1>Posts page</h1>
      <Button
        variant="outline-dark"
        style={{ width: "100%", marginBottom: "1rem" }}
        onClick={() => navigate(-1)}
      >
        BACK
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Update a post</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Control
            placeholder="title"
            name="title"
            value={updatedPost.title ? updatedPost.title : ""}
            style={{ marginBottom: "1rem" }}
            onChange={handleChange}
          />
          <Form.Control
            placeholder="description"
            name="description"
            onChange={handleChange}
            value={updatedPost.description ? updatedPost.description : ""}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={saveUpdatedPost}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
      <h3>Fill and click apply to filter by year</h3>
      <div className="card p-4">
      <Form.Control
            placeholder="year"
            name="year"
            value={updatedPost.year ? updatedPost.year : ""}
            style={{ marginBottom: "1rem",width: "30%" }}
            onChange={handleChange}
            type="number"
      />
      <Button onClick={handleFilter}>Apply Filter</Button>
      </div>
      {posts ? (
        <>
          <Table dataSource={posts} columns={columns} />;
          {/* {posts.map((post) => {
            return (
              <div
                style={{
                  marginBottom: "1rem",
                  border: "solid lightgray 1px",
                  borderRadius: "8px",
                }}
                key={post._id}
              >
                <h4>{post.name}</h4>
                <p>{post.rollNo}</p>
                <p>{post.passedYear}</p>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",

                    padding: "1rem",
                  }}
                >
                  <Button
                    variant="outline-info"
                    onClick={() =>
                      updatePost(post._id, post.title, post.description)
                    }
                    style={{ width: "100%", marginRight: "1rem" }}
                  >
                    UPDATE
                  </Button>
                  <Button
                    onClick={() => deletePost(post._id)}
                    variant="outline-danger"
                    style={{ width: "100%" }}
                  >
                    DELETE
                  </Button>
                </div>
              </div>
            );
          })} */}
        </>
      ) : (
        ""
      )}
    </div>
  );
}

export default Posts;
