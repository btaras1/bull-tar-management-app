import React, { useEffect } from 'react';
import {Table as TableStyle, TableHead, TableRow, TableData, THead, TableBody,DeleteTableData, Text, PuppyTable, PuppyWrapper} from './TableStyle'
import { FaTrash, FaEdit,FaPlusSquare } from 'react-icons/fa'
import { useState } from 'react/cjs/react.development';
import Modal from '../Modal/Modal';
import {AddButton} from '../../lib/style/generalStyles';
import DogForm from '../DogForm/DogForm';

const Table = ({title, head,data, dogs, mating, litter, headPuppy}) => {

    const [newData, setNewData] = useState([]);

    const [addPressed, setAddPressed] = useState(false);

    const openModal = () => {
        setAddPressed(!addPressed);
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
      

      useEffect(() => {
       setListData();
    }, [])

    return(
<>  
        {addPressed && <Modal title={title} setModal={openModal}><DogForm  addPressed={addPressed} setAddPressed={setAddPressed} /></Modal>}
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
                    <DeleteTableData><FaTrash size={25}  /></DeleteTableData>
                </TableRow>
                )}
            </TableBody>
        </TableStyle>
        <AddButton onClick={openModal}>Dodaj</AddButton>
    </>
}
{mating &&
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
}
{litter &&

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
                                        <TableRow><AddButton onClick={openModal}>Dodaj</AddButton></TableRow>
                                        </TableBody>
                                        </PuppyTable>
                                        </TableData>
                                        
                          
                                    } </>
                )}
            </TableBody>
        </TableStyle>
}       


</>
    );
}
export default Table;