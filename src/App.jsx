import { useState } from "react"
import { Row, Col } from "react-bootstrap"
import EditDataForm from "./edit_data_form";


function App() {
  const [data, setData] = useState([])
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const totalPages = Math.ceil(data.length / itemsPerPage)

  return (
      <Row>
          <Col sm='12' md='7' lg='7' xl='7'>
              <h3 style={{textAlign:'center'}}>Data Display</h3>
              <table className="table table-light" style={{ marginTop: '20px',textAlign:'center' }}>
                            <thead style={{ textAlign: 'center' }}>
                                <tr>
                                    <th scope="col">Name</th>
                                    <th scope="col">Email</th>
                                    <th scope="col">Phone</th>
                                    <th scope="col">Description</th>
                                </tr>
                            </thead>
                            <tbody>
                            
                            {data ? (
                              data.slice(startIndex, endIndex).map((item, index) => (
                                <tr key={index + 1}>
                                  <td>{item.name}</td>
                                  <td>{item.email}</td>
                                  <td>{item.phone}</td>
                                  <td>{item.description}</td>
                                </tr>
                              ))
                            ) : (
                              <tr>
                                <td colSpan={4}>Loading...</td>
                              </tr>
                            )}
                            </tbody>
            </table>
            {totalPages > 1 && (
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '10px' }}>
                <button style={{backgroundColor: '#3452A3',color: 'white',padding: '10px 20px',border: 'none',borderRadius: '5px',marginLeft: '10px',cursor: 'pointer'}} disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)}>
                  Previous
                </button>
                <span style={{ margin: '0 10px' }}>Page {currentPage} of {totalPages}</span>
                <button style={{backgroundColor: '#3452A3',color: 'white',padding: '10px 20px',border: 'none',borderRadius: '5px',marginLeft: '10px',cursor: 'pointer'}} disabled={currentPage === totalPages} onClick={() => setCurrentPage(currentPage + 1)}>
                  Next
                </button>
              </div>
            )}
          </Col>
          <Col sm='12' md='4' lg='4' xl='4'>
              <EditDataForm data={data} setData={setData}/>
          </Col>
      </Row>
  )
}

export default App
