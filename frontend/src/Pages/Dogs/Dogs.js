
import { useEffect, useState } from 'react';
import { getAllMales } from '../../api/male';
import { getAllFemales } from '../../api/female';
import  Section  from '../../components/Section/Section';
import  Table  from '../../components/Table/Table';
import { ColumnLayout } from '../../components/Column/ColumnStyle';
import {AddButton} from '../../lib/style/generalStyles';
const Dogs = () => {



 const [males, setMales] = useState(null);
 const [females, setFemales] = useState(null);
 const [deletePressed, setDeletePressed] = useState(false);
 const tableHead = ["Ime","Boja","Datum rođenja","Pedigre"];
 async function getMales() {;getAllMales().then(items => setMales(items));}
 async function getFemales() {getAllFemales().then(items => setFemales(items));}
 useEffect(() => {
   getMales();
   getFemales();
   setDeletePressed(false);
 }, [deletePressed])
 return (
    <>
    {males && females ? (
        <>
        <ColumnLayout>
        <Section title="MUŽJACI">
            <Table get={getMales} head={tableHead} data={males} dogs={true} title={"Novi mužjak"} gender={true} deletePressed1={deletePressed} setDeletePressed1={setDeletePressed} />
        
        </Section>
        </ColumnLayout>
        <ColumnLayout>
        <Section title="ŽENKE" >
        <Table get={getFemales} head={tableHead} data={females} dogs={true} title={"Nova ženka"} gender={false} deletePressed1={deletePressed} setDeletePressed1={setDeletePressed}/>
        
    </Section>
    </ColumnLayout>
    </>
    )
    :(
        <Section title="LOADING..."/>
    )
    }
    </>
  );
}

export default Dogs;