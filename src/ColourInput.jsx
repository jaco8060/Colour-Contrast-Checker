import { useState } from "react";
function ColourInput({
  addColour,
  initialColour = "#ffffff",
  onColourChange,
  onRemove,
}) {
  const [color, setColor] = useState(initialColour);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (addColour) {
      addColour({ hex: color });
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        display: "flex",
        alignItems: "center",
        gap: "10px",
        marginBottom: "10px",
      }}
    >
      <input
        type="color"
        value={color}
        onChange={(e) => {
          setColor(e.target.value);
          if (onColourChange) {
            onColourChange(e.target.value);
          }
        }}
      />
      <span>{color.toUpperCase()}</span>
      {addColour ? (
        <button type="submit">Add Colour</button>
      ) : (
        <button onClick={onRemove}>Remove</button>
      )}
    </form>
  );
}

export { ColourInput };