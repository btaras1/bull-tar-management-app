import React from 'react';
import {Table as TableStyle, TableHead, TableRow, TableData, THead, TableBody,DeleteTableData, Text} from './TableStyle'
import { FaTrash } from 'react-icons/fa'

const Table = ({head,data, dogs, mating}) => {
    return(
<>  
        {dogs &&
            <TableStyle>
                <THead>
            <TableRow>
            {head.map(title =>
                <TableHead>{title}</TableHead>
                )}
            </TableRow>
            </THead>
            <TableBody>
            {data.map(content =>
                <TableRow>
                    <TableData>{content.name}</TableData>
                    <TableData>{content.color}</TableData>
                    <TableData>{content.dob.substring(0,10)}</TableData>
                    <TableData>{content.pedigree_name}</TableData>
                </TableRow>
                )}
            </TableBody>
        </TableStyle>
}
{mating &&
            <TableStyle>
                <THead>
            <TableRow>
            {head.map(title =>
                <TableHead>{title}</TableHead>
                )}
            </TableRow>
            </THead>
            <TableBody>
            {data.map(content =>
                <TableRow>
                    <TableData>{content.male.name}</TableData>
                    <TableData>{content.female.name}</TableData>
                    <TableData>{content.date.substring(0,10)}</TableData>
                </TableRow>
                )}
            </TableBody>
        </TableStyle>
}
        

</>
    );
}
export default Table;