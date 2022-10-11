import { useState, useEffect } from "react";
import { ListGroup, Card, Button, Form } from "react-bootstrap";
import api from "./api";

const AddCrop = ({ onAdd }) => {
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [type, setType] = useState("");
  const [cropId, setCropId] = useState(null);
  const [crops, setCrops] = useState([]);

  useEffect(() => {
    refreshCrops();
  }, []);

  const refreshCrops = () => {
    api.get("/")
      .then((res) => {
        setCrops(res.data);
        // setName(res[0].name)
        // setGenre(res[0].genre)
        // setStarring(res[0].starring)
        // setMovieId(res[0].id)
      })
      .catch(console.error);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    let item = { name, desc, type };
    api.post("/", item).then(() => refreshCrops());
  };

  const onUpdate = (id) => {
    let item = { name ,desc,type};
    api.patch(`/${id}/`, item).then((res) => refreshCrops());
  };

  const onDelete = (id) => {
    api.delete(`/${id}/`).then((res) => refreshCrops());
  };

  function selectCrop(id) {
    let item = crops.filter((crop) => crop.id === id)[0];
    setName(item.name);
    setDesc(item.desc);
    setType(item.type);
    setCropId(item.id);
  }

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-4">
          <h3 className="float-left">Create a new Crop</h3>
          <Form onSubmit={onSubmit} className="mt-4">
            <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Label>{cropId} Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicGenre">
              <Form.Label>Desc</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Description"
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicStarring">
              <Form.Label>Type</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Type"
                value={type}
                onChange={(e) => setType(e.target.value)}
              />
            </Form.Group>

            <div className="float-right">
              <Button
                variant="primary"
                type="submit"
                onClick={onSubmit}
                className="mx-2"
              >
                Save
              </Button>
              <Button
                variant="primary"
                type="button"
                onClick={() => onUpdate(cropId)}
                className="mx-2"
              >
                Update
              </Button>
            </div>
          </Form>
        </div>
        <div className="col-md-8 m">
          <table class="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Crop Name</th>
                <th scope="col">Desc</th>
                <th scope="col">Type</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              {crops.map((crop, index) => {
                return (
                  <tr key="">
                    <th scope="row">{crop.id}</th>
                    <td> {crop.name}</td>
                    <td>{crop.desc}</td>
                    <td>{crop.type}</td>
                        <td>
                        <Button
                        variant="primary"
                        type="button"
                        onClick={() => selectCrop(crop.id)}
                        className="mx-2"
                    > Select</Button>
                      <Button
                        variant="primary"
                        type="button"
                        onClick={() => onDelete(crop.id)}
                        className="mx-2"
                    >
                        Delete
                        </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AddCrop;