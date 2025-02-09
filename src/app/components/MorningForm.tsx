import {
  Box,
  Button,
  FormControlLabel,
  Radio,
  TextField,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
import { useMemo } from "react";
import { AI_MODELS, useSettings } from "../SettingsContext";

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
      weatherText: "",
      selectedModel: "",
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

  const prompt = useMemo(
    () =>
      formik.values.news
        .map(
          (
            item
          ) => `You are news writer. Write news article in Russian based on text below. Write only article, no additional text. Article should be 1 paragraph lengh. Add a link ${
            item.url
          } to the first verb (not an adverb or other word) of this text. ${
            item.extra || ""
          }

Text: ${item.text || ""}`
        )
        .join("\n\n"),
    [formik.values.news]
  );

  return (
    <Box maxWidth="md" width="100%" margin="auto" p={3}>
      <form onSubmit={formik.handleSubmit}>
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

        <Box>
          <Typography variant="h5" gutterBottom>
            Новости
          </Typography>
          {formik.values.news.map((item, index) => (
            <Box key={index} sx={{ mb: 2 }}>
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
              <Button onClick={() => handleRemoveNewsItem(index)}>
                Удалить новость
              </Button>
            </Box>
          ))}
          <Button onClick={handleAddNewsItem}>Добавить новость</Button>
        </Box>

        <Box>
          <Typography variant="h5" gutterBottom>
            Выберите модель
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

        <Box>
          <Typography variant="h6" gutterBottom>
            Текст для утра
          </Typography>
          <TextField
            fullWidth
            label="Заголовок"
            name="morningText.header"
            value={formik.values.morningText.header}
            onChange={formik.handleChange}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Перед блоком"
            name="morningText.before"
            value={formik.values.morningText.before}
            onChange={formik.handleChange}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Заголовок блока"
            name="morningText.blockHeader"
            value={formik.values.morningText.blockHeader}
            onChange={formik.handleChange}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="После блока"
            name="morningText.after"
            value={formik.values.morningText.after}
            onChange={formik.handleChange}
            sx={{ mb: 2 }}
          />
        </Box>

        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{ mt: 2 }}
        >
          Сгенерировать
        </Button>

        {formik.values.generatedText && (
          <Box sx={{ mt: 2 }}>
            <Typography variant="h6" gutterBottom>
              Сгенерированный текст:
            </Typography>
            <TextField
              fullWidth
              multiline
              rows={6}
              value={formik.values.generatedText}
              InputProps={{ readOnly: true }}
            />
          </Box>
        )}
      </form>
    </Box>
  );
};
