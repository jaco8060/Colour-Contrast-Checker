import CancelIcon from "@mui/icons-material/Cancel";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { Checkbox, Rating, Tooltip } from "@mui/material";
import { memo, useMemo } from "react";
import tinycolor from "tinycolor2";
import "./DisplayCombinations.css";

const DisplayCombinationItem = ({
  bgColor,
  textColor,
  onToggleCombination,
  isSelected,
}) => {
  const contrastRatio = tinycolor.readability(bgColor, textColor).toFixed(2);
  const readable = contrastRatio >= 4.5;

  const getRating = (contrastRatio) => {
    if (contrastRatio >= 7) return 5;
    if (contrastRatio >= 4.5) return 4;
    if (contrastRatio >= 3) return 3;
    if (contrastRatio >= 2) return 2;
    return 1;
  };
  const handleCheckboxChange = (event) => {
    onToggleCombination(bgColor, textColor, event.target.checked);
  };

  return (
    <div className="colourItemContainer">
      <div className="colourItemWrapper">
        <Checkbox
          checked={isSelected}
          onChange={handleCheckboxChange}
          color="primary"
          sx={{
            "& .MuiSvgIcon-root": { fontSize: { xs: "14px", sm: "2rem" } },
          }}
        />
        <div className="colourItem">
          <div
            className="colourSection"
            style={{ backgroundColor: bgColor, color: textColor }}
          >
            <h1 className="colourSectionText">
              Background Color: {bgColor} with Text Color: {textColor}
            </h1>
          </div>
        </div>
      </div>
      <div className="colourMetrics">
        <div>
          Contrast: {contrastRatio}
          <Tooltip title={readable ? "Readable" : "Not Readable"}>
            {readable ? (
              <CheckCircleIcon
                className="readableIcon"
                color="success"
                sx={{
                  fontSize: {
                    xs: "0.8rem",
                    sm: "1.3rem",
                    md: "1.5rem",
                    lg: "1.5rem",
                  },
                }}
              />
            ) : (
              <CancelIcon
                className="notReadableIcon"
                color="error"
                sx={{
                  fontSize: {
                    xs: "0.8rem",
                    sm: "1.3rem",
                    md: "1.5rem",
                    lg: "1.5rem",
                  },
                }}
              />
            )}
          </Tooltip>
        </div>
        <Tooltip title={`Contrast Ratio: ${contrastRatio}`}>
          <Rating
            name="read-only"
            value={getRating(contrastRatio)}
            readOnly
            sx={{ fontSize: { xs: "0.8rem", sm: "1.25rem" } }}
          />
        </Tooltip>
      </div>
    </div>
  );
};
DisplayCombinationItem.displayName = "DisplayCombinationItem"; // Set display name

function DisplayCombinations({
  colours,
  onToggleCombination,
  selectedCombinations,
  showOnlyReadable,
}) {
  const filteredCombinations = colours
    .flatMap((bgColor) =>
      colours
        .filter((textColor) => textColor !== bgColor)
        .map((textColor) => ({
          bgColor,
          textColor,
          isSelected: selectedCombinations.includes(`${bgColor}-${textColor}`),
          readability: tinycolor.readability(bgColor, textColor).toFixed(2),
        }))
    )
    .filter((comb) => !showOnlyReadable || comb.readability >= 4.5);

  return (
    <div className="colourSectionContainer">
      {filteredCombinations.map((item, index) => (
        <DisplayCombinationItem
          key={index}
          bgColor={item.bgColor}
          textColor={item.textColor}
          isSelected={item.isSelected}
          onToggleCombination={onToggleCombination}
        />
      ))}
    </div>
  );
}

export { DisplayCombinations };
