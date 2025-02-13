"use client";

import { Page } from "@/src/components/Page";
import { Box, MenuItem, Select, TextField, Typography } from "@mui/material";
import { useTranslations } from "next-intl";
import { AI_MODELS, useSettings } from "../SettingsContext";
import { Tones } from "./Tones";

export const Settings = () => {
  const { settings } = useSettings();
  const t = useTranslations("settings");

  return (
    <Page>
      <Typography variant="h6" gutterBottom>
        {t("toneOfVoice")}
      </Typography>

      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 2 }}>
        <Tones tones={[]} />
      </Box>

      <form>
        <Box display="flex" flexDirection="column" gap={2}>
          <Box display="flex" flexDirection="column" gap={2}>
            <Typography variant="h6" gutterBottom>
              {t("apiKeys")}
            </Typography>
            <TextField
              fullWidth
              label="API ChatGPT"
              name="apiChatGPT"
              value={settings.api_chat_gpt}
              disabled
              slotProps={{ inputLabel: { shrink: true } }}
            />
            <TextField
              fullWidth
              label="API Claude"
              name="apiClaude"
              value={settings.api_claude}
              disabled
              slotProps={{ inputLabel: { shrink: true } }}
            />
          </Box>

          <Box display="flex" flexDirection="column" gap={2}>
            <Typography variant="h6" gutterBottom>
              {t("defaultModel")}
            </Typography>
            <Select
              fullWidth
              name="defaultModel"
              value={settings.default_model}
              disabled
            >
              {AI_MODELS.map((model) => (
                <MenuItem key={model} value={model}>
                  {model}
                </MenuItem>
              ))}
            </Select>
          </Box>

          <Box display="flex" flexDirection="column" gap={2}>
            <Typography variant="h6" gutterBottom>
              {t("morningText")}
            </Typography>
            <TextField
              fullWidth
              label={t("header")}
              name="morningText.header"
              value={settings.morning_text_header}
              disabled
              slotProps={{ inputLabel: { shrink: true } }}
            />
            <TextField
              fullWidth
              label={t("before")}
              name="morningText.before"
              value={settings.morning_text_before}
              disabled
              slotProps={{ inputLabel: { shrink: true } }}
            />
            <TextField
              fullWidth
              label={t("blockHeader")}
              name="morningText.blockHeader"
              value={settings.morning_text_block_header}
              disabled
              slotProps={{ inputLabel: { shrink: true } }}
            />
            <TextField
              fullWidth
              label={t("after")}
              name="morningText.after"
              value={settings.morning_text_after}
              disabled
              slotProps={{ inputLabel: { shrink: true } }}
            />
          </Box>

          <Box display="flex" flexDirection="column" gap={2}>
            <Typography variant="h6" gutterBottom>
              {t("eveningText")}
            </Typography>
            <TextField
              fullWidth
              label={t("header")}
              name="eveningText.header"
              value={settings.evening_text_header}
              disabled
              slotProps={{ inputLabel: { shrink: true } }}
            />
            <TextField
              fullWidth
              label={t("before")}
              name="eveningText.before"
              value={settings.evening_text_before}
              disabled
              slotProps={{ inputLabel: { shrink: true } }}
            />
            <TextField
              fullWidth
              label={t("blockHeader")}
              name="eveningText.blockHeader"
              value={settings.evening_text_block_header}
              disabled
              slotProps={{ inputLabel: { shrink: true } }}
            />
            <TextField
              fullWidth
              label={t("after")}
              name="eveningText.after"
              value={settings.evening_text_after}
              disabled
              slotProps={{ inputLabel: { shrink: true } }}
            />
          </Box>
        </Box>
      </form>
    </Page>
  );
};
