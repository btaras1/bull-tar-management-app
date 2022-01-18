import React, { useEffect } from "react";
import {
  Table as TableStyle,
  TableHead,
  TableRow,
  TableData,
  THead,
  TableBody,
  DeleteTableData,
  PuppyTable,
} from "./TableStyle";
import { FaTrash, FaEdit, FaPlusSquare, FaFilePdf } from "react-icons/fa";
import { useState } from "react/cjs/react.development";
import Modal from "../Modal/Modal";
import { AddButton } from "../../lib/style/generalStyles";
import DogForm from "../DogForm/DogForm";
import MatingForm from "../MatingForm/MatingForm";
import LitterForm from "../LitterForm/LitterForm";
import PuppyForm from "../PuppyForm/PuppyForm";
import BuyerForm from "../BuyerForm/BuyerForm";
import { deleteMale } from "../../api/male";
import { deleteFemale } from "../../api/female";
import generatePDF from "../../services/reportGenerator";
import { deletePuppy } from "../../api/puppy";
import { deleteLitter } from "../../api/litter";
import { deleteMating } from "../../api/mating";

const Table = ({
  title,
  head,
  passedData,
  dogs,
  matings,
  litters,
  headPuppy,
  gender,
  get,
}) => {
  const authToken = localStorage.getItem("authToken");
  const [data, setData] = useState([]);
  const [newData, setNewData] = useState([]);
  const [dog, setDog] = useState(null);
  const [mating, setMating] = useState(null);
  const [litter, setLitter] = useState(null);
  const [puppy, setPuppy] = useState(null);
  const [buyer, setBuyer] = useState(null);
  const [currentLitter, setCurrentLitter] = useState(0);
  const [puppyId, setPuppyId] = useState(0);
  const [addPressed, setAddPressed] = useState(false);
  const [addPuppyPressed, setAddPuppyPressed] = useState(false);
  const [addBuyerPressed, setAddBuyerPressed] = useState(false);
  const [isMobile, setIsMobile] = useState(1);

  const handleResize = () => {
    if (window.innerWidth < 769) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  };

  const openModal = () => {
    setAddPressed(!addPressed);
  };

  const openPuppyModal = () => {
    setAddPuppyPressed(!addPuppyPressed);
  };

  const openBuyerModal = () => {
    setAddBuyerPressed(!addBuyerPressed);
  };

  async function setListData() {
    const newData1 = passedData.map((content) => {
      return {
        ...content,
        visible: content.value === false,
      };
    });
    setNewData(newData1);
  }
  const handleUpdate = (id) => {
    const newList = newData.map((item) => {
      if (item.id === id) {
        const updatedItem = {
          ...item,
          visible: !item.visible,
        };
        return updatedItem;
      }
      return item;
    });
    setNewData(newList);
    setCurrentLitter(id);
  };

  async function handleDeleteDog(dog, gender) {
    if (gender) {
      deleteMale(dog.id, authToken);
      const filterList = data.filter((item) => item.id != dog.id);
      setData(filterList);
    } else if (!gender) {
      deleteFemale(dog.id, authToken);
      const filterList = data.filter((item) => item.id != dog.id);
      setData(filterList);
    }
  }

  const handleDeleteMating = (mating) => {
    deleteMating(mating.id, authToken);
    const filterList = data.filter((item) => item.id != mating.id);
    setData(filterList);
  };
  const handleDeleteLitter = (litter) => {
    deleteLitter(litter.id, authToken);
    const filterList = newData.filter((item) => item.id != litter.id);
    setNewData(filterList);
  };
  const handleDeletePuppy = (puppy) => {
    const filterData = newData.map((element) => {
      element.puppies = element.puppies.filter((x) => x.id != puppy.id);
      return element;
    });

    setNewData(filterData);
    deletePuppy(puppy.id, authToken);
  };

  useEffect(() => {
    setData(passedData);
    setListData();
    window.addEventListener("resize", handleResize);
  }, []);

  return (
    <>
      {addPressed && dogs && (
        <Modal title={title} setModal={openModal}>
          <DogForm
            get={get}
            addPressed={addPressed}
            dog={dog}
            setAddPressed={setAddPressed}
            gender={gender}
          />
        </Modal>
      )}
      {addPressed && matings && (
        <Modal title={title} setModal={openModal}>
          <MatingForm
            get={get}
            addPressed={addPressed}
            mating={mating}
            setAddPressed={setAddPressed}
          />
        </Modal>
      )}
      {addPressed && litters && (
        <Modal title={title} setModal={openModal}>
          <LitterForm
            get={get}
            addPressed={addPressed}
            litter={litter}
            setAddPressed={setAddPressed}
          />
        </Modal>
      )}
      {addPuppyPressed && litters && (
        <Modal title={title} setModal={openPuppyModal}>
          <PuppyForm
            get={get}
            litterId={currentLitter}
            addPressed={addPuppyPressed}
            puppy={puppy}
            setAddPressed={setAddPuppyPressed}
          />
        </Modal>
      )}
      {addBuyerPressed && litters && (
        <Modal title={"Kupac"} setModal={openBuyerModal}>
          <BuyerForm
            get={get}
            puppyId={puppyId}
            addPressed={addBuyerPressed}
            buyer={buyer}
            setAddPressed={setAddBuyerPressed}
          />
        </Modal>
      )}
      {dogs && (
        <>
          <TableStyle>
            <THead>
              <TableRow>
                {head.map((title) => (
                  <TableHead key={title} dog={true}>
                    {title}
                  </TableHead>
                ))}
                <TableHead dog={true}>Uredi</TableHead>
                <TableHead dog={true}>Obriši</TableHead>
              </TableRow>
            </THead>
            <TableBody>
              {data.map((content) => (
                <TableRow key={content.id}>
                  <TableData dog={true}>{content.name}</TableData>
                  <TableData dog={true}>{content.color}</TableData>
                  <TableData dog={true}>{content.dob}</TableData>
                  <TableData dog={true}>{content.pedigree_name !==null ? (content.pedigree_name) : ("-")}</TableData>
                  <DeleteTableData dog={true}>
                    <FaEdit
                      size={25}
                      onClick={() => {
                        setDog(content);
                        openModal();
                      }}
                    />
                  </DeleteTableData>
                  <DeleteTableData dog={true}>
                    <FaTrash
                      size={25}
                      onClick={() => {
                        handleDeleteDog(content, gender);
                      }}
                    />
                  </DeleteTableData>
                </TableRow>
              ))}
            </TableBody>
          </TableStyle>
          <AddButton
            onClick={() => {
              setDog(null);
              openModal();
            }}
          >
            Dodaj
          </AddButton>
        </>
      )}
      {matings && (
        <>
          <TableStyle>
            <THead>
              <TableRow>
                {head.map((title) => (
                  <TableHead key={title} mating={true}>
                    {title}
                  </TableHead>
                ))}
                <TableHead mating={true}>Uredi</TableHead>
                <TableHead mating={true}>Obriši</TableHead>
              </TableRow>
            </THead>
            <TableBody>
              {data.map((content) => (
                <TableRow key={content.id}>
                  <TableData mating={true}>{content.male.name}</TableData>
                  <TableData mating={true}>{content.female.name}</TableData>
                  <TableData mating={true}>{content.date}</TableData>
                  <DeleteTableData mating={true}>
                    <FaEdit
                      size={25}
                      onClick={() => {
                        setMating(content);
                        openModal();
                      }}
                    />
                  </DeleteTableData>
                  <DeleteTableData mating={true}>
                    <FaTrash
                      size={25}
                      onClick={() => {
                        handleDeleteMating(content);
                      }}
                    />
                  </DeleteTableData>
                </TableRow>
              ))}
            </TableBody>
          </TableStyle>
          <AddButton
            onClick={() => {
              setMating(null);
              openModal();
            }}
          >
            Dodaj
          </AddButton>
        </>
      )}
      {litters && (
        <>
          <TableStyle>
            <THead>
              <TableRow>
                {head.map((title) => (
                  <TableHead key={title} litter={true}>
                    {title}
                  </TableHead>
                ))}
                <TableHead litter={true}>Uredi</TableHead>
                <TableHead litter={true}>Obriši</TableHead>
                <TableHead litter={true}>Ispiši</TableHead>
                <TableHead litter={true}>Pogledaj</TableHead>
              </TableRow>
            </THead>
            <TableBody>
              {newData.map((content) => (
                <>
                  <TableRow key={content.id}>
                    <TableData litter={true}>
                      {content.mating.male.name}
                    </TableData>
                    <TableData litter={true}>
                      {content.mating.female.name}
                    </TableData>
                    <TableData litter={true}>{content.date}</TableData>
                    <TableData litter={true}>{content.deliver_date}</TableData>
                    <DeleteTableData litter={true}>
                      <FaEdit
                        size={25}
                        onClick={() => {
                          setLitter(content);
                          openModal();
                        }}
                      />
                    </DeleteTableData>
                    <DeleteTableData litter={true}>
                      <FaTrash
                        size={25}
                        onClick={() => {
                          handleDeleteLitter(content);
                        }}
                      />
                    </DeleteTableData>
                    <DeleteTableData litter={true}>
                      <FaFilePdf
                        size={25}
                        onClick={() => generatePDF(content)}
                      />
                    </DeleteTableData>
                    <DeleteTableData litter={true}>
                      <FaPlusSquare
                        size={25}
                        onClick={() => handleUpdate(content.id)}
                      />
                    </DeleteTableData>
                  </TableRow>
                  {content.visible && (
                    <TableData colSpan={isMobile ? 4 : 8}>
                      <TableStyle>
                        <THead>
                          <TableRow>
                            {headPuppy.map((title) => (
                              <TableHead key={title} pupppy={true}>
                                {title}
                              </TableHead>
                            ))}
                            <TableHead puppy={true}>Uredi</TableHead>
                            <TableHead puppy={true}>Obriši</TableHead>

                            <TableHead puppy={true}>Pogledaj</TableHead>
                          </TableRow>
                        </THead>
                        <TableBody>
                          {content.puppies.map((content) => (
                            <TableRow key={content.id}>
                              <TableData puppy={true}>{content.name}</TableData>
                              <TableData puppy={true}>
                                {content.gender ? "Muški" : "Ženski"}
                              </TableData>
                              <TableData puppy={true}>
                                {content.color}
                              </TableData>
                              <TableData puppy={true}>
                                {content.microchip !== null ? (content.microchip) : ("-")}
                              </TableData>
                              <TableData puppy={true}>
                                {content.buyer === null
                                  ? "-"
                                  : content.buyer.name}
                              </TableData>
                              <DeleteTableData puppy={true}>
                                <FaEdit
                                  size={25}
                                  onClick={() => {
                                    setPuppy(content);
                                    openPuppyModal();
                                  }}
                                />
                              </DeleteTableData>
                              <DeleteTableData puppy={true}>
                                <FaTrash
                                  size={25}
                                  onClick={() => {
                                    handleDeletePuppy(content);
                                  }}
                                />
                              </DeleteTableData>
                              <DeleteTableData puppy={true}>
                                <FaPlusSquare
                                  size={25}
                                  onClick={() => {
                                    content.buyer === null
                                      ? setBuyer(null)
                                      : setBuyer(content.buyer);
                                    setPuppyId(content.id);
                                    openBuyerModal();
                                  }}
                                />
                              </DeleteTableData>
                            </TableRow>
                          ))}
                          <TableRow>
                            <AddButton
                              onClick={() => {
                                setPuppy(null);
                                openPuppyModal();
                              }}
                            >
                              Dodaj
                            </AddButton>
                          </TableRow>
                        </TableBody>
                      </TableStyle>
                    </TableData>
                  )}{" "}
                </>
              ))}
            </TableBody>
          </TableStyle>
          <AddButton
            onClick={() => {
              setLitter(null);
              openModal();
            }}
          >
            Dodaj
          </AddButton>
        </>
      )}
    </>
  );
};
export default Table;
