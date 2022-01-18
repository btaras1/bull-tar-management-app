import { useEffect, useState } from "react";
import { getAllMales } from "../../api/male";
import { getAllFemales } from "../../api/female";
import Section from "../../components/Section/Section";
import Table from "../../components/Table/Table";

const Dogs = () => {
  const authToken = localStorage.getItem("authToken");
  const [males, setMales] = useState(null);
  const [females, setFemales] = useState(null);
  const tableHead = ["Ime", "Boja", "Datum rođenja", "Pedigre"];

  async function getMales() {
    setMales(null);
    getAllMales(authToken).then((items) => setMales(items));
  }
  async function getFemales() {
    setFemales(null);
    getAllFemales(authToken).then((items) => setFemales(items));
  }

  useEffect(() => {
    getMales();
    getFemales();
  }, []);
  return (
    <>
      {males && females ? (
        <>
          <Section title="MUŽJACI">
            <Table
              get={getMales}
              head={tableHead}
              passedData={males}
              dogs={true}
              title={"Novi mužjak"}
              gender={true}
            />
          </Section>
          <Section title="ŽENKE">
            <Table
              get={getFemales}
              head={tableHead}
              passedData={females}
              dogs={true}
              title={"Nova ženka"}
              gender={false}
            />
          </Section>
        </>
      ) : (
        <Section title="LOADING..." />
      )}
    </>
  );
};

export default Dogs;
