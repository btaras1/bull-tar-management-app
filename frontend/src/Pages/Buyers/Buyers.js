import { useEffect, useState } from "react";
import Section from "../../components/Section/Section";
import { getAllBuyersDetail } from "../../api/buyer";
import SearchBar from "../../components/SearchBar/SearchBar";
import {
  Table as TableStyle,
  TableHead,
  TableRow,
  TableData,
  THead,
  TableBody,
} from "../../components/Table/TableStyle";
import {
  FormRow,
  SelectText,
  OptionText,
  RightColumn,
  LeftColumn,
} from "../../components/Form/FormSyle";

const Buyers = () => {
  const authToken = localStorage.getItem("authToken");
  const [buyers, setBuyers] = useState([]);
  const [buyersDefault, setBuyersDefault] = useState([]);
  const [input, setInput] = useState("");
  const [option, setOption] = useState("");
  const head = [
    "Ime",
    "Datum rođenja",
    "Adresa",
    "Telefon",
    "Datum legla",
    "Otac",
    "Majka",
  ];

  async function getBuyers() {
    getAllBuyersDetail(authToken).then(function (items) {
      setBuyersDefault(items);
      setBuyers(items);
    });
  }

  useEffect(() => {
    getBuyers();
  }, []);

  const updateInput = (input) => {
    switch (option) {
      case "Ime":
        setBuyers(buyersDefault);
        const filteredName = buyersDefault.filter((buyer) => {
          return buyer.name.toLowerCase().includes(input.toLowerCase());
        });
        setInput(input);
        setBuyers(filteredName);

        break;
      case "Grad":
        const filteredCity = buyersDefault.filter((buyer) => {
          return buyer.city.name.toLowerCase().includes(input.toLowerCase());
        });
        setInput(input);
        setBuyers(filteredCity);

        break;
      case "Drzava":
        const filteredCountry = buyersDefault.filter((buyer) => {
          return buyer.city.country.name
            .toLowerCase()
            .includes(input.toLowerCase());
        });
        setInput(input);
        setBuyers(filteredCountry);
        break;
    }
  };
  return (
    <>
      <Section title="KUPCI">
        <FormRow>
          <LeftColumn>
            <SelectText
              type="select"
              value={option}
              onChange={(e) => setOption(e.target.value)}
            >
              <OptionText value="">---Odaberi---</OptionText>
              <OptionText value="Ime">Ime</OptionText>
              <OptionText value="Grad">Grad</OptionText>
              <OptionText value="Drzava">Drzava</OptionText>
            </SelectText>
          </LeftColumn>
          <RightColumn>
            <SearchBar
              input={input}
              setInput={updateInput}
              isDisabled={false}
            />
          </RightColumn>
        </FormRow>
        {buyers ? (
          <>
            <TableStyle>
              <THead>
                <TableRow>
                  {head.map((title) => (
                    <TableHead buyer={true}>{title}</TableHead>
                  ))}
                </TableRow>
              </THead>
              <TableBody>
                {buyers.map((content) => (
                  <TableRow>
                    <TableData buyer={true}>{content.name}</TableData>
                    <TableData buyer={true}>{content.dob !== null ? (content.dob) : ("-")}</TableData>
                    <TableData buyer={true}>
                      {content.adress !== null ? (content.adress) : ("-") +
                        "," +
                        content.city !==null ? (content.city.name) : ("-") +
                        "," +
                        content.city !==null ? (content.city.country.name) : ("-") }
                    </TableData>
                    <TableData buyer={true}>{content.mobile_number}</TableData>
                    <TableData buyer={true}>{content.litter_date}</TableData>
                    <TableData buyer={true}>{content.male}</TableData>
                    <TableData buyer={true}>{content.female}</TableData>
                  </TableRow>
                ))}
              </TableBody>
            </TableStyle>
          </>
        ) : (
          <Section title="LOADING..." />
        )}
      </Section>
    </>
  );
};

export default Buyers;
