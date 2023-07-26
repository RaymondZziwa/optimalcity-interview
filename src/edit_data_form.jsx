import { useState, useEffect, useReducer } from "react";
import { Form } from "react-bootstrap";


const initialState = {
  data: [],
};

const reducerFunction = (state, action)=> {
  switch (action.type) {
    case "UPDATE_DATA":
      return { ...state, data: action.newData };
    default:
      return state;
  }
};

const EditDataForm = ({ setData }) => {
  const [state, dispatch] = useReducer(reducerFunction, initialState);
  const [selectedName, setSelectedName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setContact] = useState("");
  const [description, setDescription] = useState("")
  const [status, setStatus] = useState('')

  useEffect(() => {
    if (status) {
      const timer = setTimeout(() => {
        setStatus(null);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [status])

  useEffect(() => {
    // Load the initial data from data.json into the component state
    fetch("/data.json")
      .then((response) => response.json())
      .then((data) => {
        setData(data)
        dispatch({ type: "UPDATE_DATA", newData: data });
      })
      .catch((error) => {
        console.error("Error loading data:", error);
      });
  }, []);

  const saveChangesHandler = (event) => {
    event.preventDefault();

    const newData = state.data.map((item) =>
      item.name === selectedName
        ? { ...item, email, phone, description }
        : item
    );

    // Update the state with the new data
    dispatch({ type: "UPDATE_DATA", newData })
     setStatus({ type: 'success' })
    setData(newData)
  };

  return (
    <>
      <h3 style={{ textAlign: "center" }}>Data Editor</h3>
      {status?.type === 'success' && <p style={{ margin: '20px' }} className="alert alert-success" role="alert">Data changes Saved Successfully.</p>}
      <Form onSubmit={saveChangesHandler}>
        <select
          className="form-select"
          aria-label="Default select example"
          style={{ height: "60px", marginBottom: "10px" }}
          onChange={(event) => setSelectedName(event.target.value)}
        >
          <option value="" selected>
            Select Name
          </option>
          {state.data.map((data, index) => (
            <option key={index + 1} value={data.name}>
              {data.name}
            </option>
          ))}
        </select>
        <div className="form-floating mb-3">
          <input
            type="text"
            className="form-control"
            id="floatingInput"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label htmlFor="floatingInput">Email</label>
        </div>
        <div className="form-floating mb-3">
          <input
            type="text"
            className="form-control"
            id="floatingInput"
            value={phone}
            onChange={(e) => setContact(e.target.value)}
          />
          <label htmlFor="floatingInput">Contact</label>
        </div>
        <div className="form-floating mb-3">
          <input
            type="text"
            className="form-control"
            id="floatingInput"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <label htmlFor="floatingInput">Description</label>
        </div>
        <button
          type="submit"
          style={{
            width: "100%",
            border: "none",
            color: "white",
            height: "45px",
            backgroundColor: "#3452A3",
            marginTop: "5px",
          }}
        >
          Save Changes
        </button>
      </Form>
    </>
  );
};

export default EditDataForm;
