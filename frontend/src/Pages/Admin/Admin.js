import { useEffect, useState } from "react";
import { getAllUsers } from "../../api/user";
import Section from "../../components/Section/Section";
import { AddButton } from "../../lib/style/generalStyles";
import {
  Table as TableStyle,
  TableHead,
  TableRow,
  TableData,
  THead,
  TableBody,
  DeleteTableData,
} from "../../components/Table/TableStyle";
import { FaTrash, FaEdit } from "react-icons/fa";
import Modal from "../../components/Modal/Modal";
import { deleteUser } from "../../api/user";
import UserForm from "../../components/UserForm/UserForm";
const Admin = () => {
  const authToken = localStorage.getItem("authToken");
  const [users, setUsers] = useState(null);
  const [user, setUser] = useState(null);
  const [addPressed, setAddPressed] = useState(false);
  async function getUsers() {
    getAllUsers(authToken).then((items) => setUsers(items));
  }

  useEffect(() => {
    setUsers(null);
    getUsers();
  }, [addPressed]);

  const openModal = () => {
    setAddPressed(!addPressed);
  };

  const handleDeleteUser = (user) => {
    deleteUser(user.id, authToken);
    const filterList = users.filter((item) => item.id != user.id);
    setUsers(filterList);
  };
  return (
    <>
      {addPressed && users && (
        <Modal get={getUsers} title={"Korisnik"} setModal={openModal}>
          <UserForm
            addPressed={addPressed}
            user={user}
            setAddPressed={setAddPressed}
          />
        </Modal>
      )}
      <Section>
        {users && (
          <>
            <TableStyle>
              <THead>
                <TableRow>
                  <TableHead user={true}>Korisničko ime</TableHead>
                  <TableHead user={true}>Aktivan</TableHead>
                  <TableHead user={true}>Uloge</TableHead>
                  <TableHead user={true}>Uredi</TableHead>
                  <TableHead user={true}>Obriši</TableHead>
                </TableRow>
              </THead>
              <TableBody>
                {users &&
                  users.map((content) => (
                    <TableRow key={content.id}>
                      <TableData user={true}>{content.username}</TableData>
                      <TableData user={true}>
                        {content.active !== null ? (content.active ? "DA" : "NE") : ("-")}
                      </TableData>
                      <TableData user={true}>{content.roles}</TableData>
                      <DeleteTableData user={true}>
                        <FaEdit
                          size={25}
                          onClick={() => {
                            setUser(content);
                            openModal();
                          }}
                        />
                      </DeleteTableData>
                      <DeleteTableData user={true}>
                        <FaTrash
                          size={25}
                          onClick={() => {
                            handleDeleteUser(content);
                          }}
                        />
                      </DeleteTableData>
                    </TableRow>
                  ))}
              </TableBody>
            </TableStyle>
            <AddButton
              onClick={() => {
                setUser(null);
                openModal();
              }}
            >
              Dodaj
            </AddButton>
          </>
        )}
      </Section>
    </>
  );
};

export default Admin;
