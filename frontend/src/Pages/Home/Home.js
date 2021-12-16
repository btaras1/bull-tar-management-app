
import { useEffect, useState } from 'react';
import { getFemaleMatingCount } from '../../api/female';
import { getLitterCount } from '../../api/litter';
import { getPuppyCount } from '../../api/puppy';
import  Card  from '../../components/Card/Card';
import  Section  from '../../components/Section/Section';
import  Table  from '../../components/Table/Table';
import {Grid} from '../../lib/style/generalStyles';

const Mating = () => {
 const [matings, setMatings] = useState(null);
 const [litterCount, setLitterCount] = useState(null);
 const [puppyCount, setPuppyCount] = useState(null);

 async function getAll() {
     getFemaleMatingCount().then(items => setMatings(items));
     getLitterCount().then(items => setLitterCount(items));
     getPuppyCount().then(items => setPuppyCount(items));
     console.log(matings);
     console.log(puppyCount);
     console.log(litterCount);
    }

 
 useEffect(() => {
   getAll();
 }, [])

 return (
    <>
    
        <>
        <Section title="Statistika" >
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

    </>
  );
}

export default Mating;