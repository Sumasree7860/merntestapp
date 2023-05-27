import { Form, Button } from "react-bootstrap";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function CreatePost() {
  const navigate = useNavigate();
  const [post, setPost] = useState({
    name: "",
    rollNo: "",
    passedYear: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPost((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const createPost = (e) => {
    e.preventDefault();

    axios
      .post("/create", post)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));

    navigate("posts");
  };

  return (
    <div style={{ textAlign: "center", width: "90%", margin: "auto auto" }}>
      <h1>Create User page</h1>
      <Form>
        <Form.Group>
          <Form.Control
            name="name"
            value={post.name}
            onChange={handleChange}
            style={{ marginBottom: "1rem" }}
            placeholder="name"
          />
          <Form.Control
            onChange={handleChange}
            name="rollNo"
            value={post.rollNo}
            style={{ marginBottom: "1rem" }}
            placeholder="rollNo"
          />
           <Form.Control
            onChange={handleChange}
            name="passedYear"
            type="number"
            value={post.passedYear}
            style={{ marginBottom: "1rem" }}
            placeholder="passedYear"
          />
          
        </Form.Group>
        <Button
          onClick={createPost}
          variant="outline-success"
          style={{ width: "100%", marginBottom: "1rem" }}
        >
          CREATE USER
        </Button>
      </Form>
      <Button
        onClick={() => navigate("posts")}
        variant="outline-success"
        style={{ width: "100%" }}
      >
        ALL USERS
      </Button>
    </div>
  );
}

export default CreatePost;
