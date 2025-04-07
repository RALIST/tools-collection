import React, { useState, useCallback } from "react";
import { toast } from "react-toastify";
import { md5 } from "js-md5"; // Import the md5 function

import ToolLayout from "../../../components/layout/ToolLayout/ToolLayout";
import ButtonMain from "../../../components/common/UI/Buttons/ButtonMain/ButtonMain";
import ButtonSecond from "../../../components/common/UI/Buttons/ButtonSecond/ButtonSecond";
import Textarea from "../../../components/common/UI/Textarea/Textarea";
import Select from "../../../components/common/UI/Select/Select"; // Import Select

import styles from "./HashGenerator.module.css";

type HashType = "md5" | "sha1" | "sha256" | "sha512";

// Options for the Select dropdown
const HASH_ALGO_OPTIONS: { value: HashType; name: string }[] = [
  { value: "md5", name: "MD5" },
  { value: "sha1", name: "SHA-1" },
  { value: "sha256", name: "SHA-256" },
  { value: "sha512", name: "SHA-512" },
];

const HashGenerator: React.FC = () => {
  const [input, setInput] = useState("");
  const [hashType, setHashType] = useState<HashType>("sha256"); // Default to SHA-256
  const [output, setOutput] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setInput(""); // Clear text input when a file is selected
      setOutput(""); // Clear previous output
      toast.info(`Selected file: ${file.name}`);
    } else {
      setSelectedFile(null);
    }
  };

  const generateHash = useCallback(async () => {
    // Check if there's neither text input nor a selected file
    if (!input.trim() && !selectedFile) {
      toast.error("Please enter text or select a file to hash");
      return;
    }

    try {
      // Determine the data source: file or text input
      let dataSource: ArrayBuffer | Uint8Array;
      if (selectedFile) {
        // Read file content as ArrayBuffer
        dataSource = await selectedFile.arrayBuffer();
      } else {
        // Use text input, encode as Uint8Array
        const encoder = new TextEncoder();
        dataSource = encoder.encode(input);
      }
      let hashHex: string; // Store hex directly

      switch (hashType) {
        case "md5":
          toast.warning(
            "MD5 is not cryptographically secure. Consider using SHA-256 or SHA-512 instead."
          );
          // js-md5 accepts ArrayBuffer or Uint8Array
          hashHex = md5(dataSource);
          break;
        case "sha1":
          // Web Crypto API accepts BufferSource (ArrayBuffer, Uint8Array, etc.)
          const hashBufferSha1 = await crypto.subtle.digest(
            "SHA-1",
            dataSource
          );
          hashHex = Array.from(new Uint8Array(hashBufferSha1))
            .map((b) => b.toString(16).padStart(2, "0"))
            .join("");
          break;
        case "sha256":
          const hashBufferSha256 = await crypto.subtle.digest(
            "SHA-256",
            dataSource
          );
          hashHex = Array.from(new Uint8Array(hashBufferSha256))
            .map((b) => b.toString(16).padStart(2, "0"))
            .join("");
          break;
        case "sha512":
          const hashBufferSha512 = await crypto.subtle.digest(
            "SHA-512",
            dataSource
          );
          hashHex = Array.from(new Uint8Array(hashBufferSha512))
            .map((b) => b.toString(16).padStart(2, "0"))
            .join("");
          break;
        default:
          throw new Error("Unsupported hash type");
      }

      setOutput(hashHex); // Set output using the calculated hashHex
      toast.success(
        `${
          HASH_ALGO_OPTIONS.find((opt) => opt.value === hashType)?.name
        } hash generated!`
      );
    } catch (error) {
      toast.error("Failed to generate hash. Please try again.");
      console.error("Hash generation error:", error);
      setOutput(""); // Clear output on error
    }
  }, [input, hashType, selectedFile]);

  const handleCopy = async (text: string) => {
    if (!text) {
      toast.error("No text to copy!");
      return;
    }
    try {
      await navigator.clipboard.writeText(text);
      toast.success("Copied to clipboard!");
    } catch (err) {
      toast.error("Failed to copy text. Please try again.");
      console.error("Copy error:", err);
    }
  };

  const handleClear = () => {
    // Check if all relevant fields are empty
    if (!input && !output && !selectedFile) {
      toast.error("Fields are already empty!");
      return;
    }
    setInput("");
    setOutput("");
    setSelectedFile(null);
    // Reset the file input visually
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    toast.success("Cleared all fields!");
  };

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setInput(text);
      setSelectedFile(null); // Clear file selection when pasting text
      if (fileInputRef.current) {
        fileInputRef.current.value = ""; // Reset file input visually
      }
      toast.success("Text pasted from clipboard!");
    } catch (err) {
      toast.error("Failed to paste from clipboard. Please try again.");
      console.error("Paste error:", err);
    }
  };

  return (
    <ToolLayout toolName="hashGenerator">
      <div className={styles.hashGenerator}>
        {/* Wrap controls */}
        <div className={styles.controls}>
          {/* Algorithm Selector using Select component */}
          <div className={styles.controlGroup}>
            <label htmlFor="hash-algo-select">Algorithm:</label>
            <Select
              id="hash-algo-select"
              value={hashType}
              onChange={(e) => setHashType(e.target.value as HashType)}
              optionsList={HASH_ALGO_OPTIONS}
              ariaLabel="Select hash algorithm"
            />
          </div>
          {/* File Input Section */}
          <div className={styles.fileInputContainer}>
            <label htmlFor="file-input" className={styles.fileInputLabel}>
              Or Select a File:
            </label>
            <input
              id="file-input"
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              className={styles.fileInput}
            />
            {selectedFile && (
              <span className={styles.fileName}>
                Selected: {selectedFile.name}
              </span>
            )}
          </div>
        </div>{" "}
        {/* End .controls */}
        {/* Text Areas */}
        <div className={styles.textAreas}>
          <div className={styles.textAreaContainer}>
            <label>Input Text / File Content</label>
            <Textarea
              value={input}
              // Clear file when text is typed
              onChange={(e) => {
                setInput(e.target.value);
                setSelectedFile(null);
                if (fileInputRef.current) fileInputRef.current.value = "";
              }}
              placeholder="Enter text or select a file..."
              rows={12}
              readOnly={!!selectedFile} // Make readOnly if file selected
            />
            <div className={styles.buttonGroup}>
              <ButtonSecond onClick={handlePaste} size="small">
                Paste
              </ButtonSecond>
              <ButtonSecond onClick={() => handleCopy(input)} size="small">
                Copy Input
              </ButtonSecond>
            </div>
          </div>

          <div className={styles.textAreaContainer}>
            <label>
              Hash Value (
              {HASH_ALGO_OPTIONS.find((opt) => opt.value === hashType)?.name})
            </label>
            <Textarea
              value={output}
              readOnly
              placeholder="Hash value will appear here..."
              rows={12}
            />
            <div className={styles.buttonGroup}>
              <ButtonSecond onClick={() => handleCopy(output)} size="small">
                Copy Hash
              </ButtonSecond>
            </div>
          </div>
        </div>
        {/* Action Buttons */}
        <div className={styles.actionButtons}>
          <ButtonMain onClick={generateHash} active>
            Generate Hash
          </ButtonMain>
          <ButtonSecond onClick={handleClear}>Clear All</ButtonSecond>
        </div>
      </div>
    </ToolLayout>
  );
};

export default HashGenerator;
