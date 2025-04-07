import React, { useState, useCallback } from "react";
import { toast } from "react-toastify";
import {
  sha3_224,
  sha3_256,
  sha3_384,
  sha3_512,
  keccak_256,
  keccak_384,
  keccak_512,
} from "js-sha3";

import ToolLayout from "../../../components/layout/ToolLayout/ToolLayout";
import ButtonMain from "../../../components/common/UI/Buttons/ButtonMain/ButtonMain";
import ButtonSecond from "../../../components/common/UI/Buttons/ButtonSecond/ButtonSecond";
import Textarea from "../../../components/common/UI/Textarea/Textarea";
import Select from "../../../components/common/UI/Select/Select"; // Assuming a Select component exists

import styles from "./KeccakSha3Generator.module.css";

// Define the supported hash types
type KeccakSha3Type =
  | "sha3_224"
  | "sha3_256"
  | "sha3_384"
  | "sha3_512"
  | "keccak_256"
  | "keccak_384"
  | "keccak_512";

// Use 'name' for display text as expected by Select component
const HASH_OPTIONS: { value: KeccakSha3Type; name: string }[] = [
  { value: "sha3_224", name: "SHA3-224" },
  { value: "sha3_256", name: "SHA3-256" },
  { value: "sha3_384", name: "SHA3-384" },
  { value: "sha3_512", name: "SHA3-512" },
  { value: "keccak_256", name: "Keccak-256" },
  { value: "keccak_384", name: "Keccak-384" },
  { value: "keccak_512", name: "Keccak-512" },
];

const KeccakSha3Generator: React.FC = () => {
  const [input, setInput] = useState("");
  const [hashType, setHashType] = useState<KeccakSha3Type>("sha3_256");
  const [output, setOutput] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setInput("");
      setOutput("");
      toast.info(`Selected file: ${file.name}`);
    } else {
      setSelectedFile(null);
    }
  };

  const generateHash = useCallback(async () => {
    if (!input.trim() && !selectedFile) {
      toast.error("Please enter text or select a file to hash");
      return;
    }

    try {
      let dataToHash: string | ArrayBuffer;

      if (selectedFile) {
        dataToHash = await selectedFile.arrayBuffer();
      } else {
        dataToHash = input;
      }

      let hashHex: string;

      switch (hashType) {
        case "sha3_224":
          hashHex = sha3_224(dataToHash);
          break;
        case "sha3_256":
          hashHex = sha3_256(dataToHash);
          break;
        case "sha3_384":
          hashHex = sha3_384(dataToHash);
          break;
        case "sha3_512":
          hashHex = sha3_512(dataToHash);
          break;
        case "keccak_256":
          hashHex = keccak_256(dataToHash);
          break;
        case "keccak_384":
          hashHex = keccak_384(dataToHash);
          break;
        case "keccak_512":
          hashHex = keccak_512(dataToHash);
          break;
        default:
          throw new Error("Unsupported hash type");
      }

      setOutput(hashHex);
      toast.success(
        `${
          HASH_OPTIONS.find((opt) => opt.value === hashType)?.name // Use name here too
        } hash generated!`
      );
    } catch (error) {
      toast.error("Failed to generate hash.");
      console.error("Hash generation error:", error);
    }
  }, [input, hashType, selectedFile]);

  const handleCopy = async (text: string) => {
    if (!text) return;
    try {
      await navigator.clipboard.writeText(text);
      toast.success("Copied to clipboard!");
    } catch (err) {
      toast.error("Failed to copy.");
    }
  };

  const handleClear = () => {
    if (!input && !output && !selectedFile) {
      toast.error("Fields are already empty!");
      return;
    }
    setInput("");
    setOutput("");
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    toast.success("Cleared all fields!");
  };

  return (
    // Use the correct toolName for this component
    <ToolLayout toolName="keccakSha3Generator">
      <div className={styles.keccakSha3Generator}>
        {/* Add label separately and pass correct props to Select */}
        <div className={styles.hashTypeSelectorContainer}>
          <label htmlFor="hash-type-select" className={styles.hashTypeLabel}>
            Select Hash Type:
          </label>
          <Select
            id="hash-type-select"
            value={hashType}
            onChange={(e) => setHashType(e.target.value as KeccakSha3Type)}
            optionsList={HASH_OPTIONS} // Use optionsList prop
            ariaLabel="Select Keccak/SHA3 hash type"
          />
        </div>

        {/* File Input Section */}
        <div className={styles.fileInputContainer}>
          <label htmlFor="file-input-keccak" className={styles.fileInputLabel}>
            Or Select a File:
          </label>
          <input
            id="file-input-keccak"
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

        {/* Text Areas */}
        <div className={styles.textAreas}>
          <div className={styles.textAreaContainer}>
            <label>Input Text / File Content</label>
            <Textarea
              value={input}
              onChange={(e) => {
                setInput(e.target.value);
                setSelectedFile(null);
                if (fileInputRef.current) fileInputRef.current.value = "";
              }}
              placeholder="Enter text or select a file..."
              rows={10}
              readOnly={!!selectedFile} // Use readOnly instead of disabled
            />
          </div>
          <div className={styles.textAreaContainer}>
            <label>
              Hash Value (
              {HASH_OPTIONS.find((opt) => opt.value === hashType)?.name}){" "}
              {/* Use name here too */}
            </label>
            <Textarea
              value={output}
              readOnly
              placeholder="Hash value will appear here..."
              rows={10}
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

export default KeccakSha3Generator;
