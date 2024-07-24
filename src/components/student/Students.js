import React, { useEffect, useState } from "react";
import { Button, Container, Input, Table } from "reactstrap";
import axios from "axios";

export default function Students() {
  const [data, setData] = useState([]);
  const [messge, setMessge] = useState(null);
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [isEdit, setIsEdit] = useState({ id: "", flag: false ,state:""});
  const [text, setText] = useState("");
  const url = "https://66a07bbb7053166bcabb8e6d.mockapi.io/Student";
  const getStudent = () => {
    axios({
      method: "get",
      url: url,
    })
      .then(function (res) {
        setData(res.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const deleteStudent = (id) => {
    axios({
      method: "delete",
      url: url + "/" + id,
    })
      .then(function (res) {
        setMessge("Delete successfull");
        setData(data.filter((item) => item.id !== id));
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const addNewStudent = (name, age) => {
    axios({
      method: "post",
      url: url,
      data: {
        name: name,
        age: age,
      },
    })
      .then(function (res) {
        setMessge("Add successfull");
        setData([...data, { id: res.data.id, name: name, age: age }]);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const updateStudent = (id, index, count) => {
    if (count == 1) {
      axios({
        method: "put",
        url: url + "/" + id,
        data: {
          name: index,
        },
      })
        .then(function (res) {
          setMessge("Update successfull");
          setData(
            data.map((item) =>
              item.id === id ? { ...item, name: index } : item
            )
          );
        })
        .catch(function (error) {
          console.log(error);
        });
    }
    if (count == 2) {
      axios({
        method: "put",
        url: url + "/" + id,
        data: {
          age: index,
        },
      })
        .then(function (res) {
          setMessge("Update successfull");
          setData(
            data.map((item) =>
              item.id === id ? { ...item, age: index } : item
            )
          );
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };
  useEffect(() => {
    getStudent();
  }, []);

  return (
    <div>
      <Container>
        <h1>Student list</h1>
        <div className="inputNameAndAge">
          <Input
            type="text"
            placeholder="Nhập vào họ và tên học sinh"
            className="mx-2"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
          <Input
            type="text"
            placeholder="Nhập vào tuổi"
            value={age}
            onChange={(event) => setAge(event.target.value)}
          />
        </div>

        <Button
          className="btn m-2"
          color="primary"
          onClick={() => (addNewStudent(name, age), setAge(""), setName(""))}
        >
          Add new student
        </Button>

        {messge && <p>{messge}</p>}
        <Table>
          <thead>
            <tr>
              <th>id</th>
              <th>name</th>
              <th>age</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {data &&
              data.map((item, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>
                    {isEdit.id === item.id && isEdit.flag === true && isEdit.state===1? (
                      <Input
                        type="text"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            updateStudent(item.id, text, 1);
                            setIsEdit({ id: "", flag: false ,state:""});
                          }
                        }}
                      />
                    ) : (
                      <p
                        onDoubleClick={() => {
                          setIsEdit({ id: item.id, flag: true ,state:1});
                          setText(item.name);
                        }}
                      >
                        {item.name}
                      </p>
                    )}
                  </td>
                  <td>
                    {isEdit.id === item.id && isEdit.flag === true && isEdit.state===2? (
                      <Input
                        type="text"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            updateStudent(item.id, text, 2);
                            setIsEdit({ id: "", flag: false ,state:""});
                          }
                        }}
                      />
                    ) : (
                      <p
                        onDoubleClick={() => {
                          setIsEdit({ id: item.id, flag: true ,state:2});
                          setText(item.age);
                        }}
                      >
                        {item.age}
                      </p>
                    )}
                  </td>
                  <td>
                    <Button
                      className="btn btn-danger mx-2"
                      onClick={() => deleteStudent(item.id)}
                    >
                      delete
                    </Button>
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
      </Container>
    </div>
  );
}
