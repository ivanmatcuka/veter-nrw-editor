"use client";

import { useFormik } from "formik";
import { createContext, FC, ReactNode, useContext, useEffect } from "react";
import { getSettings, getTones, updateSettings } from "./service";

type DayEvent = {
  header: string;
  before: string;
  blockHeader: string;
  after: string;
};

export type Tone = {
  id: number;
  title: string;
};

type FormValues = {
  apiChatGPT: string;
  apiClaude: string;
  aiModels: string[];
  defaultModel: string;
  tones: Tone[];
  morningText: DayEvent;
  eveningText: DayEvent;
};

type FormikReturnType = ReturnType<typeof useFormik<FormValues>>;
type SettingsContextType = {
  settings: FormikReturnType["values"];
  handleChange: FormikReturnType["handleChange"];
  handleSubmit: FormikReturnType["handleSubmit"];
  handleToneDelete: (index: number) => void;
};

const SettingsContext = createContext<SettingsContextType | undefined>(
  undefined
);

export const AI_MODELS = ["ChatGPT", "Claude"];

export const SettingsProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const { values, setFieldValue, handleChange, handleSubmit } =
    useFormik<FormValues>({
      initialValues: {
        aiModels: AI_MODELS,

        defaultModel: AI_MODELS[0],
        apiChatGPT: "",
        apiClaude: "",
        morningText: {
          header: "",
          before: "",
          blockHeader: "",
          after: "",
        },
        eveningText: {
          header: "",
          before: "",
          blockHeader: "",
          after: "",
        },
        tones: [],
      },
      onSubmit: (values) => {
        updateSettings({
          api_chat_gpt: values.apiChatGPT,
          api_claude: values.apiClaude,
          default_model: values.defaultModel,
          morning_text_header: values.morningText.header,
          morning_text_before: values.morningText.before,
          morning_text_block_header: values.morningText.blockHeader,
          morning_text_after: values.morningText.after,
          evening_text_header: values.eveningText.header,
          evening_text_before: values.eveningText.before,
          evening_text_block_header: values.eveningText.blockHeader,
          evening_text_after: values.eveningText.after,
        }).then(() => {
          console.log("Settings updated");
        });
      },
    });

  // const handleToneChange = (index: number, newValue: Tone) => {
  //   const newTones = [...values.tones];
  //   newTones[index] = newValue;
  //   setFieldValue("tones", newTones);
  // };

  const handleToneDelete = (index: number) => {
    const newTones = values.tones.filter((_, i) => i !== index);
    setFieldValue("tones", newTones);
  };

  useEffect(() => {
    getTones().then((tones) => {
      setFieldValue("tones", tones);
    });
    getSettings().then((settings) => {
      if (!settings) return;

      console.log(settings);

      setFieldValue("apiChatGPT", settings.api_chat_gpt);
      setFieldValue("apiClaude", settings.api_claude);
      setFieldValue("defaultModel", settings.default_model);
      setFieldValue("morningText", {
        header: settings.morning_text_header,
        before: settings.morning_text_before,
        blockHeader: settings.morning_text_block_header,
        after: settings.morning_text_after,
      });
      setFieldValue("eveningText", {
        header: settings.evening_text_header,
        before: settings.evening_text_before,
        blockHeader: settings.evening_text_block_header,
        after: settings.evening_text_after,
      });
    });
  }, [setFieldValue]);

  return (
    <SettingsContext.Provider
      value={{
        settings: values,
        handleSubmit: handleSubmit,
        handleChange: handleChange,
        handleToneDelete,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => {
  const context = useContext(SettingsContext);

  if (context === undefined) {
    throw new Error("useSettings must be used within a SettingsProvider");
  }

  return context;
};
