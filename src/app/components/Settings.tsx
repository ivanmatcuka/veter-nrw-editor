"use client";

import { Page } from "@/components/Page";
import {
  Box,
  Button,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useTranslations } from "next-intl";
import { AI_MODELS, useSettings } from "../SettingsContext";
import { Tones } from "./Tones";

export const Settings = () => {
  const { settings, handleSubmit, handleChange } = useSettings();
  const t = useTranslations("settings");

  const tones = settings.tones ?? [];

  return (
    <Page>
      <Typography variant="h5" gutterBottom>
        {t("title")}
      </Typography>

      <Typography variant="h6" gutterBottom>
        {t("toneOfVoice")}
      </Typography>

      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 2 }}>
        <Tones tones={tones} />
      </Box>

      <form onSubmit={handleSubmit}>
        <Box display="flex" flexDirection="column" gap={2}>
          <Box>
            <Typography variant="h6" gutterBottom>
              {t("apiKeys")}
            </Typography>
            <TextField
              fullWidth
              label="API ChatGPT"
              name="apiChatGPT"
              value={settings.apiChatGPT}
              onChange={handleChange}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="API Claude"
              name="apiClaude"
              value={settings.apiClaude}
              onChange={handleChange}
              sx={{ mb: 2 }}
            />
          </Box>

          <Box>
            <Typography variant="h6" gutterBottom>
              {t("defaultModel")}
            </Typography>
            <Select
              fullWidth
              name="defaultModel"
              value={settings.defaultModel}
              onChange={handleChange}
              sx={{ mb: 2 }}
            >
              {AI_MODELS.map((model) => (
                <MenuItem key={model} value={model}>
                  {model}
                </MenuItem>
              ))}
            </Select>
          </Box>

          <Box>
            <Typography variant="h6" gutterBottom>
              {t("morningText")}
            </Typography>
            <TextField
              fullWidth
              label={t("header")}
              name="morningText.header"
              value={settings.morningText.header}
              onChange={handleChange}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label={t("before")}
              name="morningText.before"
              value={settings.morningText.before}
              onChange={handleChange}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label={t("blockHeader")}
              name="morningText.blockHeader"
              value={settings.morningText.blockHeader}
              onChange={handleChange}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label={t("after")}
              name="morningText.after"
              value={settings.morningText.after}
              onChange={handleChange}
              sx={{ mb: 2 }}
            />
          </Box>

          <Box>
            <Typography variant="h6" gutterBottom>
              {t("eveningText")}
            </Typography>
            <TextField
              fullWidth
              label={t("header")}
              name="eveningText.header"
              value={settings.eveningText.header}
              onChange={handleChange}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label={t("before")}
              name="eveningText.before"
              value={settings.eveningText.before}
              onChange={handleChange}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label={t("blockHeader")}
              name="eveningText.blockHeader"
              value={settings.eveningText.blockHeader}
              onChange={handleChange}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label={t("after")}
              name="eveningText.after"
              value={settings.eveningText.after}
              onChange={handleChange}
              sx={{ mb: 2 }}
            />
          </Box>

          <Button type="submit" variant="contained" color="primary">
            {t("submit")}
          </Button>
        </Box>
      </form>
    </Page>
  );
};
