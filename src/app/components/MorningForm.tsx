import {
  Box,
  Button,
  FormControlLabel,
  Radio,
  TextField,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
import { AI_MODELS, useSettings } from "../SettingsContext";
import { GeneratedResponse } from "./GeneratedResponse";

type News = Partial<{
  text: string;
  url: string;
  extra: string;
}>[];

export const MorningForm = () => {
  const { settings } = useSettings();

  const formik = useFormik({
    initialValues: {
      ...settings,
      weatherText: settings?.weather_morning_prompt,
      selectedModel: settings?.default_model,
      generatedText: "",
      news: [{}, {}] as News,
    },
    onSubmit: async (values) => {
      // Here you would typically handle form submission
      console.log("Form submitted with values:", values);
      // Simulating text generation
      formik.setFieldValue(
        "generatedText",
        "Generated text would appear here..."
      );
    },
  });

  const handleAddNewsItem = () => {
    formik.setFieldValue("news", [
      ...formik.values.news,
      { text: "", url: "", extra: "" },
    ]);
  };

  const handleRemoveNewsItem = (index: number) => {
    const newNews = formik.values.news.filter((_, i) => i !== index);
    formik.setFieldValue("news", newNews);
  };

  const handleUpdateNewsItem = (
    index: number,
    field: keyof News[0],
    value: string
  ) => {
    const newNews = [...formik.values.news];
    newNews[index] = { ...newNews[index], [field]: value };
    formik.setFieldValue("news", newNews);
  };

  return (
    <Box
      maxWidth="md"
      width="100%"
      margin="auto"
      p={3}
      onSubmit={formik.handleSubmit}
      component="form"
      display="flex"
      flexDirection="column"
      gap={4}
    >
      <Box>
        <Typography variant="h5" gutterBottom>
          Погода
        </Typography>
        <TextField
          fullWidth
          multiline
          rows={4}
          label="Текст погоды..."
          name="weatherText"
          value={formik.values.weatherText}
          onChange={formik.handleChange}
          sx={{ mb: 2 }}
        />
      </Box>

      <Box display="flex" flexDirection="column">
        <Typography variant="h5" gutterBottom>
          Новости
        </Typography>
        {formik.values.news.map((item, index) => (
          <Box
            key={index}
            sx={{ mb: 2 }}
            display="flex"
            flexDirection="column"
            gap={1}
          >
            <TextField
              fullWidth
              multiline
              rows={4}
              label={`Новость ${index + 1}`}
              value={item.text}
              onChange={(e) =>
                handleUpdateNewsItem(index, "text", e.target.value)
              }
              sx={{ mb: 1 }}
            />
            <TextField
              fullWidth
              label="URL"
              value={item.url}
              onChange={(e) =>
                handleUpdateNewsItem(index, "url", e.target.value)
              }
              sx={{ mb: 1 }}
            />
            <TextField
              fullWidth
              label="Дополнительные инструкции"
              value={item.extra}
              onChange={(e) =>
                handleUpdateNewsItem(index, "extra", e.target.value)
              }
              sx={{ mb: 1 }}
            />
            <Button
              onClick={() => handleRemoveNewsItem(index)}
              variant="outlined"
              color="error"
            >
              Удалить новость
            </Button>
          </Box>
        ))}
        <Button onClick={handleAddNewsItem} variant="outlined">
          Добавить новость
        </Button>
      </Box>

      <Box>
        <Typography variant="h5" gutterBottom>
          Текст для утра
        </Typography>
        <TextField
          fullWidth
          label="Заголовок"
          name="morning_text_header"
          value={formik.values.morning_text_header}
          onChange={formik.handleChange}
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          label="Перед блоком"
          name="morning_text_before"
          value={formik.values.morning_text_before}
          onChange={formik.handleChange}
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          label="Заголовок блока"
          name="morning_text_block_header"
          value={formik.values.morning_text_block_header}
          onChange={formik.handleChange}
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          label="После блока"
          name="morning_text_after"
          value={formik.values.morning_text_after}
          onChange={formik.handleChange}
          sx={{ mb: 2 }}
        />
      </Box>
      <Box>
        <Typography variant="h5" gutterBottom>
          Используемая модель
        </Typography>
        {AI_MODELS.map((model) => (
          <FormControlLabel
            key={model}
            control={
              <Radio
                checked={formik.values.selectedModel === model}
                onChange={() => formik.setFieldValue("selectedModel", model)}
              />
            }
            label={model}
          />
        ))}
      </Box>

      <Box display="flex" flexDirection="column" gap={2}>
        {!formik.values.generatedText ? (
          <Button
            variant="contained"
            onClick={() => formik.setFieldValue("generatedText", true)}
            sx={{ mb: 2 }}
          >
            Сгенерировать
          </Button>
        ) : (
          formik.values.selectedModel && (
            <>
              <Typography variant="h5" gutterBottom>
                {formik.values.morning_text_header}
              </Typography>
              <Typography variant="h6" gutterBottom>
                {formik.values.morning_text_before}
              </Typography>
              <GeneratedResponse
                model={formik.values.selectedModel ?? ""}
                prompt={formik.values.weather_morning_prompt ?? ""}
                apiKey={settings.api_chat_gpt ?? ""}
              />
              <Typography variant="h6" gutterBottom>
                {formik.values.morning_text_block_header}
              </Typography>
              {formik.values.news.map((item, index) => (
                <GeneratedResponse
                  key={index}
                  model={formik.values.selectedModel ?? ""}
                  prompt={item.text ?? ""}
                  apiKey={settings.api_chat_gpt ?? ""}
                />
              ))}
              <Typography variant="h6">
                {formik.values.morning_text_after}
              </Typography>
            </>
          )
        )}
      </Box>
    </Box>
  );
};
