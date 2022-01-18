import { useEffect, useState } from "react";
import { getLastLitter } from "../../api/litter";
import { getFemaleMatingCount } from "../../api/female";
import { getLitterCount } from "../../api/litter";
import { getPuppyCount } from "../../api/puppy";
import Card from "../../components/Card/Card";
import Section from "../../components/Section/Section";
import OneRowTable from "../../components/OneRowTable/OneRowTable";
import { Grid } from "../../lib/style/generalStyles";

const Mating = () => {
  const authToken = localStorage.getItem("authToken");
  const [matings, setMatings] = useState(null);
  const [litterCount, setLitterCount] = useState(0);
  const [puppyCount, setPuppyCount] = useState(0);
  const [stenci, setStenci] = useState([]);
  const tableHead = ["Mužjak", "Ženka", "Datum", "Za van"];
  const tableHeadPuppy = [
    "Naziv",
    "Spol",
    "Boja",
    "Mikročip",
    "Kupac",
    "Telefon",
  ];

  const getAll = async () => {
    getLastLitter(authToken).then((response) => {
      const array1 = [response];
      console.log(array1);
      setStenci(response);
    });
    getFemaleMatingCount(authToken).then((items) => setMatings(items));
    getLitterCount(authToken).then((items) => setLitterCount(items));
    getPuppyCount(authToken).then((items) => setPuppyCount(items));
  };

  useEffect(() => {
    getAll();
  }, []);

  return (
    <>
      {stenci.length !== 0 && (
        <>
          <Section title="ZADNJE LEGLO">
            <OneRowTable
              head={tableHead}
              data={stenci}
              litter={true}
              headPuppy={tableHeadPuppy}
            />
          </Section>
        </>
      )}

      <Section title="STATISTIKA" withoutTopPadding={true}>
        <Grid>
          {matings && <Card title="Parenja" data={matings} mating={true} />}

          <Card title="Broj legla" data={litterCount} />

          <Card title="Broj štenaca" data={puppyCount} />
        </Grid>
      </Section>
    </>
  );
};

export default Mating;
