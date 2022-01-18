import jsPDF from "jspdf";
import "jspdf-autotable";

const generatePDF = (litter) => {
  const headers = ["Štene", "Mikrocip", "Kupac", "OIB", "Adresa", "Telefon"];
  const data = litter;
  console.log(data);
  // initialize jsPDF
  const doc = new jsPDF({
    orientation: "l",
    unit: "pt",
    format: "a4",
  });

  const pageDimensions = {
    // NEW CODE
    height: 595.28,
    width: 841.89,
  };

  const pageMargin = 50; // NEW CODE

  const liveArea = {
    width: pageDimensions.width - pageMargin,
    height: pageDimensions.height - pageMargin,
  };

  const padding = 15; // NEW CODE

  doc.setFontSize(12); // NEW CODE

  const xPositions = []; // NEW CODE

  // NEW CODE
  // HEADERS
  headers.forEach((heading, index) => {
    // get x position for heading
    console.log("INDEX : " + index + "HEADING : " + heading);
    const xPositionForCurrentHeader =
      pageMargin + index * (liveArea.width / headers.length);
    // need to position our text within our live area
    const yPositionForHeaders = pageMargin;
    doc.text(
      String(heading),
      index === 0
        ? xPositionForCurrentHeader
        : xPositionForCurrentHeader + padding,
      yPositionForHeaders
    );

    // Push x position of current header to xPositions array
    xPositions.push(
      index === 0
        ? xPositionForCurrentHeader
        : xPositionForCurrentHeader + padding
    );
  });

  // NEW CODE
  doc.line(pageMargin, pageMargin + 3.5, liveArea.width, pageMargin + 3.5);

  const baseYPosForRows = pageMargin + padding; // NEW CODE
  let nextYPos = baseYPosForRows; // NEW CODE

  // NEW CODE
  // ROWS
  const result = data.puppies.filter((o) =>
    Object.values(o).every((v) => v !== null)
  );
  result.forEach((row, rIndex) => {
    // Here we are going to collect all columns potential max heights (below)
    // Before we determine the nextYPosition we have to grab the tallest value
    // and add that to the previous height.
    const rowHeights = [];
    console.log("ROW : " + row.name);
    /*
     *
     * Row styles go here (lines, images, shapes)
     *
     * */
    const dataLabel = ["name", "microchip", "buyer", "buyer", "buyer", "buyer"];
    // COLUMNS
    dataLabel.forEach((column, colIndex) => {
      let longText = "";
      // Using the .splitTextToSize method will take a
      // string and a width parameter. It will return an array of strings.
      if (colIndex < 2) {
        longText = doc.splitTextToSize(
          String(row[column]),
          xPositions[colIndex] - xPositions[colIndex !== 0 && colIndex - 1]
        );
      } else {
        switch (colIndex) {
          case 2:
            longText = doc.splitTextToSize(
              String(row[column].name),
              xPositions[colIndex] - xPositions[colIndex !== 0 && colIndex - 1]
            );
            break;
          case 3:
            longText = doc.splitTextToSize(
              String(row[column].id_number),
              xPositions[colIndex] - xPositions[colIndex !== 0 && colIndex - 1]
            );
            break;
          case 4:
            longText = doc.splitTextToSize(
              String(row[column].adress + "," + row[column].city.name),
              xPositions[colIndex] - xPositions[colIndex !== 0 && colIndex - 1]
            );
            break;
          case 5:
            longText = doc.splitTextToSize(
              String(row[column].mobile_number),
              xPositions[colIndex] - xPositions[colIndex !== 0 && colIndex - 1]
            );
            break;
        }
      }
      // To get row height, we will use the .getLineHeight method
      // This method returns a line height based on set text
      // size for the document. Multiplied by the array length, your
      // value should be at minimum a standard line of text, OR at
      // maximum the amount of lines of text by line height
      const rowHeight = longText.length * doc.getLineHeight();

      // We need to push this height value to the array of heights for
      // the row (above)
      rowHeights.push(rowHeight);

      /*
       *
       *  Column styles go here (lines, images, shapes)
       *
       * */
      console.log("LONG TEXT : " + longText);
      doc.text(longText, xPositions[colIndex], nextYPos);
    });

    // Here's the accumulator expression to inform the next row start point
    nextYPos = nextYPos + padding + Math.max(...rowHeights, 30);

    // When generating looped data, you may need to add pages manually.
    // The good thing is that we've defined our live area boundaries,
    // and can add a new page when our yPosition exceeds them. We need
    // to take some care to reset the yPosition because if you don't:
    // the yPosition will persist to the next page, and more than likely
    // disappear from view as your yPosition grows.
    if (nextYPos > liveArea.height) {
      doc.addPage();
      nextYPos = baseYPosForRows;
    }
  });
  doc.text(
    "Datum legla : " +
      litter.date +
      " Otac : " +
      litter.mating.male.name +
      " - Majka : " +
      litter.mating.female.name +
      " ",
    14,
    15
  );
  doc.save(`Podaci_leglo_${litter.date}.pdf`);
};
export default generatePDF;
