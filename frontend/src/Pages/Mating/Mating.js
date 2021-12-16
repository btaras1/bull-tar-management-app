
import { useEffect, useState } from 'react';
import { getAllMatings } from '../../api/mating';
import  Section  from '../../components/Section/Section';
import  Table  from '../../components/Table/Table';

const Mating = () => {
 const [matings, setMatings] = useState(null);
 const tableHead = ["Mužjak","Ženka","Datum"];

 async function getMatings() {getAllMatings().then(items => setMatings(items));}
 
 useEffect(() => {
   getMatings();
 })

 return (
    <>
    {matings &&
        <>
        <Section title="PARENJA" >
        <Table head={tableHead} data={matings} mating={true}/>
    </Section>

    </>
}
    </>
  );
}

export default Mating;