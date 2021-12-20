
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
 const tableHead = ["Ime","Boja","Datum rođenja","Pedigre"];
 async function getMales() {getAllMales().then(items => setMales(items));}
 async function getFemales() {getAllFemales().then(items => setFemales(items));}
 useEffect(() => {
   getMales();
   getFemales();
 }, [])
 return (
    <>
    {males && females ? (
        <>
        <ColumnLayout>
        <Section title="MUŽJACI">
            <Table head={tableHead} data={males} dogs={true} title={"Novi mužjak"}/>
        
        </Section>
        </ColumnLayout>
        <ColumnLayout>
        <Section title="ŽENKE" >
        <Table head={tableHead} data={females} dogs={true} title={"Nova ženka"}/>
        
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