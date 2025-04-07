import React, { useState, useCallback } from "react";
import { toast } from "react-toastify";

import ToolLayout from "../../../components/layout/ToolLayout/ToolLayout";
import ButtonSecond from "../../../components/common/UI/Buttons/ButtonSecond/ButtonSecond";
import ButtonMain from "../../../components/common/UI/Buttons/ButtonMain/ButtonMain";
import Textarea from "../../../components/common/UI/Textarea/Textarea";
import Select from "../../../components/common/UI/Select/Select"; // Import Select

import styles from "./StringEncoder.module.css";

type EncodingMethod = "base64" | "url" | "html";
type ActionType = "encode" | "decode";

interface EncodingMethodInfo {
  value: EncodingMethod; // Use 'value' for Select component
  name: string; // Use 'name' for Select component
  description?: string; // Optional description
}

const encodingMethods: EncodingMethodInfo[] = [
  {
    value: "base64",
    name: "Base64",
    description: "Convert text to Base64 format",
  },
  {
    value: "url",
    name: "URL Encode / Decode",
    description: "Encode/decode text for use in URLs",
  },
  {
    value: "html",
    name: "HTML Entities",
    description: "Encode/decode special characters as HTML entities",
  },
];

const StringEncoder: React.FC = () => {
  const [inputText, setInputText] = useState(""); // Rename for clarity
  const [outputText, setOutputText] = useState(""); // Rename for clarity
  const [selectedMethod, setSelectedMethod] =
    useState<EncodingMethod>("base64");
  const [action, setAction] = useState<ActionType>("encode"); // State for encode/decode

  // Combined processing function
  const processText = useCallback(() => {
    // Input text is always the source for encode/decode in this UI setup
    const textToProcess = inputText;
    if (!textToProcess.trim()) {
      toast.error(`Please enter text to ${action}`);
      return;
    }

    try {
      let result = "";
      if (action === "encode") {
        switch (selectedMethod) {
          case "base64":
            // Ensure correct handling of UTF-8 characters before btoa
            result = btoa(unescape(encodeURIComponent(textToProcess)));
            break;
          case "url":
            result = encodeURIComponent(textToProcess);
            break;
          case "html":
            result = textToProcess
              .replace(/&/g, "&amp;")
              .replace(/</g, "&lt;")
              .replace(/>/g, "&gt;")
              .replace(/"/g, "&quot;")
              .replace(/'/g, "&#039;")
              .replace(/\//g, "&#x2F;"); // Basic HTML entity encoding
            break;
          default:
            result = textToProcess;
        }
        setOutputText(result);
        toast.success("Text encoded successfully!");
      } else {
        // Decode action
        switch (selectedMethod) {
          case "base64":
            try {
              const binaryString = atob(textToProcess);
              const bytes = new Uint8Array(binaryString.length);
              for (let i = 0; i < binaryString.length; i++) {
                bytes[i] = binaryString.charCodeAt(i);
              }
              result = new TextDecoder().decode(bytes);
            } catch (e) {
              // Handle potential errors if input is not valid Base64
              console.error("Base64 decode error:", e);
              throw new Error("Invalid Base64 input string");
            }
            break;
          case "url":
            result = decodeURIComponent(textToProcess);
            break;
          case "html":
            // Use DOMParser for robust HTML entity decoding
            const parser = new DOMParser();
            const doc = parser.parseFromString(
              `<!doctype html><body>${textToProcess}`,
              "text/html"
            );
            result = doc.body.textContent || "";
            break;
          default:
            result = textToProcess;
        }
        // When decoding, result goes to output; when encoding, result also goes to output
        setOutputText(result);
        toast.success("Text decoded successfully!");
      }
    } catch (error) {
      toast.error(`Failed to ${action} text. Please check input/format.`);
      console.error(`${action} error:`, error);
    }
    // outputText is not needed as dependency because it's only ever *set*, not read from, in processText
  }, [action, inputText, selectedMethod]);

  const handleCopy = async (textToCopy: string, label: string) => {
    if (!textToCopy) {
      toast.error(`No ${label} text to copy!`);
      return;
    }

    try {
      await navigator.clipboard.writeText(textToCopy);
      toast.success(`${label} text copied to clipboard!`);
    } catch (err) {
      toast.error(`Failed to copy ${label} text.`);
      console.error(`Copy ${label} error:`, err);
    }
  };

  const handleClear = () => {
    if (!inputText && !outputText) {
      toast.error("Text areas are already empty!");
      return;
    }
    setInputText("");
    setOutputText("");
    toast.success("Text cleared!");
  };
  return (
    <ToolLayout toolName="stringEncoder">
      <div className={styles.stringEncoder}>
        {/* Controls Section */}
        <div className={styles.controls}>
          <div className={styles.controlGroup}>
            <label htmlFor="encoding-select">Method:</label>
            <Select
              id="encoding-select"
              value={selectedMethod}
              onChange={(e) =>
                setSelectedMethod(e.target.value as EncodingMethod)
              }
              optionsList={encodingMethods}
              ariaLabel="Select encoding/decoding method"
            />
          </div>
          <div className={styles.controlGroup}>
            <label>Action:</label>
            <div className={styles.actionToggle}>
              <ButtonMain
                active={action === "encode"}
                onClick={() => setAction("encode")}
              >
                Encode
              </ButtonMain>
              <ButtonMain
                active={action === "decode"}
                onClick={() => setAction("decode")}
              >
                Decode
              </ButtonMain>
            </div>
          </div>
        </div>

        {/* Text Areas */}
        <div className={styles.textAreas}>
          <div className={styles.textAreaContainer}>
            <label>Input Text</label>
            <Textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder={
                action === "encode"
                  ? "Enter text to encode..."
                  : "Enter text to decode..."
              }
              rows={12}
            />
            <div className={styles.buttonGroup}>
              <ButtonSecond
                onClick={() => handleCopy(inputText, "Input")}
                size="small"
              >
                Copy Input
              </ButtonSecond>
            </div>
          </div>

          {/* Removed middle buttons */}

          <div className={styles.textAreaContainer}>
            <label>Output Text</label>
            <Textarea
              value={outputText}
              readOnly // Output is always read-only
              placeholder={
                action === "encode"
                  ? "Encoded text will appear here..."
                  : "Decoded text will appear here..."
              }
              rows={12}
            />
            <div className={styles.buttonGroup}>
              <ButtonSecond
                onClick={() => handleCopy(outputText, "Output")}
                size="small"
              >
                Copy Output
              </ButtonSecond>
            </div>
          </div>
        </div>

        <div className={styles.actionButtons}>
          <ButtonMain onClick={processText} active>
            Process
          </ButtonMain>
          <ButtonSecond onClick={handleClear}>Clear All</ButtonSecond>
        </div>
      </div>
    </ToolLayout>
  );
};
// Export the component
export default StringEncoder;
