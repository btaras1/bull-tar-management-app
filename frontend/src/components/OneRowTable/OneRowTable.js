import React, { useEffect, useRef } from "react";
import {
  Table as TableStyle,
  TableHead,
  TableRow,
  TableData,
  THead,
  TableBody,
  DeleteTableData,
  Text,
  PuppyTable,
  PuppyWrapper,
} from "../Table/TableStyle";
import { FaTrash, FaEdit, FaPlusSquare } from "react-icons/fa";
import { useState } from "react/cjs/react.development";

const OneRowTable = ({ head, data, headPuppy }) => {
  const [litter, setLitter] = useState(null);
  const [visible, setVisible] = useState(false);

  async function setData() {
    setLitter(data);
  }

  const handleUpdate = (edit) => {
    setVisible(!visible);
  };

  useEffect(() => {
    setData();
  }, []);

  return (
    <>
      {litter !== null && (
        <TableStyle>
          <THead>
            <TableRow>
              {head.map((title) => (
                <TableHead litter={true}>{title}</TableHead>
              ))}
              <TableHead litter={true}>Pogledaj</TableHead>
            </TableRow>
          </THead>
          <TableBody>
            <>
              <TableRow>
                <TableData litter={true}>{litter.mating.male.name}</TableData>
                <TableData litter={true}>{litter.mating.female.name}</TableData>
                <TableData litter={true}>{litter.date}</TableData>
                <TableData litter={true}>{litter.deliver_date}</TableData>
                <DeleteTableData litter={true}>
                  <FaPlusSquare
                    size={25}
                    onClick={() => handleUpdate(litter)}
                  />
                </DeleteTableData>
              </TableRow>
              {visible && (
                <TableData colSpan={7}>
                  <PuppyTable>
                    <THead>
                      <TableRow>
                        {headPuppy.map((title) => (
                          <TableHead litter={true}>{title}</TableHead>
                        ))}
                      </TableRow>
                    </THead>
                    <TableBody>
                      {litter.puppies.map((content) => (
                        <TableRow>
                          <TableData litter={true}>{content.name}</TableData>
                          <TableData litter={true}>
                            {content.gender ? "Muški" : "Ženski"}
                          </TableData>
                          <TableData litter={true}>{content.color}</TableData>
                          <TableData litter={true}>
                            {content.microchip}
                          </TableData>
                          <TableData litter={true}>
                            {content.buyer.name ? content.buyer.name : "-"}
                          </TableData>
                          <TableData litter={true}>
                            {content.buyer.mobile_number
                              ? content.buyer.mobile_number
                              : "-"}
                          </TableData>
                        </TableRow>
                      ))}
                    </TableBody>
                  </PuppyTable>
                </TableData>
              )}{" "}
            </>
          </TableBody>
        </TableStyle>
      )}
    </>
  );
};
export default OneRowTable;
