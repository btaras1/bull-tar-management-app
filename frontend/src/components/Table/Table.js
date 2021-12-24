import React, { useEffect } from 'react';
import {Table as TableStyle, TableHead, TableRow, TableData, THead, TableBody,DeleteTableData, Text, PuppyTable, PuppyWrapper} from './TableStyle'
import { FaTrash, FaEdit,FaPlusSquare } from 'react-icons/fa'
import { useState } from 'react/cjs/react.development';
import Modal from '../Modal/Modal';
import {AddButton} from '../../lib/style/generalStyles';
import DogForm from '../DogForm/DogForm';
import MatingForm from '../MatingForm/MatingForm';
import LitterForm from '../LitterForm/LitterForm';
import PuppyForm from '../PuppyForm/PuppyForm';
import { deleteMale } from '../../api/male';
import { deleteFemale } from '../../api/female';

const Table = ({title, head,data, dogs, mating, litter, headPuppy, gender, get, deletePressed1, setDeletePressed1}) => {

    const [newData, setNewData] = useState([]);
    const [addPressed, setAddPressed] = useState(false);
    const [addPuppyPressed, setAddPuppyPressed] = useState(false);

    const openModal = () => {
        setAddPressed(!addPressed);
      }
    
    const openPuppyModal = () => {
        setAddPuppyPressed(!addPuppyPressed);
      }


    async function setListData() {
        
        const newData1 = data.map((content)=>{
        
            return {
                ...content,
                visible: content.value === false
            };
        }
        );
        setNewData(newData1);
    }
    const handleUpdate = (id) => {

        const newList = newData.map((item) => {
            if(item.litter_id === id) {
                const updatedItem = {
                    ...item,
                    visible: !item.visible,
                };
                return updatedItem;
            }
            return item;
            
        })
        setNewData(newList);
    }
      
    const handleDeleteDog = (dog, gender) => {
        if(gender){
            deleteMale(dog.male_id);
        }
        else if(!gender){
            deleteFemale(dog.female_id);
        }
        setDeletePressed1(true);
    }


    
      useEffect(() => {
       setListData();
    }, [])




    return(
<>  
        {(addPressed && dogs) && <Modal title={title} setModal={openModal}><DogForm  get={get} addPressed={addPressed} setAddPressed={setAddPressed} gender={gender} /></Modal>}
        {(addPressed && mating) && <Modal title={title} setModal={openModal}><MatingForm  get={get} addPressed={addPressed} setAddPressed={setAddPressed} /></Modal>}
        {(addPressed && litter) && <Modal title={title} setModal={openModal}><LitterForm  addPressed={addPressed} setAddPressed={setAddPressed} /></Modal>}
        {(addPuppyPressed && litter) && <Modal title={title} setModal={openPuppyModal}><PuppyForm  addPressed={addPuppyPressed} setAddPressed={setAddPuppyPressed} /></Modal>}
        {dogs &&
        <>
            <TableStyle>
                <THead>
            <TableRow>
            {head.map(title =>
                <TableHead>{title}</TableHead>
                )}
                <TableHead>Uredi</TableHead>
                <TableHead>Obriši</TableHead>
            </TableRow>
            </THead>
            <TableBody>
            
            {data.map(content =>
            
                <TableRow>
                    <TableData>{content.name}</TableData>
                    <TableData>{content.color}</TableData>
                    <TableData>{content.dob.substring(0,10)}</TableData>
                    <TableData>{content.pedigree_name}</TableData>
                    <DeleteTableData><FaEdit size={25}  /></DeleteTableData>
                    <DeleteTableData><FaTrash size={25} onClick={()=>{handleDeleteDog(content, gender) }}  /></DeleteTableData>
                </TableRow>
                )}
            </TableBody>
        </TableStyle>
        <AddButton onClick={openModal}>Dodaj</AddButton>
    </>
}
{mating &&
            <>
            <TableStyle>
                <THead>
            <TableRow>
            {head.map(title =>
                <TableHead>{title}</TableHead>
                )}
                <TableHead>Uredi</TableHead>
                <TableHead>Obriši</TableHead>
            </TableRow>
            </THead>
            <TableBody>
            {data.map(content =>
                <TableRow>
                    <TableData>{content.male.name}</TableData>
                    <TableData>{content.female.name}</TableData>
                    <TableData>{content.date.substring(0,10)}</TableData>
                    <DeleteTableData><FaEdit size={25}  /></DeleteTableData>
                    <DeleteTableData><FaTrash size={25}  /></DeleteTableData>
                </TableRow>
                )}
            </TableBody>
        </TableStyle>
        <AddButton onClick={openModal}>Dodaj</AddButton>
        </>
}
{litter &&
<>
            <TableStyle>
                <THead>
            <TableRow>
            {head.map(title =>
                <TableHead>{title}</TableHead>
                )}
                <TableHead>Uredi</TableHead>
                <TableHead>Obriši</TableHead>
                <TableHead>Pogledaj</TableHead>
            </TableRow>
            </THead>
            <TableBody>
            {newData.map(content =>
            <>
                <TableRow>
                    <TableData>{content.mating.male.name}</TableData>
                    <TableData>{content.mating.female.name}</TableData>
                    <TableData>{content.date.substring(0,10)}</TableData>
                    <TableData>{content.deliver_date.substring(0,10)}</TableData>
                    <DeleteTableData><FaEdit size={25}  /></DeleteTableData>
                    <DeleteTableData><FaTrash size={25}  /></DeleteTableData>
                    <DeleteTableData><FaPlusSquare size={25} onClick={() => handleUpdate(content.litter_id)} /></DeleteTableData>

                </TableRow>
                { content.visible &&
                
                                        <TableData colSpan={7}>
                                        <PuppyTable>
                                        <THead>
                                        <TableRow>
                                        {headPuppy.map(title =>
                                            <TableHead>{title}</TableHead>
                                            )}
                                            <TableHead>Uredi</TableHead>
                                            <TableHead>Obriši</TableHead>
                                            <TableHead>Pogledaj</TableHead>
                                        </TableRow>
                                        </THead>
                                        <TableBody>
                                        {content.puppies.map(content =>
                                            <TableRow>
                                                <TableData>{content.name}</TableData>
                                                <TableData>{content.gender ? ("Muški") : ("Ženski")}</TableData>
                                                <TableData>{content.color}</TableData>
                                                <TableData>{content.microchip}</TableData>
                                                <TableData>{content.buyer.name ? (content.buyer.name) : ("-")}</TableData>
                                                <DeleteTableData><FaEdit size={25}  /></DeleteTableData>
                                                <DeleteTableData><FaTrash size={25}  /></DeleteTableData>
                                                <DeleteTableData><FaPlusSquare size={25} /></DeleteTableData>
                                            </TableRow>
                                            
                                            )}
                                        <TableRow><AddButton onClick={openPuppyModal}>Dodaj</AddButton></TableRow>
                                        </TableBody>
                                        </PuppyTable>
                                        </TableData>
                                        
                          
                                    } </>
                )}
            </TableBody>
        </TableStyle>
        <AddButton onClick={openModal}>Dodaj</AddButton>
        </>
}       


</>
    );
}
export default Table;