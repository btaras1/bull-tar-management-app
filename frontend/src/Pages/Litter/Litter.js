
import { useEffect, useState } from 'react';
import { getAllLitters } from '../../api/litter';
import  Section  from '../../components/Section/Section';
import  Table  from '../../components/Table/Table';
import {AddButton} from '../../lib/style/generalStyles';

const Litter = () => {
 const [litters, setLitters] = useState(null);
 const tableHead = ["Mužjak","Ženka","Datum", "Za van"];
 const tableHeadPuppy= ["Naziv", "Spol", "Boja", "Mikročip","Ime Kupca"];

 async function getLitters() {getAllLitters().then(items => setLitters(items));}
 
 useEffect(() => {
   getLitters();
 })

 return (
    <>
    {litters &&
        <>
        <Section title="LEGLA" >
        <Table head={tableHead} data={litters} litter={true} headPuppy={tableHeadPuppy}/>
        <AddButton>Dodaj</AddButton>
    </Section>

    </>
}
    </>
  );
}

export default Litter;