import { useEffect, useState } from "react";
import { getAllLitters } from "../../api/litter";
import Section from "../../components/Section/Section";
import Table from "../../components/Table/Table";

const Litter = () => {
  const authToken = localStorage.getItem("authToken");
  const [litters, setLitters] = useState(null);
  const tableHead = ["Mužjak", "Ženka", "Datum", "Za van"];
  const tableHeadPuppy = ["Naziv", "Spol", "Boja", "Mikročip", "Ime Kupca"];

  async function getLitters() {
    setLitters(null);
    getAllLitters(authToken).then((items) => setLitters(items));
  }

  useEffect(() => {
    getLitters();
  }, []);

  return (
    <>
      {litters && (
        <>
          <Section title="LEGLA">
            <Table
              get={getLitters}
              head={tableHead}
              passedData={litters}
              litters={true}
              headPuppy={tableHeadPuppy}
              title={"Novo leglo"}
            />
          </Section>
        </>
      )}
    </>
  );
};

export default Litter;
