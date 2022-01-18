import { useEffect, useState } from "react";
import { getAllMatings } from "../../api/mating";
import Section from "../../components/Section/Section";
import Table from "../../components/Table/Table";

const Mating = () => {
  const authToken = localStorage.getItem("authToken");
  const [matings, setMatings] = useState(null);
  const [deletePressed, setDeletePressed] = useState(false);
  const tableHead = ["Mužjak", "Ženka", "Datum"];

  async function getMatings() {
    setMatings(null);
    getAllMatings(authToken).then((items) => setMatings(items));
    console.log(matings);
  }

  useEffect(() => {
    getMatings();
    setDeletePressed(false);
  }, [deletePressed]);

  return (
    <>
      {matings ? (
        <>
          <Section title="PARENJA">
            <Table
              get={getMatings}
              head={tableHead}
              passedData={matings}
              matings={true}
              title={"Novo parenje"}
              setDeletePressed={setDeletePressed}
            />
          </Section>
        </>
      ) : (
        <Section title="LOADING..." />
      )}
    </>
  );
};

export default Mating;
