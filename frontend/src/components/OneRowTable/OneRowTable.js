import React, { useEffect, useRef } from 'react';
import {Table as TableStyle, TableHead, TableRow, TableData, THead, TableBody,DeleteTableData, Text, PuppyTable, PuppyWrapper} from '../Table/TableStyle'
import { FaTrash, FaEdit,FaPlusSquare } from 'react-icons/fa'
import { useState } from 'react/cjs/react.development';


const OneRowTable = ({head,data, litter, headPuppy}) => {

    const [newData, setNewData] = useState(null); 
    const [visible, setVisible] = useState(false);
    const firstRender = useRef(true);

    async function setData() {
        console.log("Data");
        console.log(data);
        console.log("---------------");
        setNewData(data);
        console.log("newData");
        console.log(newData);
        console.log("---------------");

        
    }


    const handleUpdate = (edit) => {
      setVisible(!visible);
    }


      useEffect(() => {
       setData();
    }, [])

    return(
<>  

{newData !== null &&

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
            <>
                <TableRow>
                    <TableData>{newData.mating.male.name}</TableData>
                    <TableData>{newData.mating.female.name}</TableData>
                    <TableData>{newData.date.substring(0,10)}</TableData>
                    <TableData>{newData.deliver_date.substring(0,10)}</TableData>
                    <DeleteTableData><FaEdit size={25}  /></DeleteTableData>
                    <DeleteTableData><FaTrash size={25}  /></DeleteTableData>
                    <DeleteTableData><FaPlusSquare size={25} onClick={() => handleUpdate(newData)} /></DeleteTableData>

                </TableRow>
                { visible &&
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
                                        {newData.puppies.map(content =>
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
                                        </TableBody>
                                        </PuppyTable>
                                        </TableData>
                                    } </>
                
                
            </TableBody>
        </TableStyle>
        
}
   

</>
    );
}
export default OneRowTable;