import { Chip } from "@mui/material";
import { FC } from "react";
import { Tone, useSettings } from "../SettingsContext";

type TonesProps = {
  tones: Tone[];
};
export const Tones: FC<TonesProps> = ({ tones }) => {
  const { handleToneDelete } = useSettings();

  return tones.map((tone, index) => (
    <Chip
      key={index}
      label={tone.title}
      onDelete={() => handleToneDelete(index)}
      sx={{ mb: 1 }}
    />
  ));
};
