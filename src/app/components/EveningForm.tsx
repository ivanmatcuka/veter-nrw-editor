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
import { AI_MODELS } from "../SettingsContext";

type News = {
  text: string;
  url: string;
  extra: string;
}[];

export const EveningForm = () => {
  const formik = useFormik({
    initialValues: {
      weatherText: "",
      selectedModel: "",
      generatedText: "",
      news: [
        { text: "", url: "", extra: "" },
        { text: "", url: "", extra: "" },
      ] as News,
      eveningText: {
        header: "Вечерний бриз! Куда сходить завтра:",
        before: "",
        blockHeader: "",
        after: "Хорошего вам вечера и спокойной ночи! 🌌",
      },
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

  const generatePrompt = useMemo(
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

        <Typography variant="h5" gutterBottom>
          Вечерний текст
        </Typography>
        <TextField
          fullWidth
          label="Заголовок"
          name="eveningText.header"
          value={formik.values.eveningText.header}
          onChange={formik.handleChange}
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          label="Перед блоком"
          name="eveningText.before"
          value={formik.values.eveningText.before}
          onChange={formik.handleChange}
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          label="Заголовок блока"
          name="eveningText.blockHeader"
          value={formik.values.eveningText.blockHeader}
          onChange={formik.handleChange}
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          label="После блока"
          name="eveningText.after"
          value={formik.values.eveningText.after}
          onChange={formik.handleChange}
          sx={{ mb: 2 }}
        />

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
