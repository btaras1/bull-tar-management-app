
import { useEffect, useState } from 'react';
import { getAllLitters, getLastLitter } from '../../api/litter';
import { getFemaleMatingCount } from '../../api/female';
import { getLitterCount } from '../../api/litter';
import { getPuppyCount } from '../../api/puppy';
import  Card  from '../../components/Card/Card';
import  Section  from '../../components/Section/Section';
import  OneRowTable  from '../../components/OneRowTable/OneRowTable';
import {Grid} from '../../lib/style/generalStyles';
import { FaCommentsDollar } from 'react-icons/fa';
import axios from 'axios';


const Mating = () => {
 const [matings, setMatings] = useState(null);
 const [litterCount, setLitterCount] = useState(null);
 const [puppyCount, setPuppyCount] = useState(null);
 const [stenci, setStenci] = useState(null);
 const tableHead = ["Mužjak","Ženka","Datum", "Za van"];
 const tableHeadPuppy= ["Naziv", "Spol", "Boja", "Mikročip","Kupac"];

 


 async function getAll() {
     getLastLitter().then(response => setStenci(response));
     getFemaleMatingCount().then(items => setMatings(items));
     getLitterCount().then(items => setLitterCount(items));
     getPuppyCount().then(items => setPuppyCount(items));
    }

    const test = () => {console.log(stenci);}
 
 useEffect(() => {
   getAll();


 }, [])

 return (
    <>
       {stenci !=null &&
        <>
        <Section title="LEGLA" >
          <OneRowTable head={tableHead} data={stenci} litter={true} headPuppy={tableHeadPuppy}/>
     </Section> 
     </> }


        
        <Section title="STATISTIKA" >
            <Grid>
        {matings && 
        <Card title="Parenja" data={matings} mating={true}/>
        }
        {litterCount && 
        <Card title="Broj legla" data={litterCount}/>
        }
        {puppyCount && 
        <Card title="Broj štenaca" data={puppyCount}/>
        }
        </Grid>
    </Section>

    </>

    
  );
}

export default Mating;